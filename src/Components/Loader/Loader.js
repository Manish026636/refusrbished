import React, { useEffect, useState } from "react";
import "./Loader.css";
import { BiLoaderCircle } from "react-icons/bi";

const Loader = ({isOverlay}) => {
  const [currentLetter, setCurrentLetter] = useState(0);
  const logo = "MUNITY";
  const words = logo.split("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentLetter((currentLetter) => (currentLetter + 1) % logo.length);
    }, 700);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className={`flex justify-center items-center h-screen ${isOverlay ? "fixed z-50 top-0 bottom-0 left-0 right-0 backdrop-blur-md": ''}`}>
      <div className="text-5xl font-bold text-gray-800 flex">
        {words.map((word, i) => (
          <span key={i} className={`${currentLetter === i ? "animate" : ""}`}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};



export function Spinner(){
  return (
    <div className="flex justify-center items-center p-2">
      <BiLoaderCircle className="h-24 w-24 animate-spin overflow-hidden text-amber-400"/>
    </div>
  );
}

export default Loader;
