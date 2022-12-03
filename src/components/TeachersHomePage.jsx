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

  // console.log(selectedTeacher);

  const drawData = () => {
    return teachers.map((teacher, i) => {
      return (
        <div
          key={i}
          onClick={() => setTeachersHover(false)}
          className="teachersCard"
        >
          <img
            src={teacher.avatar}
            alt={teacher.firstName}
            minHeight="150px"
            minWidth="150px"
            style={{
              borderRadius: "50%",
              width: "150px",
              height: "150px",
            }}
          />
          <div
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: "1em",
            }}
          >
            {" "}
            {teacher.firstName} {teacher.lastName}
          </div>
        </div>
      );
    });
  };

  return (
    <div
      style={{
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
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
        }}
        // onMouseOut={() => setTeachersHover(false)}
      >
        <div>المدرسين</div>
        <Link to="/teachers" style={{ textDecoration: "none" }}>
          <div
            onClick={() => setTeachersHover(false)}
            style={{ color: "black" }}
          >
            جميع المدرسين
          </div>
        </Link>
      </div>

      <div
        className="teacherAvatars"
        // style={{ display: "grid", gridAutoColumns: "1fr 1fr 1fr 1fr 1fr" }}
      >
        {drawData()}
      </div>
      <div style={{ width: "100%" }}>
        <hr />
      </div>
    </div>
  );
}
