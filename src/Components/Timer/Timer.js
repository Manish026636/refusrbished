// import { useState, useEffect } from "react";
// import { FaPlay, FaPause } from "react-icons/fa";

// export default function Timer({setTime}) {
//   const [timer, setTimer] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);

//   useEffect(() => {
//     let interval;
//     if (isRunning) {
//       interval = setInterval(() => {
//         setTimer((timer) => timer + 1);
//         setTime(timer)
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [isRunning]);

//   return (
//     <div
//       className="flex items-center mt-4 bg-gray-100 p-3 rounded-xl shadow-md"
//       style={{ maxWidth: 300 }}
//     >
//       {isRunning ? (
//         <FaPause
//           className="text-red-500 mr-4 cursor-pointer"
//           onClick={() => setIsRunning(false)}
//         />
//       ) : (
//         <FaPlay
//           className="text-green-500 mr-4 cursor-pointer"
//           onClick={() => setIsRunning(true)}
//         />
//       )}
//       <div className="text-4xl font-bold text-red-500">{timer}</div>
//       <div className="ml-4 font-bold">seconds</div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from 'react';

import { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

function Timer({ maxDuration, running, setRunning }) {
  const [time, setTime] = useState(() => {
    if (localStorage.getItem('Timer'))
      return localStorage.getItem('Timer')
    else if (maxDuration)
      return maxDuration
    else return 0
  });

  useEffect(() => {
    let intervalId;

    if (running && time > 0) {
      intervalId = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [running, time]);

  useEffect(() => {
    localStorage.setItem('Timer', time);
  }, [time]);

  const handleStart = () => {
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
  };

  return (
    <div>
      <div
        className="flex items-center mt-4 bg-gray-100 p-3 rounded-xl shadow-md"
        style={{ maxWidth: 300 }}
      >
        {running && time === "0" ?
          "" :
          (running && time>0 ? (
            <FaPause
              className="text-red-500 mr-4 cursor-pointer"
              onClick={handleStop}
            />
          ) : 
          <>
            {!running && time!=="0"? (
              <FaPlay

              className="text-green-500 mr-4 cursor-pointer"
              onClick={handleStart}
            />

            ):""}
          </>
      
          )
        }

        <div className="text-4xl font-bold text-red-500 ">{time}</div>
        <div className="ml-4 font-bold">seconds</div>
      </div>

    </div>
  );
}

export default Timer;
