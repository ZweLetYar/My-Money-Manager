// import { createContext, useContext, useEffect, useState } from "react";
// import { AuthContext } from "./AuthContext";
// import useFireStore from "../hooks/useFireStore";

// const UserDataContext = createContext();

// const UserDataContextProvider = ({ children }) => {
//   const { user } = useContext(AuthContext);
//   const {
//     data: transactions = [],
//     loading,
//     error,
//   } = useFireStore("Transaction", user ? ["userId", "==", user.uid] : null);

//   const [income, setIncome] = useState(0);
//   const [expenses, setExpenses] = useState(0);

//   useEffect(() => {
//     if (!transactions || transactions.length === 0) {
//       setIncome(0);
//       setExpenses(0);
//       return;
//     }

//     let totalIncome = 0;
//     let totalExpenses = 0;

//     transactions.forEach((t) => {
//       if (t.transactionType === "Income") {
//         totalIncome += t.amount;
//       } else {
//         totalExpenses += t.amount;
//       }
//     });

//     setIncome(totalIncome);
//     setExpenses(totalExpenses);
//   }, [transactions]);

//   const balance = income - expenses;

//   return (
//     <UserDataContext.Provider
//       value={{ income, expenses, balance, loading, error }}
//     >
//       {children}
//     </UserDataContext.Provider>
//   );
// };

// export { UserDataContext, UserDataContextProvider };

import {
  children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";
import useFireStore from "../hooks/useFireStore";

const UserDataContext = createContext();

//UserDataContext provider Component

const UserDataContextProvider = ({ children }) => {
  let { user } = useContext(AuthContext);
  let { getCollection } = useFireStore();

  let [income, setIncome] = useState(0);
  let [expenses, setExpenses] = useState(0);

  let [monthlyIncome, setMonthlyIncome] = useState(0);
  let [monthlyExpenses, setMonthlyExpenses] = useState(0);

  let [currentMonth, setCurrentMonth] = useState("");

  const {
    error,
    loading,
    data: transactions,
  } = getCollection("Transaction", user ? ["userId", "==", user.uid] : null, [
    "date",
    "desc",
  ]);

  useEffect(() => {
    let totalIncome = 0;
    let totalExpenses = 0;
    transactions &&
      transactions.map((t) => {
        if (t.transactionType == "Income") {
          totalIncome += t.amount;
        } else {
          totalExpenses += t.amount;
        }
      });

    setIncome(totalIncome);
    setExpenses(totalExpenses);
  }, [transactions, user]);

  //Group by Month
  const groupByMonth = (transactions) => {
    return transactions.reduce((groups, transaction) => {
      const dateObj = transaction?.date?.toDate
        ? transaction?.date?.toDate()
        : new Date(transaction?.date);
      const monthStr = dateObj.toISOString().slice(0, 7); // e.g., "2025-05"

      if (!groups[monthStr]) {
        groups[monthStr] = [];
      }
      groups[monthStr].push(transaction);
      return groups;
    }, {});
  };

  const monthlyTransactions = groupByMonth(transactions);

  useEffect(() => {
    if (!transactions || transactions.length === 0) {
      setMonthlyIncome(0);
      setMonthlyExpenses(0);
      return;
    }

    const month = new Date().toISOString().slice(0, 7); // "YYYY-MM"
    const currentMonthTransactions = monthlyTransactions[month] || [];
    setCurrentMonth(month);

    let totalMonthlyIncome = 0;
    let totalMonthlyExpenses = 0;

    currentMonthTransactions.forEach((t) => {
      if (t.transactionType === "Income") {
        totalMonthlyIncome += t.amount;
      } else {
        totalMonthlyExpenses += t.amount;
      }
    });

    setMonthlyIncome(totalMonthlyIncome);
    setMonthlyExpenses(totalMonthlyExpenses);
  }, [transactions, monthlyTransactions]);

  let balance = income - expenses;
  let monthlyBalance = monthlyIncome - monthlyExpenses;

  // Grouping function
  const groupByDate = (transactions) => {
    return transactions.reduce((groups, transaction) => {
      // Ensure date is a string like '2025-05-13'
      const dateStr = transaction?.date?.toDate
        ? transaction?.date?.toDate().toISOString().split("T")[0] // Convert Firestore Timestamp to string
        : transaction?.date?.split("T")[0]; // If already a string with time

      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      groups[dateStr].push(transaction);
      return groups;
    }, {});
  };

  const dailyTransactions = groupByDate(transactions);

  return (
    <UserDataContext.Provider
      value={{
        income,
        expenses,
        balance,
        transactions,
        groupByDate,
        dailyTransactions,
        groupByMonth,
        monthlyIncome,
        monthlyExpenses,
        monthlyBalance,
        currentMonth,
        monthlyTransactions,
        loading,
        error,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContext, UserDataContextProvider };
