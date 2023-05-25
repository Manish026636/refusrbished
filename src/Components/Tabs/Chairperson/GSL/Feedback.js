import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveGSLInfo } from "../../../../actions/GSLActions";
import { showErrors } from "../../Utilities/errorShow";

const Feedback = ({ handleGSLInfoCloseModal }) => {
  const { isCurrentGSLSpeaker } = useSelector((state) => state.GSL);

  const [openingStatements, setOpeningStatements] = useState();
  const [closingStatements, setClosingStatements] = useState();
  const [foreignPolicy, setForeignPolicy] = useState();
  const [poi, setPoi] = useState();
  const [marksOnCheat, setMarksOnCheat] = useState();
  const [notes, setNotes] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    // submit the form
    const GSLRawData = {
      opening_statements: openingStatements,
      closing_statements: closingStatements,
      foreign_policy: foreignPolicy,
      marks_on_cheat: marksOnCheat,
      poi: poi,
      notes: notes,
      gsl: isCurrentGSLSpeaker?.id,
    };
    if(openingStatements > 10 || closingStatements > 10 || foreignPolicy > 10 || marksOnCheat > 10 || poi > 10){
      showErrors("Marks cannot be greater than 10", false, "Error")
      return;
    }
    dispatch(saveGSLInfo(GSLRawData));
    handleGSLInfoCloseModal();
  };
  return (
    <div
      className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
      style={{ background: "rgba(0,0,0,.7)" }}
    >
      <div className="border border-teal-500  modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex border-b border-gray-300 mb-4 justify-between items-center pb-3">
            <p className="text-2xl font-bold">Delegate Feedback</p>
          </div>
          <div className="container mx-auto">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  htmlFor="opening-statements"
                  className="text-sm text-[#717171] dark:text-white font-bold"
                >
                  Opening Statements
                </label>
                <input
                  type="number"
                  id="opening-statements"
                  placeholder="Opening Statements"
                  className="mt-1 flex h-8 w-full  items-center justify-center rounded-xl border border-[#12A7C8] bg-white/0 p-3 text-sm outline-none"
                  value={openingStatements}
                  onChange={(e) => setOpeningStatements(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  htmlFor="closing-statements"
                  className="text-sm text-[#717171] dark:text-white font-bold"
                >
                  Closing Statements
                </label>
                <input
                  type="number"
                  id="closing-statements"
                  placeholder="Closing Statements"
                  className="mt-1 flex h-8 w-full  items-center justify-center rounded-xl border border-[#12A7C8] bg-white/0 p-3 text-sm outline-none"
                  value={closingStatements}
                  onChange={(e) => setClosingStatements(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  htmlFor="foreign-policy"
                  className="text-sm text-[#717171] dark:text-white font-bold"
                >
                  Foreign Policy
                </label>
                <input
                  type="number"
                  id="foreign-policy"
                  placeholder="Foreign Policy"
                  className="mt-1 flex h-8 w-full  items-center justify-center rounded-xl border border-[#12A7C8] bg-white/0 p-3 text-sm outline-none"
                  value={foreignPolicy}
                  onChange={(e) => setForeignPolicy(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  htmlFor="poi"
                  className="text-sm text-[#717171] dark:text-white font-bold"
                >
                  POI
                </label>
                <input
                  type="number"
                  id="poi"
                  placeholder="POI"
                  className="mt-1 flex h-8 w-full  items-center justify-center rounded-xl border border-[#12A7C8] bg-white/0 p-3 text-sm outline-none"
                  value={poi}
                  onChange={(e) => setPoi(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  htmlFor="marks-on-chits"
                  className="text-sm text-[#717171] dark:text-white font-bold"
                >
                  Marks on Chits
                </label>
                <input
                  type="number"
                  id="marks-on-chits"
                  placeholder="Marks on Chits"
                  className="mt-1 flex h-8 w-full  items-center justify-center rounded-xl border border-[#12A7C8] bg-white/0 p-3 text-sm outline-none"
                  value={marksOnCheat}
                  onChange={(e) => setMarksOnCheat(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full mb-3">
              <label
                htmlFor="marks-on-chits"
                className="text-sm text-[#717171] dark:text-white font-bold"
              >
                Note
              </label>
              <textarea
                id="marks-on-chits"
                placeholder="Note"
                className="mt-1 h-20 w-full p-3 text-sm border border-[#12A7C8] rounded-xl outline-none"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleGSLInfoCloseModal}
              className="focus:outline-none px-4 bg-pink-500 p-3 ml-3 rounded-lg text-white hover:bg-pink-400 transition-all"
            >
              Close
            </button>
            <button onClick={handleSubmit} className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400 transition-all">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;