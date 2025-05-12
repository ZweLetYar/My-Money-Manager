import React, { useContext } from "react";
import { UserDataContext } from "../Context/UserDataContext";

export default function Balance() {
  let { balance } = useContext(UserDataContext);

  return (
    <div className="flex flex-col   w-full ps-5 py-4 bg-gray-100 rounded-2xl ml-auto mr-auto">
      <h5 className="text-sm  ">Balance</h5>
      <h1 className="text-2xl font-semibold">
        {Number(balance).toLocaleString()} MMK
      </h1>
    </div>
  );
}
