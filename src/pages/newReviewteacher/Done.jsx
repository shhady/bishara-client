import React, { useState,useEffect } from 'react'
import axios from 'axios';
import './stylingPractices.css'
import PracticeReplies from "../TeacherPractices/PracticeReplies"
import TeacherPractices from '../TeacherPractices/TeacherPractices';
export default function Done({user,practices,socket}) {
      const filterPracticesUnReplied = ()=>{
        const filterPractices = practices.filter((practice) => practice.reply || (practice.RecordReply.length > 0) || (practice.videoReply.length> 0));
        return (filterPractices)
      }
      const filteredPractices = filterPracticesUnReplied();

      return (
    <div>
        {/* <PracticeReplies socket={socket} practices={filteredPractices} user={user}/> */}
                <TeacherPractices socket={socket} practices={filteredPractices} user={user}/>
    </div>
  )
}
