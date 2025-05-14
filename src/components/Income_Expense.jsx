import React, { useContext } from "react";
import { UserDataContext } from "../Context/UserDataContext";

export default function Income_Expense() {
  let { monthlyIncome, monthlyExpenses } = useContext(UserDataContext);
  // let formattedIncome = income.toLocalSting()

  return (
    <div className="mt-7">
      <h3 className="text-sm">Balance Overview</h3>
      <div className="flex mt-3">
        <div
          className="pe-5 border-r 
        "
        >
          <h3 className="text-sm text-teal-600 w-[50%]">Income</h3>
          <h3 className="text-xl font-medium">
            {Number(monthlyIncome).toLocaleString()} MMK
          </h3>
        </div>
        <div className="ps-5 ">
          <h3 className="text-sm text-rose-600 w-[50%] ">Expenses</h3>
          <h3 className="text-xl font-medium">
            {Number(monthlyExpenses).toLocaleString()} MMK
          </h3>
        </div>
      </div>
    </div>
  );
}
