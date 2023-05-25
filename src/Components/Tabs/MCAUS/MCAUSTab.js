import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import ChairPersonMCAUSTab from "../Chairperson/MCAUS1/ChairPersonMCAUSTab";
import DelegateMCAUSTab from "../Delegates/MCAUS/DelegateMCAUSTab";

const MCAUSTab = () => {
  const { delegate_info } = useSelector((state) => state.delegate_details);
  const [tab, setTab] = useState(1);
  const handleForm = (e) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <div>
      {delegate_info.is_chair_person ? (
        <ChairPersonMCAUSTab />
      ) : (
        <DelegateMCAUSTab delegate_info={delegate_info} />
      )}
      {/* <Fragment>
          <main
            id="content"
            role="main"
            className="w-full max-w-md mx-auto p-6"
          >
            <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <h1 className="block text-1xl font-bold text-gray-800 dark:text-white">
                    Do you have any motions on the floor?
                  </h1>
                </div>

                <div className="mt-5">
                  <form onSubmit={handleForm}>
                    <div className="grid gap-y-4">
                      <button
                        type="submit"
                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </Fragment> */}
    </div>
  );
};

export default MCAUSTab;
