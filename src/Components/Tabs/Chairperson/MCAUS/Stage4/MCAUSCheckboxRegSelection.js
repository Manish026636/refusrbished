import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useDispatch, useSelector } from "react-redux";
import { countryName2Code } from "../../../../CountriesName/countryName2Code";
import {
  addMCAUSData,
  addMCAUSSpeakerData,
  clearErrors,
  clearMessages,
  putMCAUSId,
} from "../../../../../actions/MCAUSActions";
import { showErrors } from "../../../Utilities/errorShow";
import NextStageButton from "../../Utils/NextStageButton";
import convertSecondsToMinutesAndSeconds from "../../Utils/convertSecondsToMinutesAndSeconds";

export default function MCAUSCheckboxRegSelection({
  markedRollList,
  pendingMCAUSId,
  MCAUSSpeakers,
  chairperson_info,
}) {
  const { loading, passedVotingTopic, error, msg } = useSelector(
    (state) => state.vote
  );
  const maxTime = convertSecondsToMinutesAndSeconds(
    passedVotingTopic.topic.max_time
  );
  const perPersonTime = convertSecondsToMinutesAndSeconds(
    passedVotingTopic.topic.per_person_time
  );
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredData = markedRollList?.filter((item) =>
    item.country.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addMCAUSSpeakerData({
        delegatesIds: [...selectedIds],
        topic: passedVotingTopic.topic.id,
      })
    );
  };

  function handleToggle(id) {
    if (
      selectedIds.size <
      parseInt(
        passedVotingTopic.topic.max_time /
        passedVotingTopic.topic.per_person_time
      )
    ) {
      const nextIds = new Set(selectedIds);
      if (nextIds.has(id)) {
        nextIds.delete(id);
      } else {
        nextIds.add(id);
      }
      setSelectedIds(nextIds);
    }
  }

  const handleNextStage = (e) => {
    e.preventDefault();
    dispatch(
      putMCAUSId({
        ...pendingMCAUSId,
        stage: pendingMCAUSId.stage + 1,
      })
    );
  };

  useEffect(() => {
    if (error) {
      showErrors(error, false, "mcaus-error");
      dispatch(clearErrors());
    }
    if (msg) {
      showErrors(msg, true, "mcaus-msg");
      dispatch(clearMessages());
    }
  }, [error, msg, dispatch]);

  return (
    <>
      {passedVotingTopic && (
        <>
          <div className="text-center">
            <h1 className="text-blue-500 font-bold lg:text-2xl my-6">
              Add Delegates for Discussion on {" "}
              <span className="font-bold bg-gradient-to-r from-blue-600 to-light-blue-600 text-white border-2 border-cyan-300 w-full px-4 py-2 rounded-xl">{passedVotingTopic.topic.topic_name}</span>
            </h1>

            

            <div className=" text-xl font-bold text-cyan-700 py-2 px-4 mt-3  mb-2 max-h-screen overflow-y-auto">
              Select Delegates : {selectedIds.size} out of{" "}
              {parseInt(
                passedVotingTopic.topic.max_time /
                passedVotingTopic.topic.per_person_time
              )}{" "}
              (Expected Total)
            </div>

            <div className="mx-auto flex justify-center items-center">
              {markedRollList?.length > 0 ? (
                <ul>
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
                  className="p-2 w-4/5 text-black placeholder-gray-500 transition-all duration-200 border border-teal-500 rounded-xl bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 my-2"
                  placeholder="Seach Delegate by Country"
                />
              </div>
                  {filteredData?.map((item, index) => {
                    const isChecked = selectedIds.has(item.delegate);
                    return (
                      <li key={index} className="p-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-6 w-6 rounded border-gray-300"
                            checked={isChecked}
                            onChange={() => handleToggle(item.delegate)}
                          />
                          {chairperson_info?.is_portfolio ? (
                            ""
                          ) : (
                            <ReactCountryFlag
                              countryCode={countryName2Code[item.country]}
                              style={{
                                fontSize: "2em",
                                lineHeight: "2em",
                                marginLeft: "1rem",
                              }}
                              aria-label={item.country}
                              svg
                            />
                          )}
                          <span className="ml-2">{item.country}</span>{" "}
                        </label>
                      </li>
                    );
                  })}
                  <div>
                    {selectedIds.size ===
                      parseInt(
                        passedVotingTopic.topic.max_time /
                        passedVotingTopic.topic.per_person_time
                      ) ? (
                      <small className="text-red-500">Max limit reached</small>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="text-center">
                    <button
                      onClick={handleSubmit}
                      className="bg-teal-500 hover:bg-green-700 text-white font-bold py-2 px-8 mt-4 mr-2 mb-3 rounded-xl"
                    >
                      Submit
                    </button>
                  </div>
                </ul>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <div className="w-full max-w-md">
                    <p className="text-2xl font-bold text-center ">
                      Roll Call has not been completed.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <NextStageButton
            btnLabel={"Proceed for MCAUS"}
            handleNextStage={handleNextStage}
          />
        </>
      )}

      {!passedVotingTopic && (
        <div className="m-3 text-red-500">No Motion Topics Passed</div>
      )}
    </>
  );
}
