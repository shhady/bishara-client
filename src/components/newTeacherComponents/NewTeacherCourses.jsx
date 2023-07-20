import React,{useState, useEffect} from 'react'
import axios from 'axios';
import './newTeacherCourses.css'
import { Link } from 'react-router-dom';
export default function NewTeacherCourses({id}) {
  const [courses, setCourses] = useState([])
  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/courses"
      );
      setCourses(result.data.filter(course => course.owner === id && course.playlistId !== "PLVyh_TRAmEfFr6I1LMZ0EadFWU4tXZmyw"));
    };
    fetch();
  }, [id]);


  const drawCourses = ()=>{
   return courses.map(course => {
      return <Link to={`/newCourse/${course._id}`} style={{textDecoration:"none", color:"black"}} key={course._id}>
      <div className='courseCard'>
        <img src={course.coursePhoto} width="100%" height="240px" style={{borderRadius:"10px"}}/>
        <div style={{textAlign:"center"}}>{course.title}</div>
        </div>
        </Link>
    })
  }
  return (
    <div className='newCoursesContainer'>{drawCourses()}</div>
  )
}
