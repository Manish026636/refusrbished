import { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { saveGSLDetails } from "../../../../actions/GSLActions";
import { Input } from "@material-tailwind/react";

function MODFeedbackMo({currentGSL,maxDuration,running}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const [timeTaken, setTimeTaken] = useState()
const setRunningTImeStatus=()=>{
if(running)
setTimeTaken()
    else if (localStorage.getItem('Timer'))
     setTimeTaken(maxDuration-localStorage.getItem('Timer'))
    else
    return 0

  }
  const dispatch = useDispatch();

  function handleSubmit() {
    // Handle form submission here
// const timeTakenByDelegate=parseInt(timeTaken)
    if(timeTaken === 0) {
      return toast.warn("Time can not be 0");
    }
    const data = {
      gsl: currentGSL.id,
      notes: inputValue,
      comments: textareaValue,
      ratings: ratingValue,
      timeTaken: timeTaken
    }
    dispatch(saveGSLDetails(data))

    // Reset state after submission (if needed)
    setInputValue("");
    setTextareaValue("");
    setRatingValue(0);
    setIsOpen(false);
    // localStorage.removeItem("Timer")
  }
  const checkDisableButton=()=>{
    if(!running && timeTaken<maxDuration)
    return true
    else 
    return false
  }

  return (
    <>
      {/* Button to open modal */}
      <button
        className="bg-blue-500 GSLDCN font-bold text-white py-3 px-6 rounded-lg"
        onClick={() => setIsOpen(true)}>
        Give Feedback
      </button>

      {/* Modal overlay */}
      <div className={`fixed inset-0 bg-black opacity-${isOpen ? 50 : 0} transition-opacity duration-500 ease-in-out ${isOpen ? 'visible' : 'hidden'}`}></div>

      {/* Modal content */}
      <div className={`fixed inset-0 flex justify-center items-center transition-all duration-500 ease-in-out ${isOpen ? 'visible' : 'hidden'}`}>
        <div className="bg-white rounded-2xl p-6 max-w-lg relative">
          {/* Close button */}
          <button
            className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </button>

          {/* Title */}
          <h2 className="text-lg text-center FeedbackHead font-bold mb-4">Delegate Feedback Form</h2>

          {/* Input box */}
          <label className="block mb-2">
            Note:
            <textarea
              type="text"
              className="border-2 border-gray-400 rounded-xl px-4 py-2 w-full mt-1 focus:outline-none focus:border-blue-500"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </label>

          {/* Textarea */}
          <label className="block mb-2">
            Comments:
            <textarea
              className="border-2 border-gray-400 rounded-xl px-4 py-2 w-full mt-1 focus:outline-none focus:border-blue-500"
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
            />
          </label>

          {/* Rating */}
          <p className="mb-2">Rating:</p>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                className={`${ratingValue >= value
                    ? "text-yellow-400"
                    : "text-gray-400"
                  } focus:outline-none`}
                onClick={() => setRatingValue(value)}
              >
                <FaStar />
              </button>
            ))}
          </div>
          <div>
            {running ?
            <div className="mt-3 text-red-400">Please stop the timer before Submitting</div>:
            <Input variant="standard" color="blue" label="Time Taken" name='time' value={maxDuration-localStorage.getItem("Timer")} onChange={(e) => setTimeTaken(e.target.value)}  />

            }
            </div>

          {/* Submit button */}
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 mx-auto block"
            disabled={checkDisableButton()}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default MODFeedbackMo;