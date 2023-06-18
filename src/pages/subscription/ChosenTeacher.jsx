import React, { useState , useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import "./subscription.css"
export default function ChosenTeacher({user ,setTheUser}) {
    const navigate = useNavigate()
    const {id} = useParams()
const [teacher, setTeacher] = useState()
    useEffect(() => {
        const fetch = async () => {
          const result = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/teachers/${id}`
          );
          setTeacher(result.data);
        };
        fetch();
      }, []);

      console.log(teacher);
      const handleSubmitTrial = async()=>{
        console.log(user.email);
        console.log(teacher._id);
        try{
           const result = await axios.put(
              process.env.REACT_APP_BACKEND_URL + `/trial`,
              {
                email: user.email, // fix here
                teacherId: teacher._id,
                trialDateStart: new Date(),
                status: "trial"
              }
            );
            window.localStorage.setItem("profile" ,JSON.stringify(result.data));
            setTheUser(result.data);
            navigate(`/newTeacher/${teacher._id}`)
      }catch(e){
        console.log("couldn't send");
      }
    }
  return (
    <div  className='chooseTeacherPop'>
    
        <div style={{display:"flex", justifyContent:'center', alignItems:'center'}}>
            <button style={{height:"50px", background:"#fcedd5", padding:"0px 20px", marginBottom:"20px"}} onClick={handleSubmitTrial}>
                ابدأ الفترة التجريبيه
            </button>
            </div>  
            <div style={{display:"flex", justifyContent:'center', alignItems:'center'}}>

            <img src={teacher?.avatar} alt={teacher?.firstName} width={100} height={100} style={{borderRadius:"50%"}}/></div>
               <h2 style={{textAlign:"center"}}> {teacher?.firstName}{' '}
                {teacher?.lastName}<br/></h2>
               <h3 style={{textAlign:"center"}}>{teacher?.instrument}<br/></h3> 
               <p className='aboutTeacher'>{teacher?.about}</p> 
      </div>
  )
}
