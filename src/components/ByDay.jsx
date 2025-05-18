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
  Legend,
} from "recharts";

export default function ByDate() {
  const { transactions } = useContext(UserDataContext);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  let [state, setState] = useState("Both");

  const data = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    const dayMap = {};

    transactions.forEach((t) => {
      const dateObj = t.date.toDate ? t.date.toDate() : new Date(t.date);
      const monthStr = dateObj.toISOString().slice(0, 7);
      if (monthStr !== selectedMonth) return;

      const dayStr = dateObj.toISOString().slice(0, 10);
      if (!dayMap[dayStr]) {
        dayMap[dayStr] = { date: dayStr, income: 0, expenses: 0 };
      }

      if (t.transactionType === "Income") {
        dayMap[dayStr].income += t.amount;
      } else if (t.transactionType === "Expenses") {
        dayMap[dayStr].expenses += t.amount;
      }
    });

    return Object.values(dayMap).sort((a, b) => a.date.localeCompare(b.date));
  }, [transactions, selectedMonth]);

  return (
    <div className="flex flex-col items-center text-sm">
      <input
        type="month"
        onChange={(e) => setSelectedMonth(e.target.value)}
        value={selectedMonth}
        className="w-[90%] mb-4"
      />

      {data.length > 0 ? (
        <div className="w-full flex flex-col h-[450px] bg-white rounded-2xl p-4 shadow text-xs">
          <h2 className="text-base font-semibold mb-2">
            {state == "Both"
              ? "Income vs Expenses"
              : state == "Income"
              ? "Income"
              : "Expenses"}{" "}
            by Date
          </h2>
          <div className="text-teal-600 ml-auto">
            <span
              className="cursor-pointer"
              onClick={() => {
                setState("Income");
              }}
            >
              Income/
            </span>
            <span
              className="cursor-pointer"
              onClick={() => {
                setState("Expenses");
              }}
            >
              Expenses/
            </span>
            <span
              className="cursor-pointer"
              onClick={() => {
                setState("Both");
              }}
            >
              Both
            </span>
          </div>

          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={data} margin={{ top: 20, right: 30, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis
                tickFormatter={(value) => `${value.toLocaleString()} MMK`}
                width={80}
              />
              <Tooltip
                formatter={(value, name) => [
                  `${value.toLocaleString()} MMK`,
                  name === "income" ? "Income" : "Expenses",
                ]}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Legend />
              {(state == "Both" || state == "Income") && (
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#14b8a6"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />
              )}
              {(state == "Both" || state == "Expenses") && (
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#f87171"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>

          <h2 className="text-md font-semibold text-center ">
            {new Date(`${selectedMonth}-01`).toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20">
          No transaction data for this month
        </div>
      )}
    </div>
  );
}
