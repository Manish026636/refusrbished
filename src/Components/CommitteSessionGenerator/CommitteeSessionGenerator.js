import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommitteeSessionData,
  clearErrors,
  clearMessages,
  getALLCommitteeSessionDataChairPOV,
} from "../../actions/committeeSessionActions";
import Loader from "../Loader/Loader";
import { showErrors } from "../Tabs/Utilities/errorShow";

const CommitteeSessionGenerator = () => {

  const dispatch = useDispatch();
  const { loading, pendingCommitteeSessionId, error, msg } = useSelector(
    (state) => state.comm_session
  );
  const { delegate_info } = useSelector((state) => state.delegate_details);

  const data = {
    community: delegate_info.community,
    sessions: pendingCommitteeSessionId?.id ? parseInt(pendingCommitteeSessionId?.sessions) + 1:1,
  };

  const addSession = () => {
    dispatch(addCommitteeSessionData(data));
    // dispatch(getALLCommitteeSessionDataChairPOV(delegate_info.community));
  };
  useEffect(() => {
    dispatch(getALLCommitteeSessionDataChairPOV(delegate_info.community));
  }, []);
  useEffect(() => {
    if (msg) {
      showErrors(msg, true, 'commi-success')
      dispatch(clearMessages());
      // dispatch(getALLCommitteeSessionDataChairPOV(delegate_info.community));
      // navigate("/") 


    }
    if (error) {
      showErrors(error, true, 'commi-error')
      dispatch(clearErrors());
    }
  }, [msg, error]);


  return (
    <>
      {loading ? <Loader />
        : (
          <div className="max-w-3xl mx-auto mt-10">
            <div className="mb-4 border p-4 rounded-lg shadow-lg border-t-2 text-center">
              <label
                htmlFor="sessionName"
                className="block font-medium my-3 text-center text-blue-500"
              >
                Create a session to start MUN
              </label>
              <button
                onClick={addSession}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-900 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 mt-3"
              >
                Create Session
              </button>
            </div>
          </div>
        )
      }




    </>
  );
};

export default CommitteeSessionGenerator;
