import React,{useState, useEffect} from 'react'
import axios from 'axios'
import "./newMessenger.css"
import StartChat from '../../components/Messenger/StartChat'
import { useNavigate } from 'react-router-dom'
export default function NewTeachersList({user,chats}) {
    const [teachers, setTeachers] = useState([])
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    console.log(user)
    useEffect(() => {
        const fetchData = async () => {
          try {
            const teachersResponse = await axios.get(
              process.env.REACT_APP_BACKEND_URL + "/teachers"
            );
      
            const filteredTeachers = teachersResponse.data.filter(
              (teacher) => !chats.some((excluded) => excluded.receiver === teacher._id )
            );
      
            const userTeachers = filteredTeachers.filter((teacher) => teacher._id !== user._id );
      
            setTeachers(userTeachers);
      
            console.log(userTeachers); // Logging filtered teachers
      
            console.log(chats); // Logging chats array
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchData();
      }, [user, chats]);
      
   console.log(teachers)
   console.log(chats)
  const navigate = useNavigate();
 
  useEffect(() => {
    const conv = async () => {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/conversations"
      );
      setConversations(result.data.map((members) => members.members));
    };
    conv();
  }, []);

  const handleClick = async (teacher) => {
    let existingConversations = conversations;
    let newConversation = [user._id, teacher._id];
    existingConversations = JSON.stringify(existingConversations);
    newConversation = JSON.stringify(newConversation);
    let c = existingConversations.indexOf(newConversation);
    if (c !== -1) {
      const conv = async () => {
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_URL +
            `/conversations/find/${user._id}/${teacher._id}`
        );
        setCurrentChat(res.data);
      };
      conv();
    } else {
      console.log("no chat");
      await axios
        .post(process.env.REACT_APP_BACKEND_URL + "/conversations", {
          receiverId: teacher._id,
          senderId: user._id,
          senderReceiver: `${user._id}${teacher._id}`,
          receiver: `${teacher._id}`,
          lastUpdated: new Date(),
          seen: "false",
          showAtTeacher: "false",
        })
        .then(() => {
          conversations.push([...conversations, [user._id, teacher._id]]);
        })
        .then(async () => {
          const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL +
              `/conversations/find/${user._id}/${teacher._id}`
          );
          setCurrentChat(res.data);
        });
    }
  };
  useEffect(()=>{
    if(!currentChat) return;
    navigate(`/chatting?currentChat=${currentChat?._id}&to=${currentChat?.receiver}&from=${currentChat?.senderId}`);
  },[currentChat])

  console.log(currentChat)
    const drawTeachers = () => {
        return teachers.map((teacher) =>{
            return <div key={teacher._id} className="teacherInRightSide" style={{cursor:"pointer"}}>
               <div className='nameAndImg' onClick={()=>handleClick(teacher)}> <img src={teacher.avatar} alt={teacher.firstName} height="50px" width='50px' style={{borderRadius:"50%", margin:"10px"}}/>
                {teacher.firstName} {teacher.lastName}</div>
                {/* <StartChat teacherId={teacher._id} userId={user._id} /> */}
                </div>
        })
    }
  return (
    <div className='rightSideChat'><>{drawTeachers()}</> </div>
  )
}
