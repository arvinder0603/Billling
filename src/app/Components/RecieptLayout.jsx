import { Icon } from "@iconify/react";
import React from "react";

const RecieptLayout = ({ buildingNo,data,editHandler,downloadHandler }) => {
  const getDateInStringFormat = (date, sign) => {
    return `${date.getDate()}${sign}${
      date.getMonth() + 1
    }${sign}${date.getFullYear()}`;
  };

  console.log("dataIncoming",data);

  return (
    <div className="   flex justify-center  rounded-xl  w-[760px]  min-h-[400px] ">
      <div className="   flex gap-3 ">

      <div className=" bg-gray-50 outline outline-1 w-full outline-gray-400">
        <div className=" flex  w-full     border-b-2  border-y-gray-400 justify-evenly">
          <div className=" flex justify-center items-center">
            <Icon height={45} icon="material-symbols-light:house-outline" />
          </div>

          <div className=" m-2 min-w-[300px] flex justify-center  flex-col items-center outline p-2  outline-1 outline-gray-400 rounded-2xl">
            <h1 className=" font-bold text-2xl">RENT SLIP {buildingNo} </h1>
            <h1>{buildingNo} DLF PHASE III, GURGAON</h1>
          </div>
          {/* <h1>{buildingNo}  DLF PHASE III, GURGAON</h1> */}

          <div className=" flex justify-center items-center border-l-2 border-y-gray-400 p-2">
            <Icon height={30} icon="carbon:phone" />
            <h1 className=" mb-1 text-base font-bold">9818862972</h1>
          </div>
        </div>

        <div className=" grid grid-cols-2 mt-6 gap-3  border-b-2 border-gray-400 ">
          <div className=" ml-2  flex justify-start outline outline-1 outline-gray-500 p-2 rounded-lg">
            <h1 className=" text-base font-medium  ">Name : {data?.Tenantname} </h1>
          </div>

          <div className=" mr-2  flex justify-start outline outline-1 outline-gray-500 p-2 rounded-lg">
            <h1 className=" text-base font-medium  ">Room No. : {data?.roomNo} </h1>
          </div>

          <div className=" mb-4  ml-2 flex justify-start outline outline-1 outline-gray-500 p-2 rounded-lg">
            <h1>Month : {getDateInStringFormat(new Date(), "/")}</h1>
          </div>
        </div>

        <div className="  mt-3  border-b-2 text-center flex justify-center border-gray-400 ">
          <h1 className=" font-semibold  mb-2 text-base ">DETAILS</h1>
        </div>

        <div className=" grid grid-cols-2 gap-2 mt-4 mr-2 ">
          <div className=" ml-2  flex justify-start    outline outline-1 outline-gray-500 p-2 rounded-lg">
            <h1 className=" text-base font-medium  ">Security Deposit : {data?.PreviousBalance} </h1>
          </div>

          <div className=" ml-2  flex justify-start   outline outline-1 outline-gray-500 p-2 rounded-lg">
            <h1 className=" text-base font-medium  ">Rent @Charges : {data?.Rent} </h1>
          </div>

          <div className=" ml-2  flex flex-col justify-start mb-2   outline outline-1 outline-gray-500 p-2 rounded-lg">
            <h1 className=" text-base font-medium  mb-2 ">
              Electrical Charges :{" "}
            </h1>

            <div className=" flex flex-col gap-4">
              <div className=" ml-2  flex justify-start   outline outline-1 outline-gray-500 p-2 rounded-lg">
                <h1 className=" text-base font-medium  ">Old Reading : {data?.OldMeterReading} </h1>
              </div>
              <div className=" ml-2  flex justify-start   outline outline-1 outline-gray-500 p-2 rounded-lg">
                <h1 className=" text-base font-medium  ">New Reading : {data?.NewMeterReading} </h1>
              </div>
              <div className=" ml-2  flex justify-start   outline outline-1 outline-gray-500 p-2 rounded-lg">
                <h1 className=" text-base font-medium  ">Unit Used :  {data?.UnitUsed}</h1>
              </div>
              <div className=" ml-2  flex justify-start   outline outline-1 outline-gray-500 p-2 rounded-lg">
                <h1 className=" text-base font-medium  ">Amount : {data?.BillAmount} </h1>
              </div>
            </div>
          </div>

          <div>
            <div className=" ml-2  flex justify-start h-[40px]   outline outline-1 outline-gray-500 p-2 rounded-lg">
              <h1 className=" text-base font-medium  ">Previous Balance : {data?.PreviousBalance} </h1>
            </div>

            <div className=" text-base font-semibold ">
              <h1 className=" mt-20">Payer Signatory</h1>

              <h1 className=" mt-20">Authorised Signatory</h1>
            </div>
          </div>

          <div className=" ml-2  mb-4 flex justify-start   outline outline-1 outline-gray-500 p-2 rounded-lg">
            <h1 className=" text-base font-medium  ">Total Amount :  {data?.TotalAmount} </h1>
          </div>
        </div>

        <div className=" ml-2 mr-2  mb-4 flex justify-center  outline outline-1 outline-gray-500 p-2 rounded-lg">
          <ol spellCheck>
            <li className=" text-base  font-bold">
              {" "}
              <span className="  text-red-500"> INTREST @ 12%</span> will be
              charged if rent is not paid bt 7th of Month.
            </li>
            <li className=" text-base  font-bold">
              Maintance charge will be on vocation of Room as per maintaince of
              Room.
            </li>
            <li className=" text-sm  font-bold">
              Please send/whatsapp on 9466399785 for the payment made
              online/cash against this slip.
            </li>
          </ol>
        </div>
      </div>
      

      </div>
     
    </div>
  );
};

export default RecieptLayout;
