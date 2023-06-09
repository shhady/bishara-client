import React, { useState,useEffect } from 'react'
import axios from 'axios';
import './stylingPractices.css'
import PracticeReplies from "../TeacherPractices/PracticeReplies"

export default function Practices({user,practices, socket}) {
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

      const filterPracticesUnReplied = ()=>{
        const filterPractices = practices.filter((practice) => !practice.reply && (!practice.RecordReply || practice.RecordReply.length === 0) && (!practice.videoReply || practice.videoReply.length === 0) && practice.courseId !== 'evaluation'
        );
        return (filterPractices)
      }
     const filteredPractices =  filterPracticesUnReplied()
     console.log(filteredPractices)
  return (
    <div>
        {filteredPractices.length === 0 ?(<div style={{height:"80vh", display:"flex", justifyContent:"center", alignItems:"center"}}><h1>
          لا يوجد تمارين جديده
          </h1></div>):(<> <TeacherPractices socket={socket} practices={filteredPractices} user={user}/></>)}
    </div>
  )
}
