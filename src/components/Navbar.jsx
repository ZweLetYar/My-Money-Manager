import React, { useContext } from "react";
import Men from "../assets/avatar-man-profile-user-8-svgrepo-com.svg";
import useGoogleAuth from "../hooks/useGoogleAuth";
import { AuthContext } from "../Context/AuthContext";

export default function Navbar() {
  const welcomeText = "Welcome From MMM";
  const { displayName, logout } = useGoogleAuth();
  let { user } = useContext(AuthContext);
  return (
    <div className="flex items-center justify-between my-5 border-b border-teal-600 pb-5">
      <div>
        <h1 className="font-semibold text-lg">My Money Manager (MMM)</h1>
        <div className="text-sm flex gap-3">
          <img src={Men} alt="men svg" className="w-5 h-auto" />
          <h3> {displayName || (!user ? welcomeText : user.email)}</h3>
        </div>
      </div>
      <button className="bg-teal-600 rounded-full text-white" onClick={logout}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </button>
    </div>
  );
}
