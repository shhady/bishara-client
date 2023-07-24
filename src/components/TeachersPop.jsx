import React, { useState, useEffect } from "react";
import axios from "axios";
import "../pages/Teachers/Teachers.css";
import { Link } from "react-router-dom";

export default function TeachersPop({ setTeachersHover, setUpdateComponent }) {
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

  if (!teachers) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {/* <div className="loader"></div> */}
      </div>
    );
  }

  const addToLocal = (teacher) => {
    window.localStorage.setItem("teacherId", teacher._id);
    setUpdateComponent(teacher);
  };

  const drawData = () => {
    return teachers.slice(0, 10).map((teacher) => {
      return (
        <div key={teacher._id} onClick={() => setTeachersHover(false)}>
          <Link
            key={teacher._id} // Assign key prop to the Link component
            to={`/NewTeacher/${teacher._id}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <img
                src={teacher.avatar}
                alt={teacher.firstName}
                height="100px"
                width="100px"
                style={{
                  borderRadius: "50%",
                  width: "70px",
                  height: "70px",
                  marginBottom: "0px",
                }}
                onClick={() => addToLocal(teacher)}
              />
              <span
                style={{ color: "black", fontWeight: "700", marginTop: "0px" }}
              >
                {teacher.firstName} {teacher.lastName}
              </span>
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
        top: 80,
        width: "65vw",
        background: "transparent",
      }}
      onClick={() => setTeachersHover(false)}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "fit-content",
          border: "0.5px solid #dcdcdc",
          borderTop: "none",
          boxShadow: "rgb(0 0 0 / 6%) 0px 2px 4px, rgb(35 41 54 / 14%) 0px 6px 16px",
        }}
        onMouseLeave={() => setTeachersHover(false)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            width: "90%",
            margin: "auto",
            borderBottom: "1px solid #e1e1e1",
            marginBottom: "20px",
            backgroundColor: "white",
          }}
        >
          <div>المدرسون</div>
          <Link to="/teachers" style={{ textDecoration: "none" }}>
            <div
              onClick={() => {
                setTeachersHover(false);
                setUpdateComponent("");
              }}
              style={{ color: "black", cursor: "pointer" }}
            >
              جميع المدرسون
            </div>
          </Link>
        </div>

        <div className="teacherHeader">{drawData()}</div>
      </div>
    </div>
  );
}
