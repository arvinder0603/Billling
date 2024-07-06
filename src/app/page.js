import Image from "next/image";
import ExcelReader from "./Components/ExcelHandler";

export default function Home() {
  return (
    <div className="">
      <h1 className=" flex justify-center items-center mt-12 text-3xl font-bold">
        Pink Stays 
      </h1>
      <ExcelReader/>
    </div>
  );
}
