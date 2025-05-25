import React, { useContext } from "react";
import Men from "../assets/avatar-man-profile-user-8-svgrepo-com.svg";
import useGoogleAuth from "../hooks/useGoogleAuth";
import { AuthContext } from "../Context/AuthContext";
import { ThemeContext } from "../Context/ThemeContext";
import logo from "../assets/logo.png";

export default function Navbar() {
  const welcomeText = "Welcome From MMM";
  const { displayName } = useGoogleAuth();
  let { user } = useContext(AuthContext);
  let { isPink, isOrange, isSkyblue, isIndigo } = useContext(ThemeContext);
  return (
    <div
      className={`flex items-center  w-[85%] md:w-[320px] justify-between rounded-sm mb-5 mt-3  text-white p-3 ${
        isPink
          ? "bg-pink-400"
          : isOrange
          ? "bg-orange-400"
          : isSkyblue
          ? "bg-sky-400"
          : isIndigo
          ? "bg-indigo-400"
          : "bg-teal-600"
      }
            } `}
    >
      <div>
        <h1 className="font-semibold text-lg">My Money Manager</h1>
        <div className="text-sm flex gap-3">
          <img src={Men} alt="men svg" className="w-5 h-auto" />
          <h3> {displayName || (!user ? welcomeText : user.email)}</h3>
        </div>
      </div>

      <img
        src={logo}
        alt="logo"
        className={`w-8 rounded-md border border-3 ${
          isPink
            ? "border-pink-800"
            : isOrange
            ? "border-orange-800"
            : isSkyblue
            ? "border-sky-800"
            : isIndigo
            ? "border-indigo-800"
            : "border-teal-800"
        }`}
      />
    </div>
  );
}
