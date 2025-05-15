import { useState } from "react";
import ByCategory from "../components/ByCategory";
import ByDate from "../components/ByDay";
import ByMonth from "../components/ByMonth";

export default function Statistics() {
  const [rendCom, setRendCom] = useState("Category");
  return (
    <>
      {rendCom == "Category" && <ByCategory />}
      {rendCom == "Month" && <ByMonth />}
      {rendCom == "Day" && <ByDate />}
      <div className="fixed flex justify-evenly text-white items-center text-black bottom-0 text-xs left-0 h-[8%] w-full border-t border-teal-600 ">
        <button
          className="bg-teal-600  p-2 rounded-full"
          onClick={() => setRendCom("Category")}
        >
          By Category
        </button>
        <button
          className="bg-teal-600  p-2 px-4 rounded-full"
          onClick={() => setRendCom("Month")}
        >
          By Month
        </button>
        <button
          className="bg-teal-600  p-2 px-6 rounded-full"
          onClick={() => setRendCom("Day")}
        >
          By Day
        </button>
      </div>
    </>
  );
}
