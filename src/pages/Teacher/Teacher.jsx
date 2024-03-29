import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeacherData.css";
// import Evaluation from "./Evaluation"
import { Link, useNavigate } from "react-router-dom";
import StartChat from "../../components/Messenger/StartChat";

import BoxesTeacher from "../../components/boxesTeacher/BoxesTeacher";
export default function Teacher({
  setUpdateComponent,
  updateComponent,
}) {
  const [teacherId, setTeacherId] = useState(localStorage.getItem("teacherId"));
  const user = JSON.parse(localStorage.getItem("profile"));
  const [userId, setUserId] = useState("");
  const [teacherInfo, setTeacherInfo] = useState("");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const teacherprop=updateComponent;
  const [evaluation, setEvaluation] = useState('')
  useEffect(() => {
    if (!user) return;
    setUserId(user.user ? user.user._id : user.teacher._id);
  }, [user]);
  const navigate = useNavigate();
  useEffect(() => {
    teacherprop
      ? setTeacherId(updateComponent._id)
      : setTeacherId(localStorage.getItem("teacherId"));
  }, [updateComponent]);
  useEffect(() => {
    setTeacherId(localStorage.getItem("teacherId"));
  }, []);

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
      (course) => course.owner === teacherId && course.playlistId !== "PLVyh_TRAmEfFr6I1LMZ0EadFWU4tXZmyw"
    );
    setFilteredCourses(filteredCourses);
  }, [courses, teacherId]);

  useEffect(()=>{
    const filteredCourses = courses.filter(course =>{
      return course.playlistId === "PLVyh_TRAmEfFr6I1LMZ0EadFWU4tXZmyw" && course.owner === teacherId
    })
    setEvaluation(filteredCourses)
  },[filteredCourses]);

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

  const saveCourseLocal = async (course) => {
    window.localStorage.setItem("courseDetails", JSON.stringify(course));
    window.localStorage.setItem("courseCover", course.coursePhoto);
    window.localStorage.setItem("courseTitle", course.title);
    window.localStorage.setItem("coursedes", course.description);

    setUpdateComponent(course);
  };

  const deleteCourse = (course) => {
    const deleteTheCourse = async () => {
      await axios.delete(
        process.env.REACT_APP_BACKEND_URL + `/courses/${course._id}`
      );
    };
    deleteTheCourse();
    // navigate("/");
  };
  const drawCourses = () => {
    return filteredCourses?.map((course, i) => {
      return (
        <div onClick={() => saveCourseLocal(course)} key={i} className="teacherDataCourses">
          <Link to="/Lessons" style={{ textDecoration: "none" }}>
            <div>
              <img
                src={course.coursePhoto.replace("http://","https://")}
                alt="hi"
                width="100%"
                height={filteredCourses.length === 1 ? "400px" : "200px"}
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
              {course.description.slice(0, 50)}....
            </div>
          </Link>
          <div>
            {userId === course.owner || user?.teacher?.role === "admin"  ? (
              <button
                style={{ width: "100%" }}
                onClick={() => deleteCourse(course)}
              >
                حذف الدورة
              </button>
            ) : null}
          </div>
       
        </div>
      );
    });
  };
  // const drawEvaluation = () => {
  //   return evaluation?.map((course, i) => {
  //     return (
  //       <div>
  //           <Link to="/Lessons" style={{ textDecoration: "none" }}>
  //       <div className="evaluation" onClick={() => saveCourseLocal(course)} key={i}>
        
  //           <div style={{ display:"flex", justifyContent: "center" ,flexDirection:"column", alignItems: "center",width:"100%" }}>
  //           <div style={{ width:"70%"}}>
  //             <img
  //               src={course.coursePhoto.replace("http://","https://")}
  //               alt="evaluation"
  //               width="70%"
  //               height="120px"
               
  //             />
  //           </div>
  //         <div  style={{ width:"100%"}}>
  //           <div style={{ textAlign: "center", color: "black" }}>
  //             <h2>{course.title}</h2>
  //           </div>
  //           <div
  //             style={{
  //               display: "flex",
  //               justifyContent: "space-around",
  //               alignItems: "center",
  //               color: "black",
  //             }}
  //           >
  //             {/* <div>{course.instrument}</div> */}
  //           </div>
  //           <div style={{ width: "90%", margin: "auto", color: "black" }}>
  //             {course.description.slice(0, 130)}....
  //           </div>
  //           </div>
  //           </div>
  //       </div>
  //       </Link>
  //       <div  style={{ width: "80%", margin:"auto"}}>
  //           {userId === course.owner ? (
  //             <button
  //               style={{ width: "90%" }}
  //               onClick={() => deleteCourse(course)}
  //             >
  //               حذف الدورة
  //             </button>
  //           ) : null}
  //         </div>
  //       </div>
  //     );
  //   });
  // };

  const deleteTeacher = async () => {
    axios
      .delete(process.env.REACT_APP_BACKEND_URL + `/teachers/${teacherId}`)
      .then(navigate("/"));
  };

  return (
    <div className="teacherDataAll">
      <div
        className="coverHeight"
        style={{
          backgroundImage: `url(${
            teacherInfo.cover
              ? teacherInfo.cover.replace('http://', 'https://')
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
            src={teacherInfo.avatar.replace("http://","https://")}
            alt="profile"
            style={{
              borderRadius: "50%",
              border: "8px solid white",
            }}
          />
          {user?.user ? (
            <div className="buttonProfile">
              <StartChat teacherId={teacherId} userId={userId} />
            </div>
          ) : null}
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
          {user?.teacher?.role === "admin" && (
            <div style={{ color: "red" }}>
              only admin can see this button
              <br />
              <button
                style={{
                  background: "white",
                  border: "2px solid black",
                  width: "140px",
                  borderRadius: "10px",
                }}
                onClick={deleteTeacher}
              >
                حذف الاستاذ
              </button>
            </div>
          )}
          {user?.user ? (
            <div className="buttonMobile">
              <StartChat teacherId={teacherId} userId={userId} />
            </div>
          ) : null}

          <div>{teacherInfo.about}</div>
        </div>
      </div>
      {/* <div style={{ width: "100%" }}>
        <hr />
      </div> */}
      <div className="dawrat">
      {/* <div>
        {drawEvaluation()}
        <hr />
      </div> */}
      <BoxesTeacher/>
        <h2>دورات {teacherInfo.firstName}</h2>
        
      </div>
      
      {filteredCourses.length === 1 ? (
        <div className="coursesDrawCss1">{drawCourses()}</div>
      ) : null}
      {filteredCourses.length === 2 ? (
        <div className="coursesDrawCss2">{drawCourses()}</div>
      ) : null}
      {filteredCourses.length >= 3 ? (
        <div className="coursesDrawCss3">{drawCourses()}</div>
      ) : null}
    </div>
  );
}
