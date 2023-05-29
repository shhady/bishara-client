
import React,{useState, useEffect} from 'react'
import axios from 'axios';
import './newLesson.css';
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom';
export default function NewUploadPractice({course, videoName, uniqueLink}) {
      const [theUser, setTheUser] = useState(JSON.parse(localStorage.getItem("profile")));
      const [socket, setSocket] = useState(null);
      const [user, setUser] = useState('') 
        // const [maxSize, setMaxSize] = useState('')
    useEffect(()=>{
        theUser?.user ? setUser(theUser.user):(setUser(theUser.teacher)) 
    },[theUser])
    const [formData, setFormData] = useState({})
    const [videoUrl, setVideoUrl] = useState('')
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
      function handleOpenWidget() {
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
            else{
                // setMaxSize('max 100mb')
            }
          }
        );
        myWidget.open();
      }
  
    console.log(course)
    console.log(videoUrl)
    useEffect(() => {
   
        const fetch = async () => {
          if (!videoUrl) return;
          await axios.post(process.env.REACT_APP_BACKEND_URL + "/practices/", {
            ownerId:user?._id,
            studentFirstName:user?.firstName,
            studentLastName:user?.lastName,
            teacherId:course.owner,
            teacherFirstName:course.firstName,
            teacherLastName:course.lastName,
            courseId:course.playlistId,
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
  
  return (
    <div className='divOfUploadBtn'>
        <button onClick={handleOpenWidget} className='uploadPracticeBtn'>ارفع تمرين</button>
        {/* {maxSize ? ('max 100mb'):(null)} */}
    </div>
  )
}
