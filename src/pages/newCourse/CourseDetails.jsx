import React from 'react'
import "./newCourse.css"
export default function CourseDetails({course}) {
  return (
    <div>
        <div className='courseCover' style={{backgroundImage: `url(${course?.coursePhoto})`}}></div>
        <h1 style={{ fontSize: "28px" , textAlign:"center"}}> {course.firstName} {course.lastName} </h1>
        <div className='instAndLevel'>
        <h2 style={{ textAlign:"center"}}> {course.instrument} </h2>
        <h2 style={{ textAlign:"center"}}>{course.level} </h2>
        </div>
        {/* <div className='descP'>
            <p>{course.description} </p>
        </div> */}
    </div>
  )
}
