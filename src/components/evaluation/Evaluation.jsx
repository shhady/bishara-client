// import React,{useState, useEffect} from 'react'
// import "./evaluation.css"
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPen, faForward } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
// export default function Evaluation({teacher}) {
//   const [theUser, setTheUser] = useState(JSON.parse(localStorage.getItem("profile")));
//   const [socket, setSocket] = useState(null);
//   const [user, setUser] = useState('') 
//   const [formData, setFormData] = useState({})
//   const [videoUrl, setVideoUrl] = useState('')
//   const [videoName, setVideoName] = useState('')
//   const [courseNameNumber, setCourseNameNumber] = useState('');
//   const [whereStudied, setWhereStudied] = useState('')
//   const [goal, setGoal] = useState('')
  
//   console.log(courseNameNumber)
//   const [data, setData] = useState({
//         teacherId:teacher._id,
//         teacherFirstName:teacher.firstName,
//         teacherLastName:teacher.lastName,
//         courseId:"evaluation",
//   })
//   const navigate = useNavigate()
//   console.log(data)
// useEffect(()=>{
//     theUser?.user ? setUser(theUser.user):(setUser(theUser.teacher)) 
// },[theUser])
//   useEffect(()=>{
//     setData({...data, ownerId:user._id,
//       studentFirstName:user.firstName,
//       studentLastName:user.lastName})
//   },[user])
//   useEffect(()=>{
//     setData({...data, myPractice: videoUrl})
//   },[videoUrl])

// function handleOpenWidget(e) {
//   e.preventDefault()

//   let myWidget = window.cloudinary.createUploadWidget(
//     {
//       cloudName: 'djvbchw2x',
//       uploadPreset: 'bisharaHaroni',
//       maxFileSize: 100 * 1024 * 1024, // 100MB in bytes
//     },
//     (error, result) => {
//       if (!error && result && result.event === 'success') {
//         console.log('Done! Here is the image info:', result.info);
//         setFormData({ ...formData, image: result.info.secure_url });
//         setVideoUrl(result.info.secure_url);
//         setVideoName(result.info.original_filename)
//       }
//     }
//   );
//   myWidget.open();
// }

//   const uploadFile = async(e)=>{
//     e.preventDefault()
//     if(!videoUrl) return;
//     try{
//       await axios.post(process.env.REACT_APP_BACKEND_URL + "/practices/", 
//       {...data,
//         expTime:`${courseNameNumber}`,
//       whereStudied:whereStudied? `${whereStudied}`:user.whereStudied,
//       goal:goal?  `${goal}` : user.goal 
//       }
//     );
//     setData({
//       courseLevel: '',
//       video: '',
//       courseName:'',
//       myPractice:''
//     });
//   const response = await axios.put(
//       process.env.REACT_APP_BACKEND_URL + `/evaluation`,
//       {
//         email: user.email, // fix here
//         whereStudied:whereStudied ? whereStudied : user.whereStudied,
//         goal: goal ? goal : user.goal,
//         experience:courseNameNumber ?   courseNameNumber:user.experience
//       }
//     )
//     console.log(response.data.user);
//     window.localStorage.setItem('profile', JSON.stringify(response.data))
//     navigate('/profile')
//     }catch(e){
//       console.log(e)
//     }
//   }
// const handleNotSub = ()=>{
//   alert("لرفع تمارين يجب الاشتراك");
//         navigate("/subscription"); 
// }
//   console.log(user);

//   return (
//     <div className='containerEvaluation'>
//     <div className='evaDesc'>
//     تحميل فيديو لنفسك وأنت تعزف الموسيقى للحصول على تعليقات من معلمك يُعد أداة تعلم قيمة ومريحة. من خلال تسجيل أدائك على الفيديو، تمنح معلمك نظرة شاملة على قدراتك الموسيقية، مما يتيح تقييمًا أكثر دقة وفهمًا أعمق لبناء منهاج خاص بك. 
//     </div>
//     <div>
    
  
//         {/* {maxSize ? ('max 100mb'):(null)} */}
//     {user.experience ? (<div style={{textAlign:"center", position:"relative"}}>
//          الخبره: {user.experience} <br />
//          الهدف: {user.goal}<br />
//          اين: {user.whereStudied}

