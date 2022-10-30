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
  console.log(conversations);
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
      ? setUserAvatar(user.teacher.avatar)
      : setUserAvatar("./Logo.JPG");
    user.teacher ? setUserId(user.teacher._id) : setUserId(user.user._id);
  }, [user.teacher, user.user]);
  console.log(userId);
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
    console.log(receiverId);
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
                  placeholder="write something..."
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                  }}
                  value={newMessage}
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
                لم تبدأ بأي دوره تابعة لهذا المدرس لكي تستطيع التحدث معه
                <br />
                يجب ان تبدأ بتعلم دوره تابعة للاستاذ لفتح محادثة
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
