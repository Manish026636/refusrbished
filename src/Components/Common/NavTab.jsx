import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavTab = ({routeTab}) => {
  const navigate = useNavigate();
  const handleButtonChange = (val) => {
    navigate(`/dashboard/${val}`);
  };

  return (
    <>
      {/* Buttons */}
      <div className=" flex justify-center items-center  p-6  bg-[#f4f6f9] text-white py-3 uppercase text-xs  rounded-2xl  gap-4">
      <button
          className={`font-bold border border-gray-500 cursor-pointer text-md lg:text-xl py-4 lg:py-4 px-4 lg:px-6 rounded-xl w-40 ${
            routeTab === "roll"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-800"
          }`}
          onClick={() => handleButtonChange("roll")}
        >
          RLCL
        </button>
        <button
          className={`font-bold border border-gray-500 cursor-pointer text-md lg:text-xl py-4 lg:py-4 px-4 lg:px-6 rounded-xl w-40 ${
            routeTab === "gsl"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-800"
          }`}
          onClick={() => handleButtonChange("gsl")}
        >
          GSL
        </button>
        <button
          className={`font-bold border border-gray-500 cursor-pointer text-md lg:text-xl py-4 lg:py-4 px-4 lg:px-6 rounded-xl w-40 ${
            routeTab === "mdcaus"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-800"
          }`}
          onClick={() => handleButtonChange("mdcaus")}
        >
          MOD-C
        </button>
        <button
          className={`font-bold border border-gray-500 cursor-pointer text-md lg:text-xl py-4 lg:py-4 px-4 lg:px-6 rounded-xl w-40 ${
            routeTab === "unmcaus"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-800"
          }`}
          onClick={() => handleButtonChange("unmcaus")}
        >
          UNMOD-C
        </button>
       
      </div>

      {/* Content */}

    </>
  );
};

export default NavTab;