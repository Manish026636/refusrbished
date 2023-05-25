import { Input } from '@material-tailwind/react';
import React from 'react'
import { countryCode2Name } from '../../../CountriesName/countryCode2Name';
const DelegateTopicRegisterForm = (props) => {
    return (
        <>
            {!props?.isGSLCommonSetting &&  (
                <div className="mb-4 mt-3 flex flex-col justify-center items-center">
                    {props.markedRollList.length > 0 ?
                    <>
                    <label htmlFor="subTopic" className="block text-blue-700 font-bold mb-2">
                        Proposed By
                    </label>
                    <select className='rounded-md border-2 p-3 font-bold'>
                        {props?.markedRollList.map((delegate) => {
                            const countryName=delegate.country.toUpperCase();
                            return (<option className=''  onChange={(e)=>props.setCurrentDelegate(e.target.value)} value={delegate.delegate} key={delegate.id}>{delegate.name} - {countryCode2Name[countryName]}
                               
                            </option>)
                        })}
                    </select>
                    {props.isUNMD &&
                    <div className='my-4'>
                        <Input variant='outlined' label='Time' id="max_time" color='indigo' type="number" name="max_time"  required/>
                    </div>
}
                    </>:
                    <div className="text-center mt-12 text-red-500">No Delegates are Present in the session</div>}
                </div>
            )

            }
            <div className={`p-6 space-y-6`}>

                {props?.setSubTopic &&
                    <>
                        <div className="mb-4">
                            <label htmlFor="subTopic" className="block text-gray-700 font-bold mb-2">
                                Subtopic Name
                            </label>
                            <input
                                type="text"
                                name="subTopic"
                                placeholder='Enter your sub-topic name'
                                required
                                id="subTopic"
                                onChange={(e) => props?.setSubTopic(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </>

                }
                {props?.isMCAUS &&
                    <div className="mb-4">
                        <label htmlFor="perPersonTime" className="block text-gray-700 font-bold mb-2">
                            Per Person Time
                        </label>
                        <input
                            type="number"
                            name="perPersonTime"
                            placeholder='Enter per person time'
                            id="perPersonTime"
                            required
                            onChange={(e) => props?.setPerPersonTime(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                }
                {props?.setTotalTime &&
                    <div className="mb-4">
                        <label htmlFor="totalTime" className="block text-gray-700 font-bold mb-2">
                            Total Time
                        </label>
                        <input
                            type="number"
                            name="totalTime"
                            placeholder='Enter Total Time in seconds'
                            id="totalTime"
                            required
                            onChange={(e) => props?.setTotalTime(e.target.value)}
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                }
            </div>
        </>
    )
}
export default DelegateTopicRegisterForm