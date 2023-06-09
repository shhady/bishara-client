import React, { useState,useEffect } from 'react'
import axios from 'axios';
import './stylingPractices.css'
import TeacherPractices from "../TeacherPractices/TeacherPractices"
export default function Evaluations({user,practices,socket}) {
    // const [practices, setPractices] = useState([])
    // useEffect(() => {
    //     const fetchPractices = async () => {
    //       const res = await axios.get(
    //         process.env.REACT_APP_BACKEND_URL + `/mypractices/${user._id}`
    //       );
    //       setPractices(res.data);
    //     };
    //     fetchPractices();
    //   }, [user]);
    //   console.log(practices)

      const filterPracticesEvaluation = ()=>{
        const filterPractices = practices.filter((practice) => !practice.reply && (!practice.RecordReply || practice.RecordReply.length === 0) && (!practice.videoReply || practice.videoReply.length === 0) && practice.courseId === 'evaluation'
        );
        return (filterPractices)
      }
     const filteredEvaluation = filterPracticesEvaluation()
  return (
    <div>
        <TeacherPractices socket={socket} practices={filteredEvaluation} user={user}/>
    </div>
  )
}
