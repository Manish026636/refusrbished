import React, { useEffect, useState } from 'react'

import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../../../actions/userActions';
import Modal from '../../../Modal/Modal';
import DelegateTopicRegisterForm from '../Utilities/DelegateTopicRegisterForm';
import { addUNMCAUSData, getUNMCAUSData } from '../../../../actions/UNMCAUSActions';
import DelegateHistoricalRecords from '../Utilities/DelegateHistoricalRecords';
;
const DelegateUNMCAUSTab = (delegate_info) => {

  const { loading, UNMCAUSdata, error, msg } = useSelector((state) => {
    // console.log(state);
  return (state.UNMCAUS)
})
  const dispatch = useDispatch();


  const modalHeading = "Please fill Unmoderated Caucus form";
  const modalButtonLabel = "Participate in Unmoderated Caucus";
  const [totalTime, setTotalTime] = useState('');

  const [showModal, setShowModal] = useState(false);

  // console.log(delegate_info);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(false);
    const UNMCAUSRawData = {
      delegates: delegate_info.delegate_info.id,
      community: delegate_info.delegate_info.community,
      max_time: totalTime

    }
    // setShowModal(false);

    await dispatch(addUNMCAUSData(UNMCAUSRawData));
    await dispatch(getUNMCAUSData(delegate_info.delegate_info.id))



  };
  useEffect(() => {

    dispatch(getUNMCAUSData(delegate_info.delegate_info.id))
    console.log(UNMCAUSdata);

  }, [])

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (msg) {
      toast.success(msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, msg]);
  return (
    <>

<Modal modalHeading={modalHeading} modalButtonLabel={modalButtonLabel} handleSubmit={handleSubmit} showModal={showModal} setShowModal={setShowModal} registrationElement={<DelegateTopicRegisterForm  setTotalTime={setTotalTime} />} />
<DelegateHistoricalRecords tabName={"Unmoderated Caucus"} historicalData={UNMCAUSdata} />

    </>
  )
}

export default DelegateUNMCAUSTab