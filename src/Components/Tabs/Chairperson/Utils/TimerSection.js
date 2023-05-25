/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Countdown from 'react-countdown';
const TimerSection = ({
  secondsToSub,
  maxTime,
  isStart,
  perPersonTime,
  setTimer
}) => {
  const [timeRemaining, setTimeRemaining] = useState(perPersonTime ? perPersonTime - secondsToSub :0);

  useEffect(() => {
    let intervalId;
    if (isStart && timeRemaining > 0)
      intervalId = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);
        setTimer(parseInt(timeRemaining));
      }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timeRemaining, isStart]);

  const timeToMinutes = (time) => {
    const minutes = Math.floor(time / 60)
      ?.toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)?.toString().padStart(2, "0");
    return `${minutes >= 0 ? minutes : "00"}:${seconds >= 0 ? seconds: "00"}`;
  };
  return (
    <div>
      <div className="bg-white border-2 border-gray-200 rounded-3xl shadow-md p-6 w-full  h-auto">
        <div className="bg-[#F4F6F9] rounded-3xl p-6 w-full h-30">
          <p className="text-center font-bold">Max Time</p>
          <h4 className="text-center text-xl md:text-3xl  font-bold">
            00:00 / {timeToMinutes(maxTime)}
          </h4>
          {perPersonTime && (
            <>
              <p className="text-center font-bold">Delegate Time</p>
              <h1 className="text-center text-3xl md:text-5xl  font-bold">
                {isStart ? timeToMinutes(timeRemaining): '00'} /{timeToMinutes(perPersonTime)}
              </h1>
            </>
          )}
        </div>

        {/* <div className=" mt-2 rounded-3xl p-2  w-full h-auto ">
          <div className="grid mt-4 md:mt-6 lg:mt-6 grid-cols-4 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
            <button className="bg-[#9ea9ba] hover:bg-blue-700 text-white font-bold rounded-xl py-2 text-sm md:text-lg lg:text-lg ">
              Yield
            </button>
            <button className="bg-[#9ea9ba] hover:bg-blue-700 text-white font-bold rounded-xl py-2 text-sm md:text-lg lg:text-lg  ">
              Set Time
            </button>
            <button className="bg-[#9ea9ba] hover:bg-blue-700 text-white font-bold rounded-xl py-2 text-sm md:text-lg lg:text-lg  ">
              Reset
            </button>
            <button className="bg-[#9ea9ba] hover:bg-blue-700 text-white font-bold rounded-xl py-2 text-sm md:text-lg lg:text-lg  ">
              Play
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TimerSection;
