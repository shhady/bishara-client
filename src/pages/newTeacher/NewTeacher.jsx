import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './NewTeacher.css'
import NewTeacherCourses from '../../components/newTeacherComponents/NewTeacherCourses';
import NewTeacherDisc from '../../components/newTeacherComponents/NewTeacherDisc';
import Evaluation from '../../components/evaluation/Evaluation'
export default function NewTeacher() {
    const user = JSON.parse(localStorage.getItem("profile"));
    const [teacher, setTeacher ] = useState(null)
    const [userId, setUserId] = useState("");
    const [open, setOpen] = useState('NewTeacherCourses')
    const {id} = useParams()
    console.log(id)
    console.log(teacher)
    useEffect(() => {
        if (!user) return;
        setUserId(user.user ? user.user._id : user.teacher._id);
      }, [user]);

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
    <div>
        <div className='cover' style={{ backgroundImage: `url(${teacher?.cover})` }}>
            <div className='onTopOfCover'>
                <div className='imageProfileNew'>
                   <img src={teacher?.avatar} style={{
                    height: '100%',
                    width: '100%',
              borderRadius: "50%",
              border: "8px solid white",
            }}/>
                </div>
                <div>
                     <h1 style={{color:"white", textAlign:"center", fontSize:"48px"}}>
                      {teacher?.firstName}
                       {"  "}
                          {teacher?.lastName}
                     </h1>
                </div>
            </div>
        </div>
        <div className='newTeacherTitles'>
        {open === "NewTeacherCourses" ?(            <h2 onClick={()=>setOpen("NewTeacherCourses")} style={{backgroundColor:"#fee4b9", cursor:"pointer"}}>الدورات</h2>
):(<h2 onClick={()=>setOpen("NewTeacherCourses")} style={{cursor:"pointer"}}>الدورات</h2>)}
{open === "NewTeacherDisc" ?(            <h2  onClick={()=>setOpen("NewTeacherDisc")} style={{backgroundColor:"#fee4b9", cursor:"pointer"}}>السيرة الذاتية</h2>
):(<h2 onClick={()=>setOpen("NewTeacherDisc")}  style={{cursor:"pointer"}}>السيرة الذاتية</h2>)}
            <h2>مراسلة</h2>
            {open === "Evaluation" ?(            <h2  onClick={()=>setOpen("Evaluation")} style={{backgroundColor:"#fee4b9", cursor:"pointer"}}>منهاج خاص بك</h2>
):(<h2 onClick={()=>setOpen("Evaluation")} style={{cursor:"pointer"}} >منهاج خاص بك</h2>)}
            <h2>
              
              </h2>
          
        </div>
            {open === "NewTeacherCourses" && <NewTeacherCourses id={id}/>}
            {open === "NewTeacherDisc" && <NewTeacherDisc id={id}/>}
            {open === "Evaluation" && <Evaluation id={id} teacher={teacher}/>}
    </div>
  )
}
