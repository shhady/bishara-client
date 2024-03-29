import React, { useState, useEffect } from "react";
import "./ChangePassword.css";
import axios from "axios";
export default function ChangePasswordUser({ userId }) {
  const [newPassword, setNewPassword] = useState("");
  const [newConfirm, setNewConfirm] = useState("");
  const [message, setMessage] = useState("");

  //   console.log(newPassword, newConfirm);
  const changePass = async () => {
    try {
      if (!newPassword) return;
      await axios.patch(
        process.env.REACT_APP_BACKEND_URL + `/users/${userId}`,
        { 
          password: newPassword,
          confirmPassword: newConfirm
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Methods": "PATCH",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        }
      );
      setMessage("تم تغيير كلمة المرور بنجاح");
    } catch (err) {
      setMessage(
        "لم تتم عملية التغيير,كلمة المرور يجب ان تتكون من 6 ارقام او احرف على الاقل, حاول مرة اخرى وتأكد من تطابق كلمة المرور وتأكيد كلمة المرور"
      );
      console.log(err + "can't");
    }
  };
  return (
    <div className="mainChangePass1">
      {/* <div>تغيير كلمة المرور</div> */}
      <div>
        {/* <input
          type="password"
          className="changePass"
          placeholder="كلمة المرور الحالية"
        /> */}
      {message === "تم تغيير كلمة المرور بنجاح" ? ( <span style={{ color: "red", marginRight: "10px" }}>{message}</span>):(<><input
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
          placeholder="تأكيد كلمة المرور الجديدة"
        />
        <button onClick={changePass} style={{width:"100%", background:"#fcedd5", height:"30px", marginTop:"25px"}}>تثبيت</button></>)}  
          {message === "تم تغيير كلمة المرور بنجاح" ? (null):(<>{message}</>)}
      </div>
    </div>
  );
}