//          <div style={{position:"absolute", top:'0px', left:'10px',border:"1px solid #d4d4d4", padding:"0px 3px"}} onClick={()=>{setUser({...user, experience:null})}}>
//           تعديل <FontAwesomeIcon icon={faPen} />
//          </div>
//          <form onSubmit={uploadFile} className='formEvaluationWithData' style={{marginTop:"15px"}}>
//         {videoUrl ? ( <><div> تم رفع {videoName} <button onClick={()=>setVideoUrl(null)} style={{background:"red", color:"white"}}>X</button></div>
//         <button type="submit" className='submitFormEva'>ارسال</button></>):(<>
//         {user?.trialTeacher === teacher?._id ? (<><button onClick={handleOpenWidget} className='uploadEvaluation'>ارسل عزفك</button>
//           <div style={{textAlign:"center", fontSize:"13px"}}>الحد الأقصى لحجم الملف 100 ميغا بايت</div></>):(<button className='uploadEvaluation' onClick={handleNotSub}>ارسل عزفك</button>)}
//           </>)}
//         </form>
//         </div>):( <form onSubmit={uploadFile} className='formEvaluation'>
//         <div style={{width:"100%", textAlign:'center', fontWeight:"bold"}}>
//           خبرتك في العزف </div>
//         {/* <div  style={{position:"absolute", top:'0px', left:'15px',border:"1px solid #d4d4d4", padding:"3px",display:"flex", justifyContent:"center",alignItems:"center"}} onClick={()=>{setUser({...user, experience:theUser.user?.experience})}}><FontAwesomeIcon icon={faForward} style={{marginLeft:"4px"}}/></div> */}

//           <div style={{width:"100%", textAlign:'center'}}>
//           <select
//            className='inputFormEva'
//   value={courseNameNumber}
//   onChange={(e) => setCourseNameNumber(e.target.value)}
//   required
// >
//   <option value="" disabled hidden >
//     اختر المده
//   </option>
//   <option value="1-6 اشهر">1-6 اشهر</option>
//   <option value="6-12 اشهر">6-12 اشهر</option>
//   <option value="1-2 سنوات">1-2 سنوات</option>
//   <option value="2-3 سنوات">2-3 سنوات</option>
//   <option value="3-4 سنوات">3-4 سنوات</option>
//   <option value="اكثر من 5 سنوات">اكثر من 5 سنوات</option>
// </select>
// </div>

//           <input className='inputFormEva' type="text" value={ whereStudied} onChange={(e)=> setWhereStudied(e.target.value)} placeholder="اين تعلمت" required/>
//           <input className='inputFormEva' type="text" value={ goal} onChange={(e)=> setGoal(e.target.value)} placeholder="هدفك من التعليم" required/>
//         {videoUrl ? ( <><div> تم رفع {videoName} <button onClick={()=>setVideoUrl(null)} style={{background:"red", color:"white"}}>X</button></div>
//         <button type="submit" className='submitFormEva'>ارسال</button></>):(<>
//         {user?.trialTeacher === teacher?._id ? (<><button onClick={handleOpenWidget} className='uploadEvaluation'>ارسل عزفك</button>
//           <div style={{textAlign:"center", fontSize:"13px"}}>الحد الأقصى لحجم الملف 100 ميغا بايت</div></>):(<button className='uploadEvaluation' onClick={handleNotSub}>ارسل عزفك</button>)}
        
//           </>)}  
           
