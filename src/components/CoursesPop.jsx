import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Teachers.css";
import { Link } from "react-router-dom";
// import {useNav} from "react-router-dom"
export default function TeachersPop({ setCoursesHover }) {
  const [courses, setCourses] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/courses"
      );
      setCourses(result.data);
    };
    fetch();
  }, []);

  if (!courses)
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

  // console.log(selectedTeacher);

  const addToLocal = (course) => {
    window.localStorage.setItem("courseId", course._id);
    window.localStorage.setItem("ownerId", course.owner);
    window.localStorage.setItem("playlistId", course.playlistId);
    window.localStorage.setItem("courseDetails", JSON.stringify(course));
    window.localStorage.setItem("teacherId", course.owner);
  };

  console.log(courses);

  const drawData = () => {
    return courses.slice(0, 2).map((course, i) => {
      return (
        <div key={i} onClick={() => setCoursesHover(false)}>
          <Link to="/Lessons" style={{ textDecoration: "none" }}>
            <div
              style={{ cursor: "pointer", display: "flex" }}
              onClick={() => addToLocal(course)}
            >
              <img
                src={course.coursePhoto}
                alt={course.firstName}
                height="120px"
                width="120px"
                style={{
                  marginBottom: "10px",
                  width: "120px",
                  height: "120px",
                  borderRadius: "5px",
                }}

                // onClick={console.log(course._id)}
              />
              <div
                style={{
                  color: "black",
                  padding: "5px",
                  maxHeight: "120px",
                  textAlign: "start",
                }}
              >
                {course.title}
                <br />
                {course.firstName} {course.lastName}
                <br />
                {course.instrument}/{course.level}
              </div>
            </div>
          </Link>
        </div>
      );
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        height: "200vh",
        width: "100vw",
        background: "transparent",
      }}
      onClick={() => setCoursesHover(false)}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "50%",
          border: "0.5px solid #dcdcdc",
          borderTop: "none",
          boxShadow:
            "rgb(0 0 0 / 6%) 0px 2px 4px, rgb(35 41 54 / 14%) 0px 6px 16px",
        }}
        onMouseLeave={() => setCoursesHover(false)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            width: "90%",
            margin: "auto",
            borderBottom: "1px solid gray",
            marginBottom: "20px",
            backgroundColor: "white",
          }}
        >
          <div>دورات موسيقية</div>
          <Link to="/courses" style={{ textDecoration: "none" }}>
            <div
              onClick={() => setCoursesHover(false)}
              style={{ color: "black", cursor: "pointer" }}
            >
              جميع الدورات موسيقية
            </div>
          </Link>
        </div>

        <div
          className="courseHeader"
          // style={{ display: "grid", gridAutoColumns: "1fr 1fr 1fr 1fr 1fr" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <span>بيانو</span>
            <span>عود</span>
            <span>كمان</span>
            <span>قانون</span>
          </div>
          <div> {drawData()}</div>
        </div>
      </div>
    </div>
  );
}
