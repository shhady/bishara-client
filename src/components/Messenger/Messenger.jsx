
//---------------------------------------------------------------------------original
import React, { useState, useEffect, useRef } from "react";
import "./messenger.css";
import Conversation from "../Conversations/Conversation";
import Message from "../Message/Message";
import axios from "axios";
import { io } from "socket.io-client";
import {Link} from "react-router-dom"
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
    setConversationsToShow(filteredConversations);
  }, [conversations]);

  useEffect(() => {
    const whatToShowStudent = conversations.filter((myConversation) => {
      return myConversation.senderId === userId;
    });
  
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
  const makeItSeen = async (currentChat) => {
    
    if (currentChat.lastSender === userId)
      return console.log("i'm the last sender");
    try {
      await axios
        .patch(
          process.env.REACT_APP_BACKEND_URL +
            `/conversations/${currentChat?._id}`,
          { seen: "true" }
        )
        .then(async () => {
          const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/conversations/${userId}`
          );
          setConversations(res.data);
        });
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  return (
    <div className="overMessenger">
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">

            {/* <input className="chatMenuInput" placeholder="ابحث عن معلمين" /> */}
            {user ? (
              <>
                {conversations?.map((specificConv, i) => (
                  <div
                    onClick={() => {
                      setCurrentChat(specificConv);
                      setChatNotification(false);
                      
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
              <></>
              // <>
              //   {conversations?.map((specificConv, i) => (
              //     <div
              //       onClick={() => {
              //         setCurrentChat(specificConv);
              //         setChatNotification(false);
                     
              //       }}
              //       key={i}
              //     >
              //       <Conversation
              //         conversation={specificConv}
              //         currentUser={userId}
              //         currentChat={specificConv}
              //         setCurrentChat={setCurrentChat}
              //         setConversations={setConversations}
              //         setTopPageLastName={setTopPageLastName}
              //         setTopPageName={setTopPageName}
              //         setTopPageImg={setTopPageImg}
              //       />
              //     </div>
              //   ))}
              // </>
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
                >
                  <img
                    src={topPageImg.replace("http://", "https://")}
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
                <div
                  className="chatBoxTop"
                  onMouseOver={() => {
                    setChatNotification(false);
                    makeItSeen(currentChat);
                  }}
                >
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
                <div
                  className="chatBoxBottom"
                  onMouseOver={() => setChatNotification(false)}
                >
                  <form onSubmit={handleSubmit} style={{width:"100%"}}>
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
                  <button type="submit" className="chatSubmitButton">
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                  </form>
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
                <h2 style={{textAlign:"center"}}>
                لبدأ محادثة 
                <Link to="/newMessenger"> اضغط هنا </Link>  
                واختر المعلم الذي تريد بدأ المحادثه معه واضغط على مراسله
                {/* <img src="" height="100%" width="100%" /> */}
                {/* <span>
                  <h1>اضغط على اسم المدرس لبدأ محادثة</h1>
                </span> */}
              </h2>
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
