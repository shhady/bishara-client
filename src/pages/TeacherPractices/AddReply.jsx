import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faPen, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import AddComment from './AddComment';
import AddVideo from './AddVideo';
import AudioRecord from '../../components/AudioRecord';
import { io } from "socket.io-client";

export default function AddReply({ practice, onCommentAdd, onVideoAdd, onRecordAdd }) {
  const [openInput, setOpenInput] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [socket, setSocket] = useState(null);
    // const [maxSize, setMaxSize] = useState('')

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
  const handleIconClick = (inputType) => {
    setOpenInput((prevInput) => (prevInput === inputType ? null : inputType));
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <div style={{background:openInput === "video" ? "gray":'#e9e8e8', borderRadius:"50%", width:"40px", height:"40px", display:"flex", justifyContent:"center", alignItems:'center'}}>
        <FontAwesomeIcon icon={faVideo} onClick={() => handleIconClick('video')}/></div>
        <div style={{background:openInput === "comment" ? "gray":'#e9e8e8', borderRadius:"50%", width:"40px", height:"40px", display:"flex", justifyContent:"center", alignItems:'center'}}>
        <FontAwesomeIcon icon={faPen} onClick={() => handleIconClick('comment')} /></div>
        <div style={{background:openInput === "record" ? "gray":'#e9e8e8', borderRadius:"50%", width:"40px", height:"40px", display:"flex", justifyContent:"center", alignItems:'center'}}>

        <FontAwesomeIcon icon={faMicrophone} onClick={() => handleIconClick('record')} /></div>
      </div>
      <div>
        {openInput === 'video' && <AddVideo practice={practice} onVideoAdd={onVideoAdd} socket={socket} user={user}/>}
      </div>
      <div>
        {openInput === 'comment' && <AddComment practice={practice} onCommentAdd={onCommentAdd} socket={socket} user={user}/>}
      </div>
      <div>
        {openInput === 'record' &&<div style={{textAlign:"center", marginTop:"20px"}}> اضغط على المايكريفون ادناه وابدأ التسجيل<div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}><AudioRecord practice={practice} onRecordAdd={onRecordAdd} setOpenInput={setOpenInput} socket={socket}/></div></div>}
      </div>
    </div>
  );
}
