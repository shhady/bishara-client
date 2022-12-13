import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Teachers.css";
import { Link } from "react-router-dom";
// import {useNav} from "react-router-dom"
export default function CoursesHomePage({
  setCoursesHover,
  setUpdateComponent,
  updateComponent,
}) {
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
    return courses.slice(0, 4).map((course, i) => {
      return (
        <div
          key={i}
          onClick={() => {
            setCoursesHover(false);
            setUpdateComponent(course);
          }}
          style={{ marginLeft: "20px" }}
        >
          <Link to="/Lessons" style={{ textDecoration: "none" }}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => addToLocal(course)}
            >
              <img
                src={course.coursePhoto}
                alt={course.firstName}
                height="199px"
                width="250px"
                style={{
                  marginBottom: "10px",
                  width: "250px",
                  height: "199px",
                  borderRadius: "5px",
                }}

                // onClick={console.log(course._id)}
              />
              <div
                style={{
                  color: "black",
                  padding: "5px",
                  maxHeight: "120px",
                  width: "90%",
                  margin: "auto",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {course.title}
                </span>
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    {course.firstName} {course.lastName}
                  </div>
                  <div>
                    {course.instrument}/{course.level}
                  </div>
                </div>
                <div>{course.description}</div>
              </div>
            </div>
          </Link>
        </div>
      );
    });
  };

  return (
    <>
      <Link to="/courses" style={{ textDecoration: "none" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "10px",
            width: "90%",
            margin: "auto",
            borderBottom: "1px solid #e1e1e1",
            marginBottom: "20px",
            backgroundColor: "white",
          }}
        >
          <div
            //   onClick={() => setCoursesHover(false)}
            style={{
              color: "black",
              cursor: "pointer",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            دورات موسيقية
          </div>
        </div>
      </Link>

      <div
        // style={{
        //   display: "flex",
        //   width: "90%",
        //   margin: "auto",
        //   overflowX: "scroll",
        //   //   justifyContent: "",
        //   //   alignItems: "center",
        // }}
        className="teacherAvatars"
      >
        {" "}
        {drawData()}
      </div>
    </>
  );
}
