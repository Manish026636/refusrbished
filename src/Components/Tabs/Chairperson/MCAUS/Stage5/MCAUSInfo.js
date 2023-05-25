/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Feedback from "./Feedback";
import FeedbackView from "./FeedbackView";
import MCAUSInfoTimerSection from "./MCAUSInfoTimerSection";
import Table from "../../Utils/Table";
import convertSecondsToMinutesAndSeconds from "../../Utils/convertSecondsToMinutesAndSeconds";
import { countryName2Code } from "../../../../CountriesName/countryName2Code";
import ReactCountryFlag from "react-country-flag";
import Modal from "../../../../Modal/Modal";
import Loader from "../../../../Loader/Loader";
import {
  getMCAUSDeleagateSpeakerInfo,
  getMCAUSSpeakerData,
  putMCAUSDeleagateSpeakerStatus,
  putMCAUSId,
} from "../../../../../actions/MCAUSActions";
import NextStageButton from "../../Utils/NextStageButton";

const MCAUSInfo = ({ chairperson_info, pendingMCAUSId }) => {
  const { loading, MCAUSSpeakers, msg, isCurrentMCAUSSpeaker } = useSelector(
    (state) => state.MCAUS
  );
  // const [isSelectedAsCurrentSpeaker, setisSelectedAsCurrentSpeaker] = useState(second)
  const { passedVotingTopic } = useSelector((state) => state.vote);
  // Table Columns
  const columns = [
    "Sr No.",
    chairperson_info?.is_portfolio ? "Portfolio" : "Country",
    "Speaker Name",
    "Total Time",
    "Action",
  ];
  //Modal Handlers
  const [isMCAUSInfoModalOpen, setIsMCAUSInfoModalOpen] = useState(false);
  const [
    showCurrentCompletedMCAUSInfoDetails,
    setShowCurrentCompletedMCAUSInfoDetails,
  ] = useState(false);

  const dispatch = useDispatch();

  const handleMCAUSInfoCloseModal = () => {
    setIsMCAUSInfoModalOpen(false);
  };
  const handleCompletedMCAUSInfoDetailsCloseModal = (completedMCAUSSpeaker) => {
    // dispatch(getMCAUSDeleagateSpeakerInfo(completedMCAUSSpeaker));
    setShowCurrentCompletedMCAUSInfoDetails(false);
  };

  const handleCompletedCurrentMCAUSInfo = (
    currentCompletedMCAUSInfoSelected
  ) => {
    dispatch(getMCAUSDeleagateSpeakerInfo(currentCompletedMCAUSInfoSelected));
    setShowCurrentCompletedMCAUSInfoDetails(true);
  };

  const handleStartStopMCAUS = (event) => {
    event.preventDefault();
    if (isCurrentMCAUSSpeaker) {
      // const MCAUSInfoStatusData = {
      //   mcaus_info: isCurrentMCAUSSpeaker.id,
      //   status: isCurrentMCAUSSpeaker.status,
      // };
      const speakerObj = {
        speaker: isCurrentMCAUSSpeaker.id,
        status: isCurrentMCAUSSpeaker.status,
      };
      dispatch(putMCAUSDeleagateSpeakerStatus(speakerObj));
      // dispatch(P(MCAUSStatusData))
    }
  };
  const handleNextStage = (e) => {
    e.preventDefault();
    dispatch(
      putMCAUSId({
        ...pendingMCAUSId,
        stage: pendingMCAUSId.stage + 1,
        is_active: "False",
      })
    );
  };

  useEffect(() => {
    if (passedVotingTopic?.topic)
      dispatch(getMCAUSSpeakerData(passedVotingTopic?.topic?.id));
  }, []);

  useEffect(() => {
    if (msg) {
      dispatch(getMCAUSSpeakerData(passedVotingTopic?.topic?.id));
    }
  }, [msg]);
  return (
    <>
      {loading && <Loader isOverlay={true} />}

      <div className="container p-4 mx-auto">
        {isCurrentMCAUSSpeaker?.status === "pending" &&
          isCurrentMCAUSSpeaker?.starting_time && (
            <>
              <MCAUSInfoTimerSection
                isCurrentMCAUSSpeaker={isCurrentMCAUSSpeaker}
                starting_time={isCurrentMCAUSSpeaker?.starting_time}
                max_time={passedVotingTopic?.topic?.max_time}
                per_person_time={passedVotingTopic?.topic?.per_person_time}
                passedVotingTopicId={passedVotingTopic?.topic?.id}
              />
            </>
          )}
        <div>
          {isCurrentMCAUSSpeaker && isMCAUSInfoModalOpen && (
            <Feedback
              passedVotingTopicId={passedVotingTopic?.id}
              handleMCAUSInfoCloseModal={handleMCAUSInfoCloseModal}
              isCurrentMCAUSSpeakerId={isCurrentMCAUSSpeaker?.id}
            />
          )}
          {showCurrentCompletedMCAUSInfoDetails && (
            <Modal
              isOpen={showCurrentCompletedMCAUSInfoDetails}
              onClose={handleCompletedMCAUSInfoDetailsCloseModal}
            >
              <h2 className="text-xl font-bold mb-4 border-b-2 pb-4">
                MCAUS Speaker Details
              </h2>
              <FeedbackView
                onClose={
                  handleCompletedMCAUSInfoDetailsCloseModal
                }
              />
            </Modal>
          )}
        </div>
        <div className="h-[50vh] hide-scrollbar rounded-b-lg bg-white">
          <div className="mb3">
            <Table columns={columns}>
              {MCAUSSpeakers?.length > 0 ? (
                <>
                  {MCAUSSpeakers?.map((MCAUS, index) => {
                    const { minutes, seconds } =
                      convertSecondsToMinutesAndSeconds(
                        passedVotingTopic?.topic?.per_person_time
                      );

                    return (
                      <tr
                        key={index}
                        className={`${
                          isCurrentMCAUSSpeaker?.status === "not_started" &&
                          isCurrentMCAUSSpeaker?.id === MCAUS?.id
                            ? "bg-green-300"
                            : ""
                        } ${
                          isCurrentMCAUSSpeaker?.status === "pending" &&
                          isCurrentMCAUSSpeaker?.id === MCAUS?.id
                            ? "bg-yellow-300"
                            : ""
                        } `}
                      >
                        <td className=" border  p-2 h-10 py-2">{index + 1}</td>
                        <td className="border  p-2 h-10 py-2 text-left">
                          {chairperson_info?.is_portfolio ? (
                            ""
                          ) : (
                            <ReactCountryFlag
                              countryCode={countryName2Code[MCAUS?.country]}
                              style={{
                                fontSize: "2em",
                                lineHeight: "2em",
                              }}
                              aria-label={MCAUS.country}
                              svg
                            />
                          )}
                          <span className="m-3 text-xl">{MCAUS.country}</span>
                        </td>
                        <td className="border  p-2 h-10 py-2 text-center align-middle">
                          {MCAUS?.name}
                        </td>
                        <td className="border  p-2 h-10 py-2 text-center align-middle">
                          <span className="text-3xl text-gray-700 font-medium mr-2">
                            {minutes}
                          </span>
                          <span className="text-gray-400 font-medium mr-2">
                            Min
                          </span>
                          <span className="text-3xl text-gray-700 font-medium mr-2">
                            {seconds}
                          </span>
                          <span className="text-gray-400 font-medium">Sec</span>
                        </td>
                        <td className="border  p-2 h-10 py-2 text-center align-middle">
                          {isCurrentMCAUSSpeaker?.id === MCAUS?.id && (
                            <>
                              {isCurrentMCAUSSpeaker?.status ===
                                "not_started" && (
                                <button
                                  className="bg-black text-almost-white p-2 rounded-lg"
                                  onClick={(e) => handleStartStopMCAUS(e)}
                                >
                                  Start
                                </button>
                              )}
                              {isCurrentMCAUSSpeaker?.status === "pending" && (
                                <button
                                  className="bg-black text-almost-white p-2 rounded-lg "
                                  onClick={() => setIsMCAUSInfoModalOpen(true)}
                                >
                                  Pending
                                </button>
                              )}
                            </>
                          )}
                          {isCurrentMCAUSSpeaker?.id !== MCAUS?.id && (
                            <>
                              {MCAUS.status === "not_started" && (
                                <small className="text-black">
                                  Yet to start
                                </small>
                              )}
                              {MCAUS.status === "completed" && (
                                <button
                                  className="bg-blue-500 text-white p-2 rounded-lg"
                                  onClick={(e) => {
                                    handleCompletedCurrentMCAUSInfo(MCAUS?.id);
                                  }}
                                >
                                  Completed
                                </button>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="p-3 text-red-500 text-2xl"
                  >
                    No Records Found
                  </td>
                </tr>
              )}
            </Table>
          </div>
        </div>
        <NextStageButton
          btnLabel={"End MCAUS"}
          handleNextStage={handleNextStage}
        />
      </div>
    </>
  );
};

export default MCAUSInfo;