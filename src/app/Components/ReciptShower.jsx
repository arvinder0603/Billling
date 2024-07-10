import React, { useRef, useState, useEffect } from "react";
import RecieptLayout from "./RecieptLayout";
import { Icon } from "@iconify/react";
import * as htmlToImage from 'html-to-image';

const ReciptShower = ({ data, buildingNo }) => {
  const [index, setIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const receiptRefs = useRef({});

  console.log("data",data);

  useEffect(() => {
    const filtered = data.filter(item => 
      item.roomNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.Tenantname && item.Tenantname.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredData(filtered);
    setIndex(0); // Reset index when search results change
  }, [searchTerm, data]);

  const handlePrevClick = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleNextClick = () => {
    if (index < filteredData.length - 1) {
      setIndex(index + 1);
    }
  };

  const downloadHandler = async (key, roomNo) => {
    const domEl = receiptRefs.current[key];
    if (!domEl) {
      console.error('Receipt element not found');
      return;
    }

    try {
      const dataUrl = await htmlToImage.toJpeg(domEl);
      const link = document.createElement('a');
      link.download = `${roomNo}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const downloadAllReceipts = async () => {
    for (let i = 0; i < filteredData.length; i++) {
      const item = filteredData[i];
      await new Promise(resolve => {
        setIndex(i);
        setTimeout(async () => {
          await downloadHandler('main', item.roomNo);
          resolve();
        }, 500);
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center ">
        {data.length > 0 && (
          <div className="w-full  gap-4 flex justify-around mb-4">
            {/* <h1 className="text-2xl font-bold">Total Rooms: {data.length}</h1> */}
           
            <div className="">
              <input
                type="text"
                placeholder="Search by tenant name or room number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 h-[50px] border border-purple-400 rounded-2xl "
              />
            </div>
            <button
              className="bg-purple-700 text-white font-semibold p-3 rounded-2xl"
              onClick={downloadAllReceipts}
            >
              Download All Receipts
            </button>
          </div>
        )}
        <div className="">
          {filteredData.length > 0 ? (
            <div className="flex">
              <div ref={(el) => (receiptRefs.current['main'] = el)}>
                <RecieptLayout buildingNo={buildingNo} data={filteredData[index]} />
              </div>
              <Icon
                onClick={() => {}}
                height={25}
                icon="bx:edit"
                className="cursor-not-allowed "
              />
              <Icon
                className="cursor-pointer "
                onClick={() => {
                  downloadHandler("main", filteredData[index].roomNo);
                }}
                height={25}
                icon="material-symbols:download-sharp"
              />
            </div>
          ) : (
            <p className=" flex justify-center items-center outline-dotted outline-1 outline-gray-300 mt-12 h-[300px]  p-12">No receipts available.</p>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <Icon
          onClick={handlePrevClick}
          className={`cursor-pointer ${
            index === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          height={30}
          icon="icon-park-outline:left-c"
        />
        <Icon
          onClick={handleNextClick}
          className={`cursor-pointer ${
            index === filteredData.length - 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          height={30}
          icon="icon-park-outline:right-c"
        />
      </div>
    </div>
  );
};

export default ReciptShower;