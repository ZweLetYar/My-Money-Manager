import React from "react";
import food from "../assets/western-food-svgrepo-com.svg";
import shopping from "../assets/shopping-cart-svgrepo-com.svg";
import dollor from "../assets/money-dollar-coin-svgrepo-com.svg";

export default function RecentTransaction() {
  return (
    <div className="mt-7 h-[30%]">
      <h1 className="text-sm font-medium">Recent Transactions</h1>
      <div className="flex flex-col mt-4 gap-5 overflow-y-auto h-[150px]">
        <div className="flex justify-between ">
          <div className="flex gap-2 items-center">
            <img src={food} alt="image" className="w-7 h-7 " />
            <div>
              <h1 className="text-sm font-semibold">Food & Drink</h1>
              <h1 className="text-xs text-gray-700">Apr 22</h1>
            </div>
          </div>
          <h1 className="text-sm">-5,000 MMK</h1>
        </div>
        <div className="flex justify-between ">
          <div className="flex gap-2 items-center">
            <img src={shopping} alt="image" className="w-7 h-7 " />
            <div>
              <h1 className="text-sm font-semibold">Shopping</h1>
              <h1 className="text-xs text-gray-700">Apr 21</h1>
            </div>
          </div>
          <h1 className="text-sm">-20,000 MMK</h1>
        </div>
        <div className="flex justify-between ">
          <div className="flex gap-2 items-center">
            <img src={dollor} alt="image" className="w-7 h-7 " />
            <div>
              <h1 className="text-sm font-semibold">Salary</h1>
              <h1 className="text-xs text-gray-700">Apr 20</h1>
            </div>
          </div>
          <h1 className="text-sm">+150,000 MMK</h1>
        </div>
        <div className="flex justify-between ">
          <div className="flex gap-2 items-center">
            <img src={dollor} alt="image" className="w-7 h-7 " />
            <div>
              <h1 className="text-sm font-semibold">Salary</h1>
              <h1 className="text-xs text-gray-700">Apr 20</h1>
            </div>
          </div>
          <h1 className="text-sm">+150,000 MMK</h1>
        </div>
        <div className="flex justify-between ">
          <div className="flex gap-2 items-center">
            <img src={dollor} alt="image" className="w-7 h-7 " />
            <div>
              <h1 className="text-sm font-semibold">Salary</h1>
              <h1 className="text-xs text-gray-700">Apr 20</h1>
            </div>
          </div>
          <h1 className="text-sm">+150,000 MMK</h1>
        </div>
      </div>
    </div>
  );
}
