import React from 'react'
import './stylingPractices.css'
import TeacherPractices from '../TeacherPractices/TeacherPractices';
export default function Done({user,practices,socket}) {
      const filterPracticesUnReplied = ()=>{
        const filterPractices = practices.filter((practice) => practice.reply || (practice.RecordReply.length > 0) || (practice.videoReply.length> 0));
        return (filterPractices)
      }
      const filteredPractices = filterPracticesUnReplied();

      return (
    <div>
                <TeacherPractices socket={socket} practices={filteredPractices} user={user}/>
    </div>
  )
}
