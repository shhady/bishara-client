// import React, { useState, useEffect, useRef } from "react";
// import "./messenger.css";
// import Conversation from "../Conversations/Conversation";
// import Message from "../Message/Message";
// import axios from "axios";
// // import { io } from "socket.io-client";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
// import ListOfTeachers from "./ListOfTeachers";
// export default function Messenger({ user, setUser, socket }) {
//   const [conversations, setConversations] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const [userAvatar, setUserAvatar] = useState(null);
//   const [newMessage, setNewMessage] = useState("");
//   const [topPageImg, setTopPageImg] = useState(null);
//   const [topPageName, setTopPageName] = useState(null);
//   const [topPageLastName, setTopPageLastName] = useState(null);
//   const [teacherId, setTeacherId] = useState(null);
//   const [newConversation, setNewConversation] = useState(null);
//   const [existingConversations, setExistingConversations] = useState([]);
//   const [existingConversation, setExistingConversation] = useState(null);
//   const [theConversation, setTheConversation] = useState(null);
//   const [theText, setTheText] = useState(null);
//   //   const [teachersList, setTeachersList] = useState([]);
//   const [userId, setUserId] = useState("");

//   useEffect(() => {
//     if (!user) return;
//     user.teacher ? setUserId(user.teacher._id) : setUserId(user.user._id);
//   }, [user]);
//   useEffect(() => {
//     const conversations = async () => {
//       const result = await axios.get(
//         process.env.REACT_APP_BACKEND_URL + `/conversations/${userId}`
//       );
//       setExistingConversations(result.data);
//     };
//     conversations();
//   }, [userId]);
//   console.log(existingConversations);

//   const scrollRef = useRef();
//   // const socket = useRef();
//   // const [userId, setUserId] = useState("");
//   const [userName, setUserName] = useState("");
//   useEffect(() => {
//     user.teacher
//       ? setUserName(`${user.teacher.firstName} ${user.teacher.lastName}`)
//       : setUserName(`${user.user.firstName} ${user.user.lastName}`);
//   }, [user.teacher, user.user]);
//   useEffect(() => {
//     // socket.current = io("ws://localhost:8900");
//     socket?.on("getMessage", (data) => {
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         // createdAt: Date.now(),
//       });
//     });
//   }, [userId, socket]);

