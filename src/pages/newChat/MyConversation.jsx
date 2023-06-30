import React,{useState, useEffect} from 'react'
import axios from 'axios';
import "./newMessenger.css"
import { Link } from 'react-router-dom';
import { color } from '@chakra-ui/react';
export default function MyConversation({currentUser, conversation, socket}) {
    const [user, setUser] = useState(null);
   console.log(conversation)
   
    useEffect(() => {
        const friendId = conversation?.members.find((m) => m !== currentUser._id);
        const getUser = async () => {
          try {
            if (user?.user) return;
            const response = await axios.get(
              process.env.REACT_APP_BACKEND_URL + "/users/" + friendId
            );
            setUser(response.data);
          } catch (error) {
            console.log("error");
          }
          try {
            if (user?.teacher) return;
            const response = await axios.get(
              process.env.REACT_APP_BACKEND_URL + "/teachers/" + friendId
            );
            setUser(response.data);
          } catch (error) {
            console.log("error");
          }
        };
        getUser();
      }, [conversation, currentUser]);
    
  return (<>
  {currentUser?.role === "admin" || currentUser?.role === "teacher"  ? (<> 
  {conversation.showAtTeacher === "true" ? <>
  {conversation.seen === 'true' || conversation.lastSender === currentUser._id  ? (
  <Link to={`/chatting?currentChat=${conversation._id}&to=${user?._id}&from=${currentUser._id}`} style={{textDecoration:"none" ,color:"black"}}>
  <div className='conversationsList'>
            <div className='conversation1'>
        <img  onClick={()=>console.log(conversation)} src={user?.avatar ? user.avatar : "https://img.icons8.com/material-rounded/24/null/user.png"} alt={user?.firstName} width="50px" height="50px" style={{borderRadius:"50%", margin:"10px"}}/>
        <div>{user?.firstName} {user?.lastName}</div>
        </div> 
        <div>

        </div>
        </div></Link>):(<Link to={`/chatting?currentChat=${conversation._id}&to=${user?._id}&from=${currentUser._id}`} style={{textDecoration:"none" ,color:"black"}}>
        <div className='conversationsList'>
            <div className='conversation1'>
        <img  onClick={()=>console.log(conversation)} src={user?.avatar ? user.avatar : "https://img.icons8.com/material-rounded/24/null/user.png"} alt={user?.firstName} width="50px" height="50px" style={{borderRadius:"50%", margin:"10px"}}/>
        <div style={{fontWeight:"bold"}}>{user?.firstName} {user?.lastName}</div>
        </div> 
        <div className='UnSeenMessage'>

        </div>
        </div></Link>)}</>:(null)}</>):(<>
            {conversation.seen === 'true' || conversation.lastSender == currentUser?._id  ? (<Link to={`/chatting?currentChat=${conversation?._id}&to=${user?._id}&from=${currentUser?._id}`} style={{textDecoration:"none" ,color:"black"}}>
              <div className='conversationsList'>
            <div className='conversation1'>
        <img  onClick={()=>console.log(user)} src={user?.avatar ? user.avatar : "https://img.icons8.com/material-rounded/24/null/user.png"} alt={user?.firstName} width="50px" height="50px" style={{borderRadius:"50%", margin:"10px"}}/>
        <div>{user?.firstName} {user?.lastName}</div>
        </div> 
        <div>

        </div>
        </div></Link>):(<Link to={`/chatting?currentChat=${conversation._id}&to=${user?._id}&from=${currentUser._id}`} style={{textDecoration:"none" ,color:"black"}}>
        <div className='conversationsList'>
            <div className='conversation1'>
        <img  onClick={()=>console.log(user)} src={user?.avatar ? user.avatar : "https://img.icons8.com/material-rounded/24/null/user.png"} alt={user?.firstName} width="50px" height="50px" style={{borderRadius:"50%", margin:"10px"}}/>
        <div  style={{fontWeight:"bold"}}>{user?.firstName} {user?.lastName}</div>
        </div> 
        <div className='UnSeenMessage'>

        </div>
        </div></Link>)}</>)}
 
  
  </>
    
  )
}
