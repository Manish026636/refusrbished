import { useState } from 'react';

export default function MinutesAndSecondsPicker({ timeReceiverHandler }) {
  const [totalSeconds, setTotalSeconds] = useState(0);

  function handleSecondChange(event) {
    const newSeconds = parseInt(event.target.value);
    const newTotalSeconds = (minutes * 60) + newSeconds;
    setTotalSeconds(newTotalSeconds);
    timeReceiverHandler(newTotalSeconds);


  }

  function handleMinuteChange(event) {
    const newMinutes = parseInt(event.target.value);
    const newTotalSeconds = (newMinutes * 60) + seconds;
    setTotalSeconds(newTotalSeconds);
    timeReceiverHandler(newTotalSeconds);
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <>
      <div className='flex justify-center items-center'>

        <div className="flex mt-4 bg-[#f4f6f9] border border-teal-400 h-20 w-2/3 rounded-xl flex-wrap justify-center">
          <div className="mx-2 my-4 flex flex-col sm:flex-row items-center">
            <label htmlFor="minutes" className="w-full font-semibold text-light-blue-800 sm:w-auto pb-1 sm:pb-0">Minutes</label>

            <select
              name="minutes"
              id="minutes"
              className="w-full ml-2 sm:max-w-xs px-2 py-1 border-gray-300 border-2 rounded-lg"
              value={minutes}
              onChange={handleMinuteChange}
            >
              {Array.from({ length: 60 }, (v, i) => i).map((num) => (
                <option key={num} value={num}>{num.toString().padStart(2, "0")}</option>
              ))}
            </select>
          </div>

          <div className="mx-2 my-4 flex flex-col sm:flex-row items-center">
            <label htmlFor="seconds" className="w-full font-semibold text-light-blue-800 sm:w-auto pb-1 sm:pb-0">Seconds</label>
            <select
              name="seconds"
              id="seconds"
              className="w-full ml-2 sm:max-w-xs px-2 py-1 border-gray-300 border-2 rounded-lg"
              value={seconds}
              onChange={handleSecondChange}
            >
              {Array.from({ length: 60 }, (v, i) => i).map((num) => (
                <option key={num} value={num}>{num.toString().padStart(2, "0")}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
