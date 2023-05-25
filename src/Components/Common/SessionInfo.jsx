import React from "react";
import { useDispatch, } from "react-redux";
import { terminateCommitteeSessionData } from "../../actions/committeeSessionActions";

const SessionInfo = ({pendingCommitteeSession,committeName}) => {
  const dispatch = useDispatch();
  const handleTerminateSession = () => {
    dispatch(terminateCommitteeSessionData());
  };
  return (
    <div>
      <div className="flex justify-center items-center  p-2 flex-cols-3   gap-4 mb-8">
        <div className="bg-white border-2 border-gray-300 rounded-xl w-60 text-center shadow-md p-2">
          <p className="  lg:text-lg font-bold">Committee Name</p>
          <h1 className="text-gray-600 text-sm lg:text-2xl font-bold">{committeName}</h1>
        </div>
        {/* <div className="bg-white border-2 border-gray-300 rounded-3xl text-center shadow-md p-2">
          <p className=" mb-4 text-lg">Session Topic</p>
          <h1 className="text-gray-600 text-2xl font-bold">Terrorism</h1>
        </div> */}
        <div className="bg-white border-2 w-60 border-gray-300 rounded-2xl text-center shadow-md p-2">
          <p className="  lg:text-lg font-bold">Session ID</p>
          {/* <h1 className="text-gray-600 text-sm lg:text-2xl font-bold">{CommitteeSessionData?.length > 0 ? '# ' + CommitteeSessionData[0].sessions: 'Create Session first'}</h1> */}
          <h1 className="text-gray-600 text-sm lg:text-2xl font-bold">{pendingCommitteeSession.sessions}</h1>
        </div>
        <div className="bg-white border-2 w-20 border-gray-300 rounded-3xl text-center shadow-md p-2">
          <button onClick={handleTerminateSession} className="bg-red-600 transition-all border active:border-red-6 hover:border-red-600 hover:bg-[#9ea9ba] text-white rounded-xl px-2  py-1  text-sm lg:text-xl font-bold ">
            END
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionInfo;
