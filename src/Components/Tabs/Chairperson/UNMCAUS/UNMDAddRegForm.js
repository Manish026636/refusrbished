import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUNMCAUSData } from "../../../../actions/UNMCAUSActions";
import MinutesAndSecondsPicker from "../Utils/MinutesAndSecondsPicker";

function UNMDAddRegForm({ pendingMCAUSId, modelClose, chairperson_info }) {
  const { markedRollList } = useSelector((state) => state.roll_call);
  const { pendingCommitteeSession } = useSelector(
    (state) => state.comm_session
  );
  const { UNMCAUSChairDetails } = useSelector((state) => state.UNMCAUS);
  const delegatesCountryOptions = markedRollList?.filter(
    (obj1) =>
      !UNMCAUSChairDetails?.find((obj2) => obj1.delegate === obj2.delegates)
  );

  // const delegatesCountryOptions = markedRollList.filter((markedRollList) => !MCAUSChairDetails.find(MCAUSChairDetail=>markedRoll.delegate===MCAUSChairDetail.delegates))
  const dispatch = useDispatch();
  const [maxTime, timeReceiverHandler] = useState(0);
  const [delegates, setDelegates] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  function validateForm() {
    const errors = {};

    if (!maxTime) {
      errors.maxTime = "Max Time is required";
    } else {
      errors.max_time = "";
    }
    if (!delegates) {
      errors.delegates = "This field is required";
    } else {
      errors.delegates = "";
    }

    // add more validation rules here
    setValidationErrors(errors);
    return true;
  }


  function handleSubmit(event) {
    event.preventDefault();
    // Validation logic

    validateForm();

    if (Object.keys(validationErrors).length === 0) {
      // Submit the form
      console.log("Form submitted successfully.");
    } else {
      const formData = {
        max_time: maxTime,
        delegates: delegates,
        community_session: pendingCommitteeSession?.id,
      }
      modelClose(false);
      return dispatch(addUNMCAUSData(formData));
    }
  }

  return (
    <Fragment>
      {markedRollList?.length > 0 ? (
        <div className="p-4 rounded-lg border-2 ">
          {/* Input Box */}

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="input-box"
            >
              Total Speaking Time
            </label>

            <MinutesAndSecondsPicker timeReceiverHandler={timeReceiverHandler} />

            {validationErrors?.maxTime && (
              <p className="text-red-500 text-xs italic">
                {validationErrors.maxTime}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="input-box"
            >
              {chairperson_info?.is_portfolio ? "Portfolio" : "Country"}
            </label>
          </div>
          <select
            className={`appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 ${validationErrors?.delegates && "border-red-500"
              }`}
            name="delegates"
            onChange={(e) => setDelegates(e.target.value)}
            placeholder="Select Country"
          >
            <option value="">Select {chairperson_info?.is_portfolio ? "Portfolio" : "Country"}</option>
            {delegatesCountryOptions.map((roll) => (
              <option key={roll.id} value={roll.delegate}>
                {roll.country}
              </option>
            ))}
          </select>
          {validationErrors?.delegates && (
            <p className="text-red-500 text-xs italic">
              {validationErrors.delegates}
            </p>
          )}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="w-full max-w-md">
            <p className="text-2xl font-bold text-center ">
              Roll Call has not been completed.
            </p>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default UNMDAddRegForm;
