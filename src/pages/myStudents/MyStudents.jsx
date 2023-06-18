import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
export default function MyStudents() {
    const [students, setStudents] = useState()
    const {id} = useParams()
    useEffect(()=>{
        const fetch = async()=>{
            const res = await axios.get(process.env.REACT_APP_BACKEND_URL + `/myUsers/${id}`)
            setStudents(res.data)
          }
          fetch()
    },[id])
    console.log(id);
    console.log(students);
    const drawStudents =  ()=>{
        return students?.map((student,i)=>{
            return <div key={i}  style={{display:'flex', minWidth:"300px",width:"fit-content",margin:"auto", border:"1px solid black", padding:"10px"}}>
                 <img src={student.avatar ? student.avatar : "https://img.icons8.com/material-rounded/24/null/user.png" } alt={student.firstName} width={50} height={50} style={{borderRadius:"50%", margin:"10px"}}/>
                 <div key={i}>
              <div> الاسم: {student.firstName} {student.lastName}</div> 
                <div> {student.email}</div>
                <div>باقي ايام: {student.daysLeft}</div>
                </div>
                </div>  
        })
    }
  return (
    <div style={{marginTop:"100px",display:"flex", flexWrap:"wrap", gap:"10px"}}> {drawStudents()}</div>
  )
}
