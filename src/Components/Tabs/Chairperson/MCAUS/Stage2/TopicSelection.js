/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getALLMCAUSDataChairPOV,
  putMCAUSId,
} from "../../../../../actions/MCAUSActions";
import ReactCountryFlag from "react-country-flag";
import { countries } from "../../../../CountriesName/countryCode2Name";
import NextStageButton from "../../Utils/NextStageButton";

const TopicSelection = ({ pendingMCAUSId }) => {
  const { MCAUSChairDetails } = useSelector((state) => state.MCAUS);
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();

  const handleNextStage = (e) => {
    e.preventDefault();
    dispatch(
      putMCAUSId({
        ...pendingMCAUSId,
        stage: pendingMCAUSId.stage + 1,
      })
    );
  };
  const styles = {
    normal: { height: "3rem", width: "3rem", transition: "all 0.2s" },
    hover: {
      width: "4em",
      zIndex: 50,
      overflow: "hidden",
    },
  };

  useEffect(() => {
    dispatch(getALLMCAUSDataChairPOV(true));
  }, []);
  return (
    <div>
      <div>
        {MCAUSChairDetails?.length > 0 ? (
          <div className=" mt-10 lg:mt-0 rounded-xl ">
            <h1 className="text-center text-blue-400 text-3xl mb-10 font-bold">
              Proposed Topics
            </h1>
            <div className="grid  p-2 lg:grid-cols-2 gap-4">
              {MCAUSChairDetails.map((mcaus) => (
                <div key={mcaus.id} className=" w-full rounded-xl  lg:h-[20vh]">
                  <div className=" flex items-center bg-white border-4 border-gray-200  justify-between p-4  rounded-2xl shadow-indigo-50 s">
                    <div>
                      <h2 className="text-gray-900 text-lg font-bold">
                        {mcaus.subtopic_name}
                      </h2>
                      <h4 className="mt-6 text-md lg:text-lg font-bold text-gray-500 text-left">
                        Country : {mcaus.country}
                      </h4>
                      <h3 className="  lg:text-lg font-bold text-yellow-500 text-left">
                        Total time : {mcaus.max_time}
                      </h3>
                      <p className="lg:text-[16px] mb-4 text-xs font-semibold text-gray-400">
                        Per Speaker Time : {mcaus.per_person_time}
                      </p>
                      <button className="text-sm mr-1 mt-2 px-4 py-2 bg-blue-400 font-bold text-white rounded-lg  tracking-wider hover:bg-yellow-300 outline-none transition-all hover:text-black">
                        Vote
                      </button>
                      <button className="text-sm mr-1  px-4 py-2 bg-green-500 font-bold text-white rounded-lg  tracking-wider hover:bg-yellow-300 outline-none transition-all hover:text-black">
                        Pass
                      </button>
                      <button className="text-sm lg:mt-0 mt-2 px-4 py-2 bg-red-400 font-bold text-white rounded-lg  tracking-wider hover:bg-yellow-300 outline-none transition-all hover:text-black">
                        Fail
                      </button>
                    </div>
                    <div className="bg-gray-100 overflow-hidden w-16 h-16 lg:w-20 lg:h-20 md:w-16 md:h-16 rounded-full shadow-2xl border border-gray-300 flex justify-center items-center">
                      <ReactCountryFlag
                        countryCode={mcaus.country.trim()?.toUpperCase()}
                        onMouseEnter={() => {
                          setHover(true);
                        }}
                        onMouseLeave={() => {
                          setHover(false);
                        }}
                        style={{
                          ...styles.normal,
                          ...(hover ? styles.hover : null),
                        }}
                        aria-label={mcaus.country}
                        svg
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-center text-pink-400 text-3xl mb-10 font-bold">
              No Topics Proposed
            </h1>
          </div>
        )}
      </div>
      <NextStageButton
        btnLabel={"Proceed for Voting"}
        handleNextStage={handleNextStage}
      />
    </div>
  );
};

export default TopicSelection;
