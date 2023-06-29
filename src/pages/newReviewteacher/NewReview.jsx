
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Done from './Done'
import Evaluations from './Evaluations'
import Practices from './Practices'
import './stylingPractices.css'
export default function NewReview({socket}) {
  const theUser=JSON.parse(localStorage.getItem("profile"))
  const [user, setUser] = useState('')
  const [filter, setFilter] = useState('Practices')
  const [practices, setPractices] = useState([])
  const [numOfPractices, setNumOfPractices] = useState('')
  const [numOfEvaluations, setNumOfEvaluations] = useState('')
    useEffect(()=>{
      theUser.user ? setUser(theUser.user) : setUser(theUser.teacher)
    },[])
    console.log(practices);
    console.log(user)
    useEffect(() => {
      const fetchPractices = async () => {
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_URL + `/mypractices/${user._id}`
        );
        setPractices(res.data);
        console.log(res.data);
      };
      fetchPractices();
    }, [user]);
    useEffect(() => {
      const filterEva = practices.filter(
        (practice) =>
          !practice.reply &&
          (!practice.RecordReply || practice.RecordReply.length === 0) &&
          (!practice.videoReply || practice.videoReply.length === 0) &&
          practice.courseId === 'evaluation'
      );
    
      const filterPractices = practices.filter(
        (practice) =>
          !practice.reply &&
          (!practice.RecordReply || practice.RecordReply.length === 0) &&
          (!practice.videoReply || practice.videoReply.length === 0) &&
          practice.courseId !== 'evaluation'
      );
        
      setNumOfEvaluations(filterEva.length);
      setNumOfPractices(filterPractices.length);
    }, [practices]);
    console.log(numOfEvaluations)

  return (
    <div style={{marginTop:"80px"}}>
        <h2 style={{ textAlign: "center", margin:"15px" }}>تمارين الطلاب</h2>
      <div className='titlesPracticesTeacher'>
      <div onClick={() => setFilter('Practices')} style={{cursor:'pointer', background: filter === 'Practices' ? '#fee4b9' : 'none' }}>تمارين 
     {numOfPractices > 0 ? (<> ({numOfPractices})</>):(null)} 
      </div>
      <div onClick={()=>setFilter('Evaluations')} style={{cursor:'pointer', background: filter === 'Evaluations' ? '#fee4b9' : 'none' }}>تقييم 
      {numOfEvaluations > 0 ? (<> ({numOfEvaluations})</>):(null)} 

      </div>
      <div onClick={()=>setFilter('Done')} style={{cursor:'pointer', background: filter === 'Done' ? '#fee4b9' : 'none' }}>تم الرد</div>
      </div>
      {filter === 'Practices' ? <Practices user={user} practices={practices} /> : (null)}
      {filter === 'Evaluations' ? <Evaluations user={user} practices={practices} socket={socket}/>: (null)}
      {filter === 'Done' ?<Done user={user} practices={practices} socket={socket}/>: (null)}
    </div>
  )
}
