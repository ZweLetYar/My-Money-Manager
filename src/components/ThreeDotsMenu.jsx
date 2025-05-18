import { useState, useRef, useEffect } from "react";
import threeDots from "../assets/three-dots-svgrepo-com.svg";
import useFireStore from "../hooks/useFireStore";
import AddTransactionModal from "./AddTransactionModal";

export default function ThreeDotsMenu({ tid, tamount, tcat, tnote, ttype }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const { deleteDocument } = useFireStore();

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
          <div className="absolute top-0 right-6 mt-2      ">
            <div className="px-10  flex text-sm flex-col text-center items-center bg-teal-500 border rounded-lg shadow-lg">
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
