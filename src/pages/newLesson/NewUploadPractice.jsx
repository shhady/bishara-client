
import React,{useState, useEffect} from 'react'
import axios from 'axios';
import './newLesson.css';
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom';
export default function NewUploadPractice({course, videoName, uniqueLink}) {
      // const [theUser, setTheUser] = useState(JSON.parse(localStorage.getItem("profile")));
      const [socket, setSocket] = useState(null);
      const [user, setUser] =  useState(JSON.parse(localStorage.getItem("profile")));
      const [moreThan, setMoreThan] = useState(null);
      const [url, setUrl] = useState(null);
      const [video, setVideo] = useState();
      const [videoUrl, setVideoUrl] = useState('')
      const [fileUpload, setFileUpload] = useState(null);
      const plan  =   JSON.parse(localStorage.getItem("plan"))
        // const [maxSize, setMaxSize] = useState('')
    // useEffect(()=>{
    //   if (!theUser) return;
    //     theUser?.user ? setUser(theUser.user):(setUser(theUser.teacher)) 
    // },[theUser])
    const [formData, setFormData] = useState({})
    
    const navigate = useNavigate();
    console.log(user)
    useEffect(() => {
        if (!user) return;
        setSocket(
          io(
            // "https://dawrafun1.herokuapp.com/" ||
            "https://bisharaserver.herokuapp.com/"
          )
        );
      }, [user]);
    
      useEffect(() => {
        if (!user) return;
        socket?.emit("addUser", user._id);
      }, [socket, user]);
      // function handleOpenWidget() {
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
      //       }
      //       else{
      //           // setMaxSize('max 100mb')
      //       }
      //     }
      //   );
      //   myWidget.open();
      // }
      const postDetails = () => {
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
          .then((res) => setVideoUrl(res.data.url))
          .catch((err) => {
            console.log(err);
          });
      };
  
   
    useEffect(() => {
   
        const fetch = async () => {
          if (!videoUrl) return;
          await axios.post(process.env.REACT_APP_BACKEND_URL + "/practices/", {
            ownerId:user?._id,
            playlistId:course.playlistId,            
            studentFirstName:user?.firstName,
            studentLastName:user?.lastName,
            teacherId:course.owner,
            teacherFirstName:course.firstName,
            teacherLastName:course.lastName,
            courseId:course._id,
            courseName:course.title,
            courseLevel:course.level,
            video:videoName,
            myPractice:videoUrl,
            uniqueLink:uniqueLink
          });
         await socket.emit("sendNotificationComment", {
            senderName: user?.firstName,
            senderFamily: user?.lastName,
            senderId: user?._id,
            receiverId: course.owner,
            videoName: videoName,
            videoId: uniqueLink,
            courseid: course._id,
          });
          navigate('/profile')
        };
        fetch();
      }, [videoUrl]);
  
      const openAlert = ()=>{
        alert("لرفع تمارين يجب الاشتراك");
        navigate("/subscription"); 
      }
      console.log(user?.trialTeacher);
      console.log(course?.owner);
  return (
    <div className='divOfUploadBtn'>
       {/* {user?.trialTeacher === course?.owner ? (<div  className='divOfUploadBtn'><button onClick={postDetails} className='uploadPracticeBtn'>ارفع تمرين</button>  
        الحجم الاقصى"100MB"</div>):(<div><button onClick={openAlert} className='uploadPracticeBtn'>ارفع تمرين</button> </div>)} */}
        {plan?.teacherId === course?.owner && plan?.status === 'active' ?
        <>
         {video ? (<button className='uploadPracticeBtn' onClick={postDetails}>ارسال</button>):(null)}
         {video ? <> {fileUpload?.percentComplete ? (<>{fileUpload?.percentComplete}%</>): (<div style={{display:'flex', justifyContent:'center', alignItems:'center'}}> {video.name}  <button onClick={()=> {setVideo(null); setVideoUrl(null)}} style={{background:"red", marginRight:"10px"}}>X</button></div>)}</>:  <><label for="inputTag">
              <div style={{
                cursor:"pointer",
                textAlign:"center",
              }}
              className='uploadPracticeBtnDiv'>
              ارفع تمرين  </div>
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
    setMoreThan(null);
  }}
/>

            </label>
             <div>الحجم الاقصى"100" ميجا بايت</div></>
            }
           
        </>
        : <button className='uploadPracticeBtn' onClick={openAlert}>ارفع التمرين</button> }
        {/* <div>  {fileUpload? (<>{fileUpload?.percentComplete}%</>):(null)} </div>  */}
           {moreThan === "more than 100mb" ? <div>الفيديو اكبر من 100 ميجا بايت</div> : null}
            
    </div>
  )
}
