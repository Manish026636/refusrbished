import React, { useState } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
const Timer = ({ starting_time, max_time, stop }) => {
  const startFrom = new Date(starting_time).getTime();
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    const timeTaken = max_time - (minutes * 60 + seconds)
    if (completed) {
      stop(max_time)
    } else {
      if (timeTaken <= max_time) {
        setTotalTimeTaken(timeTaken)
      }
      return (
        <>
          <div className='text-center text-3xl md:text-2xl text-red-400  font-bold'>
            {zeroPad(minutes)}:{zeroPad(seconds)}
          </div>
          <button className='bg-red-700 hover:bg-blue-700 text-almost-white font-bold rounded-xl py-2 text-sm md:text-lg lg:text-lg p-3 my-3 ' onClick={() => stop(totalTimeTaken)} > Stop</button>
        </>)
    }
  };
  return (
    <Countdown
      autoStart={true}
      date={startFrom + (max_time * 1000)}
      renderer={renderer}
    />
  )
}
export default Timer