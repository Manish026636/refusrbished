import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveMCAUSDataChairPOV } from "../../../../../actions/MCAUSActions";
import { countryCode2Name } from "../../../../CountriesName/countryCode2Name";
import MinutesAndSecondsPicker from "../../Utils/MinutesAndSecondsPicker";

function RegistrationForm({ pendingMCAUSId, modelClose, chairperson_info }) {
  const { markedRollList } = useSelector((state) => state.roll_call);
  const { MCAUSChairDetails } = useSelector((state) => state.MCAUS);
  const delegatesCountryOptions = markedRollList.filter(
    (obj1) =>
      !MCAUSChairDetails.find((obj2) => obj1.delegate === obj2.delegates)
  );

  // const delegatesCountryOptions = markedRollList.filter((markedRollList) => !MCAUSChairDetails.find(MCAUSChairDetail=>markedRoll.delegate===MCAUSChairDetail.delegates))
  const dispatch = useDispatch();
  // const [formData, setFormData] = useState({
  //   subtopic_name: "",
  //   max_time: "",
  //   per_person_time: "",
  //   mcausid: pendingMCAUSId.id,
  //   delegates: "",
  // });
  const [subtopicName, setSubtopicName] = useState("");
  const [maxTime, setMaxTime] = useState(0);
  const [perPersonTime, setPerPersonTime] = useState(0);
  // const [mcausid, setMcausid] = useState(pendingMCAUSId.id);
  const [delegates, setDelegates] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  function validateForm() {
    const errors = {};
    if (!subtopicName) {
      errors.subtopicName = "Subtopic is required";
    } else {
      errors.subtopicName = "";
    }
    if (!maxTime) {
      errors.maxTime = "Max Time is required";
    }
    else if (maxTime == 0)
      errors.maxTime = "Max Time cannot be 0"
    else {
      errors.maxTime = "";
    }
    if (!perPersonTime) {
      errors.perPersonTime = "Per Person Time is required";
    } else {
      errors.perPersonTime = "";
    }
    if (maxTime < perPersonTime) {
      errors.maxTime = "Max Time must be greater than Per Person Time";
      errors.perPersonTime = "Per Person Time should be less than Max Time";

    }
    else if (perPersonTime == 0)
      errors.perPersonTime = "Per Person Time cannot be 0"
    else {
      errors.maxTime = ""
      errors.perPersonTime = "";
    }
    if (!delegates) {
      errors.delegates = "Delegates is required";
    } else {
      errors.delegates = "";
    }

    // add more validation rules here
    setValidationErrors(errors);
    return true;
  }

  // function handleInputChange(event) {
  //   const { name, value } = event.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // }

  function handleSubmit(event) {
    event.preventDefault();
    if (Object.values(validationErrors).every((error) => error !== "")) {
      return validateForm();
    }
    modelClose(false);
    const formData = {
      subtopic_name: subtopicName,
      max_time: maxTime,
      per_person_time: perPersonTime,
      mcausid: pendingMCAUSId.id,
      delegates: delegates,
    }
    console.log(formData);
    return dispatch(saveMCAUSDataChairPOV(formData));
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
              Topic Name
            </label>
            <input
              className={`appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${validationErrors?.subtopic_name && "border-red-500"
                }`}
              id="input-box"
              type="text"
              placeholder="Topic Name"
              name="subtopic_name"
              onChange={(e) => setSubtopicName(e.target.value)}
            />
            {validationErrors?.subtopicName && (
              <p className="text-red-500 text-xs italic">
                {validationErrors.subtopicName}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="input-box"
            >
              Total Speaking Time
            </label>
            {/* <input
              className={`appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${validationErrors?.max_time && "border-red-500"
                }`}
              id="input-box"
              type="number"
              placeholder="Enter Total time in seconds"
              onChange={(e) => setMaxTime(e.target.value)}
              name="max_time"
            /> */}
            
            <MinutesAndSecondsPicker timeReceiverHandler={setMaxTime} />

            {validationErrors?.maxTime && (
              <p className="text-red-500 text-xs italic">
                {validationErrors?.maxTime}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="input-box"
            >
              Per Speaker Speaking Time
            </label>
            {/* <input
              className={`appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                validationErrors?.per_person_time && "border-red-500"
              }`}
              id="input-box"
              type="number"
              placeholder="Input placeholder"
              onChange={handleInputChange}
              name="per_person_time"
            /> */}
            <MinutesAndSecondsPicker timeReceiverHandler={setPerPersonTime} />
            {validationErrors?.perPersonTime && (
              <p className="text-red-500 text-xs italic">
                {validationErrors?.perPersonTime}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="input-box"
            >
              Submitting{" "}
              {chairperson_info?.is_portfolio ? "Portfolio" : "Country"}
            </label>
          </div>
          <select
            className={`appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 ${validationErrors?.delegates && "border-red-500"
              }`}
            name="delegates"
            onChange={(e) => setDelegates(e.target.value)}
            placeholder={`Select ${chairperson_info?.is_portfolio ? "Portfolio" : "Country"}`}
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

export default RegistrationForm;
