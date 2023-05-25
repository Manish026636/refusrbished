import React from "react";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import { Spinner } from "../../../../Loader/Loader";

const FeedbackView = ({ onClose }) => {
  const { loading, currentCompletedMCAUSSpeaker } = useSelector(
    (state) => state.MCAUS
  );

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {currentCompletedMCAUSSpeaker?.id && (
            <div className="rounded ">
              <h2 className="text-xl font-bold mb-4">Delegate Feedback</h2>

              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Opening Statements</h3>
                <ReactStars
                  edit={false}
                  count={10}
                  value={currentCompletedMCAUSSpeaker?.opening_statements}
                  size={24}
                  color1={"#e4e5e9"}
                  color2={"#ffd700"}
                />
              </div>

              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Closing Statements</h3>
                <ReactStars
                  edit={false}
                  count={10}
                  value={currentCompletedMCAUSSpeaker?.closing_statements}
                  size={24}
                  color1={"#e4e5e9"}
                  color2={"#ffd700"}
                />
              </div>

              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Foreign Policy</h3>
                <ReactStars
                  edit={false}
                  count={10}
                  disabled={true}
                  value={currentCompletedMCAUSSpeaker?.foreign_policy}
                  size={24}
                  color1={"#e4e5e9"}
                  color2={"#ffd700"}
                />
              </div>

              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">POI</h3>
                <ReactStars
                  edit={false}
                  count={10}
                  value={currentCompletedMCAUSSpeaker?.poi}
                  size={24}
                  color1={"#e4e5e9"}
                  color2={"#ffd700"}
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Marks on Cheat</h3>
                <ReactStars
                  edit={false}
                  count={10}
                  value={currentCompletedMCAUSSpeaker?.marks_on_cheat}
                  size={24}
                  color1={"#e4e5e9"}
                  color2={"#ffd700"}
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Notes</h3>
                <textarea
                  className="shadow appearance-none border rounded w-full ml-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="notes"
                  rows="4"
                  value={currentCompletedMCAUSSpeaker?.notes}
                  readOnly={true}
                ></textarea>
              </div>
              <div className="flex justify-between items-center mb-4 mr-auto">
                <h3 className="text-lg font-medium">Overall Rating</h3>
                <ReactStars
                  edit={false}
                  count={10}
                  value={currentCompletedMCAUSSpeaker?.overall_performance}
                  size={24}
                  color1={"#e4e5e9"}
                  color2={"#ffd700"}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 mx-auto text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={onClose}
                  type="button"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default FeedbackView;