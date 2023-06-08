import React from 'react'

export default function TeacherPractices({practices}) {
    console.log(practices);

    const drawPractices = ()=>{
        return practices.map((practice,i)=>{
            return <div style={{backgroundColor: i%2===0 ? "#c7c5c5":"white"}}>
            <div>{practice.studentFirstName} {practice.studentLastName}</div>
            <div>{practice.courseName} / {practice.courseLevel}</div>
            <div>{practice.video}</div>
            <div className="videoContainer">
            <video
              controls
              preload="metadata"
            //   poster={poster}
              className="videos4Practices"
            >
              <source src={practice.myPractice.replace('http://', 'https://')} type="video/mp4" />
            </video>
          </div>
            </div>
        })
    }
  return (
    <div>{drawPractices()}</div>
  )
}
