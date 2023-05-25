import React from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
const VoteResult = () => {
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }


    return (
        <>
            <div class="mt-6   md:mt-10 flex justify-center">
                <div className=" flex items-center justify-center">
                    <button
                        type="button"
                        onClick={openModal}
                        className="rounded-md  bg-blue-400 bg-opacity-90   px-6 py-3 text-md font-bold w-[15vh] text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                        Send
                    </button>
                </div>

                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed   inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-3 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-12  text-left  shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-bold text-gray-700"
                                        >
                                            Ongoing voting on Topic 1
                                        </Dialog.Title>
                                        <div className="mt-4">
                                            <div class="flex w-full h-6 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                                                <div class="flex flex-col text-center text-white font-bold justify-center overflow-hidden bg-blue-500" role="progressbar" style={{ width: "75%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                                    <h1>75 %</h1>
                                                </div>
                                            </div>
                                        </div>

                                        <div class=" grid grid-cols-3 sm:grid-cols-3 mt-8 md:grid-cols-3 gap-2">
                                            <div class="bg-[#38AAFD] text-center font-bold text-white p-4 rounded-xl">
                                            <h1>20</h1>
                                            <p className='text-xs'>Present</p>
                                            </div>
                                            <div class="bg-[#44DE5C] text-center font-bold text-white p-4 rounded-xl">
                                            <h1>18</h1>
                                            <p className='text-xs'>In Favor</p>
                                            </div>
                                            <div class="bg-[#FE5353] text-center font-bold text-white p-4 rounded-xl">
                                            <h1>2</h1>
                                            <p className='text-xs'>Against</p>
                                            </div>
                                        </div>
                                        <div className='text-center mt-10'>
                                        <button class="bg-gradient-to-r from-blue-300 to-purple-200 hover:bg-blue-700 hover:text-white text-white font-bold py-4 px-4 rounded-xl w-40 md:w-40">Start Session</button>

                                        </div>

                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    )
}

export default VoteResult;
