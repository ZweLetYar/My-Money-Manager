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
        Log Out
      </button>
    </div>
  );
}
