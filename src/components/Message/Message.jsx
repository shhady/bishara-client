import React from "react";
import "./message.css";
// import { format } from "timeago.js";

export default function message({ message, own, userAvatar }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="MessageTop">
        <img
          className="messageImg"
          src={
            userAvatar
              ? userAvatar
              : "https://img.icons8.com/material-rounded/24/null/user.png"
          }
          alt="img"
          style={{ borderRadius: "50%", backgroundColor: "#e1e1e1" }}
        />
        <p className="messageText">{message.text}</p>
      </div>
      {/* <div className="MessageBottom">{message.createdAt}</div> */}
    </div>
  );
}
