import React from "react";

export default function Income_Expense() {
  return (
    <div className="mt-7">
      <h3 className="text-sm">Balance Overview</h3>
      <div className="flex mt-3">
        <div
          className="pe-5 border-r 
        "
        >
          <h3 className="text-sm text-teal-600 w-[50%]">Income</h3>
          <h3 className="text-xl font-medium">150,000 MMK</h3>
        </div>
        <div className="ps-5 ">
          <h3 className="text-sm text-rose-600 w-[50%] ">Expenses</h3>
          <h3 className="text-xl font-medium">50,000 MMK</h3>
        </div>
      </div>
    </div>
  );
}
