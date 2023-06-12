import React,{useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
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
              border: "5px solid white",
            }}/>
                </div>
                <div>
                     <div className='teacherNameFamily'>
                      {teacher?.firstName}
                       {"  "}
                          {teacher?.lastName}
                     </div>
                </div>
            </div>
        </div>
        <div className='newTeacherTitles'>
        {open === "NewTeacherCourses" ?(  
        <h3 onClick={()=>setOpen("NewTeacherCourses")} style={{backgroundColor:"#fee4b9", cursor:"pointer"}}>الدورات</h3>
    ):(
        <h3 onClick={()=>setOpen("NewTeacherCourses")} style={{cursor:"pointer", borderBottom:"1px solid #dddcdc"}}>الدورات</h3>)}
        {open === "NewTeacherDisc" ?(
        <h3  onClick={()=>setOpen("NewTeacherDisc")} style={{backgroundColor:"#fee4b9", cursor:"pointer"}}>السيرة الذاتية</h3>
    ):(
        <h3 onClick={()=>setOpen("NewTeacherDisc")}  style={{cursor:"pointer", borderBottom:"1px solid #dddcdc"}}>السيرة الذاتية</h3>)}
        {userId ? (<Link to={`/newmessenger/${userId}`}  style={{textDecoration:"none", color:"black", borderBottom:"1px solid #dddcdc"}}> <h3>مراسلة</h3></Link>):(<Link to={`/auth`}  style={{textDecoration:"none", color:"black", borderBottom:"1px solid #dddcdc"}}> <h3>مراسلة</h3></Link>)}
           
            {open === "Evaluation" ?(
            <h3  onClick={()=>setOpen("Evaluation")} style={{backgroundColor:"#fee4b9", cursor:"pointer"}}>منهاج خاص بك</h3>
    ):(
            <h3 onClick={()=>setOpen("Evaluation")} style={{cursor:"pointer", borderBottom:"1px solid #dddcdc"}} >منهاج خاص بك</h3>)}
        </div>
            {open === "NewTeacherCourses" && <NewTeacherCourses id={id}/>}
            {open === "NewTeacherDisc" && <NewTeacherDisc id={id}/>}
            {open === "Evaluation" && <Evaluation id={id} teacher={teacher}/>}
    </div>
  )
}
