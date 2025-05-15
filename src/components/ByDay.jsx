import React, { useContext, useMemo, useState } from "react";
import { UserDataContext } from "../Context/UserDataContext";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ByDate() {
  const { transactions } = useContext(UserDataContext);
  const currentMonth = new Date().toISOString().slice(0, 7); // "2025-05"
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [tType, setTType] = useState("Expenses");

  const data = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    // Filter by type and month
    const filtered = transactions.filter((t) => {
      if (t.transactionType !== tType) return false;
      const dateObj = t.date.toDate ? t.date.toDate() : new Date(t.date);
      const monthStr = dateObj.toISOString().slice(0, 7);
      return monthStr === selectedMonth;
    });

    // Group by day
    const dayTotals = {};
    filtered.forEach((t) => {
      const dateObj = t.date.toDate ? t.date.toDate() : new Date(t.date);
      const dayStr = dateObj.toISOString().slice(0, 10); // "YYYY-MM-DD"
      dayTotals[dayStr] = (dayTotals[dayStr] || 0) + t.amount;
    });

    const sortedDates = Object.keys(dayTotals).sort();

    return sortedDates.map((date) => ({
      date,
      amount: dayTotals[date],
    }));
  }, [transactions, selectedMonth, tType]);

  return (
    <div className="flex flex-col items-center text-sm">
      <input
        type="month"
        onChange={(e) => setSelectedMonth(e.target.value)}
        value={selectedMonth}
        className="w-[90%] mb-4"
      />

      {data.length > 0 ? (
        <div className="w-full h-[450px] bg-white rounded-2xl p-4 shadow text-xs">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-base font-semibold">
              {tType === "Expenses" ? "Expenses" : "Income"} by Date
            </h2>
            <button
              className="text-teal-600 cursor-pointer"
              onClick={() =>
                setTType((prev) =>
                  prev === "Expenses" ? "Income" : "Expenses"
                )
              }
            >
              /{tType === "Expenses" ? "view Income" : "view Expenses"}
            </button>
          </div>

          <ResponsiveContainer width="100%" height="90%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis
                tickFormatter={(value) => `${value.toLocaleString()} MMK`}
                width={80}
              />
              <Tooltip
                formatter={(value) => `${value.toLocaleString()} MMK`}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#14b8a6"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <h2 className="text-md font-semibold text-center ">
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
