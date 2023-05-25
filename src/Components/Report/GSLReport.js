import Table from "../Tabs/Chairperson/Utils/Table";
import ReactCountryFlag from "react-country-flag";
import { countryName2Code } from "../CountriesName/countryName2Code";
import { useState } from "react";
const GSLReport = ({ report, delegate_info }) => {
  const [GSLData, setGSLData] = useState(report?.GSL);
  const [action, setAction] = useState(false); //false -> ascending, true -> descending
  const columns = [
    {label:"Sr No.",value:''},
    {label:"Country",value:''},
    {label:"Name",value:''},
    {label:"Opening Statements",value:'opening_statements'},
    {label:"Closing Statements",value:'closing_statements'},
    {label:"Foreign Policy",value:'foreign_policy'},
    {label:"Marks on Cheat",value:'marks_on_cheat'},
    {label:"POI",value:'poi'},
    {label:"Notes",value:''},
    {label:"Overall Performance",value:'overall_performance'},
    {label:"Time Taken",value:'time_taken'},
    {label:"Session",value:'session'},
    {label:"Date",value:'created_at'},
  ];

  const HandleTable = (res) => {
    if (action && res !== "") {
      setGSLData(
        GSLData.sort((a, b) => a[res] - b[res])
      );
    } else {
      setGSLData(
        GSLData.sort((a, b) => b[res] - a[res])
      );
    }
    // alert(res);
    setAction(!action);
  };

  return (
    <div className="my-2">
      <h1 className="text-deep-orange-400 font-bold text-lg text-center">
        GSL Report
      </h1>
      <div className="flex flex-col-reverse lg:flex-row justify-center items-center">
        <Table className="flex-[3]" columns={columns} HandleTable={HandleTable} isInteractive={true}>
          {GSLData?.length > 0 ? (
            <>
              {GSLData?.map((GSL, index) => {
                return (
                  <tr
                    key={index}
                  >
                    <td className={`border rounded-lg p-2 h-10 py-2`}>
                      {index + 1}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-left">
                      {delegate_info?.is_portfolio ? (
                        ""
                      ) : (
                        <ReactCountryFlag
                          countryCode={countryName2Code[GSL?.country]}
                          style={{
                            fontSize: "2em",
                            lineHeight: "2em",
                            display: "flex",
                            alignItems: "center",
                          }}
                          aria-label={GSL.country}
                          svg
                        />
                      )}
                      <span className="m-3 text-xl text-left">
                        {GSL?.country}
                      </span>
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {GSL?.name}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {GSL?.opening_statements ? GSL?.opening_statements : "NA"}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {GSL?.closing_statements ? GSL?.closing_statements : "NA"}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {GSL?.foreign_policy ? GSL?.foreign_policy : "NA"}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {GSL?.marks_on_cheat ? GSL?.marks_on_cheat : "NA"}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {GSL?.poi ? GSL?.poi : "NA"}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {GSL?.notes ? GSL?.notes : "NA"}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {GSL?.overall_performance
                        ? GSL?.overall_performance
                        : "NA"}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {GSL?.time_taken
                        ? GSL?.time_taken + " sec"
                        : "NA"}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {GSL?.session}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {GSL?.created_at.split("T")[0]}
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
          Total GSL: {report?.GSL.length}
        </p>
      </span>
    </div>
  );
};

export default GSLReport;
