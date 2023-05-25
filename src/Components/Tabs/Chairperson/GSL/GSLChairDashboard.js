/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdBrowseGallery,
  MdOutlineIncompleteCircle,
  MdPendingActions,
} from "react-icons/md";
import {
  clearErrors,
  clearMessages,
  getALLGSLDataChairPOV,
  getGSLCommonSettings,
  getGSLInfo,
  startGSL,
} from "../../../../actions/GSLActions";
import Modal from "../../../Modal/Modal";
import { FaInnosoft, FaUserPlus } from "react-icons/fa";
import { showErrors } from "../../Utilities/errorShow";
import GSLCommonSettings from "./GSLCommonSettings";
import Table from "../Utils/Table";
import GSLCheckboxRegSelection from "./GSLCheckboxRegSelection";
import ReactCountryFlag from "react-country-flag";
import { countryName2Code } from "../../../CountriesName/countryName2Code";
import Loader from "../../../Loader/Loader";
import Feedback from "./Feedback";
import convertSecondsToMinutesAndSeconds from "../Utils/convertSecondsToMinutesAndSeconds";
import GSLTimerSection from "./GSLTimerSection";
import FeedbackView from "./FeedbackView";
import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";

const GSLDashboard = ({ chairperson_info, markedRollList }) => {
  const { loading, GSLChairData, error, msg, isCurrentGSLSpeaker } =
    useSelector((state) => state.GSL);
  const [gslFinalData, setGslFinalData] = useState(GSLChairData);
  // Table Columns
  const columns = [
    "Sr No.",
    chairperson_info?.is_portfolio ? "Portfolio" : "Country",
    "Proposed By",
    "Total Time",
    "Per Person Time",
  ];
  //Modal Handlers
  const [isGSLRegModalOpen, setIsGSLRegModalOpen] = useState(false);
  const [isGSLCSRegModalOpen, setIsGSLCSRegModalOpen] = useState(false);
  const [isGSLInfoModalOpen, setIsGSLInfoModalOpen] = useState(false);
  const [showGSLDetails, setShowGSLDetails] = useState(false);
  const [showCompletedGSLDetails, setShowCompletedGSLDetails] = useState(false);
  const dispatch = useDispatch();

  const handleGSLRegCloseModal = () => {
    setIsGSLRegModalOpen(false);
  };
  const handleGSLCSRegCloseModal = () => {
    setIsGSLCSRegModalOpen(false);
  };
  const handleGSLInfoCloseModal = () => {
    setIsGSLInfoModalOpen(false);
  };
  const handleGSLDetailsCloseModal = () => {
    setShowGSLDetails(false);
  };
  const handleCompletedGSLDetailsCloseModal = () => {
    setShowCompletedGSLDetails(false);
  };

  useEffect(() => {
    dispatch(getGSLCommonSettings(chairperson_info?.community));
    dispatch(getALLGSLDataChairPOV());
  }, []);

  const handleCompletedCurrentGSLInfo = (currentCompletedGSLSelected) => {
    dispatch(getGSLInfo(currentCompletedGSLSelected));
    setShowCompletedGSLDetails(true);
  };

  const options = [
    {
      label: "All",
      value: "all",
      icon: MdBrowseGallery,
    },
    {
      label: "Pendig",
      value: "pending",
      icon: MdPendingActions,
    },
    {
      label: "Completed",
      value: "completed",
      icon: MdOutlineIncompleteCircle,
    },
  ];

  const HandleGSLView = (value) => {
    if (value === "pending") {
      setGslFinalData(
        GSLChairData.filter(
          (item) => item.status === "pending" || item.status === "not_started"
        )
      );
    } else if (value === "completed") {
      setGslFinalData(
        GSLChairData.filter((item) => item.status === "completed")
      );
    } else {
      setGslFinalData(GSLChairData);
    }
  };

  const handleStartGSL = (event) => {
    event.preventDefault();
    if (isCurrentGSLSpeaker?.id) {
      const GSLStatusData = {
        gsl: isCurrentGSLSpeaker.id,
        status: isCurrentGSLSpeaker.status,
      };
      dispatch(startGSL(GSLStatusData));
    }
  };

  useEffect(() => {
    if (GSLChairData?.length > 0) {
      setGslFinalData(GSLChairData);
    }
  }, [GSLChairData]);

  useEffect(() => {
    if (msg) {
      showErrors(msg, true, "gsl-success");
      dispatch(clearMessages());
      dispatch(getALLGSLDataChairPOV());
    }
    if (error) {
      showErrors(error, false, "gsl-error");
      dispatch(clearErrors());
    }
  }, [msg, error]);
  return (
    <>
      {loading && <Loader isOverlay={true} />}

      <div className="container p-4 mx-auto">
        {isCurrentGSLSpeaker?.status === "pending" &&
          isCurrentGSLSpeaker?.starting_time && (
            <>
              <GSLTimerSection isCurrentGSLSpeaker={isCurrentGSLSpeaker} />
            </>
          )}

        {/* {isCurrentGSLSpeaker?.status==="pending " && (
        <FeedbackButton handleDisable={setIsGSLInfoModalOpen} />
        )} */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsGSLRegModalOpen(true)}
            className="mt-5 mx-2 bg-[#66360c] px-4 hover:bg-blue-700 text-almost-white font-bold rounded-xl py-2 text-md sm:text-sm md:text-lg lg:text-xl transition-all flex"
          >
            <FaUserPlus className="mr-2 my-auto border-2 rounded-full lg:text-3xl md:text-2xl text-xl " />
            Register GSL
          </button>
          <button
            onClick={() => setIsGSLCSRegModalOpen(true)}
            className="mt-5 mx-2 bg-[#010607] px-4 hover:bg-blue-700  font-bold rounded-xl py-2 text-md sm:text-sm md:text-lg lg:text-xl transition-all flex text-white"
          >
            <FaInnosoft className="mr-2 my-auto border-2 rounded-full lg:text-3xl md:text-2xl text-xl " />
            GSL Common Settings
          </button>
        </div>
        <div>
          {showGSLDetails && (
            <Modal isOpen={showGSLDetails} onClose={handleGSLDetailsCloseModal}>
              <h2 className="text-xl font-bold mb-4 border-b-2 pb-4">
                GSL Details
              </h2>
              <Feedback />
            </Modal>
          )}
          {showCompletedGSLDetails && (
            <Modal
              isOpen={showCompletedGSLDetails}
              onClose={handleCompletedGSLDetailsCloseModal}
            >
              <h2 className="text-xl font-bold mb-4 border-b-2 pb-4">
                GSL Details
              </h2>
              <FeedbackView
                handleCompletedGSLDetailsCloseModal={
                  handleCompletedGSLDetailsCloseModal
                }
                isView={true}
              />
            </Modal>
          )}
          {isGSLCSRegModalOpen && (
            <Modal
              isOpen={isGSLCSRegModalOpen}
              onClose={handleGSLCSRegCloseModal}
            >
              <h2 className="text-xl font-bold mb-4 border-b-2 pb-4">
                GSL Common Settings
              </h2>
              <div>
                <GSLCommonSettings
                  chairperson_info={chairperson_info}
                  handleGSLCSRegCloseModal={handleGSLCSRegCloseModal}
                />
              </div>
            </Modal>
          )}
          {isGSLRegModalOpen && (
            <Modal isOpen={isGSLRegModalOpen} onClose={handleGSLRegCloseModal}>
              <h2 className="text-xl font-bold mb-4 border-b-2 pb-4">
                Add GSL
              </h2>
              <div>
                <GSLCheckboxRegSelection
                  markedRollList={markedRollList}
                  handleGSLRegCloseModal={handleGSLRegCloseModal}
                  chairperson_info={chairperson_info}
                />
              </div>
            </Modal>
          )}
          {isGSLInfoModalOpen && (
              <div>
                <Feedback handleGSLInfoCloseModal={handleGSLInfoCloseModal} />
              </div>
          )}
        </div>
        <div className="h-[50vh] hide-scrollbar rounded-b-lg bg-white">
          <Tabs className="my-2" value="html">
            <TabsHeader className="w-1/2 mx-auto">
              {options.map(({ label, value, icon }) => (
                <Tab
                
                  className="border-2"
                  key={value}
                  value={value}
                  onClick={() => HandleGSLView(value)}
                  defaultChecked={value==="all"}
                >
                  <div className="flex flex-row gap-2 items-center">
                    {React.createElement(icon, { className: "w-5 h-5" })}
                    {label}
                  </div>
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div>
            <Table columns={columns}>
              {gslFinalData?.length > 0 ? (
                <>
                  {gslFinalData?.map((GSL, index) => {
                    const { minutes, seconds } =
                      convertSecondsToMinutesAndSeconds(GSL.max_time);

                    return (
                      <tr
                        key={index}
                        className={`${
                          isCurrentGSLSpeaker?.status === "not_started" &&
                          isCurrentGSLSpeaker?.id === GSL?.id
                            ? "bg-green-300"
                            : ""
                        } ${
                          isCurrentGSLSpeaker?.status === "pending" &&
                          isCurrentGSLSpeaker?.id === GSL?.id
                            ? "bg-yellow-300"
                            : ""
                        } `}
                      >
                        <td className=" border rounded-lg p-2 h-10 py-2">
                          {index + 1}
                        </td>
                        <td className="border rounded-lg p-2 h-10 py-2 text-left">
                          {chairperson_info?.is_portfolio ? (
                            ""
                          ) : (
                            <ReactCountryFlag
                              countryCode={countryName2Code[GSL.country]}
                              style={{
                                fontSize: "2em",
                                lineHeight: "2em",
                              }}
                              aria-label={GSL.country}
                              svg
                            />
                          )}
                          <span className="m-3 text-xl">{GSL.country}</span>
                        </td>
                        <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                          {GSL.name}
                        </td>
                        <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
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
                        <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                          {isCurrentGSLSpeaker?.id === GSL?.id && (
                            <>
                              {isCurrentGSLSpeaker?.status ===
                                "not_started" && (
                                <button
                                  className="bg-black text-almost-white p-2 rounded-lg"
                                  onClick={(e) => handleStartGSL(e)}
                                >
                                  Start
                                </button>
                              )}
                              {isCurrentGSLSpeaker?.status === "pending" && (
                                <button
                                  className="bg-black text-almost-white p-2 rounded-lg"
                                  onClick={() => setIsGSLInfoModalOpen(true)}
                                >
                                  Pending
                                </button>
                              )}
                            </>
                          )}
                          {isCurrentGSLSpeaker?.id !== GSL?.id && (
                            <>
                              {GSL.status === "not_started" && (
                                <small className="text-black">
                                  Yet to start
                                </small>
                              )}
                              {GSL.status === "completed" && (
                                <button
                                  className="bg-blue-500 text-white p-2 rounded-lg"
                                  onClick={(e) => {
                                    handleCompletedCurrentGSLInfo(GSL?.id);
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
      </div>

      {/* <VotingSection/> */}
    </>
  );
};

export default GSLDashboard;