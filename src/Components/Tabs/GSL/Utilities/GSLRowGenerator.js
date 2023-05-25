import { Fragment, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { countries } from "../../../CountriesName/countries";
import { useDispatch } from "react-redux";
import { currentGSLSelected } from "../../../../actions/GSLActions";
import { useSelector } from "react-redux";
const GSLRowGenerator = ({ GSLInfo, index }) => {
  const [isStarted, setIsStarted] = useState(false);
  const { currentGSL } = useSelector((state) => state.GSL);
  const dispatch = useDispatch();
  const HandleSelect = (status) => {
    const data = {
      id: GSLInfo.id,
      status: status,
    };
    dispatch(currentGSLSelected(data));
    console.log(GSLInfo.id);
  };
  return (
    <Fragment>
      {GSLInfo && (
        <tr
          className={`w-[100vw] md:overflow-x-auto md:w-fit text-xs font-semibold tracking-wide text-center text-black `}
        >
          <th className="w-6 border-r-2 font-bold py-6">{index}</th>
          <th className="w-16  border-r-2 text-black">{GSLInfo.name}</th>
          <th className="w-20 border-r-2">
            {countries[GSLInfo.country.toUpperCase()]}
          </th>
          <th className="w-10 border-r-2">
            <ReactCountryFlag
              svg
              countryCode={GSLInfo.country.toUpperCase()}
              title="US"
              className=""
              style={{
                fontSize: "2.5em",
                lineHeight: "2em ",
              }}
            />
          </th>
          {GSLInfo.status ? (
            <th className="w-20">
              {GSLInfo.status === "completed" ? (
                <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Show Details
                </button>
              ) : (
                <>
                  {GSLInfo?.status === "pending" ? (
                    currentGSL?.status !== "pending" ? (
                      <button
                        className="bg-gradient-to-r from-purple-300 to-indigo-400 text-white font-bold py-2 px-4 rounded"
                        onClick={() => HandleSelect("pending")}
                        disabled={GSLInfo?.id === currentGSL?.id ? true : false}
                      >
                        START
                      </button>
                    ) : (
                      <button
                        className="bg-gradient-to-r from-red-300 to-purple-400 text-white font-bold py-2 px-4 rounded"
                        onClick={() => HandleSelect("completed")}
                      >
                        Stop
                      </button>
                    )
                  ) : (
                    <button
                      className="bg-gradient-to-r from-red-300 to-purple-400 text-white font-bold py-2 px-4 rounded"
                      onClick={() => HandleSelect("completed")}
                    >
                      Stop
                    </button>
                  )}
                </>
              )}
            </th>
          ) : (
            <button
              className="bg-gradient-to-r from-purple-300 to-indigo-400 text-white font-bold py-2 px-4 rounded"
              onClick={() => HandleSelect("pending")}
            >
              START
            </button>
          )}
        </tr>
      )}
    </Fragment>
  );
};
export default GSLRowGenerator;
