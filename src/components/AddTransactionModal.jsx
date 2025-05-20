// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../Context/AuthContext";
// import useFireStore from "../hooks/useFireStore";
// import { ThemeContext } from "../Context/ThemeContext";

// export default function AddTransactionModal({
//   show,
//   onClose,
//   isEdit,
//   tid,
//   tamount,
//   tcat,
//   tnote,
//   ttype,
// }) {
//   let { user } = useContext(AuthContext);
//   let { isPink, isOrange, isSkyblue, isIndigo } = useContext(ThemeContext);

//   let { addCollection, updateDocument } = useFireStore();

//   const [amount, setAmount] = useState("");

//   const parsedAmount = parseInt(amount);

//   const [selected, setSelected] = useState("Select Category");
//   const [transactionType, setTransactionType] = useState("Transaction Type");

//   const [note, setNote] = useState("");

//   useEffect(() => {
//     if (isEdit) {
//       setAmount(tamount);
//       setSelected(tcat);
//       setNote(tnote);
//       setTransactionType(ttype);
//     }
//   }, [isEdit]);

//   const categories = [
//     { type: "Expenses", name: "Food & Drink" },
//     { type: "Expenses", name: "Shopping" },
//     { type: "Expenses", name: "Health" },
//     { type: "Expenses", name: "Housing" },
//     { type: "Expenses", name: "Transportation" },
//     { type: "Expenses", name: "Education" },
//     { type: "Expenses", name: "Entertainment" },
//     { type: "Expenses", name: "Personal" },
//     { type: "Income", name: "Salary" },
//     { type: "Income", name: "Freelance" },
//   ];

//   const [isOpen, setIsOpen] = useState(false);

//   if (!show) return null;

//   let resetForm = () => {
//     setAmount("");
//     setNote("");
//     setSelected("Select Category");
//     setTransactionType("Transaction Type");
//   };

//   let addTransaction = (e) => {
//     e.preventDefault();
//     let data = {
//       amount: parsedAmount,
//       category: selected,
//       note,
//       transactionType,
//       userId: user.uid,
//     };

//     if (isEdit) {
//       updateDocument("Transaction", tid, data);
//     } else {
//       addCollection("Transaction", data);
//     }

//     onClose();
//   };

//   return (
//     // Background overlay with low opacity
//     <div className="fixed inset-0 z-50  border-t border-t-teal-600  h-1/2 mx-4 mt-71 rounded-xl shadow-2xl flex items-end sm:items-center justify-center ">
//       {/* Modal Card */}
//       <div className="bg-white w-full sm:w-96  rounded-t-2xl sm:rounded-2xl p-6 shadow-lg">
//         <button onClick={onClose} className="ml-auto block">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="size-6 "
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18 18 6M6 6l12 12"
//             />
//           </svg>
//         </button>

//         <h2 className="text-lg font-semibold mb-4 text-center">
//           {isEdit ? "Edit" : "Add"} Transaction
//         </h2>

//         <form className="flex flex-col gap-3" onSubmit={addTransaction}>
//           <input
//             type="number"
//             placeholder="Amount"
//             className="border p-2 rounded"
//             onChange={(e) => setAmount(e.target.value)}
//             value={amount}
//             onKeyDown={(e) => {
//               if (["e", "E", "+", "-", "."].includes(e.key)) {
//                 e.preventDefault();
//               }
//             }}
//           />
//           <div className="relative w-full">
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 setIsOpen(!isOpen);
//               }}
//               className="border p-2 w-full rounded text-left"
//             >
//               {selected}
//             </button>
//             {isOpen && (
//               <ul className="absolute mt-1 max-h-40 overflow-y-auto border bg-white w-full rounded shadow z-10">
//                 {categories.map((cat, i) => (
//                   <li
//                     key={i}
//                     onClick={() => {
//                       setSelected(cat.name);
//                       setTransactionType(cat.type);
//                       setIsOpen(false);
//                     }}
//                     className="p-2 hover:bg-teal-100 cursor-pointer"
//                   >
//                     {cat.name}
//                   </li>
//                 ))}
//                 <li className="p-2 text-teal-600 hover:underline cursor-pointer">
//                   + Add Category
//                 </li>
//               </ul>
//             )}
//           </div>
//           <input
//             type="text"
//             placeholder="Note"
//             className="border p-2 rounded"
//             onChange={(e) => setNote(e.target.value)}
//             value={note}
//           />

//           <button
//             className="border p-2 w-full rounded text-left"
//             onClick={(e) => e.preventDefault()}
//           >
//             {transactionType}
//           </button>
//           <button
//             type="submit"
//             className={`text-white py-2 rounded mt-2 ${
//               isPink
//                 ? "bg-pink-400"
//                 : isOrange
//                 ? "bg-orange-400"
//                 : isSkyblue
//                 ? "bg-sky-400"
//                 : isIndigo
//                 ? "bg-indigo-400"
//                 : "bg-teal-600"
//             }`}
//           >
//             Save
//           </button>
//         </form>

