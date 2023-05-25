import React, { useState } from 'react'
import convertSecondsToMinutesAndSeconds from '../Utils/convertSecondsToMinutesAndSeconds';
import Timer from '../Utils/Timer';
import { getALLGSLDataChairPOV, startGSL } from '../../../../actions/GSLActions';
import { useDispatch } from 'react-redux';

const GSLTimer = ({ isCurrentGSLSpeaker }) => {
  const { starting_time, max_time } = isCurrentGSLSpeaker;
  const { minutes, seconds } = convertSecondsToMinutesAndSeconds(max_time)
  const timeTakenByGSL = convertSecondsToMinutesAndSeconds(isCurrentGSLSpeaker?.timeTaken)
  const [showTimer, setShowTimer] = useState(true);
  const dispatch = useDispatch();

  const handleTimerStop = (timeTaken) => {
    setShowTimer(false);
    if (isCurrentGSLSpeaker?.id) {
      const GSLStatusData = {
        gsl: isCurrentGSLSpeaker.id,
        status: isCurrentGSLSpeaker.status,
        timeTaken: timeTaken


      }
      dispatch(startGSL(GSLStatusData))
      dispatch(getALLGSLDataChairPOV());

    }

  };
  return (

    <div>
    <div className='flex justify-center  items-center'>
      <div className="bg-gradient-to-r from-blue-500 to-light-blue-500  border-2 border-gray-200 rounded-3xl shadow-md p-2 w-full lg:w-1/2 h-48">
      
        <div className="bg-[#F4F6F9] rounded-3xl p-6 w-full h-30">
          <h6 className='text-center text-md font-bold mb-4'>Current Portfolio - {isCurrentGSLSpeaker.country}</h6>
          <p className="text-center text-xl lg:text-2xl mb-4 font-bold">Total Time - {minutes} min  : {seconds} SEC</p>
          <h4 className="text-center text-xl lg:text-3xl  font-bold">
            {isCurrentGSLSpeaker?.timeTaken ? <p className="text-center text-blue-400 "> Time Taken - <span className='bg-[#f4f6f9] border-2 border-gray-500 px-6 py-3 rounded-xl'> {timeTakenByGSL.minutes} min  : {timeTakenByGSL.seconds} sec</span></p>
              : (
                <>
                  {showTimer && <Timer starting_time={starting_time} max_time={max_time} stop={handleTimerStop} />}
                </>
              )}


            {/* <Timer starting_time={starting_time} max_time={max_time} /> */}
          </h4>
          {/* {perPersonTime && (
          <>
            <p className="text-center font-bold">Delegate Time</p>
            <h1 className="text-center text-3xl md:text-5xl  font-bold">
              {isStart ? timeToMinutes(timeRemaining): '00'} /{timeToMinutes(perPersonTime)}
            </h1>
          </>
        )} */}
        </div>

        <div className=" mt-2 rounded-3xl p-2  w-full h-auto mx-auto ">
          <div className=" mt-4 md:mt-6 lg:mt-6 mx-auto flex">
            {/* <button className="bg-[#9ea9ba] hover:bg-blue-700 text-white font-bold rounded-xl py-2 text-sm md:text-lg lg:text-lg ">
            Yield
          </button>
          <button className="bg-[#9ea9ba] hover:bg-blue-700 text-white font-bold rounded-xl py-2 text-sm md:text-lg lg:text-lg  ">
            Set Time
          </button>
          <button className="bg-[#9ea9ba] hover:bg-blue-700 text-white font-bold rounded-xl py-2 text-sm md:text-lg lg:text-lg  ">
            Reset
          </button> */}

          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default GSLTimer