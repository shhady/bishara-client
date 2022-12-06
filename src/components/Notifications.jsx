import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
export default function Notifications() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [comments, setComments] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [userF, setUserF] = useState("");
  const [userL, setUserL] = useState("");
  const [userId, setUserId] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const history = useHistory();
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

  const handleClickOnNotification = (comment) => {
    const setAsRead = async () => {
      await axios
        .patch(process.env.REACT_APP_BACKEND_URL + `/comments/${comment._id}`, {
          read: true,
        })
        // .then(async () => {
        //   const result = await axios.get(
        //     process.env.REACT_APP_BACKEND_URL + `/comments/`
        //   );
        //   console.log(result);
        //   setBackNot(
        //     result.data.filter((comment) => comment.courseOwnerId === userId)
        //   );
        // })
        .then(window.localStorage.setItem("PlaylistId", comment.playlistId))
        .then(window.localStorage.setItem("videoName", comment.videoName))
        .then(
          window.localStorage.setItem(
            "lessonDetails",
            JSON.stringify(comment.lesson)
          )
        )

        .then(
          history.push({
            pathname: `/Lesson/${comment.playlistId}/${comment.videoName}`,
          })
        )
        .then(window.location.reload());
    };
    setAsRead();
    // setNotificationClicked(!notificationClicked);
    // setCourseIdNew(notification.courseid);
    // setOpenNotifications(!openNotifications);
  };

  const drawComment = () => {
    return userComments?.map((comment, i) => {
      return (
        <div
          //   style={{ padding: "20px" }}
          key={i}
          onClick={() => handleClickOnNotification(comment)}
        >
          {comment.read === false ? (
            <div style={{ padding: "20px", backgroundColor: "#e7f3ff" }}>
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
            </div>
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
