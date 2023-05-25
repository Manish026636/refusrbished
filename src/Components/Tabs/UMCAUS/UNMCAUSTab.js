import React from 'react'
import { useSelector } from 'react-redux';
import ChairPersonUNMCAUSTab from '../Chairperson/UNMCAUS/ChairPersonUNMCAUSTab';
import DelegateUNMCAUSTab from '../Delegates/UNMCAUS/DelegateUNMCAUSTab';
const UnMDTab = () => {
const {loading,delegate_info}=useSelector((state)=>state.delegate_details);
// console.log(user);
  const GSLInfos = [{
    name: "Munshi",
    country: "IN",
    time: 90
  }
    , {
    name: "Akash",
    country: "US",
    time: 90
  }, {
    name: "Ak",
    country: "RU",
    time: 90
  }, {
    name: "PK",
    country: "IN",
    time: 90
  }
  ]

  return (
    <>
  {delegate_info.is_chair_person?
<ChairPersonUNMCAUSTab/>:<DelegateUNMCAUSTab delegate_info={delegate_info}/>
}



    </>
  )
}

export default UnMDTab;