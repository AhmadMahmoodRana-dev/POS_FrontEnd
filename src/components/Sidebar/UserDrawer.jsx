import { useContext, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Context } from "@/context/Context";
import { Avatar1 } from "./Avatar";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function UserDrawer() {
  const { openAvatar, setOpenAvatar,setUser } = useContext(Context);
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const handleLogout = () => {
    setOpenAvatar(false)
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };
  return (
    <Dialog open={openAvatar} onClose={() => {}} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0  transition-opacity duration-500 ease-in-out"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-[330px] max-w-md transform transition duration-500 ease-in-out"
            >
              <div className="flex min-h-screen max-h-screen flex-col overflow-y-scroll  bg-white py-6 shadow-xl ">
                <div className="px-4 sm:px-2 flex">
                  <button type="button" onClick={() => setOpenAvatar(false)}>
                    <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                  </button>
                  <DialogTitle className="text-base font-semibold text-gray-900">
                    {/* Panel title */}
                  </DialogTitle>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6 ">
                  <div className="flex flex-col gap-1 text-sm text-center items-center">
                  <Avatar1 />
                    <h1 className="text-lg font-bold mt-4 tracking-wider">{user?.username}</h1>
                    <p className="text-gray-400 text-sm">{user?.email}</p>
                  </div>
                  {/* Panel content */}
                  <ul className="flex flex-col gap-2 mt-10 text-sm border-t pt-4">
                    <div className="flex items-center px-1 gap-3 py-2 rounded-md hover:bg-slate-200 text-gray-500"><FaUser/><li className="text-gray-600 text-[16px]">Home</li></div>
                    <div className="flex items-center px-1 gap-3 py-2 rounded-md hover:bg-slate-200 text-gray-500"><FaUser/><li className="text-gray-600 text-[16px]">Home</li></div>
                    <div className="flex items-center px-1 gap-3 py-2 rounded-md hover:bg-slate-200 text-gray-500"><FaUser/><li className="text-gray-600 text-[16px]">Home</li></div>
                    <div className="flex items-center px-1 gap-3 py-2 rounded-md hover:bg-slate-200 text-gray-500"><FaUser/><li className="text-gray-600 text-[16px]">Home</li></div>
                    <div className="flex items-center px-1 gap-3 py-2 rounded-md hover:bg-slate-200 text-gray-500"><FaUser/><li className="text-gray-600 text-[16px]">Home</li></div>
                  </ul>
                </div>
                <div className="flex items-center mx-4 gap-3 rounded-md hover:bg-slate-200 text-gray-500">
                  <button className="w-full bg-[#ffc2b4] py-3 rounded-md text-[#b71618] font-semibold" onClick={() => handleLogout()}>Logout</button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
