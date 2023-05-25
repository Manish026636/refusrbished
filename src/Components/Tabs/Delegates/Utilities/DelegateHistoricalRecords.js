import React from 'react'
import dateFormat, { masks } from "dateformat";
const DelegateHistoricalRecords = ({historicalData,tabName,isMCAUS}) => {
  return (
    <div className='mt-32'>
<div className='inline-block bg-yellow-300 p-3 rounded-lg text-almost-black'>{tabName} History</div>
    <table className="table-auto w-full text-center">
    <thead>
      <tr>
        <th className="px-4 py-2">Sr No.</th>
        {isMCAUS && 
        <th className="px-4 py-2">Subtopic Name</th >
        }
        <th className="px-4 py-2">Proposed On</th>
        <th className="px-4 py-2">Max Time</th>
    

        <th className="px-4 py-2">Status</th>
      </tr>
    </thead>
    <tbody>
      {historicalData.map((record=>{
        const index=historicalData.indexOf(record)+1;
        return (
<tr key={index}>
        <td className="border px-4 py-2">{index}</td>
        {isMCAUS && 
        <td className="border px-4 py-2">Economic</td >
        }
        <td className="border px-4 py-2">{dateFormat(new Date(record.created_at), "dddd, mmmm dS, yyyy, h:MM:ss TT")} </td>
        <td className="border px-4 py-2">{record.max_time}</td>  
        <td className="border px-4 py-2">{record.status}</td>  
      </tr>
        )
      }))}
      

    </tbody>
  </table>
    </div>
  
  )
}

export default DelegateHistoricalRecords