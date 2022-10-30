import React from "react";
import "./message.css";
// import { format } from "timeago.js";

export default function message({ message, own, userAvatar }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="MessageTop">
        <img
          className="messageImg"
          src={userAvatar ? userAvatar : "./Logo.JPG"}
          alt="img"
        />
        <p className="messageText">{message.text}</p>
      </div>
      {/* <div className="MessageBottom">{message.createdAt}</div> */}
    </div>
  );
}
