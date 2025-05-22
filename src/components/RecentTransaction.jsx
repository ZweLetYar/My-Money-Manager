import food from "../assets/western-food-svgrepo-com.svg";
import snack from "../assets/snack-fast-food-svgrepo-com.svg";
import shopping from "../assets/shopping-cart-svgrepo-com.svg";
import dollor from "../assets/money-dollar-coin-svgrepo-com.svg";
import bus from "../assets/bus-left-2-svgrepo-com.svg";
import education from "../assets/education-svgrepo-com.svg";
import health from "../assets/emergency-health-healthcare-hospital-kit-medical-svgrepo-com.svg";
import house from "../assets/house-storm-2-svgrepo-com.svg";
import personal from "../assets/personal-collection-svgrepo-com.svg";
import phone from "../assets/smartphone-rotate-2-svgrepo-com.svg";
import charity from "../assets/loving-charity-svgrepo-com.svg";
import entertainment from "../assets/television-movie-entertainment-svgrepo-com.svg";

import { useContext } from "react";
import { UserDataContext } from "../Context/UserDataContext";
import { format } from "date-fns";
import ThreeDotsMenu from "./ThreeDotsMenu";
import { CurrencyContext } from "../Context/CurrencyContext";

export default function RecentTransaction() {
  let { transactions } = useContext(UserDataContext);

  let { cur } = useContext(CurrencyContext);

  const categoryIcons = {
    Salary: dollor,
    "Daily Meals": food,
    "Food & Drink": food,
    "Snack & Drink": snack,
    "Phone Bill": phone,
    Shopping: shopping,
    Charity: charity,
    Health: health,
    Housing: house,
    Transportation: bus,
    Education: education,
    Entertainment: entertainment,
    Personal: personal,
  };

  return (
    <div className="mt-7 h-[30%]">
      <h1 className="text-sm font-medium">Recent Transactions</h1>
      <div className="flex flex-col mt-4 gap-4 overflow-y-auto h-[200px]">
        {transactions.length === 0 && (
          <h1 className="text-gray-600 text-center mt-5 ">
            No Transactons yet!
          </h1>
        )}
        {transactions &&
          transactions.map((t) => {
            return (
              <div className="flex justify-between " key={t.id}>
                <div className="flex gap-2 items-center">
                  <img
                    src={categoryIcons[t.category] || dollor}
                    alt="image"
                    className="w-7 h-7 "
                  />
                  <div>
                    <h1 className="text-sm font-semibold">{t.category}</h1>
                    <h1 className="text-xs text-gray-700">
                      {t.date
                        ? format(t.date.toDate(), "MMM d")
                        : "Invalid date"}
                    </h1>
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  <h1 className="text-sm">
                    {t.transactionType == "Income" ? "+" : "-"}
                    {Number(t.amount).toLocaleString()} {cur}
                  </h1>

                  <ThreeDotsMenu
                    tid={t.id}
                    tamount={t.amount}
                    tcat={t.category}
                    tnote={t.note}
                    ttype={t.transactionType}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
