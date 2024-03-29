import React, { useState } from 'react';
import axios from 'axios';

export default function AddComment({ practice, onCommentAdd,socket,user }) {
  const [commentText, setCommentText] = useState('');
  const [doneAddingComment, setDoneAddingComment] = useState(false);
 
  const handleSubmit = async(event) => {
    event.preventDefault();
    const updatedPractice = { ...practice, reply: commentText };
    onCommentAdd(updatedPractice);
    try {
        await axios.patch(
          process.env.REACT_APP_BACKEND_URL + `/practices/${practice._id}`,
          {
            reply: commentText,
          }
        );
        await axios.patch(
          process.env.REACT_APP_BACKEND_URL + `/studentpractices/${practice._id}`,
          {
            replySeen: false,
          }
        );
        socket.emit("sendNotificationComment", {
            senderName: user.firstName,
            senderFamily: user.lastName,
            senderId: user._id,
            receiverId: practice.ownerId,
            videoName: practice.video,
            videoId: practice.uniqueLink,
            courseid: practice.courseId,
          });
      } catch (error) {
        console.log(error, "errroorrr");
      }
      
      setCommentText('');
      setDoneAddingComment("done")
  };


  const handleInputChange = (event) => {
    setCommentText(event.target.value);
  };

  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      <form onSubmit={handleSubmit} style={{width:"80%", margin:"20px auto"}}>
        <textarea
        style={{width:"100%"}}
          type="text"
          placeholder="اكتب التعليق"
          value={commentText}
          onChange={handleInputChange}
          required
        />
        <button type="submit" style={{width:"30%", background:"#fee4b9"}}>اضف</button>
      </form>
    </div>
  );
}
