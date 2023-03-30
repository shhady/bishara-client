import React, { useState, useEffect } from "react";
import "./ChangePassword.css";
import axios from "axios";
export default function ChangePassword({ userId }) {
  const [newPassword, setNewPassword] = useState("");
  const [newConfirm, setNewConfirm] = useState("");
  const [message, setMessage] = useState("");
  //   console.log(newPassword, newConfirm);
  const changePass = async () => {
    try {
      await axios.patch(
        process.env.REACT_APP_BACKEND_URL + `/teachers/${userId}`,
        { 
          password: newPassword,
          confirmPassword: newConfirm},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Methods": "PATCH",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        // }
        // {
         
        }
      );
      setMessage("تم تغيير كلمة المرور بنجاح");
    } catch (err) {
      setMessage(
        "لم تتم عملية التغيير,,كلمة المرور يجب ان تتكون من 6 ارقام او احرف على الاقل, حاول مرة اخرى وتأكد من تطابق كلمة المرور وتأكيد كلمة المرور"
      );
      console.log(err);
    }
  };
  return (
    <div className="mainChangePass">
      {/* <div>تغيير كلمة المرور</div> */}
      <div>
        {/* <input
          type="password"
          className="changePass"
          placeholder="كلمة المرور الحالية"
        /> */}
        <input
          type="password"
          name="password"
          onChange={(e) => {
            setNewPassword(e.target.value);
            setMessage("");
          }}
          className="changePass"
          placeholder="كلمة المرور الجديدة"
        />
        <input
          type="password"
          name="confirmPassword"
          onChange={(e) => {
            setNewConfirm(e.target.value);
            setMessage("");
          }}
          className="changePass"
          placeholder=" تأكيد كلمة المرور الجديدة"
        />
        <button onClick={changePass}>تثبيت</button>
        <span style={{ color: "red", marginRight: "10px" }}>{message}</span>
      </div>
    </div>
  );
}
