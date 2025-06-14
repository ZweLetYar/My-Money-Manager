import Balance from "../components/Balance";
import Income_Expense from "../components/Income_Expense";
import FourButton from "../components/FourButton";
import RecentTransaction from "../components/RecentTransaction";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../Context/UserDataContext";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
  let { loading } = useContext(UserDataContext);

  return (
    <div className="md:w-[310px]">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Balance />
          <Income_Expense />
          <FourButton />
          <RecentTransaction />
        </>
      )}
    </div>
  );
}
