import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMCAUSId} from "../../../../../actions/MCAUSActions";


const DoYouHaveMotionsOnFloor = ({pendingCommitteeSessionId}) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
const data = {
  "community_session":pendingCommitteeSessionId,
  "stage":1,
}
    dispatch(addMCAUSId(data));
    // dispatch(getMCAUSId(pendingCommitteeSessionId))
  //   dispatch(patchMCAUSId({
  //  ...pendingMCAUSId,
  //     stage:pendingMCAUSId.stage+1
  //   }))
    // dispatch(getMCAUSId(pendingCommitteeSessionId));
    // dispatch(setMc )
  };

  return (
    <>
      <div className="flex justify-center">
        <div className=" mt-10 bg-gradient-to-r from-blue-600 to-light-blue-600 border border-teal-500 h-60 md:h-60 text-center   rounded-2xl">
          <h1 className="m-8 mt-14 font-istok text-white font-bold text-lg md:text-2xl">
            Do you have any motions on the floor ?
          </h1>
          <div className="mt-12 md:mt-[6vh]">
            <button
              className="bg-[#f4f6f9] border-2 border-cyan-400 hover:bg-teal-700 transition-all hover:text-white text-gray-600 text-lg font-bold py-4 px-4 rounded-xl w-48 md:w-48"
              onClick={handleSubmit}
            >
              Register Motions
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoYouHaveMotionsOnFloor;
