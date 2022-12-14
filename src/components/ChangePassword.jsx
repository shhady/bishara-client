import React, { useState, useEffect } from "react";
import "./ChangePassword.css";
export default function ChangePassword() {
  const [email, setEmail] = useState("");

  return (
    <div className="mainChangePass">
      {/* <div>تغيير كلمة المرور</div> */}
      <div>
        <input
          type="password"
          className="changePass"
          placeholder="كلمة المرور الحالية"
        />
        <input
          type="password"
          className="changePass"
          placeholder="كلمة المرور الجديدة"
        />
        <input
          type="password"
          className="changePass"
          placeholder="كلمة المرور الجديدة"
        />
      </div>
    </div>
  );
}
