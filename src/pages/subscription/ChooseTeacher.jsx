import React, { useState , useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function ChooseTeacher({user, setChooseTeacher}) {
    const [theTeacher, setTheTeacher] = useState('')
    const [teachers, setTeachers] = useState([]);
    const [chosenTeacher, setChosenTeacher] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        const fetch = async () => {
          const result = await axios.get(
            process.env.REACT_APP_BACKEND_URL + "/teachers"
          );
          setTeachers(result.data);
        };
        fetch();
      }, []);

      console.log(teachers);
      const drawTeachers = ()=>{
        return teachers.map((teacher, i) => {
            return <div key={i}  style={{display:"flex", justifyContent:'flex-start', alignItems:'center'}} onClick={()=>navigate(`/chooseTeacher/${teacher._id}`)}>
                <img src={teacher.avatar} alt={teacher.firstName} width={50} height={50} style={{borderRadius:"50%", margin:"10px"}}/>
               <strong style={{marginLeft:"5px"}}> {teacher.firstName} {teacher.lastName} </strong>
               ({teacher.instrument})
                </div>
        })
      }

  return (
    <div className='chooseTeacherPop'>
      <>
      <div style={{textAlign:"center"}}>  
      <h2>اشترك مجاناً لمدة 7 أيام</h2>
      <p style={{fontWeight:"bold", borderBottom:"1px solid black"}}>اختر المعلم</p>
      </div>
      <div className='teachersListSub'>{drawTeachers()}</div></>
      </div>
  
  )
}
