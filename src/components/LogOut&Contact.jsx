import React from "react";
import useGoogleAuth from "../hooks/useGoogleAuth";

export default function LogOut() {
  let { logout } = useGoogleAuth();
  return (
    <div className="flex flex-col gap-3 items-center text-sm text-white">
      <button
        className="bg-blue-600 rounded-full py-2 px-3  w-full cursor-pointer"
        onClick={() => {
          window.location.href =
            "mailto:letyarzwe@gmail.com?subject=Feedback&body=Hi there,";
        }}
      >
        Contact to developer
      </button>
      <button
        className=" bg-blue-600 rounded-full  py-2 px-3  w-full cursor-pointer"
        onClick={logout}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 inline"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
          />
        </svg>
        Log Out
      </button>
    </div>
  );
}
