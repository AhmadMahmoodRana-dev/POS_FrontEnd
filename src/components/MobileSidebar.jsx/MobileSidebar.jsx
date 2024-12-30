"use client";
import { useContext } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";
import { Context } from "@/context/Context";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function MobileSidebar() {
  const {
    onMobile,
    location,
    OverViewTable,
    menuItems,
    isOpen,
    setIsOpen,
    mobileMenuOpen, setMobileMenuOpen
  } = useContext(Context);

  return (
    <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="relative z-10 md:hidden bg-black">
      {/* Backdrop */}
      <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
            {/* Drawer Panel */}
            <DialogPanel
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:-translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute right-0 top-0 -mr-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-mr-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="sr-only">Close panel</span>
                  </button>
                </div>
              </TransitionChild>

              {/* Sidebar Content */}
              <nav
                className={`${
                  onMobile ? "w-[280px]" : "w-[80px]"
                } min-h-screen bg-white border-r`}
              >
                {/* Sidebar Header */}
                <div className="main-image-icon-container flex pl-5 pt-6 relative">
                  <img src="https://minimals.cc/" alt="Logo" />
                </div>

                <div className={`scrollable ${onMobile ? "overflow-y-auto" : ""} relative h-[90vh]`}>
                  {/* Overview Section */}
                  <div className={`flex flex-col gap-4 ${onMobile ? "px-4" : "px-1"} py-4 mt-3`}>
                    {onMobile && (
                      <h1 className="text-gray-500 text-[.8rem] font-semibold tracking-wide ml-2">
                        OVERVIEW
                      </h1>
                    )}
                    <ul className="flex flex-col gap-1">
                      {OverViewTable.map((item, index) => {
                        const isActive = location.pathname === item.url;
                        return (
                          <Link
                            to={item.url}
                            key={index}
                            className={`flex-wrap list-none ${
                              isActive
                                ? "text-[#00a76f] bg-[#00a76f19] hover:bg-[#00a76f3b]"
                                : "text-gray-500 text-sm hover:bg-slate-100"
                            } py-2 px-2 rounded-md items-center gap-3 ${
                              onMobile
                                ? "flex justify-start"
                                : "flex flex-col justify-center leading-3"
                            }`}
                          >
                            <item.icon
                              className={`${
                                onMobile ? "text-2xl" : "text-xl"
                              } ${isActive ? "text-[#00a76f]" : "text-gray-500"}`}
                            />
                            <p className={`${onMobile ? "text-md" : "text-[12px]"} font-semibold`}>
                              {item.title}
                            </p>
                          </Link>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Management */}
                  {onMobile && (
                    <h1 className="text-gray-500 text-[.8rem] font-semibold tracking-wide ml-2 px-4">
                      Management
                    </h1>
                  )}

                  {/* User Dropdown */}
                  <div
                    className="px-4 relative"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {/* Dropdown Header */}
                    <div
                      className={`flex mt-2 gap-11 items-center justify-between ${
                        onMobile ? "px-4" : "px-2"
                      } py-2 rounded-md cursor-pointer`}
                    >
                      <div className="flex items-center justify-center flex-wrap gap-3">
                        <FaUser className={`text-gray-500 ${onMobile ? "text-xl" : "text-lg"}`} />
                        <span className={`text-gray-500 font-medium ${onMobile ? "text-md" : "text-[12px]"}`}>
                          User
                        </span>
                      </div>
                      {isOpen ? (
                        <IoIosArrowUp className="ml-2 text-gray-500" />
                      ) : (
                        <IoIosArrowDown className="ml-2 text-gray-500" />
                      )}
                    </div>

                    {/* Dropdown Menu */}
                    {isOpen && (
                      <div className={`top-full ${onMobile ? "left-10" : "absolute left-[calc(100%+1px)]"} mt-2 w-40 rounded-md z-10`}>
                        <ul className={`${onMobile ? "border-l-2 ml-6" : "dropdown w-[200px] py-3 px-2 rounded-md"}`}>
                          {menuItems.map((item, index) => (
                            <div className="flex items-center" key={index}>
                              <hr className="w-[10px]" />
                              <li>
                                <Link
                                  to={item.url}
                                  className="block py-2 text-sm text-gray-600 hover:bg-slate-200 rounded-md hover:text-gray-900 ml-2"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            </div>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </nav>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
