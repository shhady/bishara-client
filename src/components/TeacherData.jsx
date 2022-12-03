import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeacherData.css";

export default function TeacherData({ listId, teacher }) {
  console.log(teacher);
  const [teacherId, setTeacherId] = useState(localStorage.getItem("teacherId"));
  const [teacherInfo, setTeacherInfo] = useState("");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
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
  console.log(courses);

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
  const drawCourses = () => {
    return filteredCourses?.map((course) => {
      return (
        <div>
          <div>
            <img
              src={course.coursePhoto}
              alt="hi"
              width="100%"
              height="200px"
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <h2>{course.title}</h2>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div>{course.instrument}</div>
            <div>{course.level}</div>
          </div>
          <div style={{ width: "80%", margin: "auto" }}>
            {course.description}....
          </div>
          <hr />
        </div>
      );
    });
  };
  return (
    <div style={{ marginTop: "80px" }}>
      <div
        style={{
          width: "100%",
          height: "20vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
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
      <div className="profile-teacher">
        <div style={{ width: "150px", height: "150px" }}>
          <img
            src={teacherInfo.avatar}
            alt="profile"
            width="100%"
            height="100%"
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            // alignItems: "flex-start",
          }}
        >
          {teacherInfo.about}
        </div>
      </div>
      <hr />
      <div style={{ textAlign: "center" }}>
        <h2>دورات {teacherInfo.firstName}</h2>
      </div>
      <div className="coursesDrawCss">{drawCourses()}</div>
    </div>
  );
}
