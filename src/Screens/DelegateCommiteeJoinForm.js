import { Button } from "@material-tailwind/react";
import React, { Fragment, useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearErrors,
  clearMessages,
  delegateJoining,
  getDelegateDetails,
} from "../actions/deligateActions";
import Loader from "../Components/Loader/Loader";
import { showErrors } from "../Components/Tabs/Utilities/errorShow";
import { countryCode2Name } from "../Components/CountriesName/countryCode2Name";

const DelegateCommiteeJoinForm = () => {
  const { loading, delegate_info, error, msg } = useSelector(
    (state) => state.delegate_details
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [committeeToken, setCommitteeToken] = useState("");
  const [country, setCountry] = useState("");
  const [isPortfolio, setIsPortfolio] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (committeeToken.length < 1) {
      showErrors("Enter Committee token", false, "comm-token-error");
      return false;
    }
    const committeeObj = {
      community_token: committeeToken,
      country: countryCode2Name[country?.trim().toUpperCase()],
    };
    dispatch(delegateJoining(committeeObj));
  };
  useEffect(() => {
    dispatch(getDelegateDetails());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (delegate_info?.community) {
      navigate("/dashboard");
    }
    if (error) {
      showErrors(error, false, "comm-form-error");
      dispatch(clearErrors());
    }
    if (msg) {
      showErrors(msg, true, "comm-form-success");
      dispatch(clearMessages());
    }
  }, [error, msg, delegate_info]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full bg-grey-lightest" style={{ paddingTop: "4rem" }}>
          <div className="container mx-auto py-8">
            <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
              <div className="py-4 px-8 text-primary text-xl border-b border-grey-lighter text-center">
                Join the Committee
              </div>
              <form>
                <div className="py-4 px-8">
                  <div className="mb-4">
                    <label
                      className="block text-blue-gray-800 text-sm font-bold mb-2"
                      htmlFor="commiteeToken"
                    >
                      Committee Token
                    </label>
                    <input
                      className="bg-white border border-gray-400 focus:outline-blue-600 rounded w-full py-2 px-3 text-grey-darker"
                      id="commiteeToken"
                      type="text"
                      placeholder="Enter your Committee Token"
                      onChange={(e) => setCommitteeToken(e.target.value)}
                    />
                  </div>
                  <div className="mb-4 flex flex-row items-center">
                    <label
                      className="block text-blue-gray-800  text-sm font-bold"
                      htmlFor="isPortfolio"
                    >
                      Portfolio
                    </label>
                    <input
                      type="checkbox"
                      className="ml-2"
                      name="isPortfolio"
                      id="isPortfolio"
                      onChange={(e) => setIsPortfolio(e.target.checked)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-blue-gray-800 text-sm font-bold mb-2"
                      htmlFor="country"
                    >
                      {isPortfolio ? "Enter Portfolio" : "Choose your Country"}
                    </label>
                    {isPortfolio ? (
                      <div>
                        <input
                          className="bg-white border border-gray-400 focus:outline-blue-600 rounded w-full py-2 px-3 text-grey-darker"
                          id="country"
                          type="text"
                          placeholder="Enter portfolio name"
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      </div>
                    ) : (
                      <ReactFlagsSelect
                        onSelect={(code) => setCountry(code)}
                        selected={country}
                        defaultCountry="IN"
                        searchable={true}
                        searchPlaceholder="Search for a country"
                      />
                    )}
                  </div>
                  {error?.country && (
                    <span className="text-red-500 font-thin my-2">
                      {error.country[0]}
                    </span>
                  )}
                  <div className="flex items-center align-center justify-between mt-8">
                    <Button color="cyan" type="submit" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            {/* {delegate && (
              <div className="flex justify-center items-center mt-3">
                <div className="w-1/2 px-3 mb-5 h-full">
                  <label
                    htmlFor="prevCommittee"
                    className="text-sm text-gray-800 font-semibold px-1"
                  >
                    Select your committee
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center text-black">
                      <AiOutlineUsergroupAdd />
                    </div>
                    <select
                      className="w-full -ml-10 pl-10 pr-3 p-2.5 rounded-lg border-2 outline-blue-gray-500  border-gray-500 text-black bg-gray-50 "
                      onChange={(e) => setCommitteeToken(e.target.value)}
                      value={committeeToken}
                      title="Select your committee"
                      id="prevCommittee"
                    >
                      <option defaultValue>Select Committee</option>
                      {delegate.map((res, i) => (
                        <option key={i} value={res.community}>
                          {res.community_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button
                    type="submit"
                    onClick={handleSelect}
                    className="float-right mt-2"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )} */}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DelegateCommiteeJoinForm;
