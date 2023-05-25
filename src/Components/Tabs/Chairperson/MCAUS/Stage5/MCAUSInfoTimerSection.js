import React, { useState } from 'react'
import Timer from './Timer';
import { useDispatch } from 'react-redux';
import convertSecondsToMinutesAndSeconds from '../../Utils/convertSecondsToMinutesAndSeconds';
import { getMCAUSSpeakerData, putMCAUSDeleagateSpeakerStatus } from '../../../../../actions/MCAUSActions';

const MCAUSInfoTimerSection
  = ({ isCurrentMCAUSSpeaker, per_person_time, max_time ,passedVotingTopicId}) => {
    const { starting_time,time_taken } = isCurrentMCAUSSpeaker;
    // console.log(starting_time);

    const { minutes, seconds } = convertSecondsToMinutesAndSeconds(per_person_time)
    const total_time = convertSecondsToMinutesAndSeconds(max_time)
    const time_taken_by_MCAUS_Speaker = convertSecondsToMinutesAndSeconds(isCurrentMCAUSSpeaker?.time_taken)
    const [showTimer, setShowTimer] = useState(true);
    const dispatch = useDispatch();

    const handleTimerStop = (timeTaken) => {
      setShowTimer(false);
      if (isCurrentMCAUSSpeaker) {
        const MCAUSSpeakerStatusData = {
          speaker: isCurrentMCAUSSpeaker.id,
          status: isCurrentMCAUSSpeaker.status,
          time_taken: timeTaken


        }
        dispatch(putMCAUSDeleagateSpeakerStatus(MCAUSSpeakerStatusData))
        dispatch(getMCAUSSpeakerData(passedVotingTopicId))

      }

    };
    return (

      <div className='flex justify-center items-center'>
        <div className="bg-gradient-to-r from-blue-500 to-light-blue-500  border-2 border-gray-200 rounded-3xl shadow-md p-3  w-full lg:w-1/2  h-60">
          <div className="bg-[#F4F6F9] rounded-3xl p-6 w-full h-auto ">
          <h6 className='text-center text-2xl text-cyan-700 font-bold mb-2'>Topic : South China Sea</h6>

          <h6 className='text-center text-gray-600 text-xl font-bold mb-2'>Total Time : {total_time.minutes} min  {total_time?.seconds} sec</h6>
            <p className="text-center text-gray-600 text-xl font-bold mb-2"> Max Time - {minutes} min  : {seconds} sec</p>
            <h4 className="text-center text-xl lg:text-3xl mt-6  font-bold">
              {isCurrentMCAUSSpeaker?.time_taken ? <p className="text-center text-blue-400 "> Time Taken - <span className='bg-[#f4f6f9] border-2 border-gray-500 px-6 py-3 rounded-xl'>{time_taken_by_MCAUS_Speaker.minutes} min   {time_taken_by_MCAUS_Speaker.seconds} sec</span></p>
                : (
                  <>
                    {showTimer && <Timer starting_time={starting_time} max_time={per_person_time} stop={handleTimerStop} />}
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
    )
  }

export default MCAUSInfoTimerSection
