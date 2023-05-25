import Table from "../Tabs/Chairperson/Utils/Table";
import ReactCountryFlag from "react-country-flag";
import { countryName2Code } from "../CountriesName/countryName2Code";
import { useState } from "react";

const FinalReport = ({ report, delegate_info }) => {
    const [OverAllData, setOverAllData] = useState(report?.Overall_Result);
    const [action, setAction] = useState(false); //false -> ascending, true -> descending
  const columns = [
    {label:"Sr No.",value: ""},
    {label:"Country",value: ""},
    {label:"GSL Performance",value: "GSL_Performance"},
    {label:"MD Performance",value: "MD_Performance"},
    {label:"Average Performance",value: "Average_Performance"},
  ];

  const HandleTable = (res) => {
    if (action && res !== "") {
      setOverAllData(
        OverAllData.sort((a, b) => a[res] - b[res])
      );
    } else {
      setOverAllData(
        OverAllData.sort((a, b) => b[res] - a[res])
      );
    }
    // alert(res);
    setAction(!action);
  };

  return (
    <div>
      <h1 className="text-deep-orange-400 text-center font-bold text-lg">
        Final Report
      </h1>
      <div className="flex flex-col-reverse lg:flex-row justify-center items-center">
        <Table className="flex-[3]" columns={columns} HandleTable={HandleTable}  isInteractive={true}>
          {report?.Overall_Result?.length > 0 ? (
            <>
              {OverAllData?.map((final, index) => {
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
                          countryCode={countryName2Code[final?.country]}
                          style={{
                            fontSize: "2em",
                            lineHeight: "2em",
                          }}
                          aria-label={final.country}
                          svg
                        />
                      )}
                      <span className="m-3 text-xl">{final?.country}</span>
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {final?.GSL_Performance}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {final?.MD_Performance}
                    </td>
                    <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                      {final?.Average_Performance}
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
          Total Delegates: {report?.Overall_Result?.length}
        </p>
      </span>
    </div>
  );
};



export default FinalReport