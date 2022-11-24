import React, { useState, useEffect } from "react";
import "./Auth.css";
import { gapi } from "gapi-script";
import { useHistory } from "react-router-dom";
import axios from "axios";
// import FileBase from "react-file-base64";

export default function Auth({ user, setUser }) {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
    // instrument: "oud",
  });

  const [studentlogin, setStudentLogin] = useState({ email: "", password: "" });
  const [userData, setUserData] = useState(null);
  const [teacherData, setTeacherData] = useState(null);
  const [isSignUp, setisSingUp] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showLoginFailMessage, setShowLoginFailMessage] = useState(false);
  const [studentOrTeacher, setStudentOrTeacher] = useState("student");
  // const dispatch = useDispatch();
  const history = useHistory();
  // console.log(userData);
  const clientId =
    "623673237970-p01olkhljcqajn23tb7eipt3cs6laqb3.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const dontHaveAnAccount = () => {
    setStudentLogin({
      password: "",
      email: "",
    });
    setisSingUp(!isSignUp);
  };

  const handleloginTeacher = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/teachers/login`,
        studentlogin
      );
      window.localStorage.setItem("profile", JSON.stringify(result.data));
      window.localStorage.setItem("token", result.data.token);
      console.log(result.data.teacher);
      setTeacherData(result.data);
      setUser(result.data);

      history.push("/profile");
    } catch (error) {
      setShowLoginFailMessage(true);
    }
  };

  const handleloginStudent = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/users/login`,
        studentlogin
      );
      window.localStorage.setItem("profile", JSON.stringify(result.data));
      window.localStorage.setItem("token", result.data.token);
      // console.log(result.data.teacher);
      // setTeacherData(result.data);
      setUser(result.data);
      console.log(result.data);
      history.push("/profile");
    } catch (error) {
      setShowLoginFailMessage(true);
    }
  };

  const handleLoginChange = (e) => {
    setStudentLogin({ ...studentlogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + `/users`,
      formData
    );
    window.localStorage.setItem("profile", JSON.stringify(result.data));
    window.localStorage.setItem("token", result.data.token);
    history.push("/profile");
    setUser(result.data);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <div className="mainSignin">
      <div className="SigninContainer">
        <div className="titleSingin">
          {isSignUp ? <h2>فتح حساب</h2> : <h2>تسجيل دخول</h2>}
        </div>
        <form onSubmit={handleSubmit}>
          {isSignUp ? (
            <>
              <div>
                <div className="forminputs">
                  <input
                    name="firstName"
                    onChange={handleChange}
                    autoFocus
                    required
                    placeholder="الاسم الشخصي"
                  />

                  <input
                    name="lastName"
                    onChange={handleChange}
                    placeholder="العائله"
                    required
                  />
                </div>
                <div className="forminputs">
                  <input
                    name="email"
                    type="email"
                    required
                    onChange={handleChange}
                    placeholder="البريد الالكتروني"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "50px",
                  }}
                >
                  <input
                    name="password"
                    type={showPassword ? "password" : "text"}
                    onChange={handleChange}
                    required
                    placeholder="كلمة المرور"
                  />
                  <button onClick={handleShowPassword}>
                    {showPassword ? "اظهار" : "اخفاء"}
                  </button>
                </div>
                <div className="forminputs">
                  <input
                    name="confirmPassword"
                    type={showPassword ? "password" : "text"}
                    onChange={handleChange}
                    required
                    placeholder="تأكيد كلمة المرور"
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button type="submit" onClick={handleSubmit}>
                    دخول
                  </button>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button
                    style={{
                      border: "none",
                      cursor: "pointer",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                    onClick={() => setisSingUp(!isSignUp)}
                  >
                    تملك حساب؟ اضغط هنا للدخول
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {studentOrTeacher === "student" ? (
                  <button
                    onClick={() => {
                      setStudentOrTeacher("student");
                    }}
                    style={{
                      border: "3px solid black",
                      width: "30%",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    طالب
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setStudentOrTeacher("student");
                    }}
                    style={{
                      border: "0px solid black",
                      width: "30%",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    طالب
                  </button>
                )}
                {studentOrTeacher === "teacher" ? (
                  <button
                    onClick={() => {
                      setStudentOrTeacher("teacher");
                    }}
                    style={{
                      border: "3px solid black",
                      width: "30%",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    معلم
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setStudentOrTeacher("teacher");
                    }}
                    style={{
                      border: "0px solid black",
                      width: "30%",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    معلم
                  </button>
                )}
              </div>
              <div className="forminputs">
                {/* <form> */}
                <div className="emailinput">
                  <input
                    autoFocus
                    name="email"
                    type="email"
                    placeholder="البريد الالكتروني"
                    onChange={handleLoginChange}
                  />
                </div>
                <div className="passwordinput">
                  <input
                    name="password"
                    type="password"
                    placeholder="كلمة المرور"
                    onChange={handleLoginChange}
                  ></input>
                </div>
                {studentOrTeacher === "student" ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <button
                      type="submit"
                      style={{ width: "170px" }}
                      onClick={handleloginStudent}
                    >
                      دخول
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <button
                      type="submit"
                      style={{ width: "170px" }}
                      onClick={handleloginTeacher}
                    >
                      دخول
                    </button>
                  </div>
                )}

                {/* </form> */}
                <div>
                  {!showLoginFailMessage ? (
                    <div></div>
                  ) : (
                    <div>Failed to log in</div>
                  )}
                </div>
                <div>
                  <button
                    style={{
                      border: "none",
                      cursor: "pointer",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                    onClick={dontHaveAnAccount}
                  >
                    لا تملك حساب ؟ اضغط هنا لفتح حساب
                  </button>
                </div>
              </div>
            </>
          )}
        </form>
        {/* <div className="forminputs"> */}
      </div>
    </div>
    // </div>
  );
}
