import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
export default function NotificationsPop({
  setShowNotificationPopUp,
  setRedLightNotification,
}) {
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
  const [userPractices, setUserPractices] = useState([]);
  const [userPracticesNotSeen, setUserPracticesNotSeen] = useState([]);
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
    const fetchPractices = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/mypractices/${userId}`
      );
     
      // const filterData = res.data.filter(
      //   (practice) => practice.teacherId === userId
      // );
      setTeacherPracticesNotifications(res.data);
    };
    fetchPractices();
  }, [userId]);

  useEffect(() => {
    const filteredPractices = teacherPracticesNotifications.filter(
      (practice) => {
        return practice.videoReply.length === 0 && !practice.reply && practice.RecordReply.length === 0;
      }
    );
    setTeacherPracticesUnreplied(filteredPractices);
  }, [teacherPracticesNotifications]);

  useEffect(() => {
    const filterComment = () => {
      const specificComments = comments?.filter(
        (comment) => comment.courseOwnerId === userId
      );
      setUserComments(specificComments);
    };
    filterComment();
  }, [comments]);

  useEffect(() => {
    const filterReply = () => {
      const specificReplies = comments?.filter(
        (reply) => reply.userid === userId
      );
      setUserReplies(specificReplies);
    };
    filterReply();
  }, [comments]);


  useEffect(() => {
    if (user.teacher) return;
    const fetch = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/studentpractices/${user.user._id}`
      );
      setUserPractices(res.data);
    };
    fetch();
  }, [userId]);

  useEffect(() => {
    const filteredSeen = userPractices.filter((practiceSeen) => {
      return practiceSeen.replySeen === "false";
    });
    setUserPracticesNotSeen(filteredSeen);
  }, [userPractices]);

  const drawUnSeenReplies = () => {
    return userPracticesNotSeen.map((unseen) => {
      return (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#e7f3ff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => goToStudentProfile(unseen)}
        >
          {unseen.teacherFirstName} {unseen.teacherLastName} علق على تمرينك
        </div>
      );
    });
  };

  const goToStudentProfile = async (unseen) => {
    await axios
      .patch(
        process.env.REACT_APP_BACKEND_URL + `/studentpractices/${unseen._id}`,
        {
          replySeen: true,
        }
      )
      .then(history.push(`/StudentMyPractice/${unseen._id}`));
  };

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
              cursor: "pointer",
            }}
            onClick={()=>handleClickOnPractice(practice)}
          >
            <div>
              {practice.studentFirstName} {practice.studentLastName} رفع تمرين
            </div>
          </div>
        </div>
      );
    });
  };

  const handleClickOnPractice = (practice) => {
    setRedLightNotification(false);
    setShowNotificationPopUp(false);
    history.push(`/SpecificPractice/${practice._id}`);
    // history.push(`/SpecificPractice/${practice._id}`);
    // setTeacherPracticesNotifications(null);
  };
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
                    src={reply.userAvatar.replace('http://', 'https://')}
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
                    src={reply.userAvatar.replace('http://', 'https://')}
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

  const handleClickOnReply = (replies) => {
    const setAsRead = async () => {
      await axios
        .patch(process.env.REACT_APP_BACKEND_URL + `/comments/${replies._id}`, {
          replyRead: true,
        })
        .then(setRedLightNotification(false))
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
          const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/comments`
          );
          setComments(res.data);
          setRedLightNotification(false);
        })
        .then(
          history.push({
            pathname: `/Lesson/${comment.playlistId}/${comment.videoName}`,
          })
        );
      // .then(window.location.reload());
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
        {drawUnSeenReplies()}
        {drawPracticeNotifications()}
        {drawComment()}
        {drawReplies()}
      </div>
    </div>
  );
}
