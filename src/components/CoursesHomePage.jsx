import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Teachers.css";
import { Link } from "react-router-dom";
// import {useNav} from "react-router-dom"
export default function CoursesHomePage({
  // setCoursesHover,
  setUpdateComponent,
  updateComponent,
}) {
  const [courses, setCourses] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/courses"
      );
      setCourses(result.data.filter((global)=>{
        return global.playlistId !== "PLVyh_TRAmEfFr6I1LMZ0EadFWU4tXZmyw" && global.playlistId !== "PLVyh_TRAmEfFSnfgk8-SxeWSpcjn2DnSR" && global.playlistId !== "PLVyh_TRAmEfF0pi95N0lTzhnBWTUFJchf"
       }));
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

 

  const addToLocal = (course) => {
    window.localStorage.setItem("courseId", course._id);
    window.localStorage.setItem("ownerId", course.owner);
    window.localStorage.setItem("playlistId", course.playlistId);
    window.localStorage.setItem("courseDetails", JSON.stringify(course));
    window.localStorage.setItem("teacherId", course.owner);
  };



  const drawData = () => {
    return courses.slice(0, 5).map((course, i) => {
      return (
        <div
          key={i}
          onClick={() => {
            // setCoursesHover(false);
            setUpdateComponent(course);
          }}
          className="homepagecourses"
        >
          <Link to="/Lessons" style={{ textDecoration: "none" }}>
            <div
              style={{
                height:"fit-content",
                cursor: "pointer",
                padding: "10px",
                paddingBottom: "20px"
              }}
              className="lessonsHomePage"
              onClick={() => addToLocal(course)}
            >
              <img
                src={course.coursePhoto}
                alt={course.firstName}
                height="190px"
                width="250px"
                style={{
                  marginBottom: "10px",
                  width: "250px",
                  height: "190px",
                  borderRadius: "5px",
                }}

               
              />
              <div
                style={{
                  color: "black",
                  padding: "5px",
                  height: "fit-content",
                  minHeight:"190px",
                  width: "90%",
                  margin: "auto",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
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
                    // width:"90%",
                    margin:"auto",
                    textAlign:"center"
                  //   display: "flex",
                  //   justifyContent: "space-between",
                  //   alignItems: "center",
                  }}
                >
                  <div>
                    {course.firstName} {course.lastName}
                  </div>
                  <div>
                    {course.instrument} ({course.level})
                  </div>
                </div>
                <div style={{
                    textAlign:"start"
                  //   display: "flex",
                  //   justifyContent: "space-between",
                  //   alignItems: "center",
                  }}>{course.description.slice(0, 25)}...</div>
              </div>
            </div>
          </Link>
        </div>
      );
    });
  };

  return (
    <div className="coursesHomePageBigContainer"
    >
      <Link to="/courses" style={{ textDecoration: "none" }}>
        <div
         className="coursesHomePageContainer"
        >
          <div
            //   onClick={() => setCoursesHover(false)}
            style={{
              color: "black",
              cursor: "pointer",
              fontSize: "28px",
              fontWeight: "bold",
              marginRight:"10px"
            }}
          >
            دورات
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
    </div>
  );
}
