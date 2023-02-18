import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Teachers.css";
import { Link, useHistory } from "react-router-dom";
// import {useNav} from "react-router-dom"
export default function TeachersPop({
  setCoursesHover,
  setUpdateComponent,
  updateComponent,
}) {
  const [courses, setCourses] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/courses"
      );
      setCourses(result.data.filter((global)=>{
        return global.playlistId !== "PLVyh_TRAmEfFr6I1LMZ0EadFWU4tXZmyw"
       }));
    };
    fetch();
  }, []);
  console.log(courses)
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
        {/* <div className="loader"></div> */}
      </div>
    );

  

  const addToLocal = (course) => {
    window.localStorage.setItem("courseId", course._id);
    window.localStorage.setItem("ownerId", course.owner);
    window.localStorage.setItem("playlistId", course.playlistId);
    window.localStorage.setItem("courseDetails", JSON.stringify(course));
    window.localStorage.setItem("teacherId", course.owner);
  };

  

  const drawData = () => {
    return courses.slice(0, 2).map((course, i) => {
      return (
        <div
          key={i}
          onClick={() => {
            setCoursesHover(false);
            setUpdateComponent(course);
          }}
        >
          <Link to="/Lessons" style={{ textDecoration: "none" }}>
            <div
              style={{ cursor: "pointer", display: "flex" }}
              onClick={() => addToLocal(course)}
            >
              <img
                src={course.coursePhoto}
                alt={course.firstName}
                height="100px"
                width="100px"
                style={{
                  marginBottom: "10px",
                  width: "100px",
                  height: "100px",
                  borderRadius: "5px",
                }}

                
              />
              <div
                style={{
                  color: "black",
                  padding: "5px",
                  maxHeight: "120px",
                  textAlign: "start",
                }}
              >
                <span style={{ color: "black", fontWeight: "bold" }}>
                  {course.title}
                </span>
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
        height: "150vh",
        width: "100vw",
        left:0,
        background: "transparent",
        top: 80,
      }}
      onClick={() => setCoursesHover(false)}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "70%",
          height: "fit-content",
          margin:"auto",
          border: "0.5px solid #dcdcdc",
          borderTop: "none",
          boxShadow:
            "rgb(0 0 0 / 6%) 0px 2px 4px, rgb(35 41 54 / 14%) 0px 6px 16px",
        }}
        onMouseLeave={() => setCoursesHover(false)}
      >
        <Link to="/courses" style={{ textDecoration: "none" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              width: "90%",
              margin: "auto",
              borderBottom: "1px solid #e1e1e1",
              // marginBottom: "20px",
              backgroundColor: "white",
            }}
          >
            <div
              onClick={() => setCoursesHover(false)}
              style={{ color: "black", cursor: "pointer" }}
            >
              دورات موسيقية
            </div>
            {/* <div
              
            >
              جميع الدورات موسيقية
            </div> */}
          </div>
        </Link>

        <div
          className="courseHeader"
          // style={{ display: "grid", gridAutoColumns: "1fr 1fr 1fr 1fr 1fr" }}
        >
          <div
            style={{
              display:"grid",
              gridTemplateColumns:"1fr 1fr",
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "flex-start",
              // alignItems: "flex-start",
              marginBottom: "10px",
            }}
          >
            <span
              onClick={(e) => {
                
                window.localStorage.setItem("title", e.target.innerText);
                history.push("/courses");
                window.location.reload();
              }}
              style={{ cursor: "pointer" }}
            >
              بيانو
            </span>
            <span
              onClick={(e) => {
                
                window.localStorage.setItem("title", e.target.innerText);
                history.push("/courses");
                window.location.reload();
              }}
              style={{ cursor: "pointer" }}
            >
              عود
            </span>
            <span
              onClick={(e) => {
                
                window.localStorage.setItem("title", e.target.innerText);
                history.push("/courses");
                window.location.reload();
              }}
              style={{ cursor: "pointer" }}
            >
              كمان
            </span>
            <span
              onClick={(e) => {
                
                window.localStorage.setItem("title", e.target.innerText);
                history.push("/courses");
                window.location.reload();
              }}
              style={{ cursor: "pointer" }}
            >
              فلوت
            </span>
            <span
              onClick={(e) => {
                
                window.localStorage.setItem("title", e.target.innerText);
                history.push("/courses");
                window.location.reload();
              }}
              style={{ cursor: "pointer" }}
            >
              غناء
            </span>
            <span
              onClick={(e) => {
                
                window.localStorage.setItem("title", e.target.innerText);
                history.push("/courses");
                window.location.reload();
              }}
              style={{ cursor: "pointer" }}
            >
              جيتار
            </span>
            <span
              onClick={(e) => {
                
                window.localStorage.setItem("title", e.target.innerText);
                history.push("/courses");
                window.location.reload();
              }}
              style={{ cursor: "pointer" }}
            >
              ايقاع
            </span>
            <span
              onClick={(e) => {
                
                window.localStorage.setItem("title", e.target.innerText);
                history.push("/courses");
                window.location.reload();
              }}
              style={{ cursor: "pointer" }}
            >
              تشيلو
            </span>
            {/* <span
              onClick={(e) => {
                
                window.localStorage.setItem("title", e.target.innerText);
                history.push("/courses");
                window.location.reload();
              }}
              style={{ cursor: "pointer" }}
            >
              بزق
            </span> */}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {" "}
            {drawData()}
          </div>
        </div>
      </div>
    </div>
  );
}
