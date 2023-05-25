import Table from "../Tabs/Chairperson/Utils/Table";
import ReactCountryFlag from "react-country-flag";
import { countryName2Code } from "../CountriesName/countryName2Code";
import { useState } from "react";
const MCAUSReport = ({ report, delegate_info }) => {
  const [MCAUSData, setMCAUSData] = useState(report?.MD);
  const [action, setAction] = useState(false); //false -> ascending, true -> descending
  const columns = [
    { label: "Sr No.", value: "" },
    { label: "Country", value: "" },
    { label: "Name", value: "" },
    { label: "Topic", value: "" },
    { label: "Opening Statements", value: "opening_statements" },
    { label: "Closing Statements", value: "closing_statements" },
    { label: "Foreign Policy", value: "foreign_policy" },
    { label: "Marks on Cheat", value: "marks_on_cheat" },
    { label: "POI", value: "poi" },
    { label: "Notes", value: "" },
    { label: "Overall Performance", value: "overall_performance" },
    { label: "Time Taken", value: "timeTaken" },
    { label: "Session", value: "session" },
    { label: "Date", value: "created_at" },
  ];

  const HandleTable = (res) => {
    if (action && res !== "") {
      setMCAUSData(MCAUSData.sort((a, b) => a[res] - b[res]));
    } else {
      setMCAUSData(MCAUSData.sort((a, b) => b[res] - a[res]));
    }
    // alert(res);
    setAction(!action);
  };

  return (
    <div className="my-2">
      <h1 className="text-deep-orange-400 font-bold text-lg text-center">
        MCAUS Report
      </h1>
      <div className="flex flex-col-reverse lg:flex-row justify-center items-center">
        <Table
          className="flex-[3]"
          columns={columns}
          HandleTable={HandleTable}
          isInteractive={true}
        >
          {MCAUSData?.length > 0 ? (
            <>
              {MCAUSData?.map((md, index) => {
                return (
                  <tr key={index}>
                    <td className={`border rounded-lg p-2 h-10 py-2`}>
                      {index + 1}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-left">
                      {delegate_info?.is_portfolio ? (
                        ""
                      ) : (
                        <ReactCountryFlag
                          countryCode={countryName2Code[md?.country]}
                          style={{
                            fontSize: "2em",
                            lineHeight: "2em",
                            display: "flex",
                            alignItems: "center",
                          }}
                          aria-label={md.country}
                          svg
                        />
                      )}
                      <span className="m-3 text-xl text-left">
                        {md?.country}
                      </span>
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {md?.name}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {md?.topic}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {md?.opening_statements ? md?.opening_statements : "NA"}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {md?.closing_statements ? md?.closing_statements : "NA"}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {md?.foreign_policy ? md?.foreign_policy : "NA"}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {md?.marks_on_cheat ? md?.marks_on_cheat : "NA"}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {md?.poi ? md?.poi : "NA"}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {md?.notes ? md?.notes : "NA"}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {md?.overall_performance ? md?.overall_performance : "NA"}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {md?.timeTaken ? md.timeTaken + " sec" : "NA"}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {md?.session}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {md?.created_at.split("T")[0]}
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
      <span>
        <p className="text-center lg:text-left font-semibold">
          Total MCAUS: {report?.MD.length}
        </p>
      </span>
    </div>
  );
};

export default MCAUSReport;
