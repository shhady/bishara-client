import React, { useState, useEffect, useRef } from "react";
import "./messenger.css";
import Conversation from "../Conversations/Conversation";
import Message from "../Message/Message";
import axios from "axios";
// import { io } from "socket.io-client";
import ListOfTeachers from "./ListOfTeachers";
export default function Messenger({ user, setUser, socket }) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  //   const [teachersList, setTeachersList] = useState([]);
  const scrollRef = useRef();
  // const socket = useRef();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    user.teacher
      ? setUserName(`${user.teacher.firstName} ${user.teacher.lastName}`)
      : setUserName(`${user.user.firstName} ${user.user.lastName}`);
  }, [user.teacher, user.user]);
  useEffect(() => {
    // socket.current = io("ws://localhost:8900");
    socket?.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        // createdAt: Date.now(),
      });
    });
  }, [userId, socket]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat, userId]);

  useEffect(() => {
    user.teacher ? setUserAvatar(user.teacher.avatar) : setUserAvatar("");
    user.teacher ? setUserId(user.teacher._id) : setUserId(user.user._id);
  }, [user.teacher, user.user]);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_URL + `/conversations/` + userId
        );
        if (!res) return null;
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [userId]);
  useEffect(() => {
    // socket?.emit("addUser", user.teacher ? user.teacher._id : user.user._id);
    socket?.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user.teacher, user.user, socket]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage) return;
    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((m) => m !== userId);
    socket?.emit("sendMessage", {
      senderId: userId,
      userName: userName,
      receiverId,
      text: newMessage,
    });

    try {
      if (!newMessage) return;
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/messages/",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          {/* <input className="chatMenuInput" placeholder="ابحث عن معلمين" /> */}
          {user.teacher ? (
            <>
              {conversations.map((c, i) => (
                <div onClick={() => setCurrentChat(c)} key={i}>
                  <Conversation conversation={c} currentUser={userId} />
                </div>
              ))}
            </>
          ) : (
            <>
              <ListOfTeachers
                conversation={conversations}
                //   teachersList={teachersList}
                currentId={userId}
                setCurrentChat={setCurrentChat}
              />
            </>
          )}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages.map((m) => (
                  <div ref={scrollRef} key={m.id}>
                    <Message
                      message={m}
                      own={m.sender === userId}
                      userAvatar={userAvatar}
                    />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder=""
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                  }}
                  value={newMessage}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit();
                  }}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  ارسل
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <span>
                <h1 className="clickToOpenChat">
                  اضغط على اسم المدرس لبدأ محادثة
                </h1>
              </span>
            </div>
          )}
        </div>
      </div>
      {/* <div className="chatOnline"> */}
      {/* <div className="chatOnlineWrapper"> */}
      {/* <ListOfTeachers
            //   teachersList={teachersList}
            currentId={userId}
            setCurrentChat={setCurrentChat}
          /> */}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}

// import React, { useState, useEffect, useRef } from "react";
// import "./messenger.css";
// import Conversation from "../Conversations/Conversation";
// import Message from "../Message/Message";

// import axios from "axios";

// export default function Messenger({ user, setUser, socket }) {
//   const [conversations, setConversations] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const [userAvatar, setUserAvatar] = useState(null);
//   const [newMessage, setNewMessage] = useState("");
//   const scrollRef = useRef();
//   const [userId, setUserId] = useState("");
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     user.teacher
//       ? setUserName(`${user.teacher.firstName} ${user.teacher.lastName}`)
//       : setUserName(`${user.user.firstName} ${user.user.lastName}`);
//   }, [user.teacher, user.user]);

//   useEffect(() => {
//     socket?.on("getMessage", (data) => {
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//       });
//     });
//   }, [userId, socket]);

//   useEffect(() => {
//     arrivalMessage &&
//       currentChat?.members.includes(arrivalMessage.sender) &&
//       setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage, currentChat, userId]);

//   useEffect(() => {
//     user.teacher ? setUserAvatar(user.teacher.avatar) : setUserAvatar("");
//     user.teacher ? setUserId(user.teacher._id) : setUserId(user.user._id);
//   }, [user.teacher, user.user]);

//   useEffect(() => {
//     const getConversations = async () => {
//       try {
//         const res = await axios.get(
//           process.env.REACT_APP_BACKEND_URL + `/conversations/` + userId
//         );
//         if (!res) return null;
//         setConversations(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getConversations();
//   }, [userId]);

//   useEffect(() => {
//     socket?.on("getUsers", (users) => {
//       console.log(users);
//     });
//   }, [user.teacher, user.user, socket]);

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get(
//           process.env.REACT_APP_BACKEND_URL + "/messages/" + currentChat?._id
//         );
//         setMessages(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getMessages();
//   }, [currentChat]);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!newMessage) return;
//     const message = {
//       sender: userId,
//       text: newMessage,
//       conversationId: currentChat._id,
//     };

//     try {
//       await axios.post(
//         process.env.REACT_APP_BACKEND_URL + "/messages",
//         message
//       );
//       setMessages((prev) => [...prev, message]);
//       setNewMessage("");
//       socket?.emit("sendMessage", message);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleSubmit(e);
//     }
//   };

//   return (
//     <div className="messenger">
//       <div className="conversation-list">
//         {conversations.map((conversation) => (
//           <Conversation
//             key={conversation._id}
//             conversation={conversation}
//             currentChat={currentChat}
//             setCurrentChat={setCurrentChat}
//             user={user}
//           />
//         ))}
//       </div>
//       {currentChat ? (
//         <div className="message-display">
//           <div className="message-header">
//             {currentChat.members.map((member) => {
//               if (member !== userId) {
//                 return (
//                   <h4 key={member}>
//                     {
//                       conversations
//                         .find(
//                           (conversation) => conversation._id === currentChat._id
//                         )
//                         .membersName.find((name) => name.userId === member).name
//                     }
//                   </h4>
//                 );
//               }
//               return null;
//             })}
//           </div>
//           <div className="messages" ref={scrollRef}>
//             {messages.map((message) => (
//               <Message
//                 key={message._id}
//                 message={message}
//                 userId={userId}
//                 userAvatar={userAvatar}
//               />
//             ))}
//           </div>
//           <form className="message-form" onSubmit={handleSubmit}>
//             <input
//               className="message-input"
//               type="text"
//               placeholder="Enter your message"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={handleKeyDown}
//             />
//             <button className="send-button" type="submit">
//               ارسل
//             </button>
//           </form>
//         </div>
//       ) : (
//         <div className="welcome-message">
//           <h4>Welcome, {userName}</h4>
//           <p>Select a conversation to start messaging</p>
//         </div>
//       )}
//     </div>
//   );
// }
