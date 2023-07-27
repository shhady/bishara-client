import React, { useState, useEffect } from "react";
import "./Auth.css";
import { gapi } from "gapi-script";
import { useNavigate, Link } from "react-router-dom";
import GoogleAuthSignUp from "./GoogleAuthSignUp";
import axios from "axios";
import GoogleAuthSignIn from "./GoogleAuthSignIn";
// import FileBase from "react-file-base64";

export default function Auth({ user, setUser, setUserProp }) {
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
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(null);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const clientId =
    "623673237970-p01olkhljcqajn23tb7eipt3cs6laqb3.apps.googleusercontent.com";

  // useEffect(() => {
  //   const initClient = () => {
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: "",
  //     });
  //   };
  //   gapi.load("client:auth2", initClient);
  // });
  useEffect(() => {
    const initClient = () => {
      if (gapi.client) {
        gapi.client.init({
          clientId: clientId,
          scope: "",
        });
      }
    };
    gapi.load("client:auth2", initClient);
  }, [clientId, gapi]);

  const dontHaveAnAccount = () => {
    setStudentLogin({
      password: "",
      email: "",
    });
    setisSingUp(!isSignUp);
  };

  // const handleloginTeacher = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const result = await axios.post(
  //       `${process.env.REACT_APP_BACKEND_URL}/teachers/login`,
  //       studentlogin
  //     );
  //     window.localStorage.setItem("profile", JSON.stringify(result.data));
  //     window.localStorage.setItem("token", result.data.token);
  //     window.localStorage.setItem("profilePic", result.data.teacher.avatar);
  //     window.localStorage.setItem("coverPic", result.data.teacher.cover);
  //     window.localStorage.setItem("firstName", result.data.teacher.firstName);
  //     window.localStorage.setItem("lastName", result.data.teacher.lastName);
  //     setTeacherData(result.data);
  //     setUser(result.data);

  //     navigate("/profile");
  //   } catch (error) {
  //     setShowLoginFailMessage(true);
  //   }
  // };

  const handleloginStudent = async (e) => {
    e.preventDefault();
    try {
      
      const result = await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/users/login`,
        studentlogin
      );
      window.localStorage.setItem("profile", JSON.stringify(result.data.user));
      window.localStorage.setItem("token", result.data.token);
      window.localStorage.setItem("profilePic", result.data.user.avatar);
      window.localStorage.setItem("firstName", result.data.user.firstName);
      window.localStorage.setItem("lastName", result.data.user.lastName);
      
      
      // setTeacherData(result.data);
      setUser(result.data.user);
      // setUserProp(result.data.user);
      if(result.data.user.subscriptionPlan){
        const plan = await axios.get( process.env.REACT_APP_BACKEND_URL + `/subscription-plans/${result.data.user.subscriptionPlan}`,{
          headers: {
            Authorization: `Bearer ${result.data.token}`,
          },
        })
        window.localStorage.setItem("plan",JSON.stringify(plan.data))
      }
     
      navigate("/profile");
    } catch (error) {
      console.log("can't log in");
    }
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/teachers/login`,
        studentlogin
      );
      window.localStorage.setItem("profile", JSON.stringify(result.data.teacher));
      window.localStorage.setItem("token", result.data.token);
      window.localStorage.setItem("profilePic", result.data.teacher.avatar);
      window.localStorage.setItem("coverPic", result.data.teacher.cover);
      window.localStorage.setItem("firstName", result.data.teacher.firstName);
      window.localStorage.setItem("lastName", result.data.teacher.lastName);
      setTeacherData(result.data.teacher);
      setUser(result.data.teacher);

      navigate("/profile");
    } catch (error) {
      console.log("can't log in");
    }
    setShowLoginFailMessage(true);
  };

  const handleLoginChange = (e) => {
    setStudentLogin({ ...studentlogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/users`,
        formData
      );
      window.localStorage.setItem("profile", JSON.stringify(result.data.user));
      window.localStorage.setItem("token", result.data.token);
      window.localStorage.setItem("profilePic", result.data.user.avatar);
      window.localStorage.setItem("firstName", result.data.user.firstName);
      window.localStorage.setItem("lastName", result.data.user.lastName);
      navigate("/profile");
      setUser(result.data.user);
    } catch (error) {
      setPasswordsDontMatch(error.response.data.message);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  // const handleKeyDown = (e)=>{
  //   e.preventDefault();
  //   if(e.key === "Enter"){
  //     handleSubmit()
  //   }
  // }

  return (
    <div className="mainSignin">
      <div className="SigninContainer">
        <div className="titleSingin">
          {isSignUp ? <h2>فتح حساب</h2> : <h2>تسجيل دخول</h2>}
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            {isSignUp ? (
              <GoogleAuthSignUp setUser={setUser} style={{ width: "100%" }} />
            ) : (
              <GoogleAuthSignIn
                setUser={setUser}
                setShowLoginFailMessage={setShowLoginFailMessage}
              />
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {isSignUp ? (
            <>
              <div>
                <div className="forminputs">
                  <input
                    className="inputSignUp"
                    style={{ width: "100%", height: "30px" }}
                    name="firstName"
                    onChange={handleChange}
                    autoFocus
                    required
                    placeholder="الاسم الشخصي"
                  />

                  <input
                    className="inputSignUp"
                    style={{ width: "100%", height: "30px" }}
                    name="lastName"
                    onChange={handleChange}
                    placeholder="العائله"
                    required
                  />
                </div>
                <div className="forminputs">
                  <input
                    className="inputSignUp"
                    style={{ width: "100%", height: "30px" }}
                    name="email"
                    type="email"
                    required
                    onChange={handleChange}
                    placeholder="البريد الالكتروني"
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                  }}
                >
                  <input
                    className="inputSignUp"
                    style={{
                      width: "93%",
                      height: "30px",
                      marginRight: "-5px",
                    }}
                    name="password"
                    type={showPassword ? "password" : "text"}
                    onChange={handleChange}
                    required
                    placeholder="كلمة المرور"
                  />
                  <div
                    onClick={handleShowPassword}
                    style={{
                      color: "black",
                      marginTop: "23px",
                      marginRight: "10px",
                    }}
                  >
                    {showPassword ? (
                      <img
                        src="https://img.icons8.com/ios-glyphs/30/null/uchiha-eyes.png"
                        onClick={handleShowPassword}
                        width="15px"
                        height="15px"
                      />
                    ) : (
                      <img
                        src="https://img.icons8.com/ios-glyphs/30/null/uchiha-eyes.png"
                        onClick={handleShowPassword}
                        width="15px"
                        height="15px"
                      />
                    )}
                  </div>
                </div>

                <div className="forminputs">
                  <input
                    className="inputSignUp"
                    style={{ width: "100%", height: "30px" }}
                    name="confirmPassword"
                    type={showPassword ? "password" : "text"}
                    onChange={handleChange}
                    required
                    placeholder="تأكيد كلمة المرور"
                  />
                </div>
                {passwordsDontMatch && (
                  <div style={{ color: "red" }}>
                    {passwordsDontMatch}
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="ButtonLogIn"
                  >
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
                  <div
                    style={{
                      border: "none",
                      cursor: "pointer",
                      padding: "10px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                    }}
                    onClick={() => setisSingUp(!isSignUp)}
                  >
                    تملك حساب؟ اضغط هنا للدخول
                  </div>
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
                {/* {studentOrTeacher === "student" ? (
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
                )} */}
                {/* {studentOrTeacher === "teacher" ? (
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
                )} */}
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
                    style={{ width: "100%", height: "30px" }}
                  />
                </div>
                <div className="passwordinput">
                  <input
                    name="password"
                    type="password"
                    placeholder="كلمة المرور"
                    onChange={handleLoginChange}
                    style={{
                      width: "100%",
                      height: "30px",
                      marginBottom: "10px",
                    }}
                    // onKeyDown={handleKeyDown}
                  ></input>
                </div>
                <Link to="/forgetpassword" style={{textDecoration: "none"}}>
                    <div>
                    نسيت كلمة المرور ؟

                    </div>
                    </Link>
                {/* {studentOrTeacher === "student" ? ( */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <button
                    type="submit"
                    className="ButtonLogIn"
                    onClick={handleloginStudent}
                  >
                    دخول
                  </button>
                </div>

                {/* </form> */}
                <div>
                  {" "}
                  {!showLoginFailMessage ? null : (
                    <div style={{ color: "red" }}>
                      فشل في تسجيل الدخول <br />
                    </div>
                  )}
                </div>
                <div>
                  <div
                    style={{
                      border: "none",
                      cursor: "pointer",
                      padding: "10px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                    }}
                    onClick={dontHaveAnAccount}
                  >
                    لا تملك حساب ؟ اضغط هنا لفتح حساب
                  </div>
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
