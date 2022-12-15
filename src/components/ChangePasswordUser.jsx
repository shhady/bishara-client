import React, { useState, useEffect } from "react";
import "./ChangePassword.css";
import axios from "axios";
export default function ChangePasswordUser({ userId }) {
  const [newPassword, setNewPassword] = useState("");
  const [newConfirm, setNewConfirm] = useState("");
  //   console.log(newPassword, newConfirm);
  const changePass = async () => {
    try {
      await axios.patch(
        process.env.REACT_APP_BACKEND_URL + `/users/${userId}`,
        {
          password: newPassword,
          confirmPassword: newConfirm,
        }
      );
    } catch (err) {
      console.log(err + "can't");
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
          onChange={(e) => setNewPassword(e.target.value)}
          className="changePass"
          placeholder="كلمة المرور الجديدة"
        />
        <input
          type="password"
          name="confirmPassword"
          onChange={(e) => setNewConfirm(e.target.value)}
          className="changePass"
          placeholder="كلمة المرور الجديدة"
        />
        <button onClick={changePass}>change</button>
      </div>
    </div>
  );
}
