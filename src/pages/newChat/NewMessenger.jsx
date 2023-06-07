import React,{useState, useEffect} from 'react'
import NewChatBox from './NewChatBox';
import NewTeachersList from './NewTeachersList'
import "./newMessenger.css"
import axios from 'axios';
import MyConversation from './MyConversation';
import { useParams } from 'react-router-dom';
export default function NewMessenger({socket}) {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("profile")));
    const [user, setUser] = useState('');
    const [chats, setChats] = useState([]) 
    const [arrived, setArrived] = useState(null);
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState(null)
    const {id} = useParams()
    useEffect(()=>{
        userData?.user ? setUser(userData.user):(setUser(userData.teacher)) 
    },[userData])

    useEffect(()=>{
        const getConversations = async () => {
            try {
              const res = await axios.get(
                process.env.REACT_APP_BACKEND_URL + `/conversations/` + id
              );
              if (!res) return null;
      
              const sortedConversations = res.data.sort((a, b) => {
                return new Date(b.lastUpdated) - new Date(a.lastUpdated);
              });
              setChats(sortedConversations);
            } catch (error) {
              console.log(error);
            }
          };
          getConversations();
    },[id])
   console.log(chats)

   useEffect(()=>{
       console.log(chats.filter((c)=>c.showAtTeacher !== "false"))
      },[chats])

      useEffect(() => {
        // socket.current = io("ws://localhost:8900");
        socket?.on("getMessage", (data) => {
            const getConversations = async () => {
                try {
                  const res = await axios.get(
                    process.env.REACT_APP_BACKEND_URL + `/conversations/` + id
                  );
                  if (!res) return null;
          
                  const sortedConversations = res.data.sort((a, b) => {
                    return new Date(b.lastUpdated) - new Date(a.lastUpdated);
                  });
                  setChats(sortedConversations);
                } catch (error) {
                  console.log(error);
                }
              };
              getConversations();
            console.log(data)
            console.log("arrived")
            setArrived("arrived")
        });
      }, [socket]);
  return (
    <>
     {user.role === "admin" || user.role === "teacher" ? (<div className='messengerPageTeacher'>
      
      <div>
      <h2>المحادثات</h2> 
      {chats.map((chat) =>(
        <div onClick={()=>setCurrentChat(chat)}>
      <MyConversation currentUser={user} conversation={chat} socket={socket}/>
      </div>
      ))}
      </div>
      <div>
      </div>
      {/* <NewChatBox user={user}/> */}
  </div>):(<div className='messengerPage'>
  <h2>المحادثات</h2> 
      <div className='testest'>
     {chats.length > 0 ? (<> {chats.map((chat) =>(
         <div>
      <MyConversation currentUser={user} conversation={chat} socket={socket}/></div>
      ))}</>):(<h3 style={{textAlign:"center", borderBottom:"1px solid black"}}>اختر المعلم الذي تريد محادثته</h3>)}
     
      </div>
      <div>
      <h2 style={{textAlign:"center"}}>المعلمين</h2>
      <NewTeachersList user={user} chats={chats}/>
      </div>
      {/* <NewChatBox user={user}/> */}
  </div>)}
    
   
        
        </>
    
  )
}
