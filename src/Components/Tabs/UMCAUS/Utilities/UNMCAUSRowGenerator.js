import { useState } from "react";
import ReactCountryFlag from "react-country-flag"
import { countries } from '../../../CountriesName/countries'
const UNMCAUSRowGenerator = ({UNMCAUSInfo,index}) => {
    const [isStarted, setIsStarted] = useState(false);

    return (
        <tr className={`w-[100vw] md:overflow-x-auto md:w-fit text-xs font-semibold tracking-wide text-center text-black ${UNMCAUSInfo.isSubmitted?"bg-blue-gray-100 opacity-50":""} `}>
            <th className="w-6 border-r-2 font-bold py-6">{index}</th>
            <th className="w-16  border-r-2 text-black">{UNMCAUSInfo.name}</th>
            <th className="w-20 border-r-2">{countries[UNMCAUSInfo.country]}</th>
            <th className="w-10 border-r-2">
                <ReactCountryFlag
                    svg
                    countryCode={UNMCAUSInfo.country?.toUpperCase()}
                    className=""
                    style={{
                        fontSize: '2.5em',
                        lineHeight: '2em',
                    }}
                />
            </th>
            <th className="w-16  border-r-2">{UNMCAUSInfo.time}</th>
            <th className="w-20">

                {UNMCAUSInfo.isSubmitted?<span className="text-primarry">Done</span>: isStarted ?
            <button className="bg-gradient-to-r from-yellow-300 to-lime-400 text-black font-bold py-2 px-4 rounded" disabled={``}  onClick={()=>setIsStarted(!isStarted)}>In Progress</button>
            :
            <button className="bg-gradient-to-r from-purple-300 to-indigo-400 text-white font-bold py-2 px-4 rounded" onClick={()=>setIsStarted(!isStarted)}>START</button>
        }
            </th>
        </tr>
    )
}
export default UNMCAUSRowGenerator