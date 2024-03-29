import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Notifications({user}) {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

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
  const navigate = useNavigate();
  useEffect(() => {
    setUserF(user.firstName)
    setUserL(user.lastName)
    setUserId(user._id)
    setUserAvatar(user.avatar)
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
          navigate({
            pathname: `/Lesson/${replies.playlistId}/${replies.videoName}`,
          })
        );
    };
    setAsRead();
    // setNotificationClicked(!notificationClicked);
    // setCourseIdNew(notification.courseid);
    // setOpenNotifications(!openNotifications);
  };
  useEffect(() => {
    if (user.teacher) return;
    const fetch = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/studentpractices/${user._id}`
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
      .then(navigate(`/StudentMyPractice/${unseen._id}`));
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

        .then(
          navigate({
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
  const drawPracticeNotifications = () => {
    return teacherPracticesUnReplied?.map((practice) => {
      return (
        <div key={practice._id}>
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
    // setShowNotificationPopUp(false);
    navigate(`/onePractice/${practice._id}`);
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
        {drawUnSeenReplies()}
        {drawPracticeNotifications()}
        {/* {drawComment()}
        {drawReplies()} */}
      </div>
    </div>
  );
}
