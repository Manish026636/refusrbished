import React, { useState } from 'react';

function Feedback() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <div className='flex justify-center items-center mt-10'>
        <button onClick={openModal} className="bg-blue-500 text-white p-3 px-10 rounded-lg text-xl font-bold">
          Give Feedback
        </button>
      </div>


      {isOpen && (
        <div className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster" style={{ background: 'rgba(0,0,0,.7)' }}>
          <div className="border border-teal-500  modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex border-b border-gray-300 mb-4 justify-between items-center pb-3">
                <p className="text-2xl font-bold">Delegate Feedback</p>

              </div>
              <div class="container mx-auto">
                <div class="flex flex-wrap -mx-3">
                  <div class="w-full md:w-1/2 px-3 mb-3">
                    <label for="opening-statements" class="text-sm text-[#717171] dark:text-white font-bold">Opening Statements</label>
                    <input type="number" id="opening-statements" placeholder="Opening Statements" class="mt-1 flex h-8 w-full  items-center justify-center rounded-xl border border-[#12A7C8] bg-white/0 p-3 text-sm outline-none" />
                  </div>
                  <div class="w-full md:w-1/2 px-3 mb-3">
                    <label for="closing-statements" class="text-sm text-[#717171] dark:text-white font-bold">Closing Statements</label>
                    <input type="number" id="closing-statements" placeholder="Closing Statements" class="mt-1 flex h-8 w-full  items-center justify-center rounded-xl border border-[#12A7C8] bg-white/0 p-3 text-sm outline-none" />
                  </div>
                  <div class="w-full md:w-1/2 px-3 mb-3">
                    <label for="foreign-policy" class="text-sm text-[#717171] dark:text-white font-bold">Foreign Policy</label>
                    <input type="number" id="foreign-policy" placeholder="Foreign Policy" class="mt-1 flex h-8 w-full  items-center justify-center rounded-xl border border-[#12A7C8] bg-white/0 p-3 text-sm outline-none" />
                  </div>
                  <div class="w-full md:w-1/2 px-3 mb-3">
                    <label for="poi" class="text-sm text-[#717171] dark:text-white font-bold">POI</label>
                    <input type="number" id="poi" placeholder="POI" class="mt-1 flex h-8 w-full  items-center justify-center rounded-xl border border-[#12A7C8] bg-white/0 p-3 text-sm outline-none" />
                  </div>
                  <div class="w-full md:w-1/2 px-3 mb-3">
                    <label for="marks-on-chits" class="text-sm text-[#717171] dark:text-white font-bold">Marks on Chits</label>
                    <input type="number" id="marks-on-chits" placeholder="Marks on Chits" class="mt-1 flex h-8 w-full  items-center justify-center rounded-xl border border-[#12A7C8] bg-white/0 p-3 text-sm outline-none" />
                  </div>

                </div>
                <div class="w-full px-3 mb-3">
                  <label for="marks-on-chits" class="text-sm text-[#717171] dark:text-white font-bold">Note</label>
                  <textarea id="marks-on-chits" placeholder="Note" class="mt-1 h-20 w-full p-3 text-sm border border-[#12A7C8] rounded-xl outline-none"></textarea>
                </div>

              </div>

              <div className="flex justify-end pt-2">

                <button className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Feedback;