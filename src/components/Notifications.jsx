import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Notifications() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [comments, setComments] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [userF, setUserF] = useState("");
  const [userL, setUserL] = useState("");
  const [userId, setUserId] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    user.user
      ? setUserF(user.user.firstName)
      : setUserF(user.teacher.firstName);
    user.user ? setUserL(user.user.lastName) : setUserL(user.teacher.lastName);
    user.user ? setUserId(user.user._id) : setUserId(user.teacher._id);
    user.user
      ? setUserAvatar(user.user.avatar)
      : setUserAvatar(user.teacher.avatar);
  }, [user]);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/comments`
      );
      setComments(res.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const filterComment = () => {
      const specificComments = comments?.filter(
        (comment) => comment.courseOwnerId === userId
      );
      setUserComments(specificComments);
      console.log(specificComments);
    };
    filterComment();
  }, [comments]);

  const drawComment = () => {
    return userComments?.map((comment, i) => {
      return (
        <div style={{ padding: "20px", backgroundColor: "#e7f3ff" }} key={i}>
          {comment.read === false ? (
            <>
              {" "}
              <div style={{ fontSize: "20px" }}>
                {comment.firstName} {comment.lastName} {"  "}
                علق على الدرس
                {"  "} {comment.videoTitle}
              </div>
              <div>
                {comment.createdAt.slice(0, 10)}
                {"   "}
                {comment.createdAt.slice(11, 16)}
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: "20px" }}>
                {comment.firstName} {comment.lastName} {"  "}
                علق على الدرس
                {"  "} {comment.videoTitle}
              </div>
              <div>
                {comment.createdAt.slice(0, 10)}
                {"   "}
                {comment.createdAt.slice(11, 16)}
              </div>
            </>
          )}
        </div>
      );
    });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <h2>الاشعارات</h2>
      </div>
      <div
        style={{
          width: "90%",
          margin: "auto",
          padding: "20px",
          boxShadow:
            "rgb(0 0 0 / 6%) 0px 1px 2px, rgb(35 41 54 / 14%) 0px 3px 8px",
        }}
      >
        {drawComment()}
      </div>
    </div>
  );
}
