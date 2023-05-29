import React ,{useState, useEffect} from 'react'
import "./messengerIcon.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function MessengerIcon({socket}) {
  const [theUser, setTheUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [user, setUser] = useState('') 
  const [chats, setChats] = useState([])
 
  const [chatId, setChatId] = useState(null)
  const navigate = useNavigate()
  useEffect(()=>{
    theUser?.user ? setUser(theUser.user):(setUser(theUser.teacher)) 
},[theUser])


// useEffect(() => {

//   socket?.on("getMessage", (data) => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const conversationId = urlParams.get('currentChat');
//     console.log(conversationId)
//     console.log(data.userName)
//     console.log(conversationId !== data.userName ? ('no match'):('match'))
//     if(conversationId !== data.userName) {
//       setChats(["got a new message",data]);
//       console.log("got the message")
//     }else{
//       const makeItSeen = async () => {
//         try {
//           await axios
//             .patch(
//               process.env.REACT_APP_BACKEND_URL +
//                 `/conversations/${conversationId}`,
//               { seen: "true" }
//             )
//         } catch (error) {
//           console.log("something went wrong", error);
//         }
//       };
//       makeItSeen()
//     }
    
//   });
// }, [socket]);
useEffect(()=>{
  if (user?._id === from || user?._id === to) {
    setChats([])
  }
},[])
useEffect(() => {
  const handleReceivedMessage = (data) => {
    const urlParams = new URLSearchParams(window.location.search);
    const conversationId = urlParams.get('currentChat');
    console.log(conversationId);
    console.log(data.userName);
    console.log(conversationId !== data.userName ? 'no match' : 'match');

    if (conversationId !== data.userName) {
      setChats((prevChats) => [...prevChats, { message: 'got a new message', data }]);
      console.log('got the message');
    } else {
      if (data.senderId !== user._id) {
        makeConversationSeen(conversationId);
      }
    }
  };

  const makeConversationSeen = async (conversationId) => {
    try {
      await axios.patch(
        process.env.REACT_APP_BACKEND_URL + `/conversations/${conversationId}`,
        { seen: true }
      );
      
    } catch (error) {
      console.log('Something went wrong:', error);
    }
  };

  socket?.on('getMessage', handleReceivedMessage);

  return () => {
    socket?.off('getMessage', handleReceivedMessage);
  };
}, [socket,user]);


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

 
  return (
    <div style={{
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",}}>
    {chats.length > 0 ? (<div style={{position:"relative",maxHeight:"20px"}}
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
  </div>):(<div  style={{maxHeight:"20px"}}
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
    
    
  </div> )
}
