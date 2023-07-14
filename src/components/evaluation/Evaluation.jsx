
import React, {useState,useEffect} from 'react'
import axios from 'axios';
import "./evaluation.css"
import { useNavigate } from 'react-router-dom';
export default function Evaluation({teacher, user, setUser}) {
  console.log({t:teacher , u:user});
  const [expTime,setExpTime]= useState(user?.experience)
  const [goal, setGoal] = useState(user?.goal)
  const [whereStudied,setWhereStudied] = useState(user?.whereStudied);
  const [status, setStatus] = useState(user?.status)
  const [video, setVideo] = useState('')
  const [moreThan, setMoreThan] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [fileUpload, setFileUpload] = useState('')
  const plan  =   JSON.parse(localStorage.getItem("plan"))
  const navigate = useNavigate()
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

  console.log(status);
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
                   experience:expTime ?   expTime:user.experience,
                   status: status === "canTry" ? "triedOnce": status
                 }
               )
               
               console.log(response.data);
               window.localStorage.setItem('profile', JSON.stringify(response.data.user));
               setUser(response.data.user);
               navigate('/profile');
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
    {!user &&  <div className='notSub'><div>الرجاء تسجيل الدخول</div><div> <button onClick={()=> navigate("/auth")} className='uploadEvaBtn'>تسجيل الدخول</button></div></div>}
    {user?.status === "triedOnce" && plan?.status !== 'active' && <div className='notSub'><div>يجب الاشتراك للحصول على تقييم لعزفك مرة اخرى</div><div> <button onClick={()=> navigate("/subscription")} className='uploadEvaBtn'>للاشتراك</button></div></div>}
    {user && plan?.teacherId !== teacher._id ? (<div  style={{display:"flex", justifyContent:"center",flexDirection:"column", alignItems:"center", height:"100%"}}><h3>انت مشترك مع معلم اخر</h3><button onClick={()=>navigate(`/newTeacher/${plan?.teacherId}`)} style={{background:"#fcedd5", padding:"10px 15px"}}>{plan?.teacherName}</button></div>):(null)}
    {(plan?.teacherId === teacher._id && plan?.status === 'active'|| user?.status === "canTry")  && <div className='notSub'>
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
