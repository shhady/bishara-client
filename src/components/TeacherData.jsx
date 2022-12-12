import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeacherData.css";
import { Link, useHistory } from "react-router-dom";
export default function TeacherData({ listId, teacher }) {
  const [teacherId, setTeacherId] = useState(localStorage.getItem("teacherId"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [userId, setUserId] = useState("");
  const [teacherInfo, setTeacherInfo] = useState("");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    setUserId(user.user ? user.user._id : user.teacher._id);
  }, [user]);
  const history = useHistory();
  window.onpopstate = () => {
    history.push("/teachers");
  };
  //   console.log(localStorage.getItem("teacherId"));
  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/teachers/${teacherId}`
      );
      setTeacherInfo(result.data);
    };
    fetch();
  }, [teacherId]);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/courses"
      );
      setCourses(result.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const filteredCourses = courses.filter(
      (course) => course.owner === teacherId
    );
    setFilteredCourses(filteredCourses);
  }, [courses, teacherId]);

  if (!teacherInfo)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "300px",
        }}
      >
        <div className="loader"></div>
      </div>
    );
  if (!filteredCourses)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          //   marginTop: "100px",
        }}
      >
        <div className="loader"></div>
      </div>
    );

  const saveCourseLocal = (course) => {
    window.localStorage.setItem("courseDetails", JSON.stringify(course));
  };

  const deleteCourse = (course) => {
    console.log(course);
    const deleteTheCourse = async () => {
      await axios.delete(
        process.env.REACT_APP_BACKEND_URL + `/courses/${course._id}`
      );
    };
    deleteTheCourse();
    // history.push("/");
  };
  const drawCourses = () => {
    return filteredCourses?.map((course, i) => {
      return (
        <div onClick={() => saveCourseLocal(course)} key={i}>
          <Link to="/Lessons" style={{ textDecoration: "none" }}>
            <div>
              <img
                src={course.coursePhoto}
                alt="hi"
                width="100%"
                height="200px"
              />
            </div>

            <div style={{ textAlign: "center", color: "black" }}>
              <h2>{course.title}</h2>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                color: "black",
              }}
            >
              <div>{course.instrument}</div>
              <div>{course.level}</div>
            </div>
            <div style={{ width: "80%", margin: "auto", color: "black" }}>
              {course.description}....
            </div>
          </Link>
          <div>
            {userId === course.owner ? (
              <button
                style={{ width: "100%" }}
                onClick={() => deleteCourse(course)}
              >
                حذف الدورة
              </button>
            ) : null}
          </div>
          <hr />
        </div>
      );
    });
  };
  return (
    <div className="teacherDataAll">
      <div
        className="coverHeight"
        style={{
          backgroundImage: `url(${
            teacherInfo.cover
              ? teacherInfo.cover
              : "https://images.unsplash.com/photo-1546058256-47154de4046c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fHBpYW5vfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
          })`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // height: "600px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New'",
          // position: "relative",
        }}
      >
        <div>
          <h1>
            {teacherInfo.firstName}
            {"  "}
            {teacherInfo.lastName}
          </h1>
        </div>
      </div>
      <div className="profile">
        <div
          style={{
            width: "100%",
            // height: "150px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          // className="imageProfilediv"
        >
          <img
            className="imageProfile"
            src={teacherInfo.avatar}
            alt="profile"
            style={{ borderRadius: "50%", border: "8px solid white" }}
          />
        </div>
        <div
          className="teacherDetailsAtData"
          // style={{
          //   display: "flex",
          //   flexDirection: "column",
          //   justifyContent: "flex-start",
          //   marginTop: "40px",
          //   alignItems: "flex-start",
          // }}
        >
          <div>{teacherInfo.about}</div>
        </div>
      </div>
      {/* <div style={{ width: "100%" }}>
        <hr />
      </div> */}
      <div className="dawrat">
        <h2>دورات {teacherInfo.firstName}</h2>
      </div>
      <div className="coursesDrawCss">{drawCourses()}</div>
    </div>
  );
}
