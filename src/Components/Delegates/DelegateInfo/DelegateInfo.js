import React, { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { FaFlag, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { countries } from "../../CountriesName/countries";
import Rating from "../../Rating/Rating";
import MODFeedbackMo from "../../Tabs/Chairperson/MCAUS/MODFeedbackMo";
import TimerButton from "../../Timer/Timer";
const DelegateInfo = ({ currentGSLSpeaker}) => {
  const [running, setRunning] = useState(false);

    // const { currentGSL } = useSelector((state) => state.GSL);
    // const [timer, setTimer] = useState(()=>{
    //     if (currentGSLSpeaker)
    //     {
    //         if (localStorage.getItem('Timer'))
    // return localStorage.getItem('Timer')
    //     }
    //     return currentGSLSpeaker.max_time
    // });
    // const time = new Date();
    // time.setSeconds(time.getSeconds() + 90); // 10 minutes timer
    // const delegateInfo = all_gsl?.length > 0 ? all_gsl.find((gsl) => gsl.id === currentGSL?.id): [];
    // console.log(delegateInfo);
    return (
        
        // <div className="flex-1  rounded-tr-lg  mb-2 border  shadow-md overflow-y-auto">

        //     <div className='text-center'>
        //         <h1 className='rounded-lg text-gray-100 text-xl font-bold   bg-gradient-to-r from-light-blue-300 to-indigo-200 p-7'>Delegate Info</h1>
        //     </div>
        //     <div className='px-5'>
        //         {delegateInfo?
        //         <>
        //                        <div className=" h-[50vh]  rounded-b-lg bg-white">
        //             <h1 className='text-center my-3'>
        //                 {delegateInfo.name}
        //             </h1>
        //             <div className=" grid grid-cols-2  gap-1 md:gap-4">
        //                 <div className="bg-blue-gray-50 rounded-2xl text-center font-bold text-lg justify-center my-auto">

        //                     <h2 className=''>
        //                         <ReactCountryFlag
        //                             svg
        //                             countryCode={delegateInfo.country}

        //                             className=""
        //                             style={{
        //                                 fontSize: '2.5em',
        //                                 lineHeight: '2em',
        //                             }}
        //                         /> {countries[delegateInfo.country]}</h2>
        //                 </div>
        //                 <div className="bg-blue-gray-50 rounded-2xl text-center font-bold text-lg ">
        //                     <MyTimer expiryTimestamp={time} />
        //                 </div>
        //             </div>
        //             <div className="mt-4  w-full justify-center gap-4 ">
        //                 <textarea className="hide-scrollbar p-3 form-textarea rounded-xl h-20 w-full  border-2 border-gray-400 hover:border-blue-500 " placeholder="Notes..."></textarea>

        //             </div>
        //             <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 ">
        //                 <textarea className=" overflow-y-auto p-3 form-textarea rounded-xl h-20 w-full  border-2 border-gray-400 hover:border-blue-500 " placeholder="Comments...."></textarea>

        //             </div>
        //             <div className='mt-4'>
        //                 <h6>
        //                     Rating :
        //                 </h6>
        //                 <div className='text-center mx-auto'>

        //                     <Rating />
        //                 </div>
        //             </div>
        //             <div className='text-center'>

        //                 <button className="bg-gradient-to-r from-blue-300 to-indigo-400 text-white font-bold py-2 px-4 rounded my-3">Submit</button>
        //             </div>

        //         </div>
        //         </>:<>
        //         <div className="p-3 text-center">
        //         No Delegate Selected
        //             </div>
        //         </>}

        //     </div>
        // </div>
        <>
            <div className="flex-1 h-[53vh]  shadow-lg z-10 rounded-xl bg-light-blue-700">
                <div className="text-center">
                    <h1 className="text-white font-custom text-2xl font-bold mt-7">
                        Delegate Info
                    </h1>
                </div>
                {currentGSLSpeaker  &&
                
                <div className="p-4 py-5 mt-7 overflow:hidden   rounded-b-xl bg-white">
                    <div className="rounded overflow-hidden mx-auto z-10">
                        <div className="flex justify-center">
                            <ReactCountryFlag
                                svg
                                countryCode={currentGSLSpeaker?.country?.toUpperCase()}
                                title="Country"
                                className=""
                                style={{
                                    fontSize: "5rem",
                                    lineHeight: "2em ",
                                }}
                            />
                        </div>

                        <div className="flex justify-center mt-1 items-center">
                            <h1 className="text-lg font-bold mt-1 SpeakerNameDI text-gray-700">
                                {countries[currentGSLSpeaker?.country?.toUpperCase()]}
                            </h1>
                        </div>
                        <div className="flex rounded-xl justify-center mt-2 items-center bg-gray-200 p-4">
                            <h1 className="text-lg font-semibold SpeakerNameDI text-red-500">
                                Speaker :
                            </h1>

                            <h1 className="text-lg font-semibold SpeakerNameDI ml-2 text-gray-800">
                            {currentGSLSpeaker?.name}
                            </h1>
                        </div>
                    </div>
                    <div className="mt-2  flex justify-center">
                        <TimerButton maxDuration={currentGSLSpeaker?.max_time} running={running} setRunning={setRunning} />
                    </div>
                    <div className="mt-9 text-center  ">
                        <MODFeedbackMo  maxDuration={currentGSLSpeaker?.max_time} currentGSL={currentGSLSpeaker} running={running}/>
                    </div>
                </div>
                }
            
            {!currentGSLSpeaker &&
                <div className="p-4 py-5 mt-7 overflow:hidden   rounded-b-xl bg-white">No Delegates Selected</div>
                }
            </div>
        </>
    );
};

export default DelegateInfo;
