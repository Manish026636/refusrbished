import React, { useState } from "react";

const SearchBox = ({ rollList, setFilteredData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  setFilteredData(
    rollList?.filter((item) =>
      item.country.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="flex justify-center items-center">
      <label className="text-base font-bold text-gray-900" htmlFor="searchbox">
        Search:{" "}
      </label>
      <input
        type="text"
        id="searchbox"
        value={searchQuery}
        onChange={handleSearchInputChange}
        className={`p-4 text-black placeholder-gray-500 transition-all duration-200 border rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 border-gray-400 my-2`}
      />
    </div>
  );
};

export default SearchBox;
