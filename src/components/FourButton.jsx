import React, { useContext, useEffect, useRef, useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
import { useNavigate } from "react-router-dom";
import ThemeSetting from "./ThemeSetting";
import CurrencySetting from "./CurrencySetting";
import { ThemeContext } from "../Context/ThemeContext";
import LogOut from "./LogOut&Contact";

export default function FourButton() {
  const [showModal, setShowModal] = useState(false);
  let navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  let { isPink, isOrange, isSkyblue, isIndigo } = useContext(ThemeContext);

  return (
    <>
      <div className="flex mt-7">
        <div className="text-center w-1/4 flex flex-col items-center">
          <button
            className={`w-15 h-15  rounded-xl bg-gray-100 flex items-center justify-center ${
              isPink
                ? "bg-pink-400"
                : isOrange
                ? "bg-orange-400"
                : isSkyblue
                ? "bg-sky-400"
                : isIndigo
                ? "bg-indigo-400"
                : "bg-teal-500"
            } `}
            onClick={() => setShowModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 text-white "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
          <h3 className="text-xs  mt-2">Add Transaction</h3>
        </div>

        <div
          className="text-center w-1/4 flex flex-col items-center cursor-pointer"
          onClick={() => navigate("/dailydetails")}
        >
          <button
            className={`w-15 h-15 rounded-xl bg-gray-100 flex items-center justify-center ${
              isPink
                ? "bg-pink-400"
                : isOrange
                ? "bg-orange-400"
                : isSkyblue
                ? "bg-sky-400"
                : isIndigo
                ? "bg-indigo-400"
                : "bg-teal-500"
            } `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
          </button>
          <h3 className="text-xs  mt-2">Daily Details</h3>
        </div>
        <div
          className="text-center w-1/4 flex flex-col items-center"
          onClick={() => navigate("/statistics")}
        >
          <button
            className={`w-15 h-15 rounded-xl bg-gray-100 flex items-center justify-center ${
              isPink
                ? "bg-pink-400"
                : isOrange
                ? "bg-orange-400"
                : isSkyblue
                ? "bg-sky-400"
                : isIndigo
                ? "bg-indigo-400"
                : "bg-teal-500"
            } `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
              />
            </svg>
          </button>
          <h3 className="text-xs  mt-2">Statistics</h3>
        </div>
        <div
          className=" text-center w-1/4 flex flex-col items-center"
          onClick={() => setShowSettings(true)}
        >
          <button
            className={`w-15 h-15 rounded-xl bg-gray-100 flex items-center justify-center ${
              isPink
                ? "bg-pink-400"
                : isOrange
                ? "bg-orange-400"
                : isSkyblue
                ? "bg-sky-400"
                : isIndigo
                ? "bg-indigo-400"
                : "bg-teal-500"
            } `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
          <h3 className="text-xs mt-2">Setting</h3>
        </div>
      </div>

      {/* Background overlay */}
      {showSettings && (
        <div
          className="fixed inset-0  bg-opacity-40 backdrop-blur-xs z-40"
          onClick={() => setShowSettings(false)}
        />
      )}

      {/* Side panel */}
      <div
        className={`fixed top-0 right-0 h-full w-60  shadow-lg z-50 transform transition-transform duration-300 ${
          showSettings ? "translate-x-0" : "translate-x-full"
        } ${
          isPink
            ? "bg-pink-400"
            : isOrange
            ? "bg-orange-400"
            : isSkyblue
            ? "bg-sky-400"
            : isIndigo
            ? "bg-indigo-400"
            : "bg-teal-600"
        }`}
      >
        <button
          onClick={() => setShowSettings(false)}
          className="ml-auto mt-4 me-4 block cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="px-6">
          <h2 className="text-xl  font-bold text-white mb-4">Settings</h2>
          <ThemeSetting />
          <hr className="my-5 h-px bg-gradient-to-r from-green-400 via-gray-200 to-blue-400 border-0" />
          <CurrencySetting />
          <hr className="my-5 h-px bg-gradient-to-r from-green-400 via-gray-200 to-blue-400 border-0" />
          <LogOut />
        </div>
      </div>

      <AddTransactionModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
