import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

export default function LoadingSpinner() {
  const { isPink, isOrange, isSkyblue, isIndigo } = useContext(ThemeContext);
  return (
    <div className="flex items-center justify-center h-100">
      <div className="flex space-x-2">
        <span
          className={`w-3 h-3 rounded-full  animate-bounce [animation-delay:-0.3s] ${
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
        ></span>
        <span
          className={`w-3 h-3 rounded-full  animate-bounce [animation-delay:-0.15s] ${
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
        ></span>
        <span
          className={`w-3 h-3 rounded-full  animate-bounce  ${
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
        ></span>
      </div>
    </div>
  );
}
