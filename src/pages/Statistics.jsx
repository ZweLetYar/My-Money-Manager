import { useState } from "react";
import ByCategory from "../components/ByCategory";
import ByDate from "../components/ByDay";
import ByMonth from "../components/ByMonth";
import { useNavigate } from "react-router-dom";

export default function Statistics() {
  const [rendCom, setRendCom] = useState("Category");
  let navigate = useNavigate();
  return (
    <>
      <div
        className="absolute left-2 rounded-full bg-gray-100 cursor-pointer p-1"
        onClick={() => navigate("/")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </div>
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
