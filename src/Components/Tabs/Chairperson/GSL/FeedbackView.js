import React from "react";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import { Spinner } from "../../../Loader/Loader";

const FeedbackView = ({ handleCompletedGSLDetailsCloseModal, isView }) => {
  const { loading, currentGSL } = useSelector((state) => state.GSL);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {currentGSL?.id && (
            <div className="rounded">
              <h2 className="text-xl font-bold mb-4">Delegate Feedback</h2>

              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Opening Statements</h3>
                <ReactStars
                  count={10}
                  value={currentGSL?.opening_statements}
                  edit={isView ? false : true}
                  size={24}
                  color1={"#e4e5e9"}
                  color2={"#ffd700"}
                />
              </div>

              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Closing Statements</h3>
                <ReactStars
                  count={10}
                  value={currentGSL?.closing_statements}
                  edit={isView ? false : true}
                  size={24}
                  color1={"#e4e5e9"}
                  color2={"#ffd700"}
                />
              </div>

              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Foreign Policy</h3>
                <ReactStars
                  count={10}
                  disabled={true}
                  value={currentGSL?.foreign_policy}
                  edit={isView ? false : true}
                  size={24}
                  color1={"#e4e5e9"}
                  color2={"#ffd700"}
                />
              </div>

              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">POI</h3>
                <ReactStars
                  count={10}
                  value={currentGSL?.poi}
                  edit={isView ? false : true}
                  size={24}
                  color1={"#e4e5e9"}
                  color2={"#ffd700"}
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Marks on Cheat</h3>
                <ReactStars
                  count={10}
                  value={currentGSL?.marks_on_cheat}
                  edit={isView ? false : true}
                  size={24}
                  color1={"#e4e5e9"}
                  color2={"#ffd700"}
                  readOnly={true}
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Notes</h3>
                <textarea
                  className="shadow appearance-none border rounded w-full ml-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="notes"
                  rows="4"
                  value={currentGSL?.notes}
                  readOnly={true}
                ></textarea>
              </div>
              <div className="flex justify-between items-center mb-4 mr-auto">
                <h3 className="text-lg font-medium">Overall Rating</h3>
                <ReactStars
                  count={10}
                  value={currentGSL?.overall_performance}
                  edit={isView ? false : true}
                  size={24}
                  color1={"#e4e5e9"}
                  color2={"#ffd700"}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-teal-500 hover:bg-teal-400 mx-auto text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all"
                  onClick={() => handleCompletedGSLDetailsCloseModal()}
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