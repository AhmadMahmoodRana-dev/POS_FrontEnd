import { useContext, useState } from "react";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { Context } from "@/context/Context";
import MobileSidebar from "@/components/MobileSidebar.jsx/MobileSidebar";
import Overview from "@/components/Sidebar/Overview";
import Navbar from "@/components/Navbar/Navbar";

export default function Layout({ children }) {
  const {
    onMobile,
    setOnMobile,
    // location,
    menuItems,
    isOpen,
    setIsOpen,
    isOpen1,
    setIsOpen1,
    isOpen2,
    setIsOpen2,
    isOpen3,
    setIsOpen3,
  } = useContext(Context);
  const [menuState, setMenuState] = useState({});
  const toggleMenuState = (path) => {
    setMenuState((prev) => ({
      ...prev,
      [path]: !prev[path], // Toggle the state for the specific path
    }));
  };
  // USESTATE

  return (
    <main className="flex w-full">
      <MobileSidebar />
      <nav
        className={` ${
          onMobile ? "w-[340px]" : "w-[80px]"
        } min-h-screen  bg-white border-r md:block hidden`}
      >
        {/* Sidebar Header */}
        <div className="main-image-icon-container flex pl-5 pt-6 relative">
          <img src="https://minimals.cc/" alt="Logo" />
          <div
            className={`icon bg-white w-[22px] absolute ${
              onMobile ? "left-[96%]" : "left-[90%]"
            } h-[22px] rounded-full flex justify-center items-center border`}
          >
            <button onClick={() => setOnMobile(!onMobile)}>
              {onMobile ? <IoIosArrowBack /> : <IoIosArrowForward />}
            </button>
          </div>
        </div>
        <div
          className={`scrollable ${
            onMobile ? "overflow-y-auto" : null
          }  relative h-[90vh]`}
        >
          {/* Overview Section */}
          <Overview />

          {/* Management */}

          {onMobile && (
            <h1 className="text-gray-500 text-[.8rem] font-semibold tracking-wide ml-2 px-4">
              MANAGEMENT
            </h1>
          )}

          {/* FIRST DROPDOWN */}
          <div
            className="px-4 relative"
            onClick={() => {
              if (onMobile) {
                setIsOpen1(!isOpen1);
              } else {
                setIsOpen1(!isOpen1);
              }
            }}
          >
            {/* DROPDOWN HEADER */}
            <div
              className={`flex mt-2 gap-11 items-center justify-between ${
                onMobile ? "px-4" : "px-2"
              } py-2 rounded-md cursor-pointer`}
            >
              <div className="flex items-center justify-center flex-wrap gap-3">
                <FaUser
                  className={`text-gray-500 ${
                    onMobile ? "text-xl" : "text-lg"
                  }`}
                />
                <span
                  className={`text-gray-500 font-medium ${
                    onMobile ? "text-md" : "text-[12px]"
                  }`}
                >
                  User
                </span>
              </div>
              {isOpen1 ? (
                <IoIosArrowDown className="ml-2 text-gray-500" />
              ) : (
                <IoIosArrowUp className="ml-2 text-gray-500" />
              )}
            </div>

            {/* DROPDOWN MENU */}
            {isOpen1 && (
              <div
                className={`top-full ${
                  onMobile
                    ? "left-10"
                    : "absolute left-[calc(100%+1px)] mt-[-150px]"
                } mt-2 w-40 rounded-md z-10`}
              >
                <ul
                  className={`${
                    onMobile
                      ? "border-l-2 ml-6 "
                      : "dropdown w-[200px] py-3 px-2  rounded-md"
                  } `}
                >
                  {menuItems.map((item, index) => (
                    <div className="flex items-center w-full">
                      <hr className="w-[10px]" />
                      <li key={index} className="w-full">
                        <Link
                          to={item.url}
                          className="block  py-2 text-sm text-gray-600 hover:bg-[#919eab14] rounded-md hover:text-gray-900 ml-2"
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

          {/* LEVEL DROPDOWN */}

          <div className="px-4 relative">
            {/* DROPDOWN HEADER */}
            <div
              className={`flex mt-2 gap-11 items-center justify-between ${
                menuState["root"] ? "bg-[#919eab14]" : ""
              } ${onMobile ? "px-4" : "px-2"} py-2 rounded-md cursor-pointer`}
              onClick={() => toggleMenuState("root")}
            >
              <div className="flex items-center justify-center flex-wrap gap-3">
                <FaUser
                  className={`text-gray-500 ${
                    onMobile ? "text-xl" : "text-lg"
                  }`}
                />
                <span
                  className={`text-gray-500 font-medium ${
                    onMobile ? "text-md" : "text-[12px]"
                  }`}
                >
                  User
                </span>
              </div>
              {menuState["root"] ? (
                <IoIosArrowDown className="ml-2 text-gray-500" />
              ) : (
                <IoIosArrowUp className="ml-2 text-gray-500" />
              )}
            </div>

            {/* DROPDOWN MENU */}
            {menuState["root"] && (
              <div
                className={`absolute  left-0 mt-2  ${
                  onMobile
                    ? "w-56"
                    : "  left-[48px] top-[-60%] w-[10rem] bg-[#919eab14]"
                }  rounded-md ml-8  z-10`}
              >
                <ul
                  className={`ml-2 rounded-md ${
                    onMobile ? " border-l-2 border-gray-300" : null
                  }`}
                >
                  {menuItems.map((item, index) => {
                    const path = `root-${index}`; // Unique path for each menu item

                    return (
                      <li key={index} className="relative">
                        <div
                          className="flex items-center cursor-pointer py-2"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent closing the parent dropdown
                            if (item.subItems) toggleMenuState(path);
                          }}
                        >
                          {onMobile ? <hr className="w-[10px]" /> : null}
                          <Link
                            to={item.url}
                            className={`text-sm pl-1 text-gray-600 ${
                              menuState[path] ? "bg-[#919eab14]" : ""
                            } hover:bg-[#919eab14] py-2 hover:text-gray-900 rounded-md ${
                              onMobile ? "w-[85%]" : "w-[95%]"
                            } flex justify-between pr-4 items-center`}
                          >
                            {item.label}
                            {item.subItems && (
                              <span className="ml-3">
                                {menuState[path] ? (
                                  <IoIosArrowUp className="text-gray-500" />
                                ) : (
                                  <IoIosArrowDown className="text-gray-500" />
                                )}
                              </span>
                            )}
                          </Link>
                        </div>
                        {/* Render Subitems */}
                        {menuState[path] && item.subItems && (
                          <ul
                            className={`${
                              onMobile
                                ? "ml-4 border-l-2 border-gray-300"
                                : "absolute left-[105%] top-[-60%] w-[10rem] bg-[#919eab14] rounded-xl"
                            }`}
                          >
                            {item.subItems.map((subItem, subIndex) => {
                              const subPath = `${path}-${subIndex}`; // Unique path for each submenu item

                              return (
                                <li key={subIndex} className="relative">
                                  <div
                                    className="flex items-center cursor-pointer py-2 w-full"
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent closing parent dropdown
                                      if (subItem.subItems)
                                        toggleMenuState(subPath);
                                    }}
                                  >
                                    <hr className="w-[10px]" />
                                    <Link
                                      to={subItem.url}
                                      className={`text-sm  flex justify-between items-center pr-4 ${
                                        menuState[subPath]
                                          ? "bg-[#919eab14] px-2 py-2"
                                          : "py-2 pl-2"
                                      } text-gray-600 ${
                                        onMobile ? "w-full" : "w-[90%]"
                                      } hover:bg-[#919eab14] hover:text-gray-900 rounded-md`}
                                    >
                                      {subItem.label}
                                      {subItem.subItems && (
                                        <span className="ml-2 ">
                                          {menuState[subPath] ? (
                                            <IoIosArrowUp className="text-gray-500" />
                                          ) : (
                                            <IoIosArrowDown className="text-gray-500" />
                                          )}
                                        </span>
                                      )}
                                    </Link>
                                  </div>
                                  {/* Render Nested Subitems */}
                                  <div
                                    className={`bg-[#919eab14] ${
                                      onMobile ? null : "absolute left-[100%] ml-4 top-[-50%] w-full rounded-md "
                                    }`}
                                  >
                                    {menuState[subPath] &&
                                      subItem.subItems &&
                                      subItem.subItems.map(
                                        (nestedItem, nestedIndex) => (
                                          <ul
                                            key={nestedIndex}
                                            className={`ml-4 flex items-center ${
                                              onMobile
                                                ? "border-l-2 w-full"
                                                : null
                                            }  border-gray-300 w-full `}
                                          >
                                            {onMobile ? (
                                              <hr className="w-[10px]" />
                                            ) : null}
                                            <li className="w-[80%]">
                                              <Link
                                                to={nestedItem.url}
                                                className="block pl-2 w-full text-sm text-gray-600 hover:bg-[#919eab14] hover:text-gray-900 rounded-md py-2"
                                              >
                                                {nestedItem.label}
                                              </Link>
                                            </li>
                                          </ul>
                                        )
                                      )}
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="outlets w-[100%] min-h-screen h-auto bg-red-500">
        {" "}
        {/* OTHER PAGES */}
        <Navbar />
        <div className="w-[100%] bg-black min-h-[84.5vh] h-auto ">{children}</div>
      </div>
    </main>
  );
}
