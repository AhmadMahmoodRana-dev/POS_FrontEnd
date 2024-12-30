import { Context } from "@/context/Context";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

const Overview = () => {
  const { OverViewTable, onMobile} = useContext(Context);

  return (
    <div
      className={`flex flex-col gap-4 ${onMobile ? "px-4" : "px-1"} py-4 mt-3`}
    >
      {onMobile && (
        <h1 className="text-[#637381] text-[.8rem] font-semibold tracking-wide ml-2">
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
              className={`flex-wrap  list-none ${
                isActive
                  ? "text-[#00a76f] text-[16px]  bg-[#00a76f19] hover:bg-[#00a76f3b]"
                  : "text-[#637381] text-[15px] hover:bg-[#919eab14]"
              } py-2  rounded-md items-center tracking-wide gap-3 ${
                onMobile
                  ? "flex justify-start px-4"
                  : "flex flex-col justify-center leading-3"
              }`}
            >
              <item.icon
                className={`${onMobile ? "text-2xl" : "text-xl"} ${
                  isActive ? "text-[#00a76f]" : "text-[#cdd2d6]"
                }`}
              />
              <p
                className={`${
                  onMobile ? "text-md" : "text-[12px]"
                } font-semibold`}
              >
                {item.title}
              </p>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Overview;
