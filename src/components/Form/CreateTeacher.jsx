import React, { useState } from "react";
import axios from "axios";
import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";
import "./styles.css";
export default function CreateTeacher() {
  // const [avatar, setAvatar] = useState("")
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    instrument: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
    about: "",
  });

  const history = useHistory();
  console.log(teacher);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(process.env.REACT_APP_BACKEND_URL + `/teachers`, teacher);
    history.push("/teachers");
  };
  console.log(process.env.REACT_APP_BACKEND_URL);

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  // const handleAvatar = (e) => {
  //   const file = e.target.files[0];
  //   transformFile(file);
  // };

  // const transformFile = (file) => {
  //   const reader = new FileReader();
  //   if (file) {
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       setTeacher({ ...teacher, avatar: reader.result });
  //     };
  //   } else {
  //     setTeacher({ ...teacher, avatar: "" });
  //   }
  // };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="formCreateTeacher">
          <input
            name="firstName"
            placeholder="First Name"
            required
            onChange={handleChange}
            style={{
              textAlign: "center",
              width: "60%",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            required
            onChange={handleChange}
            style={{ textAlign: "center", width: "60%", marginBottom: "20px" }}
          />
          <input
            name="instrument"
            placeholder="Instrument"
            required
            onChange={handleChange}
            style={{ textAlign: "center", width: "60%", marginBottom: "20px" }}
          />
          {/* <input name="image" type="file" required onChange={handleChange} /> */}
          <input
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            style={{ textAlign: "center", width: "60%", marginBottom: "20px" }}
          />
          <input
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            style={{ textAlign: "center", width: "60%", marginBottom: "20px" }}
          />
          <input
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            onChange={handleChange}
            style={{ textAlign: "center", width: "60%", marginBottom: "20px" }}
          />
          <textarea
            name="about"
            placeholder="About"
            onChange={handleChange}
            style={{ textAlign: "center", width: "60%", marginBottom: "20px" }}
          />
          {/* <input type="file" onChange={handleAvatar} /> */}
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setTeacher({ ...teacher, avatar: base64 })}
          />
          <input
            className="createTeacherSubmit"
            type="submit"
            style={{
              textAlign: "center",
              width: "60%",
              height: "30px",
              marginBottom: "20px",
              marginTop: "20px",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
              color: "white",
            }}
          />
        </div>
      </form>
    </div>
  );
}
