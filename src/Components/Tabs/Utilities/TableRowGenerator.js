import React from 'react';
const TableRowGenerator = (props) => {
    const rows = props.rows;


    // const trDatas =
    // {
    //     className: 'w-[100vw] md:overflow-x-auto  text-xs font-semibold text-center text-gray-500',
    //     tdArray: [{
    //         className: 'w-6 border-r-2 font-bold py-6',
    //         data: "1"
    //     }, {
    //         className: 'w-16  border-r-2',
    //         data: "Ak"
    //     }, {
    //         className: 'w-16  border-r-2',
    //         data: "InDia"
    //     }, {
    //         className: 'w-16  border-r-2',
    //         data: "Flag"
    //     },
    //     {
    //         className: 'w-16  border-r-2',
    //         data: "0.0"
    //     }, {
    //         className: 'w-20',
    //         data: '<button className="bg-gradient-to-r from-purple-300 to-indigo-400 text-white font-bold py-2 px-4 rounded">START</button></td>'
    //     }

    //     ]
    // }

    return (

      <>

      <div className='bg-[#EAF1FD] my-2 h-16 rounded-xl '>
                <table className="w-full">
                  <thead>
                  {rows.map((row) => (
                    <tr key = {row.id} className="w-[100vw] md:overflow-x-auto md:w-fit text-xs font-semibold tracking-wide text-center text-gray-500">
                      <th className="w-6 border-r-2 font-bold py-6">{row.col1}</th>
                      <th className="w-16  border-r-2">{row.col2}</th>
                      <th className="w-20 border-r-2">{row.col3}</th>
                      <th className="w-10 border-r-2">{row.col4}</th>
                      <th className="w-10 border-r-2">{row.col5}</th>
                      <th className="w-20">{row.col6}</th>
                    </tr>
                    
                
    ))};
                    
                  </thead>
                </table>

              </div>

      </>


    )
}
export default TableRowGenerator




