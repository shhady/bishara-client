import React,{useEffect, useState} from 'react'
import { v4 as uuid } from "uuid";
import axios from 'axios';
export default function AddVideo({practice, onVideoAdd, socket}) {
    const [commentText, setCommentText] = useState('');
    const [formData, setFormData] = useState({})
    const [video, setVideo] = useState('')
    const unique_id = uuid();
    function handleOpenWidget (){
      let myWidget = window.cloudinary.createUploadWidget({
        cloudName: 'djvbchw2x', 
        uploadPreset: 'bisharaHaroni'}, (error, result) => { 
          if (!error && result && result.event === "success") { 
            console.log('Done! Here is the image info: ', result.info); 
            setFormData({...formData, image:result.info.secure_url})
            setVideo(result.info.secure_url)
          }
        }
      )
      myWidget.open()
    }
  
    console.log(formData)
    console.log(video)

        const handleSubmit = async (e) => {
            e.preventDefault()
            if(practice.videoReply.length > 3){
               return console.log("can't submit");
            };
            if(!video) return;
            const updatedPractice = {
                ...practice,
                videoReply: [
                  ...practice.videoReply,
                  {
                    theVideoReply: video,
                    replyId: unique_id
                  }
                ]
            }
            onVideoAdd(updatedPractice);
         try   {
            await axios
            .put(process.env.REACT_APP_BACKEND_URL + `/practices/${practice._id}`, {
              theVideoReply: video,
              videoName: practice.video ? practice.video : "فيديو تقييم",
              courseId: practice.courseId,
              nameOfProblem: commentText,
              practiceId: practice._id,
              uniqueLink: practice.uniqueLink ? practice.uniqueLink : null,
              teacherId: practice.teacherId,
              replyId: unique_id,
            })
            setCommentText('')
            setVideo('')
            socket.emit("sendNotificationComment", {
                senderName: user.firstName,
                senderFamily: user.lastName,
                senderId: user._id,
                receiverId: practice.ownerId,
                videoName: practice.video,
                videoId: practice.uniqueLink,
                courseid: practice.courseId,
              });
         }catch(e) {
            console.log(e);
         }
           
    }
   


const handleInputChange = (event) => {
    setCommentText(event.target.value);
  };

  return (
    <div onClick={()=>console.log(practice)}>
            <form onSubmit={handleSubmit} style={{width:"80%", margin:"20px auto"}}>
        <textarea
        style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center", textAlign:"center"}}
          type="text"
          placeholder="اكتب عنوان الفيديو"
          value={commentText}
          onChange={handleInputChange}
          
        />
         <button onClick={handleOpenWidget}  style={{width:"100%"}}> اضغط هنا لرفع الرد عن طريق فيديو</button>
         {video ? "تم الرفع تأكد من اضافة عنوان لاستخدام الفيديو مره اخرى" : null}
        <button type="submit" style={{width:"100%", background:"#fee4b9"}}>اضف</button>
      </form>
     
        </div>
  )
}
