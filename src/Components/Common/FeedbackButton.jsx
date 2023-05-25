import React from 'react'
import { MdFeedback } from 'react-icons/md'

const FeedbackButton = ({handleDisable}) => {
  return (
    <div onClick={()=>handleDisable(true)} title='Give Feedback' className='fixed bottom-5 right-5 cursor-pointer flex justify-center items-center flex-col text-pink-400'>
        <MdFeedback className='text-3xl animate-bounce' />
        <span className='font-semibold'>Give Feedback</span>

    </div>
  )
}

export default FeedbackButton