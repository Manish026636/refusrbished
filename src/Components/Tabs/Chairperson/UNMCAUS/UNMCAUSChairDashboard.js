/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  FaUserPlus,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { showErrors } from "../../Utilities/errorShow";
import Table from "../Utils/Table";
import ReactCountryFlag from "react-country-flag";
import UNMDAddRegForm from "./UNMDAddRegForm";
import Modal from "../../../Modal/Modal";
import {
  clearErrors,
  clearMessages,
  getALLUNMCAUSDataChairPOV, finishUNMCAUS
} from "../../../../actions/UNMCAUSActions";
import { countryCode2Name } from "../../../CountriesName/countryCode2Name";
import convertSecondsToMinutesAndSeconds from "../Utils/convertSecondsToMinutesAndSeconds";
import DateFormatter from "../Utils/DateFormatter";

const UNMCAUSChairDashboard = ({ markedRollList, chairperson_info }) => {
  const columns = [
    "Sr No.",
    chairperson_info?.is_portfolio ? "Portfolio" : "Country",
    "Proposed By",
    "Total Time",
    "Started At",
    "Action",
  ];
  const [isUNMDRegModalOpen, setIsUNMDRegModalOpen] = useState(false);
  const handleUNMDRegCloseModal = () => {
    setIsUNMDRegModalOpen(false);
  };

  const { UNMCAUSChairdata, msg, error } =
    useSelector((state) => state.UNMCAUS);
  const dispatch = useDispatch();
  const handleStart=(MCAUSChairDetail)=>{
    const data=
      {
        unmcaus:MCAUSChairDetail.id,
        community_session:MCAUSChairDetail.community_session
      
    }
dispatch(finishUNMCAUS(data))
  }
  useEffect(() => {
    if (error) {
      showErrors(error, false, "UNMCAUS_Error");
      dispatch(clearErrors());
    }

    if (msg) {
      showErrors(msg, true, "UNMCAUS_Success");
      dispatch(clearMessages());
      dispatch(getALLUNMCAUSDataChairPOV());
    }
  }, [error, msg]);
  useEffect(() => {
    dispatch(getALLUNMCAUSDataChairPOV());
  }, []);

  return (
    <div>

      <div className="flex justify-center">
        <button
          onClick={() => setIsUNMDRegModalOpen(true)}
          className="mt-5 mx-2 bg-[#66360c] px-4 hover:bg-blue-700 text-almost-white font-bold rounded-xl py-2 text-md sm:text-sm md:text-lg lg:text-xl transition-all flex"
        >
          <FaUserPlus className="mr-2 my-auto border-2 rounded-full lg:text-3xl md:text-2xl text-xl " />
          Register UNMD
        </button>
      </div>
      {isUNMDRegModalOpen && (
        <Modal isOpen={isUNMDRegModalOpen} onClose={handleUNMDRegCloseModal}>
          <h2 className="text-xl font-bold mb-4 border-b-2 pb-4">Add UNMD</h2>
          <div>
            {/* <GSLCheckboxRegSelection
                   
                  handleGSLRegCloseModal={handleUNMDRegCloseModal}
                /> */}
            <UNMDAddRegForm
              markedRollList={markedRollList}
              modelClose={handleUNMDRegCloseModal}
              chairperson_info={chairperson_info}
            />
          </div>
        </Modal>
      )}

      <Table columns={columns}>
        {UNMCAUSChairdata.length > 0 ? (
          <>
            {UNMCAUSChairdata.map((MCAUSChairDetail, index) => {
              const { minutes, seconds } = convertSecondsToMinutesAndSeconds(MCAUSChairDetail.max_time)

              return (
                <tr key={index}>
                  <td className="border rounded-lg p-2 h-10 py-2">
                    {index + 1}
                  </td>
                  <td className="border rounded-lg p-2 h-10 py-2 text-left">
                    {" "}
                    {chairperson_info?.is_portfolio ? (
                      ""
                    ) : (
                      <ReactCountryFlag
                        countryCode={Object.keys(countryCode2Name)
                          .find(
                            (key) =>
                              countryCode2Name[key] === MCAUSChairDetail.country
                          )
                          ?.toUpperCase()}
                        style={{
                          fontSize: "2em",
                          lineHeight: "2em",
                        }}
                        aria-label={MCAUSChairDetail.country}
                        svg
                      />
                    )}
                    <span className="m-3 text-xl">
                      {MCAUSChairDetail.country}
                    </span>
                  </td>
                  <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                    {MCAUSChairDetail.name}
                  </td>
  
                  <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">

                    <span className="text-3xl text-gray-700 font-medium mr-2">{minutes}</span>
                    <span className="text-gray-400 font-medium mr-2">Min</span>
                    <span className="text-3xl text-gray-700 font-medium mr-2">{seconds}</span>
                    <span className="text-gray-400 font-medium">Sec</span>
                  </td>
                  <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                  {MCAUSChairDetail?.starting_time ? (<DateFormatter dateString={MCAUSChairDetail.starting_time}/>):("--")}
                  </td>

                  <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                    {MCAUSChairDetail?.status === "Start" ? (
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2  rounded-lg" onClick={() => handleStart( MCAUSChairDetail )}>Start</button>
                    ) : (MCAUSChairDetail?.status === "Completed" ? <span>Completed</span> : <span>Pending</span>)}
                  </td>
                </tr>
              );
            })}
          </>
        ) : (
          <tr>
            <td colSpan={columns.length} className="p-3 text-red-500 text-2xl">
              No Records Found
            </td>
          </tr>
        )}
      </Table>

    </div>
  );
};

export default UNMCAUSChairDashboard;
