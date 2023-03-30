import React,{useState,useRef, useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
export default function CommentOnVideo({practice, socket}) {
    const user = JSON.parse(localStorage.getItem("profile"))
    const [showInputToReply, setShowInputToReply] = useState(false);
    const [showReply, setShowReply] = useState(true);
    const [practiceId, setPracticeId] = useState("");
    const [reply, setReply] = useState("");
  const [myReply, setMyReply] = useState("");
  
    const handleReply = (e) => {
        setReply(e.target.value);
      };
      useEffect(() => {
        setMyReply(reply);
      }, [reply]); 
      const addTeacherReply = (practice) => {
        socket.emit("sendNotificationComment", {
          senderName: user.teacher.firstName,
          senderFamily: user.teacher.lastName,
          senderId: user.teacher._id,
          receiverId: practice.ownerId,
          videoName: practice.video,
          videoId: practice.uniqueLink,
          courseid: practice.courseId,
        });
        const addReply = async () => {
          await axios
            .patch(
              process.env.REACT_APP_BACKEND_URL + `/practices/${practice._id}`,
              {
                reply: myReply,
              }
            )
            .then(async () => {
              await axios.patch(
                process.env.REACT_APP_BACKEND_URL +
                  `/studentpractices/${practice._id}`,
                {
                  replySeen: false,
                }
              );
            });
        };
        addReply();
        setShowReply(myReply);
        setPracticeId(null);
        setShowInputToReply(!showInputToReply);
      };
       
  return (
    <div>
        
        {/* {myReply ? myReply : practice.reply} */}
    {showReply ? (
      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      {myReply ? myReply : practice.reply}
        {/* {practice.reply}{myReply}{" "}{} */}
        <span style={{backgroundColor:"#ebebeb", width:"40px", height:"40px", borderRadius:"50%", display:"flex",color:"black",
         justifyContent:"center",alignItems:"center", marginRight:"10px"}} onClick={() => {
            setShowReply(false);
            setPracticeId(practice._id);
            setShowInputToReply(true)
            console.log("clicked")
          }}>
      <FontAwesomeIcon icon={faPen} />
      </span>
        {/* <button
          onClick={() => {
            setShowReply(false);
            setPracticeId(practice._id);
            setShowInputToReply(true)
            console.log("clicked")
          }}
        >
          تعديل
        </button> */}
      </div>
    ) : (
      <>
      {showInputToReply && practice._id === practiceId ?  <>
        <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <textarea
              name="reply"
              onChange={handleReply}
              placeholder="Reply"
              value={myReply}
              style={{
                height: "70%",
                width: "100%",
                marginBottom: "10px",
              }}
            />
            <button onClick={() => addTeacherReply(practice)}>
              تثبيت
            </button>
          </div>
      </> : <>
      <div style={{backgroundColor:"#ebebeb", width:"40px", height:"40px", borderRadius:"50%", display:"flex", justifyContent:"center",alignItems:"center"}} onClick={()=> {setShowInputToReply(!showInputToReply)
      setPracticeId(practice._id)}}>
      <FontAwesomeIcon icon={faPen} />
      </div>
      </>}
      </>
    )}{" "}
   
  </div>
  )
}
