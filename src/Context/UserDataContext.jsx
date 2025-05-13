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

  let balance = income - expenses;

  // Grouping function
  const groupByDate = (transactions) => {
    return transactions.reduce((groups, transaction) => {
      // Ensure date is a string like '2025-05-13'
      const dateStr = transaction.date.toDate
        ? transaction.date.toDate().toISOString().split("T")[0] // Convert Firestore Timestamp to string
        : transaction.date.split("T")[0]; // If already a string with time

      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      groups[dateStr].push(transaction);
      return groups;
    }, {});
  };

  return (
    <UserDataContext.Provider
      value={{ income, expenses, balance, transactions, groupByDate }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContext, UserDataContextProvider };
