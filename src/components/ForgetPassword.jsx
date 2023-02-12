import React, { useState } from "react";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(process.env.REACT_APP_BACKEND_URL +"/resetPassword", { email });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await axios.put(process.env.REACT_APP_BACKEND_URL +"/teachers/resetPassword", { email });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{marginTop:"250px",display:"flex",flexDirection:"column", justifyContent:"center", alignItems: "center"}}>
      <h1>
      نسيت كلمة المرور ؟
      </h1>
    <form style={{display:"flex", flexDirection:"column"}} onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="ادخل بريدك الالكتروني"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" style={{marginTop:"30px"}}>ارسل كلمة مرور جديدة</button>
    </form>
    </div>
  );
};

export default ForgetPassword;