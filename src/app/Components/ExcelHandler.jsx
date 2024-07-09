"use client";
import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import Reciept from "./Recipt";
import Modal from "./Modal";
import RecieptLayout from "./RecieptLayout";
import * as htmlToImage from 'html-to-image';
import { Icon } from "@iconify/react";

const SheetJSFT = [
  "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");

const make_cols = (refstr) => {
  let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};


const editHandler =()=>{
  
}

const ExcelReader = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [cols, setCols] = useState([]);
  const [sheetname, setSheetName] = useState("");
  const [showModal, SetShowModal] = useState(false);
  const [manualEnterData, SetmanualEnterData] = useState();
  const [buildingNo, SetBuildingNo] = useState();
  const [showManualDataModal, SetshowManualDataModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const receiptRefs = useRef({});



  const [dataReq, setDataReq] = useState([
    {
      Tenantname: "",
      roomNo: "",
      OldMeterReading: 0,
      NewMeterReading: 0,
      UnitUsed: 0,
      BillAmount: 0,
      PreviousBalance: 0,
      TotalAmount: 0,
      mobileNo:"",
      PhoneNumber:"",
      AdvanceMoney:0,
      Maintaince:0
    },
  ]);



  const filteredReceipts = dataReq.filter(item => 
    item?.Tenantname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.roomNo?.toString().includes(searchTerm)
  );

  const OnclickHandler = (data) => {
    SetmanualEnterData(data);
    SetShowModal(false);
    SetshowManualDataModal(true);
  };

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) setFile(files[0]);
  };

  const downloadHandler = async (key,roomNo) => {
    console.log("calling",key);
    const domEl = receiptRefs.current[key];
    if (!domEl) {
      console.error('Receipt element not found');
      return;
    }

    try {
      const dataUrl = await htmlToImage.toPng(domEl);
      const link = document.createElement('a');
      link.download = `${roomNo}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };


  const downloadAllReceipts = async () => {
    for (let key in receiptRefs.current) {
      const item = dataReq[key];
      if (item) {
        await downloadHandler(key, item.roomNo);
      }
    }
  };

  const handleFile = () => {
    const reader = new FileReader();
    const rABS = !reader.readAsBinaryString;

    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true,
      });
      const wsname = wb.SheetNames[0];
      setSheetName(wsname);
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      setData(data);
      setCols(make_cols(ws["!ref"]));
      console.log("dara",data);

      const getFirstKey = (obj) => Object.keys(obj)[0];
      const firstKeyValues = data.slice(2).map((obj) => obj[getFirstKey(obj)]);
      

      

      const updatedDataReq = data.slice(2).map((item, index) => (console.log("ere",data[index]),{
        Tenantname: item?.__EMPTY_1,
        roomNo: firstKeyValues[index],
        PhoneNumber: item?.__EMPTY_2 ? item.__EMPTY_2 : "Not Available",
        OldMeterReading: item?.__EMPTY_10 ? item.__EMPTY_10 : "Not Available",
        NewMeterReading: item?.__EMPTY_11 ? item?.__EMPTY_11 : "Not Available",
        AgreementNumber: item?.__EMPTY_4 ? item?.__EMPTY_4 : "Not Available",
        Rent: item?.__EMPTY_9 ? item?.__EMPTY_9 : "Not Available",
        UnitUsed: item?.__EMPTY_12 ? item?.__EMPTY_12 : "Not Available",
        BillAmount: item?.__EMPTY_14 ? item?.__EMPTY_14 : "Not Available",
        TotalAmount: item?.__EMPTY_18 ? item?.__EMPTY_18 : "Not Available",
         Maintaince:item?.__EMPTY_15 ? item?.__EMPTY_15  :"--"
      }));

      setDataReq(updatedDataReq);
    };

    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="p-12">
      {/* File upload section */}
      <div className="flex justify-evenly">
        <div className="flex flex-col">
          <label className="text-base font-medium" htmlFor="file">
            Upload an excel to Process Triggers
          </label>
          <input
            type="file"
            className="form-control mt-2"
            id="file"
            accept={SheetJSFT}
            onChange={handleChange}
          />
          <div>
            <button
              className="bg-purple-700 text-white font-semibold p-3 rounded-2xl mt-4"
              type="submit"
              onClick={handleFile}
            >
              Process Triggers
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <input
            className="p-4 rounded-2xl outline outline-1 outline-purple-500 mr-5"
            onChange={(e) => {
              SetBuildingNo(e.target.value);
            }}
            placeholder="Enter Room Building Number"
          />
          <button
            onClick={() => {
              if (buildingNo) {
                SetShowModal(true);
              } else {
                alert("Please Enter Building Number!!");
              }
            }}
            className="p-4 bg-purple-700 text-white font-semibold rounded-2xl"
          >
            Create a receipt
          </button>
        </div>
      </div>
   {
        dataReq[0] &&
         <div className=" flex   justify-center ">
         <button
           className="bg-purple-700 text-white font-semibold p-3 rounded-2xl mt-4 ml-4"
           onClick={downloadAllReceipts}
         >
           Download All Receipts
         </button>
         <div className="mt-3 flex  ml-3 justify-center">
        <input
          type="text"
          placeholder="Search by tenant name or room number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-64 border border-gray-300 rounded-md"
        />
      </div>

       </div>

   }
 
      {/* Receipts display section */}
      <div className="text-black mt-24 text-center flex justify-center items-center">
        <Modal isOpen={showManualDataModal} onClose={() => { SetshowManualDataModal(false) }}>
          {manualEnterData !== undefined && (
            <div>
            <div id="man" ref={(el) => (receiptRefs.current['man'] = el)} className="flex justify-center"> 
              <RecieptLayout buildingNo={buildingNo} data={manualEnterData} />
              
            </div>
            
            <div className=" flex gap-2">
            <Icon onClick={()=>{editHandler()}}  height={25} icon="bx:edit" />
            <Icon  onClick={()=>{downloadHandler("man",manualEnterData.roomNo)}}   height={25}  icon="material-symbols:download-sharp" />
            </div>

            </div>
          )}
        </Modal>
       
        {dataReq !== undefined && (
          filteredReceipts.length > 0 ? (
            <div className="h-[800px] overflow-scroll mt-1 gap-32">
              <h1 className="flex text-2xl font-bold justify-center items-center">RENT SLIPS</h1>
              {filteredReceipts.map((item, key) => (
                <div className="mt-12 flex" key={key}>
                  <div ref={(el) => (receiptRefs.current[key] = el)}>
                    <RecieptLayout 
                      data={item} 
                      buildingNo={buildingNo} 
                      editHandler={editHandler} 
                      downloadHandler={() => downloadHandler(key)} 
                    />
                  </div>
                  <div className="flex gap-2">
                    <Icon onClick={editHandler} height={25} icon="bx:edit" />
                    <Icon onClick={() => { downloadHandler(key, item.roomNo) }} height={25} icon="material-symbols:download-sharp" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 text-center">
              <p>No receipts found matching your search.</p>
            </div>
          )
        )}

        <Modal
          isOpen={showModal}
          onClose={() => {
            SetShowModal(false);
          }}
        >
          <Reciept OnclickHandler={OnclickHandler} />
          
        </Modal>
      </div>
    </div>
  );
};

export default ExcelReader;