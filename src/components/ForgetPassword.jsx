import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/resetPassword`,
        { email }
      );
      setPasswordChanged(true);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to reset password. Please try again.");
    }
  };

  return (
    <div style={{ marginTop: "250px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h1>نسيت كلمة المرور؟</h1>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="ادخل بريدك الالكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" style={{ marginTop: "30px" }}>
          ارسل كلمة مرور جديدة
        </button>
      </form>
      {passwordChanged && (
        <div style={{ textAlign: "center" }}>
          تم ارسال كلمة مرور جديدة الى بريدك الالكتروني
          <br />
          <Link to="/auth" style={{ color: "black", textDecoration: "none" }}>
            <div style={{ width: "fit-content", margin: "auto", borderBottom: "1px solid black", textAlign: "center" }}>
              صفحة تسجيل الدخول
            </div>
          </Link>
        </div>
      )}
      {errorMessage && (
        <div style={{ color: "red", marginTop: "20px" }}>{errorMessage}</div>
      )}
    </div>
  );
};

export default ForgetPassword;
