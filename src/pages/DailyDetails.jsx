import { useContext, useState } from "react";
import priceTag from "../assets/price-tag-svgrepo-com.svg";
import { UserDataContext } from "../Context/UserDataContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

export default function DailyDetails() {
  const { dailyTransactions, loading } = useContext(UserDataContext);

  const [searchDate, setSearchDate] = useState("");

  // Filter the grouped transactions by selected date
  const filteredDates = Object.entries(dailyTransactions).filter(
    ([date]) => searchDate === "" || date === searchDate
  );

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
      <div className="flex flex-col gap-5 ">
        <h1 className="text-md font-medium">Daily Boucher</h1>

        <input
          type="date"
          className="w-full px-2 rounded border border-teal-700 focus:border-teal-900"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col gap-5 items-center w-full ml-auto mr-auto h-[500px] overflow-y-auto">
            {filteredDates.length > 0 ? (
              filteredDates.map(([date, txns]) => {
                const totalForDate = txns.reduce((sum, txn) => {
                  return txn.transactionType === "Expenses"
                    ? sum + Number(txn.amount)
                    : sum;
                }, 0);

                return (
                  <div
                    className="flex flex-col border rounded-md w-full border-teal-800 shadow-lg"
                    key={date}
                  >
                    <div className="flex justify-between w-[90%] ml-auto mr-auto py-3 font-medium">
                      <h1>{date}</h1>
                      <div className="flex">
                        {[...Array(3)].map((_, i) => (
                          <img
                            key={i}
                            src={priceTag}
                            alt="price Tag"
                            className="w-5 h-auto"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 items-center w-[90%] ml-auto mr-auto border-y border-teal-700 py-3">
                      {txns.map((txn) => (
                        <div
                          className="flex justify-between w-full"
                          key={txn.id}
                        >
                          <h1 className="text-teal-800 w-[50%] ">{txn.note}</h1>
                          <h1 className="text-sm w-[50%]  text-right">
                            {txn.transactionType === "Income" ? "+" : "-"}
                            {Number(txn.amount).toLocaleString()} MMK
                          </h1>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between w-[90%] ml-auto mr-auto py-3 font-medium">
                      <h1>Total Exp</h1>
                      <h1 className="text-sm">
                        {totalForDate.toLocaleString()} MMK
                      </h1>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500">No matching records.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
