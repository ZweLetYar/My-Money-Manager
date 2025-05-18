import React, { useContext, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { UserDataContext } from "../Context/UserDataContext";

// Helper to convert "2025-05" to "May"
const getMonthLabel = (monthStr) => {
  const [year, month] = monthStr.split("-");
  const date = new Date(year, month - 1);
  return date.toLocaleString("en-US", { month: "short" }); // "May"
};

export default function MonthlyLineChart() {
  const { monthlyTransactions } = useContext(UserDataContext);
  let [state, setState] = useState("Both");

  const chartData = useMemo(() => {
    if (!monthlyTransactions) return [];

    return Object.entries(monthlyTransactions)
      .map(([monthKey, txns]) => {
        let Income = 0;
        let Expenses = 0;

        txns.forEach((t) => {
          if (t.transactionType === "Income") {
            Income += t.amount;
          } else if (t.transactionType === "Expenses") {
            Expenses += t.amount;
          }
        });

        return {
          month: getMonthLabel(monthKey),
          Income,
          Expenses,
        };
      })
      .sort((a, b) => {
        // Sort by month (Jan, Feb, ...)
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return months.indexOf(a.month) - months.indexOf(b.month);
      });
  }, [monthlyTransactions]);

  return (
    <div className="flex flex-col w-full h-[490px] bg-white rounded-xl  text-xs p-4 shadow">
      <h2 className="text-base font-semibold mb-2">
        {state == "Both"
          ? "Income vs Expenses"
          : state == "Income"
          ? "Income"
          : "Expenses"}{" "}
        by Month
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
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(v) => `${v.toLocaleString()} MMK`} />
          <Tooltip formatter={(value) => `${value.toLocaleString()} MMK`} />
          <Legend />
          {(state == "Both" || state == "Income") && (
            <Line
              type="monotone"
              dataKey="Income"
              stroke="#14b8a6"
              strokeWidth={3}
              dot={{ r: 3 }}
            />
          )}
          {(state == "Both" || state == "Expenses") && (
            <Line
              type="monotone"
              dataKey="Expenses"
              stroke="#f87171"
              strokeWidth={3}
              dot={{ r: 3 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
