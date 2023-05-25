import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  clearMessages,
  getMarkedRollList,
  getRollList,
  doRollCall,
} from "../../../../actions/rollCallActions";
import ReactCountryFlag from "react-country-flag";
import Loader from "../../../Loader/Loader";
import { showErrors } from "../../Utilities/errorShow";
import Table from "../Utils/Table";
import { countryName2Code } from "../../../CountriesName/countryName2Code";

const RollCall = ({
  chairperson_info,
  CommitteeSessionData,
  markedRollList,
}) => {
  const { loading, rollList, message, error } = useSelector(
    (state) => state.roll_call
  );
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const columns = [
    "Sr No",
    "Name",
    chairperson_info?.is_portfolio ? "Portfolio" : "Country",
    "Actions",
  ];
  const HandleSubmit = (id, value) => {
    const data = {
      roll_call: value,
      delegate: id,
      session: CommitteeSessionData,
    };
    dispatch(doRollCall(data));
  };
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredData = rollList?.filter((item) =>
    item.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    dispatch(getRollList(chairperson_info.community));
    dispatch(getMarkedRollList(CommitteeSessionData));
  }, []);
  useEffect(() => {
    if (error) {
      showErrors(error, false, "roll_error");
      dispatch(clearErrors());
    }
    if (message) {
      showErrors(message, true, "roll_success");
      dispatch(clearMessages());
      dispatch(getMarkedRollList(CommitteeSessionData));
    }
  }, [error, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        rollList?.length > 0 && (
          <div className="mb-2">
            <div className="flex mt-4 justify-center items-center">
              <div class="grid place-items-center h-full w-12 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>

              </div>
              <input
                type="text"
                id="searchbox"
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="p-2 w-1/3 text-black placeholder-gray-500 transition-all duration-200 border border-teal-500 rounded-xl bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 my-2"
                placeholder="Seach Delegate by Country"
              />
            </div>
            <div className=" table-responsive ">
              <Table columns={columns}>
                {filteredData.map((student, index) => (
                  <tr key={index} className="hover:bg-[#f4f6f9] justify-evenly">
                    <td className="border font-bold px-4 py-2">{index + 1}</td>
                    <td className="border font-bold px-4 py-2">{student.name}</td>

                    <td className="border font-bold px-4 py-2">
                      {chairperson_info?.is_portfolio ? (
                        <p className="font-semibold">{student.country}</p>
                      ) : (
                        <div className="flex   items-center">
                          <ReactCountryFlag
                            countryCode={countryName2Code[student.country]}
                            className="mr-2 rounded-lg"
                            svg
                            style={{
                              fontSize: "2em",
                              lineHeight: "2em",
                            }}
                          />
                          <span>{student.country}</span>
                        </div>
                      )}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <span className="m-3 flex justify-center">
                        <button
                          onClick={() => HandleSubmit(student.id, "present")}
                          className={`text-white font-semibold py-2 px-4 ml-3 rounded-xl transition-all ${!markedRollList?.some(
                            (item) => item.delegate === student.id
                          )
                              ? "bg-blue-500 hover:bg-blue-600"
                              : markedRollList?.some(
                                (item) =>
                                  item.delegate === student.id &&
                                  item.roll_call === "present"
                              )
                                ? "bg-light-blue-400 "
                                : "bg-gray-500 hover:bg-gray-600"
                            }`}
                          disabled={markedRollList?.find(
                            (item) => item.delegate === student.id
                          )}
                        >
                          Present
                        </button>

                        <button
                          onClick={() =>
                            HandleSubmit(student.id, "present_and_voting")
                          }
                          className={`text-white font-semibold py-2 px-4 ml-3 rounded-xl transition-all ${!markedRollList?.some(
                            (item) => item.delegate === student.id
                          )
                              ? " bg-cyan-500 hover:bg-blue-600"
                              : markedRollList?.some(
                                (item) =>
                                  item.delegate === student.id &&
                                  item.roll_call === "present_and_voting"
                              )
                                ? "bg-indigo-400"
                                : "bg-gray-500 hover:bg-gray-600"
                            }`}
                          disabled={markedRollList?.find(
                            (item) => item.delegate === student.id
                          )}
                        >
                          Present & Voting
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default RollCall;
