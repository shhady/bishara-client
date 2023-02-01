import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Teachers.css";
import { Link, useHistory } from "react-router-dom";
// import { useHistory } from "react-router-dom";
export default function Teachers({
  user,
  setUser,
  setTeacher,
  setUpdateComponent,
  updateComponent,
}) {
  const [teachers, setTeachers] = useState(null);
  // const [selectedTeacher, setSelectedTeacher] = useState(null);
  // const [checkChat, setCheckChat] = useState(null);
  // const [chat, setChat] = useState(null);
  // const [userId, setUserId] = useState("");
  // const [allChats, setAllChats] = useState(null);
  // const [preventChat, setPreventChat] = useState([]);
  // const history = useHistory();
  // window.onpopstate = () => {
  //   history.push("/");
  // };
  // useEffect(() => {
  //   if (!user) return;
  //   user.teacher ? setUserId(user.teacher._id) : setUserId(user.user._id);
  // }, [user]);

  // useEffect(() => {
  //   const getPrevent = async () => {
  //     const res = await axios.get(
  //       process.env.REACT_APP_BACKEND_URL + "/openconversations"
  //     );
  //     setAllChats(res.data);
  //     // res.data.openconversations.map((x) => x[0]);
  //     console.log(res.data[0].openConversations);
  //     res.data.map((x) =>
  //       setPreventChat([...preventChat, x.openConversations[0]])
  //     );
  //   };
  //   getPrevent();
  // }, []);


  // const handleClick = (teacher) => {
  //   setSelectedTeacher(teacher._id);
  //   setCheckChat({ senderId: userId, receiverId: teacher._id });
  //   setChat({ senderId: userId, receiverId: teacher._id });
  // };

  // useEffect(() => {
  //   if (!chat) return;
  //   const startChat = async () => {
  //     if (!userId) return;
  //     const exists = preventChat.find(
  //       (x) => x.senderId === userId && x.receiverId === selectedTeacher
  //     );
  //     if (exists) {
  //       return console.log("already conversation");
  //     } else {
  //       setPreventChat([...preventChat, checkChat]);
  //       await axios.post(
  //         process.env.REACT_APP_BACKEND_URL + "/openconversations",
  //         checkChat
  //       );
  //       await axios.post(
  //         process.env.REACT_APP_BACKEND_URL + "/conversations",
  //         checkChat
  //       );
  //     }
  //   };
  //   startChat();
  // }, [checkChat]);

  const history = useHistory();
  window.onpopstate = () => {
    history.push("/");
  };

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/teachers"
      );
      setTeachers(result.data);
    };
    fetch();
  }, []);
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
        {/* <div className="spinner"> */}
        <div className="loader">
          {/* <div className="balls_container">
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
            </div>
            <span>جاري تحميل البيانات</span> */}
        </div>
        {/* </div> */}
      </div>
    );


  const drawData = () => {
    return teachers.map((teacher, i) => {
      return (
        // <></>
        <Link to="/TeacherData" style={{ textDecoration: "none" }} key={i}>
          <div
            className="teacher"
            key={i}
            onClick={() => {
              setTeacher(teacher._id);
              window.localStorage.setItem("teacherId", teacher._id);
              setUpdateComponent(teacher);
            }}
          >
            <div>
              <img
                src={teacher.avatar}
                alt={teacher.firstName}
                className="teachersPhotos"
                style={{ borderRadius: "50%" }}
              />
            </div>
            <div
              style={{ color: "black", fontWeight: "700", fontSize: "18px" }}
            >
              {teacher.firstName} {teacher.lastName}
            </div>
            <div>
              {/* <button
              // onClick={() => {
              //   setSelectedTeacher(teacher._id);
              // }}
              onClick={() => handleClick(teacher)}
            >
              تحدث مع الاستاذ
            </button> */}
            </div>
          </div>
        </Link>
      );
    });
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          marginTop: "90px",
          height: "30vh",
          background: "#fafafa",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ fontWeight: "bold" }}>المدرسين</h1>
        </div>
      </div>
      <div className="teachersCards">{drawData()}</div>
    </div>
  );
}
