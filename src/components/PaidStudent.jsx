import axios from 'axios'
import React, { useRef ,useState} from 'react'
import { useEffect } from 'react'

export default function PaidStudent({ user }) {
  const [showResponse, setShowResponse] = useState(false)
  const [showُError, setShowError] = useState(false)
  const [students, setStudents]=useState([])
  const userId = user.teacher._id
  const email = useRef()
  const [paidPeriod, setpaidPeriod] = useState('')

  console.log(paidPeriod)
  const showEmail = async (e) => {
    e.preventDefault()
    try{
      await axios.put(
        process.env.REACT_APP_BACKEND_URL + `/paid`,
        {
          email: email.current?.value, // fix here
          userId,
          paidDate: new Date(),
          paidPeriod
        }
      );
      email.current.value="";
      
      setShowResponse(true)
      setShowError(false)
      const fetch = async()=>{
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL + `/myUsers/${userId}`)
        setStudents(res.data)
      }
      fetch()
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
  },[userId])

  const cancelSubscription = async(student)=>{
    try{
      await axios.put(
        process.env.REACT_APP_BACKEND_URL + `/paid`,
        {
          email: student.email, // fix here
          userId:''
        }
      );
      console.log(student)
      const filtered = students.filter((theStudent)=> theStudent._id !== student._id)
      setStudents(filtered)
    }catch(err){
      console.log(err)
    }
  }
  const showStudents = () => {
    const today = new Date();
    return (
      <div dir="ltr" style={{display:"flex", flexWrap: "wrap"}}>
        {students?.map((student, i) => {
          const paidDate = new Date(student.paidDate);
          const daysSinceUpdate = Math.round((today - paidDate) / (1000 * 60 * 60 * 24));
          const formattedDate = paidDate.toLocaleDateString();
          const style =  daysSinceUpdate + 3 >= student.paidPeriod*30 ? { backgroundColor: "red", border:"1px solid black", padding:"10px", width:"100%", maxWidth:"300px" } : { border:"1px solid black", padding:"10px", width:"100%", maxWidth:"300px" };
          
          return (
            <div key={student._id}
            style={style}>
              <div>{i + 1}. {student.firstName} {student.lastName}</div>
              <div>Last updated: {formattedDate}</div>
              <div>Days since subscribed: {daysSinceUpdate}</div>
              <div>Subscription Period: {student.paidPeriod*30} days</div>
              <div>Days Left: {student.paidPeriod*30 - daysSinceUpdate}</div>
              <button onClick={()=>cancelSubscription(student)} style={{width:"100%"}}>الغاء الاشتراك</button>
            </div>
          )
        })}
      </div>
    )
  }
  console.log(students)


  return (
    <>
    <div style={{ display: "flex",flexDirection:"column", justifyContent: "center", alignItems: "center",  margin:"150px auto 30px auto", border: "1px solid black", backgroundColor:"#c7c5c5"}}>
      <div>
        <h2>اضف ايميل الطالب</h2>
      </div>
      <form onSubmit={showEmail} style={{ marginTop: "50px", display: "flex",flexDirection:"column", justifyContent: "space-around", alignItems: "center", height: "20vh"}}>
        <label>البريد الالكتروني
        <input ref={email} type="email" placeholder=" "  style={{width:"100%", height:"30px"}}/></label>
        {/* <input type='date' style={{width:"100%", height:"30px"}} /> */}
        <label>مدة الاشتراك
        <input type="number" placeholder='اشهر' onChange={(e)=> setpaidPeriod(e.target.value)} style={{width:"100%", height:"30px"}}/>
         </label>
       
        
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
