import React,{useState, useEffect} from 'react'
import "./evaluation.css"
import axios from 'axios';
export default function Evaluation({teacher}) {
  const [theUser, setTheUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState('') 
  const [formData, setFormData] = useState({})
  const [videoUrl, setVideoUrl] = useState('')
  const [courseNameNumber, setCourseNameNumber] = useState('');
  console.log(courseNameNumber)
  const [data, setData] = useState({
        teacherId:teacher._id,
        teacherFirstName:teacher.firstName,
        teacherLastName:teacher.lastName,
        courseId:"evaluation",
        // courseName:`${exp} ${courseNameNumber}`,
    //     courseLevel:course.level,
    //     video:videoName,
    //     myPractice:videoUrl,
    //     uniqueLink:name
  })

  console.log(data)
useEffect(()=>{
    theUser?.user ? setUser(theUser.user):(setUser(theUser.teacher)) 
},[theUser])
  useEffect(()=>{
    setData({...data, ownerId:user._id,
      studentFirstName:user.firstName,
      studentLastName:user.lastName})
  },[user])
  useEffect(()=>{
    setData({...data, myPractice: videoUrl})
  },[videoUrl])

function handleOpenWidget(e) {
  e.preventDefault()

  let myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: 'djvbchw2x',
      uploadPreset: 'bisharaHaroni',
      maxFileSize: 100 * 1024 * 1024, // 100MB in bytes
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        console.log('Done! Here is the image info:', result.info);
        setFormData({ ...formData, image: result.info.secure_url });
        setVideoUrl(result.info.secure_url);
      }
    }
  );
  myWidget.open();
}

  const uploadFile = async(e)=>{
    e.preventDefault()
    if(!videoUrl) return;
    try{
      await axios.post(process.env.REACT_APP_BACKEND_URL + "/practices/", 
      {...data,
        expTime:`${courseNameNumber}`}
    );
    setData({
      courseLevel: '',
      video: '',
      courseName:'',
      myPractice:''
    });
    }catch(e){
      console.log(e)
    }
  }
  return (
    <div className='containerEvaluation'>
    <div className='evaDesc'>
    تحميل فيديو لنفسك وأنت تعزف الموسيقى للحصول على تعليقات من معلمك يُعد أداة تعلم قيمة ومريحة. من خلال تسجيل أدائك على الفيديو، تمنح معلمك نظرة شاملة على قدراتك الموسيقية، مما يتيح تقييمًا أكثر دقة وفهمًا أعمق لبناء منهاج خاص بك. 
    </div>
    <div>
        {/* {maxSize ? ('max 100mb'):(null)} */}
        <form onSubmit={uploadFile} className='formEvaluation'>
          <div style={{width:"100%", textAlign:'center', fontWeight:"bold"}}>
          خبرتك في العزف 
          <select
           className='inputFormEva'
  value={courseNameNumber}
  onChange={(e) => setCourseNameNumber(e.target.value)}
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
  <option value=">اكثر من 5 سنوات">اكثر من 5 سنوات</option>
</select>
</div>
          <input className='inputFormEva' type="text" value={data.whereStudied} onChange={(e)=> setData({...data, whereStudied:e.target.value})} placeholder="اين تعلمت" required/>
          <input className='inputFormEva' type="text" value={data.goal} onChange={(e)=> setData({...data, goal:e.target.value})} placeholder="هدفك من التعليم" required/>
          <button onClick={handleOpenWidget} className='uploadEvaluation'>ارسل عزفك</button>
          <button type="submit" className='submitFormEva'>ارسال</button>  
          </form>
    </div>
    </div>
  )
}
