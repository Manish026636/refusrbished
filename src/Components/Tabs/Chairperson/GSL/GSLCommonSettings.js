import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGSLCommonSettings } from "../../../../actions/GSLActions";
import Loader from "../../../Loader/Loader";
import MinutesAndSecondsPicker from "../Utils/MinutesAndSecondsPicker";
import convertSecondsToMinutesAndSeconds from "../Utils/convertSecondsToMinutesAndSeconds";

const GSLCommonSettings = ({handleGSLCSRegCloseModal, chairperson_info}) => {
  const dispatch = useDispatch();
  const {loading, GSLCommonSetting} = useSelector((state) => state.GSL);
  const [PerPersonTime, timeReceiverHandler] = useState(GSLCommonSetting?.id ? GSLCommonSetting.max_time : 0);
  const {minutes,seconds}=convertSecondsToMinutesAndSeconds(GSLCommonSetting?.id ? GSLCommonSetting.max_time : 0)
  

console.log(PerPersonTime);
  const handleSubmit = (e) => {

    e.preventDefault();
    // console.log(e);
    if (PerPersonTime>0)
    {

      dispatch(addGSLCommonSettings({ community: chairperson_info.community, max_time: PerPersonTime, delegates: chairperson_info.id }));
      handleGSLCSRegCloseModal();
    }
    
  };
  return (
    <>
    {loading && <Loader isOverlay={true} />}
      <div className="mb-4">
        <label htmlFor="perPersonTime" className="text-center text-cyan-700 block text-xl font-bold mb-2">
          Per Person Time
        </label>
        {/* <input
          type="number"
          name="perPersonTime"
          placeholder='Enter per person time'
          id="perPersonTime"
          required
          value={PerPersonTime}
          onChange={(e) => setPerPersonTime(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        /> */}
        <MinutesAndSecondsPicker timeReceiverHandler={timeReceiverHandler}/>
{PerPersonTime===0 && (
  <p className="text-red-500 my-3 text-center">Per Person Time Cannot be 0 </p>
)}
      </div>
      
      {GSLCommonSetting?.id &&  (
      <div className="flex justify-center items-center py-3">
      <h2 className="text-xl font-bold text-red-700 mr-4">Current GSL Timing :</h2>
      <span className="font-bold  text-lg">{minutes}</span>
      <span className="mx-2  font-medium">minutes</span>
      <span className="font-bold text-lg">{seconds}</span>
      <span className="mx-2 font-medium">seconds</span>

    </div>
    
          )}
      {!GSLCommonSetting?.id &&  (
        <div className="text-center">
          <h1 className="text-pink-500">GSL setting for current session is not created yet.</h1>
          </div>
          )}
          <div className="text-center">

        <button onClick={handleSubmit} className="btn bg-teal-500 text-white font-bold rounded-lg mt-3 px-6 p-2 mx-auto">Submit</button>
      </div>
    </>
  );
};

export default GSLCommonSettings;
