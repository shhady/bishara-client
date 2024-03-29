import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function UploadPractice({
  userId,
  userF,
  userL,
  courseInfo,
  lesson,
  socket,
  paidUpdate,
  ifNotUserShow,
   setIfNotUser
}) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const paid = useState(window.localStorage.getItem("paid"))
  const [url, setUrl] = useState(null);
  const [video, setVideo] = useState();
  const [fileUpload, setFileUpload] = useState(null);
  const [practiceInfo, setPracticeInfo] = useState({
  
  });
  const [moreThan, setMoreThan] = useState(null);


const navigate = useNavigate()
  useEffect(() => {
    if (!user) return;
    const userF = user.user ? user.user.firstName : user.teacher.firstName;
    const userL = user.user ? user.user.lastName : user.teacher.lastName;
    const userid = user.user ? user.user._id : user.teacher._id;
    setPracticeInfo({
      ...practiceInfo,
      studentFirstName: userF,
      studentLastName: userL,
      ownerId: userid,
      teacherId: courseInfo.owner,
      teacherFirstName: courseInfo.firstName,
      teacherLastName: courseInfo.lastName,
      courseId: courseInfo.playlistId,
      courseName: courseInfo.title,
      courseLevel: courseInfo.level,
      video: lesson.snippet.title,
      uniqueLink: lesson.snippet.resourceId.videoId,
    });
  }, [user, lesson]);

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
      .then((res) => setUrl(res.data.secure_url))
      .then(() => {
        setVideo(null)
        // console.log(lesson);
      })
      // .then(console.log(url))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
   
    const fetch = async () => {
      if (!url) return;
      await axios.post(process.env.REACT_APP_BACKEND_URL + "/practices/", {
        ...practiceInfo,
        myPractice: url,
      });
     await socket.emit("sendNotificationComment", {
        senderName: userF,
        senderFamily: userL,
        senderId: userId,
        receiverId: courseInfo.owner,
        videoName: lesson.snippet.title,
        videoId: lesson.snippet.resourceId.videoId,
        courseid: courseInfo._id,
      });
      navigate('/profile')
    };
    fetch();
   
    
  }, [url]);

  return (
    <div>
      {paid[0] === courseInfo.owner || paidUpdate===courseInfo.owner ? (
        <>
          <div
            style={{
              width:"40vw",
              maxWidth: "150px",
              marginRight: "5px",
              border: "2px solid black",
          
             
            }}
          >
             <label for="inputTag">
              <div style={{
         
                cursor:"pointer",
                textAlign:"center",
              }}>
                {video ? video.name : <div style={{fontWeight:"bold"}}>                ارفع التمرين
</div>}
                </div>
            <input
              type="file"
              id="inputTag"
              onChange={(e) => {
                e.target.files[0].size > 104857500
                  ? setMoreThan("more than 100mb")
                  : setVideo(e.target.files[0]);
              }}
              style={{ display: "none" }}
              onClick={() => {
                setUrl(null);
                setVideo(null);
                setMoreThan(null);
              }}
            />
            </label>
            {moreThan && (
              <div style={{ color: "red" }}>
                لا يمكن رفع فيديو اكبر من 100 ميجا بايت
              </div>
            )}
            {video && !moreThan && !fileUpload ? (
              <div style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
              <button onClick={postDetails}>رفع الفيديو</button>
              </div>
            ) : null}
            <div style={{ minWidth: "70px" }}>
              {fileUpload && (
                <div style={{ textAlign: "center", color: "black" }}>
                  {" "}
                  تم رفع {fileUpload.percentComplete}%
                </div>
              )}
            </div>
          </div>
        </>
      ) :  <div onClick={()=>setIfNotUser(!ifNotUserShow)}
      style={{display:"flex", justifyContent: "center", alignItems: "center", flexDirection:"column"}}
    >
      {user?.user ? (<> 
      <div style={{
        width:"40vw",
        maxWidth: "150px",
        marginRight: "5px",
        border: "2px solid black",
        textAlign:"center",
        fontWeight:"bold",
        cursor:"pointer",
      }} > ارفع التمرين</div>  
    {/* {ifNotUserShow && (
            <div style={{
              width:"40vw",
              }}>  يجب ان تكون مسجل لدى المعلم
           </div> )} */}
           </>):(null)}
   
      </div>}
    </div>
  );
}
