import React, { useContext } from "react";
import { UserDataContext } from "../Context/UserDataContext";

export default function Balance() {
  let { monthlyBalance, currentMonth } = useContext(UserDataContext);

  return (
    <div className="flex flex-col   w-full ps-5 py-4 bg-gray-100 rounded-2xl ml-auto mr-auto">
      <div className="flex gap-2">
        <h5 className="text-sm  ">Balance </h5>
        <h5 className="text-sm  ">({currentMonth}) </h5>
      </div>
      <h1 className="text-2xl font-semibold">
        {Number(monthlyBalance).toLocaleString()} MMK
      </h1>
    </div>
  );
}
