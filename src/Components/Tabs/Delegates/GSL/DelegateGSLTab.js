import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addGSLData, clearErrors, getGSLData } from '../../../../actions/GSLActions';
import { toast } from "react-toastify";
import Modal from '../../../Modal/Modal';
import DelegateTopicRegisterForm from '../Utilities/DelegateTopicRegisterForm';
import DelegateHistoricalRecords from '../Utilities/DelegateHistoricalRecords';

const DelegateGSLTab = (delegate_info) => {
  const { GSLdata, error, msg } = useSelector((state) => state.GSL);
  const dispatch = useDispatch();
  const modalHeading = "Are you Ready for GSL?";
  const modalButtonLabel = "Participate in GSL";
  const tabName="GSL"
  // const [timer, setTimer] = useState('');
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async (e) => {
    // console.log(e);
    e.preventDefault();
    const gsl = {
      
      delegates: delegate_info.delegate_info.id,
      community: delegate_info.delegate_info.community,
      // max_time: timer,
    };
    if (showModal)
      setShowModal(false);
     dispatch(addGSLData(gsl));
    dispatch(getGSLData(delegate_info.delegate_info.id))

  };
  useEffect(() => {
    // console.log(delegate_info.delegate_info.id);
    dispatch(getGSLData(delegate_info.delegate_info.id))
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Modal modalHeading={modalHeading} modalButtonLabel={modalButtonLabel} handleSubmit={handleSubmit} showModal={showModal} setShowModal={setShowModal} registrationElement={<DelegateTopicRegisterForm isGSL={true} />} />
      <DelegateHistoricalRecords tabName={tabName} historicalData={GSLdata} />
    </>
  )
}
export default DelegateGSLTab