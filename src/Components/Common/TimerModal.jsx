import React from "react";
import TimerSection from "../Tabs/Chairperson/Utils/TimerSection";

const TimerModal = ({
  isStart,
  maxTime,
  perPersonTime,
  startTime,
  changeTimer,
  isGSL,
  isCurrentGSLSpeaker
}) => {
  const currentTimestamp = new Date().getTime() / 1000; //get current time in seconds
  const secondsToSub = startTime ? currentTimestamp - startTime : 0;
  return (
    <div>
      <TimerSection
        perPersonTime={perPersonTime}
        secondsToSub={secondsToSub}
        maxTime={maxTime}
        isStart={isStart}
        setTimer={changeTimer}
      />
    </div>
  );
};

export default TimerModal;
