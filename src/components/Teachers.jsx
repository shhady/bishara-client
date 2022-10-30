import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Teachers.css";
import { useHistory } from "react-router-dom";
export default function Teachers({ user, setUser }) {
  const [teachers, setTeachers] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [checkChat, setCheckChat] = useState(null);
  const [chat, setChat] = useState(null);
  const [userId, setUserId] = useState("");
  const [allChats, setAllChats] = useState(null);
  const [preventChat, setPreventChat] = useState([]);
  const history = useHistory();
  window.onpopstate = () => {
    history.push("/");
  };
  useEffect(() => {
    if (!user) return;
    user.teacher ? setUserId(user.teacher._id) : setUserId(user.user._id);
  }, [user]);

  useEffect(() => {
    const getPrevent = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/openconversations"
      );
      setAllChats(res.data);
      // res.data.openconversations.map((x) => x[0]);
      console.log(res.data[0].openConversations);
      res.data.map((x) =>
        setPreventChat([...preventChat, x.openConversations[0]])
      );
    };
    getPrevent();
  }, []);

  console.log(preventChat);

  const handleClick = (teacher) => {
    setSelectedTeacher(teacher._id);
    setCheckChat({ senderId: userId, receiverId: teacher._id });
    setChat({ senderId: userId, receiverId: teacher._id });
  };

  useEffect(() => {
    if (!chat) return;
    const startChat = async () => {
      if (!userId) return;
      const exists = preventChat.find(
        (x) => x.senderId === userId && x.receiverId === selectedTeacher
      );
      console.log(exists);
      if (exists) {
        return console.log("already conversation");
      } else {
        setPreventChat([...preventChat, checkChat]);
        await axios.post(
          process.env.REACT_APP_BACKEND_URL + "/openconversations",
          checkChat
        );
        await axios.post(
          process.env.REACT_APP_BACKEND_URL + "/conversations",
          checkChat
        );
        console.log("prevent Update, conv");
      }
    };
    startChat();
    console.log(preventChat);
  }, [checkChat]);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/teachers"
      );
      setTeachers(result.data);
    };
    fetch();
  }, []);
  console.log(teachers);
  if (!teachers)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "100px",
        }}
      >
        <div className="spinner">
          <div className="loader">
            <div className="balls_container">
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
            </div>
            <span>جاري تحميل البيانات</span>
          </div>
        </div>
      </div>
    );

  console.log(selectedTeacher);

  const drawData = () => {
    return teachers.map((teacher, i) => {
      return (
        <div className="teacher" key={i}>
          <div>
            <img
              src={teacher.avatar}
              alt={teacher.firstName}
              height="150px"
              width="150px"
              style={{ borderRadius: "5px" }}
            />
          </div>
          <div>
            {teacher.firstName} {teacher.lastName}
          </div>
          <div style={{ textAlign: "center" }}>{teacher.about}</div>
          <div>
            <button
              // onClick={() => {
              //   setSelectedTeacher(teacher._id);
              // }}
              onClick={() => handleClick(teacher)}
            >
              تحدث مع الاستاذ
            </button>
          </div>
        </div>
      );
    });
  };

  return <div className="teachersCards">{drawData()}</div>;
}
