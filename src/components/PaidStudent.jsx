import axios from 'axios'
import React, { useRef ,useState} from 'react'
import { useEffect } from 'react'

export default function PaidStudent({ user }) {
  const [showResponse, setShowResponse] = useState(false)
  const [showُError, setShowError] = useState(false)
  const [students, setStudents]=useState([])
  const userId = user.teacher._id
  const email = useRef()

  const showEmail = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.put(
        process.env.REACT_APP_BACKEND_URL + `/paid`,
        {
          email: email.current?.value, // fix here
          userId
        }
      );
      email.current.value="";
      console.log(user.teacher._id)
      setShowResponse(true)
      setShowError(false)
    }catch(err){
      setShowError(true)
      setShowResponse(false)
    }
    
  }

  useEffect(()=>{
    const fetch = async()=>{
      const res = await axios.get(process.env.REACT_APP_BACKEND_URL + `/myUsers/${userId}`)
      setStudents(res.data)
    }
    fetch()
  },[])

  const cancelSubscription = async(student)=>{
    try{
      const res = await axios.put(
        process.env.REACT_APP_BACKEND_URL + `/paid`,
        {
          email: student.email, // fix here
          userId:''
        }
      );
    }catch(err){
      console.log(err)
    }
  }
  const showStudents = () => {
    const today = new Date();
    return (
      <div dir="ltr" style={{display:"flex", flexWrap: "wrap"}}>
        {students?.map((student, i) => {
          const updatedAt = new Date(student.updatedAt);
          const daysSinceUpdate = Math.round((today - updatedAt) / (1000 * 60 * 60 * 24));
          const formattedDate = updatedAt.toLocaleDateString();
          const style =  daysSinceUpdate > 30 ? { backgroundColor: "red", border:"1px solid black", padding:"10px", width:"100%", maxWidth:"300px" } : { border:"1px solid black", padding:"10px", width:"100%" };
          
          return (
            <div key={student._id}
            style={style}>
              <div>{i + 1}. {student.firstName} {student.lastName}</div>
              <div>Last updated: {formattedDate}</div>
              <div>Days since last update: {daysSinceUpdate}</div>
              <button onClick={()=>cancelSubscription(student)} style={{width:"100%"}}>الغاء الاشتراك</button>
            </div>
          )
        })}
      </div>
    )
  }


  return (
    <>
    <div style={{ display: "flex",flexDirection:"column", justifyContent: "center", alignItems: "center",  margin:"150px auto 30px auto", border: "1px solid black", backgroundColor:"#c7c5c5"}}>
      <div>
        <h2>اضف ايميل الطالب</h2>
      </div>
      <form onSubmit={showEmail} style={{ marginTop: "50px", display: "flex",flexDirection:"column", justifyContent: "space-around", alignItems: "center", height: "20vh"}}>
        <input ref={email} type="email" placeholder="البريد الالكتروني"  style={{width:"100%", height:"30px"}}/>
        <input type="submit" style={{width:"100%", backgroundColor:"#fee4b9", height:"30px"}}/>
      </form>
    {showResponse ? (<>تمت الاضافة</>):(null)}
    {showُError ? (<>فشل في اضافة الطالب</>):(null)}
    </div>
    <div  dir="ltr" style={{display:"flex",justifyContent:"center", alignItems:"center",width:"60%", margin:"auto"}}>
    {showStudents()}
    </div>
    </>
  )
}
