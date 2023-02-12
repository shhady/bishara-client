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
    <div style={{marginTop:"250px"}}>
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default ForgetPassword;