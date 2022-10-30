import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./createCourse.css";

// import Courses from "../Courses";
export default function CreateCourse() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [popUp, setPopUp] = useState(false);

  const [course, setCourse] = useState({
    instrument: "",
    firstName: "",
    lastName: "",
    avatar: "",
    level: "",
    // videos: [],
  });
  const [final, setFinal] = useState(course);
  const history = useHistory();
  const firstName = useRef(user.teacher.firstName);
  const lastName = useRef(user.teacher.lastName);
  const avatar = useRef(user.teacher.avatar);

  console.log(firstName);
  console.log(course);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPopUp(true);
    // if (isSignUp) {
    //   dispatch(signup(formData, history));
    // } else {
    //   dispatch(signin(formData, history));
    // }
    await axios.post(process.env.REACT_APP_BACKEND_URL + `/courses`, course, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    });
    // history.push("/courses/");
  };

  // const createNow = () => {};
  useEffect(() => {
    setCourse({
      ...course,
      // [e.target.name]: e.target.value,
      firstName: firstName.current,
      lastName: lastName.current,
      // instrument: e.target.value,
      avatar: avatar.current,
      // level: e.target.value,
    });
  }, [final]);

  // const handleChangeVideos = (e) => {
  //   const files = Array.from(e.target.files);
  //   files.forEach((file) => {
  //     course.videos.push(file);
  //   });
  // };

  return (
    <div style={{ marginTop: "150px" }}>
      <form onSubmit={handleSubmit}>
        <div className="createCourseForm">
          <input
            type="text"
            defaultValue={firstName.current}
            name="firstName"
            style={{
              textAlign: "center",
              width: "60%",
              marginBottom: "20px",
              marginTop: "20px",
            }}

            // onChange={handleChange}
          />
          <input
            type="text"
            defaultValue={user.teacher.lastName}
            name="lastName"
            style={{ textAlign: "center", width: "60%" }}
            // onChange={handleChange}
          />
          <select
            style={{
              textAlign: "center",
              width: "60%",
              marginTop: "20px",
              marginBottom: "20px",
            }}
            onChange={(e) =>
              setCourse({ ...course, instrument: e.target.value })
            }
            required
          >
            <option value=""> الآلة الموسيقية</option>
            <option value="بيانو">بيانو</option>
            <option value="عود">عود</option>
            <option value="كمان">كمان</option>
            <option value="قانون">قانون</option>
          </select>
          <select
            style={{ textAlign: "center", width: "60%" }}
            onChange={(e) => setCourse({ ...course, level: e.target.value })}
            required
          >
            <option value="">المستوى</option>
            <option value="مبتدأ">مبتدأ</option>
            <option value="متوسط">متوسط</option>
            <option value="متقدم">متقدم</option>
          </select>
          {/* <input
          placeholder=" الآلة الموسيقية"
          name="instrument"
          // onChange={handleChange}
          autoFocus
          required
        /> */}
          {/*  <input
          placeholder="المستوى"
          name="level"
          onChange={handleChange}
          required
        /> */}
          {/* <input type="file" name="videos" onChange={handleChangeVideos} /> */}
          <input
            className="createCourseSubmit"
            type="submit"
            style={{
              textAlign: "center",
              width: "60%",
              marginBottom: "20px",
              cursor: "pointer",
              marginTop: "20px",
            }}
            // onClick={() => setRefresh(!refresh)}
          />
        </div>
      </form>
      {/* <div style={{ display: "none" }}>
        <Courses refresh={refresh} setRefresh={setRefresh} />
      </div> */}
      {popUp ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            width: "100vw",
            height: "100vh",
            background: "grey",
            opacity: 0.8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center", width: "80%", margin: "auto" }}>
            <h2>
              الدورة التي انشئتها ستكون الاولى في صفحة الدورات الموسيقية
              <br /> اضغط عليها وابدأ برفع الفيديوهات
            </h2>
            <br />
            <button
              style={{ width: "60%" }}
              onClick={() => history.push("/courses")}
            >
              صفحة الدورات الموسيقية
            </button>
          </div>
          <div
          // style={{
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          // }}
          ></div>
        </div>
      ) : null}
    </div>
  );
}
