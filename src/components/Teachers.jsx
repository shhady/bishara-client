import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Teachers.css";
import { Link, useHistory } from "react-router-dom";
// import { useHistory } from "react-router-dom";
export default function Teachers({
  user,
  setUser,
  setTeacher,
  setUpdateComponent,
  updateComponent,
}) {
  const [teachers, setTeachers] = useState(null);

  const history = useHistory();
  window.onpopstate = () => {
    history.push("/");
  };

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
          marginTop: "100px",
        }}
      >
        <div className="loader"> 
        </div>
      </div>
    );


  const drawData = () => {
    return teachers.map((teacher, i) => {
      return (
       
        <Link to="/TeacherData" style={{ textDecoration: "none" }} key={i}>
          <div
            className="teacher"
            key={i}
            onClick={() => {
              setTeacher(teacher._id);
              window.localStorage.setItem("teacherId", teacher._id);
              setUpdateComponent(teacher);
            }}
          >
            <div>
              <img
                src={teacher.avatar.replace('http://', 'https://')}
                alt={teacher.firstName}
                className="teachersPhotos"
                style={{ borderRadius: "50%" }}
              />
            </div>
            <div
              style={{ color: "black", fontWeight: "700", fontSize: "18px" }}
            >
              {teacher.firstName} {teacher.lastName}
            </div>
            <div>
            </div>
          </div>
        </Link>
      );
    });
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          marginTop: "90px",
          height: "30vh",
          background: "#fafafa",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ fontWeight: "bold" }}>المدرسين</h1>
        </div>
      </div>
      <div className="teachersCards">{drawData()}</div>
    </div>
  );
}
