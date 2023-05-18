// import React from "react";
// import "./TeachersHomePage.css";
// export default function TeachersHomePage() {
//   return (
//     <div className="teachersHomePage">
//       <div>nice</div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeachersHomePage.css";
import { Link } from "react-router-dom";
// import {useNav} from "react-router-dom"
export default function TeachersPop({ setTeachersHover }) {
  const [teachers, setTeachers] = useState(null);
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
          //   marginTop: "100px",
        }}
      >
        <div className="loader"></div>
      </div>
    );

  const moveToTeacher = (teacher) => {
    window.localStorage.setItem("teacherId", teacher._id);
  };

  const drawData = () => {
    return teachers.slice(0, 5).map((teacher, i) => {
      return (
        <Link to={`/NewTeacher/${teacher._id}`}style={{ textDecoration: "none" }}>
          <div
            key={i}
            onClick={() => {
              moveToTeacher(teacher);
            }}
            className="teachersCard"
          >
            <img
              src={teacher.avatar.replace('http://', 'https://')}
              alt={teacher.firstName}
              // style={{ height: "190px", width: "190px" }}
              className="teacherHomeAvatars"
            />
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "black",
                textAlign: "center",
              }}
            >
              {" "}
              {teacher.firstName} {teacher.lastName}
            </div>
          </div>
        </Link>
      );
    });
  };

  return (
    <div
     className="teachersHomeContainer"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // padding: "0px 0px 7px 2px",
          width: "100%",
          margin: "auto",
          // borderBottom: "1px solid #e1e1e1",
          // marginBottom: "20px",
        }}
        // onMouseOut={() => setTeachersHover(false)}
      >
        <div style={{ fontWeight: "bold", fontSize: "28px", marginRight:"10px"}}>مدرسين</div>
        <Link to="/teachers" style={{ textDecoration: "none" }}>
          <div
            onClick={() => setTeachersHover(false)}
            style={{ color: "black", borderBottom: "1px solid #e1e1e1", marginLeft:"14px" }}
          >
            جميع المدرسين
          </div>
        </Link>
      </div>

      <div
        className="teacherAvatars1"
        // style={{ display: "grid", gridAutoColumns: "1fr 1fr 1fr 1fr 1fr" }}
      >
        {drawData()}
      </div>
      {/* <div style={{ width: "100%", color: "#e1e1e1" }}>
        <hr />
      </div> */}
    </div>
  );
}
