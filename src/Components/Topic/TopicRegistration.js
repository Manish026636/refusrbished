import React, { useState } from 'react'
import InfoCard from '../../Card/InfoCard';
import Modal from '../../Modal/Modal';

const TopicRegistration = () => {
const modalHeadding="Please fill the GSL Participation Form"
const handleSubmit=(e)=>
{
  // e.preventDefault();

}
  return(
    <>
    <Modal modalHeadding={modalHeadding} />
    </>
  )
}
  
 

export default TopicRegistration