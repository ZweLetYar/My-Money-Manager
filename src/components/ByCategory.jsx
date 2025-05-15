import React, { useContext, useMemo, useState } from "react";
import { UserDataContext } from "../Context/UserDataContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = [
  "#60a5fa", // blue
  "#f87171", // red
  "#34d399", // green
  "#fbbf24", // yellow
  "#a78bfa", // purple
  "#f472b6", // pink
  "#38bdf8", // sky
  "#fb923c", // orange
];

export default function ByCategory() {
  const { transactions } = useContext(UserDataContext);
  const currentMonth = new Date().toISOString().slice(0, 7); // e.g., "2025-05"
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [tType, setTType] = useState("Expenses");

  const data = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    // const currentMonth = new Date().toISOString().slice(0, 7); // e.g., "2025-05"

    const filtered = transactions.filter((t) => {
      if (t.transactionType !== tType) return false;
      const dateStr = t.date.toDate
        ? t.date.toDate().toISOString().slice(0, 7)
        : new Date(t.date).toISOString().slice(0, 7);
      return dateStr === selectedMonth;
    });

    const totals = {};

    filtered.forEach((t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    });

    return Object.entries(totals).map(([category, amount]) => ({
      category,
      amount,
    }));
  }, [transactions, selectedMonth, tType]);

  return (
    <div className="flex flex-col items-center text-sm">
      <input
        type="month"
        onChange={(e) => {
          setSelectedMonth(e.target.value);
        }}
        value={selectedMonth}
        className="w-[90%]"
      />
      {!(data.length === 0) ? (
        <div className="w-full h-[450px] bg-white rounded-2xl p-4 shadow text-xs mt-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-base font-semibold ">
              {tType === "Expenses" ? "Expenses" : "Income"} by Category{" "}
            </h2>
            <button
              className="text-teal-600 cursor-pointer  "
              onClick={() => {
                setTType((prev) =>
                  prev === "Expenses" ? "Income" : "Expenses"
                );
              }}
            >
              /{tType === "Expenses" ? "view Income" : "view Expenses"}
            </button>
          </div>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, left: 10, bottom: 5 }}
            >
              <XAxis
                type="number"
                tickFormatter={(value) => `${value.toLocaleString()} MMK`}
              />
              <YAxis type="category" dataKey="category" width={100} />
              <Tooltip formatter={(value) => `${value.toLocaleString()} MMK`} />
              <Bar dataKey="amount" radius={[0, 10, 10, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <h2 className="text-md font-semibold  text-center ">
            {selectedMonth.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20">
          No {tType.toLowerCase()} data for this month
        </div>
      )}
    </div>
  );
}
