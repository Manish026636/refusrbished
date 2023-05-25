import { useState } from "react";
// import Table from '../Utils/Table';
import ReactCountryFlag from "react-country-flag";
import { countryName2Code } from "../../../CountriesName/countryName2Code";
import { useDispatch } from "react-redux";
import {
  addGSLData,
  getALLGSLDataChairPOV,
} from "../../../../actions/GSLActions";

export default function GSLCheckboxRegSelection({
  markedRollList,
  handleGSLRegCloseModal,
  chairperson_info,
}) {
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
    dispatch(addGSLData([...selectedIds]));
    handleGSLRegCloseModal();
    dispatch(getALLGSLDataChairPOV());
  };
  function handleToggle(id) {
    const nextIds = new Set(selectedIds);
    if (nextIds.has(id)) {
      nextIds.delete(id);
    } else {
      nextIds.add(id);
    }
    setSelectedIds(nextIds);
  }
  return (
    <>
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
              className="p-2 w-3/4 text-black placeholder-gray-500 transition-all duration-200 border border-teal-500 rounded-xl bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 my-2"
              placeholder="Seach Delegate by Country"
            />
          </div>
          {filteredData.map((item, index) => {
            const isChecked = selectedIds.has(item.delegate);
            return (
              <li key={index} className="p-3">
                <label className="flex  items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 rounded-xl border-gray-300"
                    checked={isChecked}
                    onChange={() => handleToggle(item.delegate)}
                  />
                  {chairperson_info?.is_portfolio ? (
                    ""
                  ) : (
                    <ReactCountryFlag
                      countryCode={countryName2Code[item.country]}
                      className="rounded-lg"
                      style={{
                        fontSize: "2em",
                        lineHeight: "2em",
                        marginLeft: "1rem",
                      }}
                      aria-label={item.country}
                      svg
                    />
                  )}
                  <span className="ml-2 font-bold text-gray-700"> {item.country}</span>
                </label>
              </li>
            );
          })}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="bg-teal-500 hover:bg-green-700 text-white font-bold py-2 px-8 mr-2 mb-3 rounded-xl"
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
    </>
  );
}
