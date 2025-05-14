import React from "react";
import Balance from "../components/Balance";
import Income_Expense from "../components/Income_Expense";
import FourButton from "../components/FourButton";
import RecentTransaction from "../components/RecentTransaction";

export default function Home() {
  
  return (
    <>
      <Balance />
      <Income_Expense />
      <FourButton />
      <RecentTransaction />
    </>
  );
}