//           </form>)}
        
        
//     </div>
//     </div>
//   )
// }

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faForward } from '@fortawesome/free-solid-svg-icons';
import React, {useState,useEffect} from 'react'
import axios from 'axios';
import "./evaluation.css"
export default function Evaluation({teacher, user}) {
  console.log({t:teacher , u:user});
  const [expTime,setExpTime]= useState(user.experience)
  const [goal, setGoal] = useState(user?.goal)
  const [whereStudied,setWhereStudied] = useState(user?.whereStudied)
  const [video, setVideo] = useState('')
  const [moreThan, setMoreThan] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [fileUpload, setFileUpload] = useState('')
  const plan  =   JSON.parse(localStorage.getItem("plan"))

  console.log(plan);
  const postDetails = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", "bisharaHaroni");
    // formData.append("cloud_name", "shhady");
    axios
      .post("https://api.cloudinary.com/v1_1/djvbchw2x/upload", formData, {
        onUploadProgress: (p) => {
          const percentComplete = Math.round((p.loaded * 100) / p.total);
          setFileUpload({ fileName: video.name, percentComplete });
          console.log(`${percentComplete}% uploaded`);
        },
      })
      .then((res) => setVideoUrl(res.data.secure_url))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!videoUrl) return;
    
    const postData = async () => {
      try {
       const res =  await axios.post(process.env.REACT_APP_BACKEND_URL + "/practices/", {
          teacherId: teacher._id,
          teacherFirstName: teacher.firstName,
          teacherLastName: teacher.lastName,
          courseId: "evaluation",
          expTime: `${expTime}`,
          whereStudied: `${whereStudied}`,
          goal: `${goal}`,
          myPractice:videoUrl,
          ownerId:user._id,
          studentFirstName:user.firstName,
          studentLastName:user.lastName
        });
        const response = await axios.put(
                 process.env.REACT_APP_BACKEND_URL + `/evaluation`,
                 {
                   email: user.email, // fix here
                   whereStudied:whereStudied ? whereStudied : user.whereStudied,
                   goal: goal ? goal : user.goal,
                   experience:expTime ?   expTime:user.experience
                 }
               )
               console.log(response.data.user);
               window.localStorage.setItem('profile', JSON.stringify(response.data))
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    };
    
    postData();
  }, [videoUrl]);

  return (
    <div className='containerEvaluation'>
    <div className='evaDesc'> تحميل فيديو لنفسك وأنت تعزف الموسيقى للحصول على تعليقات من معلمك يُعد أداة تعلم قيمة ومريحة. من خلال تسجيل أدائك على الفيديو، تمنح معلمك نظرة شاملة على قدراتك الموسيقية، مما يتيح تقييمًا أكثر دقة وفهمًا أعمق لبناء منهاج خاص بك. 
    </div>
    {!user &&  <div className='notSub'><div>الرجاء تسجيل الدخول</div><div> <button className='evaBTN'>تسجيل الدخول</button></div></div>}
    {user.trialTeacher !== teacher._id && <div className='notSub'><div>يجب الاشتراك للحصول على تقييم لعزفك </div><div> <button className='evaBTN'>للاشتراك</button></div></div>}
    {plan.teacherId === teacher._id && plan.status === 'active' && <div className='notSub'>
      <form className='formEvaluation' onSubmit={postDetails}>
      <div style={{width:"100%", textAlign:'center', fontWeight:"bold"}}>
           خبرتك في العزف </div>      

          <div style={{width:"100%", textAlign:'center'}}>
          <select
           className='inputFormEva'
  value={expTime}
  onChange={(e) => setExpTime(e.target.value)}
  required
>
  <option value="" disabled hidden >
    اختر المده
  </option>
  <option value="1-6 اشهر">1-6 اشهر</option>
  <option value="6-12 اشهر">6-12 اشهر</option>
  <option value="1-2 سنوات">1-2 سنوات</option>
  <option value="2-3 سنوات">2-3 سنوات</option>
  <option value="3-4 سنوات">3-4 سنوات</option>
  <option value="اكثر من 5 سنوات">اكثر من 5 سنوات</option>
</select>
</div>

          <input className='inputFormEva' type="text" value={ whereStudied} onChange={(e)=> setWhereStudied(e.target.value)} placeholder="اين تعلمت" required/>
          <input className='inputFormEva' type="text" value={ goal} onChange={(e)=> setGoal(e.target.value)} placeholder="هدفك من التعليم" required/>
         {video? (<div>{fileUpload ? (<>{fileUpload.percentComplete}%</>):(<><div  className='nameAndCancel'>{video.name} <button className='cancelVideo' onClick={()=>{setVideo(null); setMoreThan(null);}}>X</button></div> <button type='submit' className='uploadEvaBtn' style={{width:'100%',marginTop:'10px', padding:"10px 0px"}}>ارسال</button></>)} </div>):(<><label for="inputTag">
              <div style={{
                cursor:"pointer",
                textAlign:"center",
              }}
              className='uploadEvaBtn'>
              اضف فيديو/تسجيل صوتي  </div>
              <input
           type="file"
         id="inputTag"
           accept="audio/*, video/*"
           onChange={(e) => {
             const file = e.target.files[0];
            if (file) {
              if (file.type.includes("image")) {
             // Handle the case when a photo is selected
             alert("Photo is not accepted");
               e.target.value = null; // Clear the file input
              } else if (file.size > 104857500) {
              setMoreThan("more than 100mb");
            } else {
           setVideo(file);
           }
          }
       }}
        style={{ display: "none" }}
        onClick={() => {
    setVideoUrl(null);
    setVideo(null);
       }}
      />
            </label>
            {moreThan ? (<>حجم الفيديو اكبر من الحد الاقصى</>):(<div>الحجم الاقصى"100" ميجا بايت</div>)} </>)}
    </form>
    </div>
    }
    </div>
  )
}
