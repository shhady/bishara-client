import axios from 'axios';
import React, { useEffect, useState , useRef} from 'react'
import Message from '../../components/Message/Message';
import "./newMessenger.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
export default function NewChatBox({socket}) {
  const [theUser, setTheUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [user, setUser] = useState('') 
  const urlParams = new URLSearchParams(window.location.search);
const conversationId = urlParams.get('currentChat');
const friendId = urlParams.get('to');
const from  = urlParams.get('from');
const [secondUser, setSecondUser] = useState()
const [messages, setMessages]= useState([])
const [newMessage, setNewMessage] = useState('')
const [arrivalMessage, setArrivalMessage] = useState(null);
const [myId, setmyId] = useState(null)
const [secondId, setsecondId] = useState(null)
useEffect(()=>{
  const getConv = async ()=>{
  const res = await axios.get(
    process.env.REACT_APP_BACKEND_URL +
      `/conversations/find/${user._id}/${friendId}`
  )
  setmyId(res.data?.members.find((m) => m === user._id))
  setsecondId(res.data?.members.find((m) => m !== user._id))
}
getConv()
},[user])

useEffect(()=>{
  theUser?.user ? setUser(theUser.user):(setUser(theUser.teacher)) 
},[theUser])
const scrollRef = useRef()
useEffect(()=>{
  const getMessages = async()=>{
    try{
      const response = await axios.get(process.env.REACT_APP_BACKEND_URL + `/message/${conversationId}`)
      setMessages(response.data)
  }catch(e){
    console.log(e)
  }
}
getMessages()
},[conversationId])
useEffect(() => {
  // socket.current = io("ws://localhost:8900");
  socket?.on("getMessage", (data) => {
    console.log("got it")
    console.log(data)
    setArrivalMessage({
      sender: data.senderId,
      text: data.text,
      // createdAt: Date.now(),
    });
  });
}, [from, socket]);

useEffect(() => {
  arrivalMessage &&
    // currentChat?.members.includes(arrivalMessage.sender) &&
    setMessages((prev) => [...prev, arrivalMessage]);
}, [arrivalMessage, conversationId, from]);
useEffect(() => {
  console.log(secondId);

  const getUser = async () => {
    try {
      // if (user?.user) return;
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/${secondId}`
      );
      console.log(response.data);
      setSecondUser(response.data);
    } catch (error) {
      console.log("error");
    }

    try {
      // if (user?.teacher) return;
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/teachers/${secondId}`
      );
      console.log(response.data);
      setSecondUser(response.data);
    } catch (error) {
      console.log("error");
    }
  };

  getUser();
}, [secondId]);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!newMessage) return;
  const message = {
    sender: myId,
    text: newMessage,
    conversationId: conversationId,
  };

  socket?.emit("sendMessage", {
    senderId: myId,
    userName: "sender",
    receiverId:secondId,
    text: newMessage,
  });

  try {
    const updateDoc = async () => {
      await axios.patch(
        process.env.REACT_APP_BACKEND_URL +
          `/conversations/${conversationId}`,
        {
          showAtTeacher: "true",
          lastUpdated: new Date().toISOString(),
          seen: "false",
          lastSender: myId,
        }
      );
    };
    updateDoc();
    if (!newMessage) return;
    const res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/message/",
      message
    );

    setMessages([...messages, res.data]);
    setNewMessage("");
    socket?.emit("sendMessage", message);
  } catch (err) {
    console.log(err);
  }
  const res = await axios.get(
    process.env.REACT_APP_BACKEND_URL + `/conversations/` + from
  );
  if (!res) return null;
  // const sortedConversations = res.data.sort((a, b) => {
  //   return new Date(b.updatedAt) - new Date(a.updatedAt);
  // });
  // setConversations(sortedConversations);
};
useEffect(()=>{
  const makeItSeen = async (conversation) => {
   
    try {
      await axios
        .patch(
          process.env.REACT_APP_BACKEND_URL +
            `/conversations/${conversationId}`,
          { seen: "true" }
        )
    } catch (error) {
      console.log("something went wrong", error);
    }
  };
  makeItSeen()
},[])
useEffect(() => {
  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);


  return (
    <div className='ChatPage'>
      <div className='secondUserInfo'>
        <img src={secondUser?.avatar ? secondUser?.avatar  : "https://img.icons8.com/material-rounded/24/null/user.png"} alt={secondUser?.firstName} height='40px' width='40px' style={{borderRadius:"50%", marginLeft:"20px"}}/>
        <div>{secondUser?.firstName} {secondUser?.lastName}</div>
      </div>
      <div className="messageContainer">
    {messages.map((m, index) => (
      <Message key={index} message={m} own={m.sender === from} />
    ))}
    <div ref={scrollRef} />
  </div>
      <div>
        <div className='inputMessages'>
      <form onSubmit={handleSubmit} style={{width:"100%"}}>
                  <input
                    className="chatInput"
                    placeholder=""
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                    }}
                    value={newMessage}
                    // onKeyDown={(e) => {
                    //   if (e.key === "Enter") handleSubmit();
                    // }}
                  ></input>
                  <button type="submit" className="chatSubmitButton">
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                  </form>
                  </div>
      </div>
    </div>
  )
}
