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
import { useContext, useEffect, useState } from "react";
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
    { type: "Income", name: "Salary", img: dollor },
    { type: "Income", name: "Freelance", img: dollor },
    { type: "Expenses", name: "Daily Meals", img: food },
    { type: "Expenses", name: "Snack & Drink", img: snack },
    { type: "Expenses", name: "Shopping", img: shopping },
    { type: "Expenses", name: "Health", img: health },
    { type: "Expenses", name: "Housing", img: house },
    { type: "Expenses", name: "Transportation", img: bus },
    { type: "Expenses", name: "Education", img: education },
    { type: "Expenses", name: "Entertainment", img: entertainment },
    { type: "Expenses", name: "Charity", img: charity },
    { type: "Expenses", name: "Phone Bill", img: phone },
    { type: "Expenses", name: "Paid Debt", img: dollor },
    { type: "Income", name: "Get Debt", img: dollor },
    { type: "Expenses", name: "Personal", img: personal },
  ];

  // if (!show) return null;

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
    <div
      className={`fixed inset-0 z-50  bg-opacity-40 flex items-center justify-center p-4 transition-opacity ease-in-out duration-300  ${
        show
          ? "opacity-100 scale-100 translate-y-0 "
          : "opacity-0 scale-90 translate-y-full"
      }`}
    >
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
                    <img src={cat.img} alt="" className="w-4 h-4 inline" />
                    {"  "}
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
