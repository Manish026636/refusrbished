/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { countryName2Code } from "../../../../CountriesName/countryName2Code";
import {
  fetchPendingMarkedDelegates,
  getAllResultChairAction,
  getChairTopicsAction,
  getResultChairAction,
  voteAction,
} from "../../../../../actions/voteActions";
import { useDispatch, useSelector } from "react-redux";
import { showErrors } from "../../../Utilities/errorShow";

const VotingModalYesNo = ({
  pendingMCAUSId,
  pendingCommitteeSessionId,
  handleCloseModal,
  chairperson_info,
}) => {
  const dispatch = useDispatch();
  const { pendingMarkedDelegates, pendingVotingTopic, msg } = useSelector(
    (state) => state.vote
  );
  const handleVote = (delegate, vote_choice) => {
    if (pendingVotingTopic) {
      const data = {
        delegate: delegate,
        topic: pendingVotingTopic.topic.id,
        vote_choice: vote_choice,
      };
      dispatch(voteAction(data));
    }
  };

  useEffect(() => {
    dispatch(
      fetchPendingMarkedDelegates(
        pendingVotingTopic.topic.id,
        pendingCommitteeSessionId
      )
    );
    dispatch(
      getAllResultChairAction(pendingCommitteeSessionId, pendingMCAUSId.id)
    );
  }, [msg]);
  useEffect(() => {
    dispatch(
      fetchPendingMarkedDelegates(
        pendingVotingTopic.topic.id,
        pendingCommitteeSessionId
      )
    );
    dispatch(
      getResultChairAction(
        pendingCommitteeSessionId,
        pendingVotingTopic?.topic?.mcaus
      )
    );
  }, []);

  const progressBarClasses = "bg-gray-300 h-6 rounded-md";

  return (
    <div className="container mx-auto">
      {pendingMarkedDelegates?.length > 0 ? (
        <div className="mt-6 overflow-auto scrollbar-hidden rounded-2xl">
          <div className="table-container  overflow-y-auto scrollbar-hidden h-80 ">
            <table className="text-center  w-full">
              <thead className="sticky top-0 bg-blue-200 text-gray-800">
                <tr>
                  <th className="px-3 py-2 ">
                    {chairperson_info?.is_portfolio ? "Portfolio" : "Country"}
                  </th>
                  <th className=" px-3 py-2">Vote</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 ">
                {pendingMarkedDelegates.map((markedRoll, index) => (
                  <tr key={index}>
                    <td className="border rounded-lg text-start">
                      {chairperson_info?.is_portfolio ? (
                        ""
                      ) : (
                        <ReactCountryFlag
                          countryCode={countryName2Code[markedRoll.country]}
                          style={{
                            fontSize: "2em",
                            lineHeight: "2em",
                            marginLeft: "1rem",
                          }}
                          aria-label={markedRoll.country}
                          svg
                        />
                      )}
                      <span className="ml-3">{markedRoll.country}</span>
                    </td>
                    <td className="border py-2 text center">
                      <button
                        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                        onClick={() => handleVote(markedRoll.delegate, true)}
                      >
                        Yes
                      </button>

                      <button
                        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-3 rounded-lg"
                        onClick={() => handleVote(markedRoll.delegate, false)}
                      >
                        No
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="m-3 text-center">
            <p className="text-xl">Vote Result</p>
            <div className="flex my-3">
              <div className="w-20 ml-3">Passed</div>
              <div className={`${progressBarClasses} flex-1 w-7/10 mx-3`}>
                <div
                  className={`bg-blue-500 h-6 rounded-md text-white`}
                  style={{
                    width: `${pendingVotingTopic?.votePassPercentage}%`,
                  }}
                >{`${pendingVotingTopic?.votePassPercentage}%`}</div>
              </div>
            </div>
            <div className="flex my-3">
              <div className="w-20 ml-3">Failed</div>
              <div className={`${progressBarClasses} flex-1 w-7/10 mx-3`}>
                <div
                  className={`bg-red-500 h-6 rounded-md text-white`}
                  style={{
                    width: `${pendingVotingTopic?.voteFailPercentage}%`,
                  }}
                >{`${pendingVotingTopic?.voteFailPercentage}%`}</div>
              </div>
            </div>
            {/* <div className="flex my-3">
            <div className="w-20 ml-3">Abstained
            </div>
            <div className={`${progressBarClasses} flex-1 w-7/10 mx-3`}>
              <div
                className={`bg-black h-6 rounded-md text-white`}
                style={{ width: `${pendingVotingTopic?.abstainedVotePercentage}%` }}
              >{pendingVotingTopic?.abstainedVotePercentage}</div>
            </div>
          </div> */}
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-8">
          No more delegates available to vote
        </div>
      )}
    </div>
  );
};

export default VotingModalYesNo;
