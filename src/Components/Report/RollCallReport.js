import Table from "../Tabs/Chairperson/Utils/Table";
import ReactCountryFlag from "react-country-flag";
import { countryName2Code } from "../CountriesName/countryName2Code";
import Chart from "./utils/Chart";

const RollCallReport = ({report, delegate_info}) => {
    const columns = ["Sr No.", "Portfolio","Name", "Roll Call", "Date"];

    const rollData = {
      val: [(report?.total_delegate - (report?.total_delegate - report?.rollcall?.length)), (report?.total_delegate - report?.rollcall?.length)],
      labels: [
          "Present Delegates",
          "Absent Delegates",
      ]
    }
  return (
    <div>
    <h1 className="text-deep-orange-400 text-center font-bold text-lg">
      Roll Call
    </h1>
    <div className="flex flex-col-reverse lg:flex-row justify-center items-center">
      <Table className="flex-[3]" columns={columns}>
        {report?.rollcall.length > 0 ? (
          <>
            {report?.rollcall.map((rollcall, index) => {
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
                        countryCode={
                          countryName2Code[rollcall?.country]
                        }
                        style={{
                          fontSize: "2em",
                          lineHeight: "2em",
                        }}
                        aria-label={rollcall.country}
                        svg
                      />
                    )}
                    <span className="m-3 text-xl">
                      {rollcall?.country}
                    </span>
                  </td>
                  <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                    {rollcall?.name}
                  </td>
                  <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                    {rollcall?.roll_call === "present_and_voting" && "Present and Voting"}
                    {rollcall?.roll_call === "present" && "Present"}
                    {rollcall?.roll_call === "absent" && "Absent"}
                  </td>
                  <td className="border rounded-lg p-2 h-10 py-2 text-center align-middle">
                    {rollcall?.created_at.split("T")[0]}
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
      <div className="flex-1">
        <Chart data={rollData}/>
      </div>
    </div>
    <span>
        <p className="text-center lg:text-left font-semibold">Total Delegates: {report?.total_delegate}</p>
        <p className="text-center lg:text-left font-semibold">Presnet Delegates: {report?.rollcall.length}</p>
        <p className="text-center lg:text-left font-semibold">Absent Delegates: {report?.total_delegate - report?.rollcall.length}</p>
    </span>
  </div>
  )
}

export default RollCallReport