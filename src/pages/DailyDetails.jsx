// import { useContext, useState } from "react";
// import priceTag from "../assets/price-tag-svgrepo-com.svg";
// import { UserDataContext } from "../Context/UserDataContext";

// export default function DailyDetails() {
//   let { groupByDate, transactions, loading } = useContext(UserDataContext);
//   let groupedTransactions = groupByDate(transactions);

//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredDates = groupedTransactions?.filter((t) =>
//     t.date.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex flex-col gap-5">
//       <h1 className="text-md font-medium">Daily Boucher</h1>
//       <input
//         type="text"
//         placeholder="Search by title..."
//         className={`w-full pr-10 mb-4 p-2 rounded border ${
//           isDark
//             ? "bg-gray-800 text-white border-pink-600 focus:border-pink-900"
//             : "border-pink-400 focus:border-pink-900"
//         }`}
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       {loading ? (
//         <div className=" flex items-center justify-center h-100">
//           <img src={priceTag} className="w-15 h-auto"></img>
//         </div>
//       ) : (
//         <div className="flex flex-col gap-5 items-center w-[90%] ml-auto mr-auto h-[500px] overflow-y-auto ">
//           {filteredDates &&
//             Object.entries(groupedTransactions).map(([date, txns]) => {
//               // ✅ Calculate total expenses for the current date
//               const totalForDate = txns.reduce((sum, txn) => {
//                 return txn.transactionType === "Expenses"
//                   ? sum + Number(txn.amount)
//                   : sum;
//               }, 0);
//               return (
//                 <div
//                   className="flex flex-col border rounded-md w-full border-teal-900 shadow-lg"
//                   key={date}
//                 >
//                   <div className="flex justify-between w-[90%] ml-auto mr-auto py-3 font-medium">
//                     <h1>{date}</h1>
//                     <div className="flex">
//                       <img
//                         src={priceTag}
//                         alt="price Tag"
//                         className=" w-5 h-auto"
//                       />
//                       <img
//                         src={priceTag}
//                         alt="price Tag"
//                         className=" w-5 h-auto"
//                       />
//                       <img
//                         src={priceTag}
//                         alt="price Tag"
//                         className=" w-5 h-auto"
//                       />
//                     </div>
//                   </div>
//                   <div className="flex flex-col gap-1 items-center  w-[90%] ml-auto mr-auto border-y border-teal-700 py-3">
//                     {txns.map((txn) => {
//                       return (
//                         <div
//                           className="flex justify-between w-full"
//                           key={txn.id}
//                         >
//                           <h1 className="text-teal-800">{txn.note}</h1>
//                           <h1 className="text-sm">
//                             {txn.transactionType == "Income" ? "+" : "-"}
//                             {Number(txn.amount).toLocaleString()} MMK
//                           </h1>
//                         </div>
//                       );
//                     })}
//                   </div>
//                   <div className="flex justify-between w-[90%] ml-auto mr-auto py-3 font-medium">
//                     <h1>total exp</h1>
//                     <h1 className="text-sm">
//                       {totalForDate.toLocaleString()} MMK
//                     </h1>
//                   </div>
//                 </div>
//               );
//             })}
//         </div>
//       )}
//     </div>
//   );
// }
import { useContext, useState } from "react";
import priceTag from "../assets/price-tag-svgrepo-com.svg";
import { UserDataContext } from "../Context/UserDataContext";

export default function DailyDetails() {
  const { groupByDate, transactions, loading } = useContext(UserDataContext);
  const groupedTransactions = groupByDate(transactions);
  const [searchDate, setSearchDate] = useState("");

  // Filter the grouped transactions by selected date
  const filteredDates = Object.entries(groupedTransactions).filter(
    ([date]) => searchDate === "" || date === searchDate
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-around items-center">
        <h1 className="text-md font-medium">Daily Boucher</h1>

        <input
          type="date"
          className="w-1/9 px-2 rounded border border-teal-700 focus:border-teal-900 bg-teal-400"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-100">
          <img src={priceTag} className="w-15 h-auto" alt="Loading" />
        </div>
      ) : (
        <div className="flex flex-col gap-5 items-center w-[90%] ml-auto mr-auto h-[500px] overflow-y-auto">
          {filteredDates.length > 0 ? (
            filteredDates.map(([date, txns]) => {
              const totalForDate = txns.reduce((sum, txn) => {
                return txn.transactionType === "Expenses"
                  ? sum + Number(txn.amount)
                  : sum;
              }, 0);

              return (
                <div
                  className="flex flex-col border rounded-md w-full border-teal-900 shadow-lg"
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
                      <div className="flex justify-between w-full" key={txn.id}>
                        <h1 className="text-teal-800">{txn.note}</h1>
                        <h1 className="text-sm">
                          {txn.transactionType === "Income" ? "+" : "-"}
                          {Number(txn.amount).toLocaleString()} MMK
                        </h1>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between w-[90%] ml-auto mr-auto py-3 font-medium">
                    <h1>Total Expenses</h1>
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
  );
}
