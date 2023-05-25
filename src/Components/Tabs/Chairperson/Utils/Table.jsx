import React, { useState } from "react";
const Table = ({ columns, children, HandleTable, isInteractive }) => {
  const [clickedHeader, setClickedHeader] = useState(null);
  function HandleCick (val){
    if (HandleTable) {
      HandleTable(val);
      setClickedHeader(val);
    }
  };
  return (
    <div className="mt-2 container mx-auto pb-3">
      <div className="mt-6 overflow-auto rounded-2xl border-2 border-t-0">
        <div className="table-container scrollbar-hide h-90">
          <table className="text-center  table-auto w-full">
            <thead className="top-0 bg-[#f4f6f9] text-gray-800">
              <tr>
                {columns?.length > 0 &&
                  columns.map((column, i) => (
                    <th
                      onClick={() => HandleCick(column?.value)}
                      key={i}
                      className={`py-5 rounded-lg ${column?.value && isInteractive ? "cursor-pointer" : ""} ${clickedHeader && clickedHeader === column?.value ? "bg-blue-500 text-white rounded-lg" : ""}}`}
                    >
                      {isInteractive ? column?.label : column}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="text-gray-700 overflow-y-auto ">{children}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Table;