//   useEffect(() => {
//     arrivalMessage &&
//       currentChat?.members.includes(arrivalMessage.sender) &&
//       setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage, currentChat, userId]);
//   useEffect(() => {
//     user.teacher
//       ? setUserName(`${user.teacher.firstName} ${user.teacher.lastName}`)
//       : setUserName(`${user.user.firstName} ${user.user.lastName}`);
//   }, [user.teacher, user.user]);
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
//     // socket?.emit("addUser", user.teacher ? user.teacher._id : user.user._id);
//     socket?.on("getUsers", (users) => {
//       console.log(users);
//     });
//   }, [user.teacher, user.user, socket]);

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get(
//           process.env.REACT_APP_BACKEND_URL + "/message/" + currentChat?._id
//         );
//         setMessages(res.data);
//         console.log(currentChat);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getMessages();
//   }, [currentChat]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const checkConversations = () => {
//       const foundConv = existingConversations?.find((conversation) => {
//         return conversation.senderReceiver === `${userId}${teacherId}`;
//       });
//       setExistingConversation(foundConv);
//       // setCurrentChat(foundConv);
//       console.log("okkkkkkk");
//       if (foundConv) {
//         setCurrentChat(foundConv);
//         setNewConversation(null);
//         const addMessage = async () => {
//           axios
//             .post(process.env.REACT_APP_BACKEND_URL + `/message`, {
//               conversationId: foundConv._id,
//               sender: userId,
//               text: newMessage,
//             })
//             .then(async () => {
//               const res = await axios.get(
//                 process.env.REACT_APP_BACKEND_URL +
//                   "/message/" +
//                   currentChat?._id
//               );
//               setMessages(res.data);
//             });
//         };
//         addMessage();
//         console.log("there is a conversation");
//       } else {
//         setNewConversation(true);
//         console.log("there is no Conv");
//         const addConv = async () => {
//           await axios
//             .post(process.env.REACT_APP_BACKEND_URL + `/conversations/`, {
//               senderId: userId,
//               receiverId: teacherId,
//               senderReceiver: `${userId}${teacherId}`,
//               receiverSender: `${teacherId}${userId}`,
//               lastUpdated: new Date(),
//               seen: "false",
//             })
//             .then(async () => {
//               const result = await axios.get(
//                 process.env.REACT_APP_BACKEND_URL + `/conversations/${userId}`
//               );
//               setExistingConversations(result.data);
//             });
//         };
//         addConv();
//       }
//     };
//     checkConversations();
//     console.log(existingConversation);
//   };
//   // existingConversation
//   // useEffect(() => {
//   //   console.log(existingConversation);
//   //   if (!existingConversation) return;
//   //   const sendMessage = async () => {
//   //     if (!newMessage) return;
//   //     const message = {
//   //       sender: userId,
//   //       text: newMessage,
//   //       conversationId: currentChat._id,
//   //     };

//   //     const receiverId = currentChat.members.find((m) => m !== userId);
//   //     socket?.emit("sendMessage", {
//   //       senderId: userId,
//   //       userName: userName,
//   //       receiverId,
//   //       text: newMessage,
//   //     });

//   //     try {
//   //       if (!newMessage) return;
//   //       const res = await axios.post(
//   //         process.env.REACT_APP_BACKEND_URL + "/message/",
//   //         message
//   //       );
//   //       setMessages([...messages, res.data]);
//   //       setNewMessage("");
//   //     } catch (err) {
//   //       console.log(err);
//   //     }
//   //   };
//   //   sendMessage();
//   // }, [existingConversation]);
//   // useEffect(() => {
//   //   if (!newConversation) return;
//   //   const addConv = async () => {
//   //     await axios
//   //       .post(process.env.REACT_APP_BACKEND_URL + `/conversations/`, {
//   //         senderId: userId,
//   //         receiverId: teacherId,
//   //         senderReceiver: `${userId}${teacherId}`,
//   //         receiverSender: `${teacherId}${userId}`,
//   //         lastUpdated: new Date(),
//   //         seen: "false",
//   //       })
//   //       .then(async () => {
//   //         const result = await axios.get(
//   //           process.env.REACT_APP_BACKEND_URL + `/conversations/${userId}`
//   //         );
//   //         setExistingConversations(result.data);
//   //       });
//   //   };
//   //   addConv();
//   // }, [newConversation]);
//   console.log(newConversation);
//   console.log(existingConversations);
//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);
//   return (
//     <div className="overMessenger">
//       <div className="messenger">
//         <div className="chatMenu">
//           <div className="chatMenuWrapper">
//             {/* <input className="chatMenuInput" placeholder="ابحث عن معلمين" /> */}
//             {user.teacher ? (
//               <>
//                 {conversations.map((c, i) => (
//                   <div onClick={() => setCurrentChat(c)} key={i}>
//                     <Conversation conversation={c} currentUser={userId} />
//                   </div>
//                 ))}
//               </>
//             ) : (
//               <>
//                 <ListOfTeachers
//                   conversation={conversations}
//                   //   teachersList={teachersList}
//                   userId={userId}
//                   teacherId={teacherId}
//                   setTeacherId={setTeacherId}
//                   setCurrentChat={setCurrentChat}
//                   setTopPageLastName={setTopPageLastName}
//                   setTopPageName={setTopPageName}
//                   setTopPageImg={setTopPageImg}
//                 />
//               </>
//             )}
//           </div>
//         </div>
//         <div className="chatBox">
//           <div className="chatBoxWrapper">
//             {currentChat ? (
//               <>
//                 <div
//                   style={{
//                     borderBottom: "1px solid grey",
//                     display: "flex",
//                     justifyContent: "flex-start",
//                     alignItems: "center",
//                     backgroundColor: "#f0f2f5",
//                   }}
//                 >
//                   <img
//                     src={topPageImg}
//                     alt=""
//                     style={{
//                       width: "40px",
//                       height: "40px",
//                       borderRadius: "50%",
//                       marginLeft: "7px",
//                       marginRight: "5px",
//                     }}
//                   />
//                   <div>
//                     <span style={{ color: "black" }}>{topPageName} </span>
//                     <span style={{ color: "black" }}>{topPageLastName}</span>
//                   </div>
//                 </div>
//                 <div className="chatBoxTop">
//                   {messages.map((m) => (
//                     <div ref={scrollRef} key={m.id}>
//                       <Message
//                         message={m}
//                         own={m.sender === userId}
//                         userAvatar={userAvatar}
//                       />
//                     </div>
//                   ))}
//                 </div>
//                 <div className="chatBoxBottom">
//                   <input
//                     className="chatMessageInput"
//                     placeholder=""
//                     onChange={(e) => {
//                       setNewMessage(e.target.value);
//                     }}
//                     value={newMessage}
//                     // onKeyDown={(e) => {
//                     //   if (e.key === "Enter") handleSubmit();
//                     // }}
//                   ></input>
//                   <button className="chatSubmitButton" onClick={handleSubmit}>
//                     <FontAwesomeIcon icon={faPaperPlane} />
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div
//                 // style={{
//                 //   textAlign: "center",
//                 //   display: "flex",
//                 //   flexDirection: "column",
//                 //   alignItems: "center",
//                 //   margin: "auto",
//                 // }}
//                 className="clickToOpenChat"
//               >
//                 {/* <img src="" height="100%" width="100%" /> */}
//                 {/* <span>
//                   <h1>اضغط على اسم المدرس لبدأ محادثة</h1>
//                 </span> */}
//               </div>
//             )}
//           </div>
//         </div>
//         {/* <div className="chatOnline"> */}
//         {/* <div className="chatOnlineWrapper"> */}
//         {/* <ListOfTeachers
//             //   teachersList={teachersList}
//             currentId={userId}
//             setCurrentChat={setCurrentChat}
//           /> */}
//         {/* </div> */}
//         {/* </div> */}
//       </div>
//     </div>
//   );
// }

//-------------------------------------------------------------------

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

//----------------------------------------------------------------------

// import React, { useRef, useState } from "react";
// // import ChatBox from "../../components/ChatBox/ChatBox";
// import Conversation from "../Conversations/Conversation";
// import ConversationTeacher from "../Conversations/ConversationTeacher";
// // import LogoSearch from "../../components/LogoSearch/LogoSearch";
// // import NavIcons from "../../components/NavIcons/NavIcons";
// import "./messenger.css";
// import { useEffect } from "react";
// // import { userChats } from "../../api/ChatRequests";
// import { useDispatch, useSelector } from "react-redux";
// import { io } from "socket.io-client";
// import axios from "axios";

// const Messenger = ({ user, setUser }) => {
//   const dispatch = useDispatch();
//   const socket = useRef();
//   // const { user } = useSelector((state) => state.authReducer.authData);
//   const [userId, setUserId] = useState("");
//   const [chats, setChats] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [sendMessage, setSendMessage] = useState(null);
//   const [receivedMessage, setReceivedMessage] = useState(null);
//   // Get the chat in chat section

//   useEffect(() => {
//     if (!user) return;
//     user.teacher ? setUserId(user.teacher._id) : setUserId(user.user._id);
//   }, [user]);
//   //   useEffect(() => {
//   //     user.teacher
//   //       ? setUserName(`${user.teacher.firstName} ${user.teacher.lastName}`)
//   //       : setUserName(`${user.user.firstName} ${user.user.lastName}`);
//   //   }, [user.teacher, user.user]);
//   useEffect(() => {
//     const getChats = async () => {
//       try {
//         const res = await axios.get(
//           process.env.REACT_APP_BACKEND_URL + `/conversations/${userId}`
//         );
//         if (!res) return null;
//         setChats(res.data);
//         console.log(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getChats();
//   }, [userId]);

//   // Connect to Socket.io
//   useEffect(() => {
//     socket.current = io("ws://localhost:8800");
//     socket.current.emit("new-user-add", user._id);
//     socket.current.on("get-users", (users) => {
//       setOnlineUsers(users);
//     });
//   }, [user]);

//   // Send Message to socket server
//   useEffect(() => {
//     if (sendMessage !== null) {
//       socket.current.emit("send-message", sendMessage);
//     }
//   }, [sendMessage]);

//   // Get the message from socket server
//   useEffect(() => {
//     socket.current.on("recieve-message", (data) => {
//       console.log(data);
//       setReceivedMessage(data);
//     });
//   }, []);

//   // const checkOnlineStatus = (chat) => {
//   //   const chatMember = chat.members.find((member) => member !== user._id);
//   //   const online = onlineUsers.find((user) => user.userId === chatMember);
//   //   return online ? true : false;
//   // };

//   return (
//     <div className="Chat">
//       {/* Left Side */}
//       <div className="Left-side-chat">
//         {/* <LogoSearch /> */}
//         <div className="Chat-container">
//           <h2>Chats</h2>
//           <div className="Chat-list">
//             {chats.map((chat) => (
//               <>
//                 {user?.user ? (
//                   <div
//                     onClick={() => {
//                       setCurrentChat(chat);
//                     }}
//                   >
//                     <Conversation
//                       data={chat}
//                       currentUser={userId}
//                       // online={checkOnlineStatus(chat)}
//                     />
//                   </div>
//                 ) : // <div
//                 //   onClick={() => {
//                 //     setCurrentChat(chat);
//                 //   }}
//                 // >
//                 //   <ConversationTeacher
//                 //     data={chat}
//                 //     currentUser={userId}
//                 //     online={checkOnlineStatus(chat)}
//                 //   />
//                 // </div>
//                 null}
//               </>
//             ))}
//             <div
//               onClick={() => {
//                 setCurrentChat(chats);
//               }}
//             >
//               <ConversationTeacher
//                 data={chats}
//                 currentUser={userId}
//                 // online={checkOnlineStatus(chats)}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side */}

//       <div className="Right-side-chat">
//         <div style={{ width: "20rem", alignSelf: "flex-end" }}>
//           {/* <NavIcons /> */}
//         </div>
//         {/* <ChatBox
//           chat={currentChat}
//           currentUser={user._id}
//           setSendMessage={setSendMessage}
//           receivedMessage={receivedMessage}
//         /> */}
//       </div>
//     </div>
//   );
// };

// export default Messenger;
//---------------------------------------------------------------------------original
import React, { useState, useEffect, useRef } from "react";
import "./messenger.css";
import Conversation from "../Conversations/Conversation";
import Message from "../Message/Message";
import axios from "axios";
import { io } from "socket.io-client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import ListOfTeachers from "./ListOfTeachers";
export default function Messenger({
  user,
  setUser,
  socket,
  chatNotification,
  setChatNotification,
}) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [topPageImg, setTopPageImg] = useState(null);
  const [topPageName, setTopPageName] = useState(null);
  const [topPageLastName, setTopPageLastName] = useState(null);
  const [conversationsToShow, setConversationsToShow] = useState([]);
  const [conversationsForStudent, setConversationsForStudent] = useState([]);
  //   const [teachersList, setTeachersList] = useState([]);
  const scrollRef = useRef();
  // const socket = useRef();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_URL + `/conversations/` + userId
        );
        if (!res) return null;

        const sortedConversations = res.data.sort((a, b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
        setConversations(sortedConversations);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [chatNotification]);
  console.log(conversationsToShow);
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
    user.teacher
      ? setUserName(`${user.teacher.firstName} ${user.teacher.lastName}`)
      : setUserName(`${user.user.firstName} ${user.user.lastName}`);
  }, [user.teacher, user.user]);
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

        const sortedConversations = res.data.sort((a, b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
        setConversations(sortedConversations);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [userId]);

  useEffect(() => {
    const whatToShow = conversations.filter(
      (conversation) => conversation.showAtTeacher === "true"
    );
    const filteredConversations = whatToShow.filter((myConversations) => {
      return myConversations.receiver === userId;
    });
    console.log(filteredConversations);
    setConversationsToShow(filteredConversations);
  }, [conversations]);

  useEffect(() => {
    const whatToShowStudent = conversations.filter((myConversation) => {
      return myConversation.senderId === userId;
    });
    console.log(whatToShowStudent);
    setConversationsForStudent(whatToShowStudent);
  }, [conversations]);
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
          process.env.REACT_APP_BACKEND_URL + "/message/" + currentChat?._id
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
      const updateDoc = async () => {
        await axios.patch(
          process.env.REACT_APP_BACKEND_URL +
            `/conversations/${currentChat?._id}`,
          {
            showAtTeacher: "true",
            lastUdated: new Date(),
            seen: "false",
            lastSender: userId,
          }
        );
      };
      updateDoc();
      // if (!newMessage) return;
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
      process.env.REACT_APP_BACKEND_URL + `/conversations/` + userId
    );
    if (!res) return null;
    const sortedConversations = res.data.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
    setConversations(sortedConversations);
  };

  useEffect(() => {
    // const updateConversation = async () => {
    //   await axios.patch(
    //     process.env.REACT_APP_BACKEND_URL +
    //       `/conversations/${currentChat?._id}`,
    //     {
    //       showAtTeacher: "true",
    //       lastUdated: new Date(),
    //       seen: "false",
    //     }
    //   );
    // };
    // updateConversation();
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  // const makeItSeen = async (conversation) => {
  //   console.log(conversation);
  //   try {
  //     await axios
  //       .patch(
  //         process.env.REACT_APP_BACKEND_URL +
  //           `/conversations/${conversation?._id}`,
  //         { seen: "true" }
  //       )
  //       .then(async () => {
  //         const res = await axios.get(
  //           process.env.REACT_APP_BACKEND_URL + `/conversations/${currentUser}`
  //         );
  //         setConversations(res.data);
  //       });
  //   } catch (error) {
  //     console.log("something went wrong", error);
  //   }
  // };

  return (
    <div className="overMessenger">
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {/* <input className="chatMenuInput" placeholder="ابحث عن معلمين" /> */}
            {user?.teacher ? (
              <>
                {conversationsToShow?.map((specificConv, i) => (
                  <div
                    onClick={() => {
                      setCurrentChat(specificConv);
                      setChatNotification(false);
                      console.log(specificConv);
                    }}
                    key={i}
                  >
                    <Conversation
                      conversation={specificConv}
                      currentUser={userId}
                      currentChat={specificConv}
                      setCurrentChat={setCurrentChat}
                      setConversations={setConversations}
                      setTopPageLastName={setTopPageLastName}
                      setTopPageName={setTopPageName}
                      setTopPageImg={setTopPageImg}
                    />
                  </div>
                ))}
              </>
            ) : (
              <>
                {conversationsForStudent?.map((specificConv, i) => (
                  <div
                    onClick={() => {
                      setCurrentChat(specificConv);
                      setChatNotification(false);
                      console.log(specificConv);
                    }}
                    key={i}
                  >
                    <Conversation
                      conversation={specificConv}
                      currentUser={userId}
                      currentChat={specificConv}
                      setCurrentChat={setCurrentChat}
                      setConversations={setConversations}
                      setTopPageLastName={setTopPageLastName}
                      setTopPageName={setTopPageName}
                      setTopPageImg={setTopPageImg}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div
                  style={{
                    borderBottom: "1px solid grey",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: "#f0f2f5",
                  }}
                  onMouseOver={setChatNotification(false)}
                >
                  <img
                    src={topPageImg}
                    alt=""
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginLeft: "7px",
                      marginRight: "5px",
                    }}
                  />
                  <div>
                    <span style={{ color: "black" }}>{topPageName} </span>
                    <span style={{ color: "black" }}>{topPageLastName}</span>
                  </div>
                </div>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div
                      ref={scrollRef}
                      key={m.id}
                      //  onMouseOver={makeItSeen}
                    >
                      <Message
                        message={m}
                        own={m.sender === userId}
                        userAvatar={userAvatar}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <input
                    className="chatMessageInput"
                    placeholder=""
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                    }}
                    value={newMessage}
                    // onKeyDown={(e) => {
                    //   if (e.key === "Enter") handleSubmit();
                    // }}
                  ></input>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </div>
              </>
            ) : (
              <div
                // style={{
                //   textAlign: "center",
                //   display: "flex",
                //   flexDirection: "column",
                //   alignItems: "center",
                //   margin: "auto",
                // }}
                className="clickToOpenChat"
              >
                {/* <img src="" height="100%" width="100%" /> */}
                {/* <span>
                  <h1>اضغط على اسم المدرس لبدأ محادثة</h1>
                </span> */}
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
    </div>
  );
}
