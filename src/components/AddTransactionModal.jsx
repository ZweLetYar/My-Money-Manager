import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import useFireStore from "../hooks/useFireStore";

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
  let { user } = useContext(AuthContext);

  let { addCollection, updateDocument } = useFireStore();

  const [amount, setAmount] = useState("");

  const parsedAmount = parseInt(amount);

  const [selected, setSelected] = useState("Select Category");
  const [transactionType, setTransactionType] = useState("Transaction Type");

  const [note, setNote] = useState("");

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
    { type: "Expenses", name: "Personal" },
    { type: "Income", name: "Salary" },
    { type: "Income", name: "Freelance" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  if (!show) return null;

  let resetForm = () => {
    setAmount("");
    setNote("");
    setSelected("Select Category");
    setTransactionType("Transaction Type");
  };

  let addTransaction = (e) => {
    e.preventDefault();
    let data = {
      amount: parsedAmount,
      category: selected,
      note,
      transactionType,
      userId: user.uid,
    };

    if (isEdit) {
      updateDocument("Transaction", tid, data);
    } else {
      addCollection("Transaction", data);
    }

    onClose();
  };

  return (
    // Background overlay with low opacity
    <div className="fixed inset-0 z-50    flex items-end sm:items-center justify-center">
      {/* Modal Card */}
      <div className="bg-white w-full sm:w-96  rounded-t-2xl sm:rounded-2xl p-6 shadow-lg">
        <button onClick={onClose} className="ml-auto block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-lg font-semibold mb-4 text-center">
          {isEdit ? "Edit" : "Add"} Transaction
        </h2>

        <form className="flex flex-col gap-3" onSubmit={addTransaction}>
          <input
            type="number"
            placeholder="Amount"
            className="border p-2 rounded"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            onKeyDown={(e) => {
              if (["e", "E", "+", "-", "."].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
          <div className="relative w-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(!isOpen);
              }}
              className="border p-2 w-full rounded text-left"
            >
              {selected}
            </button>
            {isOpen && (
              <ul className="absolute mt-1 max-h-40 overflow-y-auto border bg-white w-full rounded shadow z-10">
                {categories.map((cat, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setSelected(cat.name);
                      setTransactionType(cat.type);
                      setIsOpen(false);
                    }}
                    className="p-2 hover:bg-teal-100 cursor-pointer"
                  >
                    {cat.name}
                  </li>
                ))}
                <li className="p-2 text-teal-600 hover:underline cursor-pointer">
                  + Add Category
                </li>
              </ul>
            )}
          </div>
          <input
            type="text"
            placeholder="Note"
            className="border p-2 rounded"
            onChange={(e) => setNote(e.target.value)}
            value={note}
          />

          <button
            className="border p-2 w-full rounded text-left"
            onClick={(e) => e.preventDefault()}
          >
            {transactionType}
          </button>
          <button
            type="submit"
            className="bg-teal-500 text-white py-2 rounded mt-2"
          >
            Save
          </button>
        </form>

        <button
          onClick={resetForm}
          className="mt-4 text-sm text-gray-500 text-center w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
