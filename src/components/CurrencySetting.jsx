import React, { useState } from "react";
import US from "../assets/4x3/us.svg";
import EU from "../assets/4x3/eu.svg";
import MM from "../assets/4x3/mm.svg";
import JP from "../assets/4x3/jp.svg";
import SG from "../assets/4x3/sg.svg";

export default function CurrencySelectWithFlags() {
  const currencies = [
    { code: "USD", name: "US Dollar", flag: US },
    { code: "EUR", name: "Euro", flag: EU },
    { code: "MMK", name: "Kyat", flag: MM },
    { code: "JPY", name: "Yen", flag: JP },
    { code: "SGD", name: "Singapore Dollar", flag: SG },
  ];

  const [selected, setSelected] = useState(currencies[0]);
  const [open, setOpen] = useState(false);

  const handleSelect = (currency) => {
    setSelected(currency);
    setOpen(false);
  };

  return (
    <div className="relative w-full max-w-sm">
      <h3 className="font-medium text-white text-center mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="yellow"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 inline text-yellow-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        Currency
      </h3>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Select Currency
      </label>

      <button
        type="button"
        className="w-full border border-teal-300 rounded-md px-3 py-2 flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2 text-white">
          <img src={selected.flag} alt={selected.code} className="w-5 h-4" />
          <span>
            {selected.code} - {selected.name}
          </span>
        </div>
        <span className="text-white">&#9662;</span> {/* Down arrow */}
      </button>

      {open && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-md max-h-60 overflow-auto">
          {currencies.map((currency) => (
            <div
              key={currency.code}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(currency)}
            >
              <img
                src={currency.flag}
                alt={currency.code}
                className="w-5 h-4"
              />
              <span>
                {currency.code} - {currency.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
