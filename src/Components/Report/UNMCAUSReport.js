import Table from "../Tabs/Chairperson/Utils/Table";
import ReactCountryFlag from "react-country-flag";
import { countryName2Code } from "../CountriesName/countryName2Code";
import { useState } from "react";
import convertSecondsToMinutesAndSeconds from "../Tabs/Chairperson/Utils/convertSecondsToMinutesAndSeconds";

const UNMCAUSReport = ({ report, delegate_info }) => {
    const [UNMCAUSData, setUNMCAUSData] = useState(report?.UNMD);
    const [action, setAction] = useState(false); //false -> ascending, true -> descending
  const columns = [
    {label:"Sr No.",value: ""},
    {label:"Country",value: ""},
    {label:"Name",value: ""},
    {label:"Session",value: "session"},
    {label:"Started Time",value: "starting_time"},
    {label:"Max Time",value: "max_time"},
    {label:"Date",value: "created_at"}
  ];

  const HandleTable = (res) => {
    if (action && res !== "") {
      setUNMCAUSData(
        UNMCAUSData.sort((a, b) => a[res] - b[res])
      );
    } else {
      setUNMCAUSData(
        UNMCAUSData.sort((a, b) => b[res] - a[res])
      );
    }
    // alert(res);
    setAction(!action);
  };

  return (
    <div>
      <h1 className="text-deep-orange-400 text-center font-bold text-lg">
        UNMCAUS Report
      </h1>
      <div className="flex flex-col-reverse lg:flex-row justify-center items-center">
        <Table className="flex-[3]" columns={columns} HandleTable={HandleTable}  isInteractive={true}>
          {report?.UNMD.length > 0 ? (
            <>
              {UNMCAUSData?.map((unmd, index) => {
                const { minutes, seconds } = convertSecondsToMinutesAndSeconds(unmd?.max_time)
                return (
                  <tr key={index}>
                    <td className=" border rounded-lg p-2 h-10 py-2">
                      {index + 1}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-left">
                      {delegate_info?.is_portfolio ? (
                        ""
                      ) : (
                        <ReactCountryFlag
                          countryCode={countryName2Code[unmd?.country]}
                          style={{
                            fontSize: "2em",
                            lineHeight: "2em",
                          }}
                          aria-label={unmd.country}
                          svg
                        />
                      )}
                      <span className="m-3 text-xl">{unmd?.country}</span>
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {unmd?.name}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {unmd?.session}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {unmd?.starting_time ? unmd?.starting_time : "Not Started"}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {minutes} Min : {seconds} Sec
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {unmd?.created_at.split("T")[0]}
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
          Total UNMCAUS: {report?.UNMD.length}
        </p>
      </span>
    </div>
  );
};

export default UNMCAUSReport;
