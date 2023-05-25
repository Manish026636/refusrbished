/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import RegistrationForm from "./RegistrationForm";
import Modal from "../../../../Modal/Modal";
import Table from "../../Utils/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  getALLMCAUSDataChairPOV,
  putMCAUSId,
} from "../../../../../actions/MCAUSActions";
import ReactCountryFlag from "react-country-flag";
import { FaPlus } from "react-icons/fa";
import NextStageButton from "../../Utils/NextStageButton";
import { countryName2Code } from "../../../../CountriesName/countryName2Code";
import Loader from "../../../../Loader/Loader";
import convertSecondsToMinutesAndSeconds from "../../Utils/convertSecondsToMinutesAndSeconds";

function AddMotions({ MCAUSChairDetails, pendingMCAUSId, chairperson_info }) {
  const columns = [
    "Sr No.",
    chairperson_info?.is_portfolio ? "Portfolio" : "Country",
    "Proposed By",
    "Topic",
    "Total Time",
    "Per Person Time",
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getALLMCAUSDataChairPOV());
  }, []);

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
  };

  return (
    <>
      {/* {loading && <Loader />} */}

      <div className="min-h-screen bg-gray-100 pt-2">
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="my-10 bg-indigo-700 px-4 hover:bg-blue-700 text-white font-bold rounded-xl py-2 text-md sm:text-sm md:text-lg lg:text-xl transition-all flex mx-auto"
          >
            <FaPlus className="mr-2 my-auto border-2 rounded-full lg:text-3xl md:text-2xl text-xl " />
            Register Motions
          </button>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className="text-xl font-bold mb-4 border-b-2 pb-4">
            Register Motions
          </h2>
          <div>
            <RegistrationForm
              modelClose={setIsModalOpen}
              pendingMCAUSId={pendingMCAUSId}
              chairperson_info={chairperson_info}
            />
          </div>
        </Modal>
        <div>
          <Table columns={columns}>
            {MCAUSChairDetails?.length > 0 ? (
              <>
                {MCAUSChairDetails.map((MCAUSChairDetail) => {
                    const  maxTime= convertSecondsToMinutesAndSeconds(MCAUSChairDetail.max_time)
                    const  perPersonTime= convertSecondsToMinutesAndSeconds(MCAUSChairDetail.per_person_time)

                  return (
                    <tr key={MCAUSChairDetail.id}>
                      <td className="border rounded-lg p-2 h-10 py-2">
                        {MCAUSChairDetails.indexOf(MCAUSChairDetail) + 1}
                      </td>
                      <td className="border rounded-lg p-2 h-10 py-2 text-left">
                        {" "}
                        {chairperson_info?.is_portfolio ? (
                          ""
                        ) : (
                          <ReactCountryFlag
                            countryCode={
                              countryName2Code[MCAUSChairDetail.country]
                            }
                            style={{
                              fontSize: "2em",
                              lineHeight: "2em",
                            }}
                            aria-label={MCAUSChairDetail.country}
                            svg
                          />
                        )}{" "}
                        <span className="m-3 text-xl">
                          {MCAUSChairDetail.country}
                        </span>
                      </td>
                      <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                        {MCAUSChairDetail.name}
                      </td>
                      <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                        {MCAUSChairDetail.subtopic_name}
                      </td>
                      <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                        {/* {MCAUSChairDetail.max_time} */}
                        <span className="text-3xl text-gray-700 font-medium mr-2">{maxTime.minutes}</span>
                          <span className="text-gray-400 font-medium mr-2">Min</span>
                          <span className="text-3xl text-gray-700 font-medium mr-2">{maxTime.seconds}</span>
                          <span className="text-gray-400 font-medium">Sec</span>

                      </td>
                      <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      <span className="text-3xl text-gray-700 font-medium mr-2">{perPersonTime.minutes}</span>
                          <span className="text-gray-400 font-medium mr-2">Min</span>
                          <span className="text-3xl text-gray-700 font-medium mr-2">{perPersonTime.seconds}</span>
                          <span className="text-gray-400 font-medium">Sec</span>
                        {/* {MCAUSChairDetail.per_person_time} */}
                        
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
          <NextStageButton
            btnLabel={"Proceed for Topic Selection"}
            handleNextStage={handleNextStage}
          />
        </div>
      </div>
    </>
  );
}

export default AddMotions;
