import React, { useState, useEffect } from "react";
import "./conversation.css";
import axios from "axios";
export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  //   console.log(user);
  console.log(conversation);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);
    console.log(friendId);

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
          src={currentUser?.avatar ? currentUser.avatar : "./Logo.JPG"}
          alt="Img"
        />

        <span className="nameConversation">
          {user?.firstName}
          {"  "}
          {user?.lastName}
        </span>
      </div>
    </>
  );
}