//         <button
//           onClick={resetForm}
//           className="mt-4 text-sm text-gray-500 text-center w-full"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import useFireStore from "../hooks/useFireStore";
import { ThemeContext } from "../Context/ThemeContext";

export default function AddTransactionModal({
  show,
  onClose,
  isEdit,
  tid,
  tamount,
  tcat,
  tnote,
  ttype,
}) {
  const { user } = useContext(AuthContext);
  const { isPink, isOrange, isSkyblue, isIndigo } = useContext(ThemeContext);
  const { addCollection, updateDocument } = useFireStore();

  const [amount, setAmount] = useState("");
  const parsedAmount = parseInt(amount);
  const [selected, setSelected] = useState("Select Category");
  const [transactionType, setTransactionType] = useState("Transaction Type");
  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isEdit) {
      setAmount(tamount);
      setSelected(tcat);
      setNote(tnote);
      setTransactionType(ttype);
    }
  }, [isEdit]);

  const categories = [
    { type: "Expenses", name: "Food & Drink" },
    { type: "Expenses", name: "Shopping" },
    { type: "Expenses", name: "Health" },
    { type: "Expenses", name: "Housing" },
    { type: "Expenses", name: "Transportation" },
    { type: "Expenses", name: "Education" },
    { type: "Expenses", name: "Entertainment" },
    { type: "Expenses", name: "Charity" },
    { type: "Expenses", name: "Phone Bill" },
    { type: "Expenses", name: "Paid Debt" },
    { type: "Income", name: "Get Debt" },
    { type: "Expenses", name: "Personal" },
    { type: "Income", name: "Salary" },
    { type: "Income", name: "Freelance" },
  ];

  if (!show) return null;

  const resetForm = () => {
    setAmount("");
    setNote("");
    setSelected("Select Category");
    setTransactionType("Transaction Type");
  };

  const addTransaction = (e) => {
    e.preventDefault();
    if (selected === "Select Category") {
      setErrorMsg("Please Select Category!");
    } else {
      const data = {
        amount: parsedAmount,
        category: selected,
        note,
        transactionType,
        userId: user.uid,
      };
      isEdit
        ? updateDocument("Transaction", tid, data)
        : addCollection("Transaction", data);
      setErrorMsg("");
      onClose();
      setAmount("");
      setNote("");
      setSelected("Select Category");
      setTransactionType("Transaction Type");
    }
  };

  return (
    <div className="fixed inset-0 z-50  bg-opacity-40 flex items-center justify-center p-4">
      {/* Modal Card */}
      <div
        className={`bg-white w-full max-w-md rounded-2xl border-1  shadow-2xl p-6 relative overflow-y-auto max-h-[90vh] ${
          isPink
            ? "border-pink-500 "
            : isOrange
            ? "border-orange-500 "
            : isSkyblue
            ? "border-sky-500 "
            : isIndigo
            ? "border-indigo-500 "
            : "border-teal-600 "
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-xl font-semibold mb-6 text-center">
          {isEdit ? "Edit" : "Add"} Transaction
        </h2>

        <form className="flex flex-col gap-4" onSubmit={addTransaction}>
          <input
            type="number"
            required
            placeholder="Amount"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            onKeyDown={(e) => {
              if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
            }}
          />

          <div className="relative">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(!isOpen);
              }}
              className="border p-3 w-full rounded-lg text-left bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              {selected}
            </button>
            <h1 className="text-sm ps-2 pt-1 text-red-400">{errorMsg}</h1>
            {isOpen && (
              <ul className="absolute mt-1 w-full max-h-40 overflow-y-auto border rounded-md bg-white shadow z-10">
                {categories.map((cat, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setSelected(cat.name);
                      setTransactionType(cat.type);
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-teal-100 cursor-pointer"
                  >
                    {cat.name}
                  </li>
                ))}
                <li className="px-4 py-2 text-teal-600 hover:underline cursor-pointer">
                  + Add Category
                </li>
              </ul>
            )}
          </div>

          <input
            type="text"
            required
            placeholder="Note or Detail"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
            onChange={(e) => setNote(e.target.value)}
            value={note}
          />

          <button
            className="border p-3 w-full rounded-lg text-left bg-white cursor-default"
            onClick={(e) => e.preventDefault()}
          >
            {transactionType}
          </button>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${
              isPink
                ? "bg-pink-500 hover:bg-pink-600"
                : isOrange
                ? "bg-orange-500 hover:bg-orange-600"
                : isSkyblue
                ? "bg-sky-500 hover:bg-sky-600"
                : isIndigo
                ? "bg-indigo-500 hover:bg-indigo-600"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            Save
          </button>
        </form>

        <button
          onClick={resetForm}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 text-center w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
