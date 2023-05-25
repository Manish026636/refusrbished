import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { addMCAUSData, getMCAUSData } from '../../../../actions/MCAUSActions';
import { clearErrors } from '../../../../actions/MCAUSActions';
import Modal from '../../../Modal/Modal';
import DelegateHistoricalRecords from '../Utilities/DelegateHistoricalRecords';
import DelegateTopicRegisterForm from '../Utilities/DelegateTopicRegisterForm';
const DelegateMCAUSTab = (delegate_info) => {
    const { loading, MCAUSdata, error, msg } = useSelector((state) => {

        return (state.MCAUS);
    	
    })
    const dispatch = useDispatch();
  const delegateTabName="Moderated Caucus"


    // console.log(delegate_info.delegate_info.id);
    const modalHeading = "Please fill Moderated Caucus form";
    const modalButtonLabel = "Participate in Moderated Caucus";
    const [perPersonTime, setPerPersonTime] = useState('');
    const [totalTime, setTotalTime] = useState('');
    const [subTopic, setSubTopic] = useState('');
    const [showModal, setShowModal] = useState(false);
    // console.log(GSLdata);

    // console.log(delegate_info);
    const handleSubmit =async (e) => {
        e.preventDefault();
        setShowModal(false);
        const MCAUSRawData = {
          delegates: delegate_info.delegate_info.id,
          community: delegate_info.delegate_info.community,
          max_time: totalTime,
          subtopic_name:subTopic

        }
        // setShowModal(false);
        await dispatch(addMCAUSData(MCAUSRawData));
       await dispatch(getMCAUSData(delegate_info.delegate_info.id))



    };
    useEffect(() => {

        dispatch(getMCAUSData(delegate_info.delegate_info.id))
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

            <Modal modalHeading={modalHeading} modalButtonLabel={modalButtonLabel} handleSubmit={handleSubmit} showModal={showModal} setShowModal={setShowModal} registrationElement={<DelegateTopicRegisterForm setPerPersonTime={setPerPersonTime} setTotalTime={setTotalTime} setSubTopic={setSubTopic} />} />
            <DelegateHistoricalRecords delegateTabName={delegateTabName} isMCAUS={true} historicalData={MCAUSdata} />

        </>
    )
}

export default DelegateMCAUSTab