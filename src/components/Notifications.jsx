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
  const [userReplies, setUserReplies] = useState([]);
  const [repliesShow, setRepliesShow] = useState([]);
  const [teacherPracticesNotifications, setTeacherPracticesNotifications] =
    useState([]);
  const [teacherPracticesUnReplied, setTeacherPracticesUnreplied] = useState(
    []
  );
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
                style={{
                  padding: "20px",
                  backgroundColor: "white",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    display: "flex",
                    justifyContent: "flex-start",
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
                style={{
                  padding: "20px",
                  backgroundColor: "#e7f3ff",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    display: "flex",
                    justifyContent: "flex-start",
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
        );
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

        .then(
          history.push({
            pathname: `/Lesson/${comment.playlistId}/${comment.videoName}`,
          })
        );
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
                padding: "20px",
                backgroundColor: "#e7f3ff",
              }}
            >
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
            <div style={{ fontSize: "20px", padding: "20px" }}>
              <div>
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
          )}
        </div>
      );
    });
  };

  useEffect(() => {
    const fetchPractices = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/mypractices/${userId}`
      );
      console.log(res.data);
      // const filterData = res.data.filter(
      //   (practice) => practice.teacherId === userId
      // );
      setTeacherPracticesNotifications(res.data);
    };
    fetchPractices();
  }, [userId]);

  console.log(teacherPracticesNotifications);
  useEffect(() => {
    const filteredPractices = teacherPracticesNotifications.filter(
      (practice) => {
        return practice.videoReply.length === 0 && !practice.reply;
      }
    );
    setTeacherPracticesUnreplied(filteredPractices);
  }, [teacherPracticesNotifications]);
  const drawPracticeNotifications = () => {
    return teacherPracticesUnReplied?.map((practice) => {
      return (
        <div>
          <div
            style={{
              padding: "15px",
              backgroundColor: "#e7f3ff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleClickOnPractice}
          >
            <div>
              {practice.studentFirstName} {practice.studentLastName} رفع تمرين
            </div>
          </div>
        </div>
      );
    });
  };

  const handleClickOnPractice = () => {
    // setShowNotificationPopUp(false);
    history.push("/PracticeReplies");
    // setTeacherPracticesNotifications(null);
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
        {drawPracticeNotifications()}
        {drawComment()}

        {drawReplies()}
      </div>
    </div>
  );
}
