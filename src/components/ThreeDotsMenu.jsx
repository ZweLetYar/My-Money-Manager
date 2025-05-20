import { useState, useRef, useEffect, useContext } from "react";
import threeDots from "../assets/three-dots-svgrepo-com.svg";
import useFireStore from "../hooks/useFireStore";
import AddTransactionModal from "./AddTransactionModal";
import { ThemeContext } from "../Context/ThemeContext";

export default function ThreeDotsMenu({ tid, tamount, tcat, tnote, ttype }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const { deleteDocument } = useFireStore();
  const { isPink, isOrange, isSkyblue, isIndigo } = useContext(ThemeContext);

  //delete transaction
  let deleteTransaction = async (id) => {
    await deleteDocument("Transaction", id);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative inline-block text-left" ref={menuRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <img
            src={threeDots}
            alt="threedots"
            className="w-5 h-4 cursor-pointer"
          />
        </button>

        {open && (
          <div className="absolute top-0 right-6 mt-2  z-30    ">
            <div
              className={`px-10  flex text-sm flex-col text-center items-center   rounded-lg shadow-lg ${
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
              <p
                className="text-white cursor-pointer py-1 border-b w-full"
                onClick={() => setShowModal(true)}
              >
                Edit
              </p>
              <p
                className="text-red-600 font-medium cursor-pointer py-1"
                onClick={() => deleteTransaction(tid)}
              >
                Delete
              </p>
            </div>
          </div>
        )}
      </div>
      <AddTransactionModal
        tid={tid}
        tamount={tamount}
        tcat={tcat}
        tnote={tnote}
        ttype={ttype}
        isEdit={true}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
