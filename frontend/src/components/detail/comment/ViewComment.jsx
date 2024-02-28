import React, { useContext } from 'react'
import { BsArrowReturnLeft } from "react-icons/bs";
import HomeContext from '../../../context/homeContext';

const ViewComment = () => {
     const {newsComment} = useContext(HomeContext)
  return (
   <div className="comment-view mt-5">
        {
             newsComment?.map((comment) => (
               <div key={comment.id}>
                    {
                         comment.isActive ? (
                              <div className="box">
                              <div className="name is-size-5">{comment.name}</div>
                              <div className="subject has-text-grey">
                                   <div className='pr-2 mt-2'>
                                        <BsArrowReturnLeft />
                                   </div>
                                   <span className='pr-4 pt-1 is-size-6'>{comment.subject}</span>
                              </div>
                              <div className="desc pt-4">
                                   <p>{comment.description}</p>
                              </div>
                         </div>
                         ) : (
                              ""
                         )
                    }
               </div>
        
             ))
        }
   </div>
  )
}

export default ViewComment