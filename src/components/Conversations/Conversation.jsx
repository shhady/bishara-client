import React, { useState, useEffect } from "react";
import "./conversation.css";
import axios from "axios";
export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  //   console.log(user);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);

    const getUser = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/users/" + friendId
        );
        setUser(response.data);
      } catch (error) {
        console.log("error");
      }
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/teachers/" + friendId
        );
        setUser(response.data);
      } catch (error) {
        console.log("error");
      }
    };
    getUser();
  }, [conversation, currentUser]);

  return (
    <>
      <div className="conversation">
        <img
          className="imageConversation"
          src={
            currentUser?.avatar
              ? currentUser.avatar
              : "https://img.icons8.com/material-rounded/24/null/user.png"
          }
          alt="Img"
          style={{
            borderRadius: "50%",
            backgroundColor: "#e1e1e1",
            padding: "1px",
          }}
        />

        <span className="nameConversation" style={{ color: "black" }}>
          {user?.firstName}
          {"  "}
          {user?.lastName}
        </span>
      </div>
    </>
  );
}
