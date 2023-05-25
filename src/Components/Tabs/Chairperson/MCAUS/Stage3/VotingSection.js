/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getALLMCAUSDataChairPOV,
  putMCAUSId,
} from "../../../../../actions/MCAUSActions";
import ReactCountryFlag from "react-country-flag";
import NextStageButton from "../../Utils/NextStageButton";
import { countryName2Code } from "../../../../CountriesName/countryName2Code";
import {
  clearErrorsVotes,
  clearMessagesVotes,
  fetchPendingMarkedDelegates,
  getAllResultChairAction,
  voteChairAction,
} from "../../../../../actions/voteActions";
import Loader from "../../../../Loader/Loader";
import { showErrors } from "../../../Utilities/errorShow";
import Modal from "../../../../Modal/Modal";
import VotingModalYesNo from "./VotingModalYesNo";

const VotingSection = ({
  pendingMCAUSId,
  pendingCommitteeSessionId,
  chairperson_info,
}) => {
  console.log(pendingMCAUSId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    loading,
    pendingVotingTopic,
    passedVotingTopic,
    votingResults,
    error,
    msg,
  } = useSelector((state) => state.vote);

  // const exhausted_checker=chairVotes.map(( hI)=>)
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const handlePassOrFailTopic = (value) => {
    if (pendingVotingTopic) {
      const data = {
        id: pendingVotingTopic.topic.id,
        is_pass: value,
        mcausid: pendingMCAUSId.id,
        session: pendingCommitteeSessionId,
      };
      dispatch(voteChairAction(data));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNextStage = (e) => {
    e.preventDefault();
    dispatch(
      putMCAUSId({
        ...pendingMCAUSId,
        stage: pendingMCAUSId.stage + 1,
      })
    );
    dispatch(getALLMCAUSDataChairPOV(pendingMCAUSId.id));
  };
  const styles = {
    normal: { height: "3rem", width: "3rem", transition: "all 0.2s" },
    hover: {
      transform: "scale(1.3)",
      zIndex: 50,
    },
  };

  useEffect(() => {
    if (pendingVotingTopic?.topic?.id) {
      dispatch(
        fetchPendingMarkedDelegates(
          pendingVotingTopic?.topic?.id,
          pendingCommitteeSessionId
        )
      );
    }
    // dispatch(getChairTopicsAction(pendingMCAUSId.id))
  }, []);

  useEffect(() => {
    dispatch(
      getAllResultChairAction(pendingCommitteeSessionId, pendingMCAUSId.id)
    );
  }, []);

  useEffect(() => {
    if (msg) {
      showErrors(msg, true, "votes-msg");
      dispatch(clearMessagesVotes());
      dispatch(getALLMCAUSDataChairPOV());
      dispatch(
        getAllResultChairAction(pendingCommitteeSessionId, pendingMCAUSId.id)
      );
    }
    if (error) {
      showErrors(error, false, "votes-error");
      dispatch(clearErrorsVotes());
    }
  }, [error, msg, dispatch]);

  return (
    <div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className="text-xl font-bold mb-4 border-b-2 pb-4">Voting</h2>
          <div>
            <VotingModalYesNo
              pendingMCAUSId={pendingMCAUSId}
              pendingVotingTopic={pendingVotingTopic}
              pendingCommitteeSessionId={pendingCommitteeSessionId}
              handleCloseModal={handleCloseModal}
              chairperson_info={chairperson_info}
            />
          </div>
        </Modal>
      )}
      {loading && <Loader isOverlay={true} />}
      <>
        {passedVotingTopic && (
          <>
            <div className="text-center mt-3 text-blue-600 h1">
              Hurray !. Voting has been passed on topic{" "}
              {passedVotingTopic?.topic?.topic_name}
            </div>
          </>
        )}
        {pendingVotingTopic && (
          <>
            <div className="container mx-auto mt-10 lg:mt-0 rounded-xl ">
              <h1 className="text-center text-blue-400 text-3xl m-10 font-bold">
                Current Pending Voting Topic
              </h1>
              <div className="w-1/2 mx-auto">
                <div className="rounded-xl">
                  <div className=" flex items-center bg-white border-4 border-gray-200  justify-between p-4  rounded-2xl shadow-indigo-50 s">
                    <div>
                      <h2 className="text-gray-900 text-lg font-bold">
                        {pendingVotingTopic.topic.topic_name}
                      </h2>
                      <h4 className="mt-6 text-md lg:text-lg font-bold text-gray-500 text-left">
                        {chairperson_info?.is_portfolio
                          ? "Portfolio"
                          : "Country"}{" "}
                        : {pendingVotingTopic.topic.country}
                      </h4>
                      <h3 className="  lg:text-lg font-bold text-yellow-500 text-left">
                        Total time : {pendingVotingTopic.topic.max_time}
                      </h3>
                      <p className="lg:text-[16px] mb-4 text-xs font-semibold text-gray-400">
                        Per Speaker Time :{" "}
                        {pendingVotingTopic.topic.per_person_time}
                      </p>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-sm mr-1 mt-2 px-4 py-2 bg-blue-400 font-bold text-white rounded-lg  tracking-wider hover:bg-yellow-300 outline-none transition-all"
                      >
                        Vote
                      </button>
                      <button
                        onClick={() => handlePassOrFailTopic("passed")}
                        className={`text-sm mr-1  px-4 py-2 font-bold text-white rounded-lg  tracking-wider outline-none transition-all ${
                          pendingVotingTopic.is_pass
                            ? "bg-green-600"
                            : "bg-green-500 hover:bg-yellow-300"
                        }`}
                      >
                        Pass
                      </button>
                      <button
                        onClick={() => handlePassOrFailTopic("failed")}
                        className={`text-sm lg:mt-0 mt-2 px-4 py-2 font-bold text-white rounded-lg  tracking-wider  outline-none transition-all ${
                          pendingVotingTopic.is_pass
                            ? "bg-pink-400"
                            : "bg-red-400 hover:bg-yellow-300"
                        }`}
                      >
                        Fail
                      </button>
                    </div>
                    {chairperson_info?.is_portfolio ? (
                      ""
                    ) : (
                      <div className="bg-gray-100 overflow-hidden w-16 h-16 lg:w-20 lg:h-20 md:w-16 md:h-16 rounded-full shadow-2xl border border-gray-300 flex justify-center items-center">
                        <ReactCountryFlag
                          countryCode={
                            countryName2Code[pendingVotingTopic?.topic?.country]
                          }
                          onMouseEnter={() =>
                            setHover(pendingVotingTopic?.topic?.id)
                          }
                          onMouseLeave={() => {
                            setHover(false);
                          }}
                          style={{
                            ...styles.normal,
                            ...(hover === pendingVotingTopic?.topic?.id
                              ? styles.hover
                              : null),
                          }}
                          aria-label={pendingVotingTopic?.topic?.country}
                          svg
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <>
          {votingResults?.length > 0 ? (
            !pendingVotingTopic &&
            !passedVotingTopic && (
              <div>
                <h1 className="text-center text-pink-400 text-3xl mb-10 font-bold">
                  All Topics Failed
                </h1>
              </div>
            )
          ) : (
            <div>
              <h1 className="text-center text-pink-400 text-3xl mb-10 font-bold">
                No Topic Proposed
              </h1>
            </div>
          )}
        </>
        <NextStageButton
          btnLabel={`${
            votingResults?.length > 0 &&
            !pendingVotingTopic &&
            !passedVotingTopic
              ? "Terminate MCAUS"
              : "Proceed for Choosing Delegates"
          }`}
          handleNextStage={handleNextStage}
        />
      </>
    </div>
  );
};

export default VotingSection;
