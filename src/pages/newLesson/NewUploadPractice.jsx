
import React,{useState, useEffect} from 'react'
import axios from 'axios';
import './newLesson.css';
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom';
export default function NewUploadPractice({course, videoName, uniqueLink, user, setUser}) {
      // const [theUser, setTheUser] = useState(JSON.parse(localStorage.getItem("profile")));
      const [socket, setSocket] = useState(null);
      // const [user, setUser] =  useState(JSON.parse(localStorage.getItem("profile")));
      const [moreThan, setMoreThan] = useState(null);
      // const [url, setUrl] = useState(null);
      const [video, setVideo] = useState();
      const [videoUrl, setVideoUrl] = useState('')
      const [fileUpload, setFileUpload] = useState(null);
      const plan  =   JSON.parse(localStorage.getItem("plan"))
 
    // const [formData, setFormData] = useState({})
    const [showNotification, setShowNotification] = useState(false);

const openNotification = () => {
  setShowNotification(!showNotification);
};

const closeNotification = () => {
  setShowNotification(!showNotification);
};

const redirectToSubscription = () => {
  navigate("/subscription");
};
    const navigate = useNavigate();
   
    useEffect(() => {
        if (!user) return;
        setSocket(
          io(
           
            `${process.env.REACT_APP_BACKEND_URL}`
          )
        );
      }, [user]);
    
      useEffect(() => {
        if (!user) return;
        socket?.emit("addUser", user._id);
      }, [socket, user]);
    
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
          .then((res) => setVideoUrl(res.data.secure_url))
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
          const response = await axios.put(
            process.env.REACT_APP_BACKEND_URL + `/evaluation`,
            {
              email: user.email, // fix here
              status: user.status === "canTry" ? "triedOnce": user.status
            }
          )
          
          window.localStorage.setItem('profile', JSON.stringify(response.data.user));
          setUser(response.data.user);
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
  
  
  return (
    <div className='divOfUploadBtn'>
        {plan?.teacherId === course?.owner && plan?.status === 'active' || user.status === "canTry" ?
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
        alert("لا يمكن رفع صورة, الرجاء رفع فيديو او تسجيل صوتي");
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
        : <button className='uploadPracticeBtn' onClick={openNotification}>ارفع التمرين</button> }
        {/* <div>  {fileUpload? (<>{fileUpload?.percentComplete}%</>):(null)} </div>  */}
           {moreThan === "more than 100mb" ? <div>الفيديو اكبر من 100 ميجا بايت</div> : null}
           {showNotification && (
          <div className="notification">
            <p>اهلاً, {user?.firstName} {user?.lastName} <br/> لرفع تمارين يجب الاشتراك</p>
            <span className="notification_progress"></span>
            <div style={{padding:"3px 10px", display:"flex", justifyContent:"space-between", alignItems:'center'}}>
            <button  style={{padding:"10px 15px"}} onClick={redirectToSubscription}>اشتراك</button>
            <button style={{padding:"10px 15px"}} onClick={closeNotification}>اغلاق</button>
            </div>
          </div>
        )}
    </div>
  )
}
