import React, { useState, useEffect } from "react";
import axios from "axios";
export default function ListOfTeachers({ currentId, setCurrentChat }) {
  const [teachers, setTeachers] = useState(null);

  useEffect(() => {
    const teachers = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/teachers"
      );
      setTeachers(res.data);
    };
    teachers();
  }, []);

  console.log(teachers);
  if (!teachers) return null;

  const handleClick = async (teacher) => {
    console.log(teacher);
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL +
          `/conversations/find/${currentId}/${teacher._id}`
      );
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const Draw = () => {
    return teachers.map((teacher) => {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: "10px",
          }}
          onClick={() => handleClick(teacher)}
        >
          <div style={{ cursor: "pointer" }}>
            <img
              src={teacher?.avatar}
              alt={teacher?.name}
              width="40px"
              height="40px"
              style={{ borderRadius: "50%", marginLeft: "5px" }}
            />
          </div>
          <div style={{ cursor: "pointer" }}>
            {teacher?.firstName}
            {"  "}
            {teacher?.lastName}
          </div>
        </div>
      );
    });
  };
  return <div>{Draw()}</div>;
}
