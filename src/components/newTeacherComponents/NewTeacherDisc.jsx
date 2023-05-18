import React,{useState, useEffect} from 'react'
import axios from 'axios';
import './teacherDisc.css'
export default function NewTeacherDisc({id}) {
    const [teacher, setTeacher] = useState('')
    useEffect(() => {
        const fetch = async () => {
          const result = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/teachers/${id}`
          );
          setTeacher(result.data);
        };
        fetch();
      }, [id]);
  return (
    <div className='discDiv'>{teacher.about}</div>
  )
}
