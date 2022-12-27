import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
export default function NotificationsPop({ setShowNotificationPopUp }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [comments, setComments] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [userF, setUserF] = useState("");
  const [userL, setUserL] = useState("");
  const [userId, setUserId] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [userReplies, setUserReplies] = useState([]);
  const [repliesShow, setRepliesShow] = useState([]);

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

  useEffect(() => {
    console.log(comments);
    const filterReply = () => {
      const specificReplies = comments?.filter(
        (reply) => reply.userid === userId
      );
      setUserReplies(specificReplies);
      console.log(specificReplies);
    };
    filterReply();
  }, [comments]);

  console.log(userReplies);

  const drawReplies = () => {
    return userReplies?.map((replies) => {
      return replies.replies.map((reply, i) => {
        return (
          <div
            style={{ cursor: "pointer" }}
            key={i}
            onClick={() => handleClickOnReply(replies)}
          >
            {replies.replyRead === "true" ? (
              <div
                onClick={() => setShowNotificationPopUp(false)}
                style={{
                  padding: "15px",
                  backgroundColor: "white",
                }}
              >
                <div
                  style={{
                    fontSize: "15px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={reply.userAvatar}
                    alt={reply.firstName}
                    width="25px"
                    height="25px"
                    style={{ borderRadius: "50%", marginLeft: "10px" }}
                  />
                  {reply.firstName}
                  {"  "}
                  {reply.lastName} رد على تعليقك{" "}
                </div>
              </div>
            ) : (
              <div
                onClick={() => setShowNotificationPopUp(false)}
                style={{
                  padding: "15px",
                  backgroundColor: "#e7f3ff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "15px" }}>
                  <img
                    src={reply.userAvatar}
                    alt={reply.firstName}
                    width="25px"
                    height="25px"
                    style={{ borderRadius: "50%", marginLeft: "10px" }}
                  />
                  {reply.firstName}
                  {"  "}
                  {reply.lastName} رد على تعليقك{" "}
                </div>
              </div>
            )}
          </div>
        );
      });
    });
    // .replies?.map((reply) => {
    //   return <div>{reply.firstName}</div>;
    // });
  };
  console.log(repliesShow);

  const handleClickOnReply = (replies) => {
    console.log(replies.playlistId);
    const setAsRead = async () => {
      await axios
        .patch(process.env.REACT_APP_BACKEND_URL + `/comments/${replies._id}`, {
          replyRead: true,
        })
        .then(
          window.localStorage.setItem(
            "courseDetails",
            JSON.stringify(replies.courseDetails)
          )
        )
        .then(
          window.localStorage.setItem(
            "lessonDetails",
            JSON.stringify(replies.lesson)
          )
        )

        .then(
          history.push({
            pathname: `/Lesson/${replies.playlistId}/${replies.videoName}`,
          })
        )
        .then(window.location.reload());
    };
    setAsRead();
    // setNotificationClicked(!notificationClicked);
    // setCourseIdNew(notification.courseid);
    // setOpenNotifications(!openNotifications);
  };

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
        .then(
          window.localStorage.setItem(
            "courseDetails",
            JSON.stringify(comment.courseDetails)
          )
        )
        .then(
          window.localStorage.setItem(
            "lessonDetails",
            JSON.stringify(comment.lesson)
          )
        )
        .then(window.localStorage.setItem("playlistId", comment.playlistId))
        .then(async () => {
          await axios.get(process.env.REACT_APP_BACKEND_URL + `/comments`);
          setComments(res.data);
        })
        .then(
          history.push({
            pathname: `/Lesson/${comment.playlistId}/${comment.videoName}`,
          })
        )
        .then(window.location.reload());
      // .then(window.location.reload());
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
          style={{ cursor: "pointer" }}
          key={i}
          onClick={() => handleClickOnNotification(comment)}
        >
          {comment.read === false ? (
            <div
              style={{
                fontSize: "15px",
                padding: "15px",
                height: "fit-content",
                backgroundColor: "#e7f3ff",
              }}
              onClick={() => setShowNotificationPopUp(false)}
            >
              {" "}
              <div>
                {comment.firstName} {comment.lastName} {"  "}
                علق على الدرس
                {"  "} {comment.videoTitle}
              </div>
              <div style={{ textAlign: "start" }}>
                {comment.createdAt.slice(0, 10)}
                {"   "}
                {comment.createdAt.slice(11, 16)}
              </div>
            </div>
          ) : (
            <div
              style={{
                fontSize: "15px",
                padding: "15px",
                height: "fit-content",
              }}
              onClick={() => setShowNotificationPopUp(false)}
            >
              <div>
                {comment.firstName} {comment.lastName} {"  "}
                علق على الدرس
                {"  "} {comment.videoTitle}
              </div>
              <div style={{ textAlign: "start" }}>
                {comment.createdAt.slice(0, 10)}
                {"   "}
                {comment.createdAt.slice(11, 16)}
              </div>
            </div>
          )}
        </div>
      );
    });
  };
  return (
    <div>
      <div className="NotificationPopUp">
        {drawReplies()}
        {drawComment()}
      </div>
    </div>
  );
}
