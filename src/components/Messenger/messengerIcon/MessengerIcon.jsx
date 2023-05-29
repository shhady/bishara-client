import React ,{useState, useEffect} from 'react'
import "./messengerIcon.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function MessengerIcon({socket}) {
  const [theUser, setTheUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [user, setUser] = useState('') 
  const [chats, setChats] = useState([])
  useEffect(()=>{
    theUser?.user ? setUser(theUser.user):(setUser(theUser.teacher)) 
},[theUser])
useEffect(() => {
  socket?.on("getMessage", (data) => {
    setChats(["got a new message",data]);
    console.log("got the message")
  });
}, [socket]);
useEffect(()=>{
  const getConversations = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_URL + `/conversations/` + user._id
        );
        setChats(res.data.filter(c=> c.seen === 'false' && c.lastSender !== user._id));
        console.log(res.data.filter(c=> c.seen === 'false' && c.lastSender !== user._id))
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
},[user])

  const navigate = useNavigate()
  return (
    <>
    {chats.length > 0 ? (<div style={{position:"relative"}}
    onClick={() => {
      setChats([])
      navigate(`/newmessenger/${user._id}`);
    }}
  >
    <img
      src="https://img.icons8.com/fluency-systems-filled/48/null/filled-chat.png"
      alt="message"
      width="20px"
    />
    <div style={{position:"absolute", width:"10px", height:"10px", background:"red", top:'0', right:"0", borderRadius:"50%"}}></div>
  </div>):(<div
    onClick={() => {
      setChats([])
      navigate(`/newmessenger/${user._id}`);
    }}
  >
    <img
      src="https://img.icons8.com/fluency-systems-filled/48/null/filled-chat.png"
      alt="message"
      width="20px"
    />
  </div>)}
    
    
  </> )
}
