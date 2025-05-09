import React, { useState } from "react";

export default function AddTransactionModal({ show, onClose }) {
  const categories = [
    "Food & Drink",
    "Shopping",
    "Health",
    "Housing",
    "Transportation",
    "Education",
    "Entertainment",
    "Personal",
    "Others",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select Category");
  if (!show) return null;

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
          Add Transaction
        </h2>

        <form className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="Amount"
            className="border p-2 rounded"
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
                      setSelected(cat);
                      setIsOpen(false);
                    }}
                    className="p-2 hover:bg-teal-100 cursor-pointer"
                  >
                    {cat}
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
          />
          <select className="border p-2 rounded">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <button
            type="submit"
            className="bg-teal-500 text-white py-2 rounded mt-2"
          >
            Save
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 text-center w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
