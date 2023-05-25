// import React, { useCallback } from "react";
// import { FaPlus } from "react-icons/fa";


// const Modal = ({ modalHeading, modalButtonLabel, showModal, handleSubmit, setShowModal, registrationElement }) => {
 
//   return (
//     <>
//       <button
//         className="flex justify-center items-center text-white bg-light-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold gslsetting rounded-lg text-sm px-5  py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         type="button"
//         onClick={() => setShowModal(true)}
//       >
//         <FaPlus className="mr-2"/>

//         {modalButtonLabel}
//       </button>

//       {showModal ? (
//         <>
//           <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="relative w-full h-full max-w-md md:h-auto">
//               <div className="relative bg-white rounded-xl shadow dark:bg-gray-700">
//                 <div className="flex items-start justify-between px-6 py-4 border-b rounded-t dark:border-gray-600">
//                   <h3 className="text-lg  font-bold text-gray-900 dark:text-white">
//                     {modalHeading}
//                   </h3>
//                   <button
//                     type="button"
//                     className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                     data-modal-hide="defaultModal"
//                     onClick={() => setShowModal(false)}
//                   >
//                     <svg
//                       aria-hidden="true"
//                       className="w-5 h-5"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     <span className="sr-only">Close modal</span>
//                   </button>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                   {registrationElement}
//                   <div className="flex  justify-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
//                     <button
//                       data-modal-hide="defaultModal"
//                       type="submit"
//                       className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </>
//       ) : null}
//     </>
//   );
// };

// export default Modal;
import React from 'react';
import { AiOutlineClose} from 'react-icons/ai';

function Modal(props) {
  const { isOpen, onClose, children } = props;
  // console.log(children);

  if (!isOpen) {
    return null;
  }
  return (
    <>
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 inset-0 overflow-y-auto">
      <div className="bg-white rounded-lg relative w-full max-w-lg mx-auto my-10 shadow-lg">
        <button onClick={onClose} className="absolute top-0 right-0 p-2">
          <span className="text-gray-600 hover:text-gray-800 text-3xl mr-3"><AiOutlineClose /></span>
        </button>
        <div className='p-4  overflow-auto'>

        {children}
        </div>
      </div>
    </div>
          </>
  );
}

export default Modal;


