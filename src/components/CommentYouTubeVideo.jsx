import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CommentYouTube.css";
import Comment from "./Comment";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTrashCan,
  faPenToSquare,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
export default function CommentYouTubeVideo({ lesson, courseInfo }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [courseDetails, setCourseDetails] = useState(
    JSON.parse(localStorage.getItem("courseDetails"))
  );
  const [userF, setUserF] = useState("");
  const [userL, setUserL] = useState("");
  const [userId, setUserId] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [myComment, setMyComment] = useState("");
  const [comment, setComment] = useState("");
  const [courseComments, setCourseComments] = useState([]);
  const [videoComments, setVideoComments] = useState([]);
  const [myReply, setMyReply] = useState("");
  const [theReply, setTheReply] = useState("");
  const [replyId, setReplyId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [replyToDeleteId, setReplyToDeleteId] = useState("");
  const unique_id = uuid();
  console.log(videoComments);
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
  console.log(userId);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/comments`
      );
      setCourseComments(res.data);
    };
    fetch();
  }, []);

  const handleChangeReply = (e) => {
    setMyReply(e.target.value);
    setTheReply({
      courseId: courseInfo._id,
      PlayListId: courseInfo.playlistId,
      videoId: lesson.snippet.resourceId.videoId,
      firstName: userF,
      lastName: userL,
      userId: userId,
      userAvatar: userAvatar,
      replyId: unique_id,
      lesson: lesson,
      courseDetails: courseDetails,
      read: false,
    });
  };

  console.log(myReply);
  const handleSubmitReply = async (comment) => {
    if (!myReply) return;

    await axios
      .put(process.env.REACT_APP_BACKEND_URL + `/comments/${comment._id}`, {
        ...theReply,
        reply: myReply,
      })
      .then(async () => {
        await axios.patch(
          process.env.REACT_APP_BACKEND_URL + `/comments/${comment._id}`,
          {
            replyRead: false,
          }
        );
      })
      .then(() => {
        const fetch = async () => {
          const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/comments`
          );
          setCourseComments(res.data);
        };
        fetch();
      })
      .then(() => {
        setMyReply("");
      });
    // setMyReply("");
  };
  const handleChangeComment = async (e) => {
    setMyComment(e.target.value);
    setComment({
      userAvatar: userAvatar,
      userid: userId,
      theCourse: courseInfo._id,
      firstName: userF,
      lastName: userL,
      courseOwnerId: courseInfo.owner,
      comment: e.target.value,
      videoName: lesson.snippet.resourceId.videoId,
      videoTitle: lesson.snippet.title,
      playlistId: courseInfo.playlistId,
      read: false,
      replyRead: false,

      lesson: lesson,
      courseDetails: courseDetails,
    });
  };
  console.log(courseInfo);
  const handleSubmitComment = async () => {
    console.log(comment);
    if (!myComment) return;
    setMyComment("");
    await axios
      .post(process.env.REACT_APP_BACKEND_URL + `/comments`, comment)
      .then(() => {
        const fetch = async () => {
          const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/comments`
          );
          setCourseComments(res.data);
        };
        fetch();
      });
  };
  console.log(myComment);

  useEffect(() => {
    const filterComment = () => {
      const specificComments = courseComments?.filter(
        (comment) => comment.videoName === lesson.snippet.resourceId.videoId
      );
      setVideoComments(specificComments);
      console.log(specificComments);
    };
    filterComment();
  }, [courseComments, lesson]);

  const handleDeleteComment = (comment) => {
    const deleteTheComment = async () => {
      await axios
        .delete(process.env.REACT_APP_BACKEND_URL + `/comments/${comment._id}`)
        .then(async () => {
          const freshComments = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/comments`
          );
          console.log(freshComments.data);
          const resultComments = freshComments?.data.filter(
            (comment) => comment.videoName === lesson.snippet.resourceId.videoId
          );
          setVideoComments(resultComments);
          console.log(resultComments);
        });
    };
    deleteTheComment();
  };
  console.log(replyId);
  const handleDeleteReply = async (comment) => {
    console.log(comment._id);

    //   .then(console.log(replyToDelete))

    await axios
      .put(
        process.env.REACT_APP_BACKEND_URL + `/comment/reply/${comment._id}`,
        {
          replyId,
        }
      )
      .then(async () => {
        const freshComments = await axios.get(
          process.env.REACT_APP_BACKEND_URL + `/comments`
        );
        console.log(freshComments.data);
        const resultComments = freshComments?.data.filter(
          (comment) => comment.videoName === lesson.snippet.resourceId.videoId
        );
        setVideoComments(resultComments);
        console.log(resultComments);
      });
    //     const newReplies = videoComments?.filter(
    //       (reply) => reply._id === comment._id
    //     );
    //     console.log(newReplies[0].replies);
    //     const afterDelete = newReplies[0].replies.filter(
    //       (stayed) => stayed.replyId !== replyId
    //     );
    //     setOpenReply({ ...newReplies, replies: afterDelete });
    //   });
  };

  const handleClickOnNotification = (comment) => {
    const setAsRead = async () => {
      if (userId === comment.courseOwnerId) {
        await axios
          .patch(
            process.env.REACT_APP_BACKEND_URL + `/comments/${comment._id}`,
            {
              read: true,
            }
          )
          .then(
            window.localStorage.setItem(
              "lessonDetails",
              JSON.stringify(comment.lesson)
            )
          );
      } else {
        console.log("not owner");
      }

      // .then(window.location.reload());
    };
    setAsRead();
  };

  const showComments = () => {
    return videoComments?.map((comment, i) => {
      return (
        <div
          key={i}
          style={{
            boxShadow:
              "rgb(0 0 0 / 6%) 0px 1px 2px, rgb(35 41 54 / 14%) 0px 3px 8px",
          }}
          onClick={() => handleClickOnNotification(comment)}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <div>
                {comment.userAvatar ? (
                  <img
                    src={comment.userAvatar}
                    alt="profile"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      padding: "5px 13px",
                    }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                )}
              </div>
              <div
                style={{
                  backgroundColor: "#f0f2f5",
                  width: "fit-content",
                  borderRadius: "15px",
                  padding: "5px 10px 0px 30px",
                  marginRight: "10px",
                  marginTop: "5px",
                  minWidth: "180px",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {comment.firstName} {comment.lastName}:
                </span>
                <br />
                <p>{comment.comment}</p>
              </div>
            </div>
            {comment.userid === userId ? (
              <div
                style={{
                  height: "70px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    cursor: "pointer",
                    color: "black",
                    width: "50px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>{/* <FontAwesomeIcon icon={faPenToSquare} /> */}</div>
                  <div
                    onClick={() => handleDeleteComment(comment)}
                    style={{ color: "#5f697d" }}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div style={{ marginRight: "30px" }}>
            {comment.replies?.map((reply, i) => {
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    paddingLeft: "10px",
                  }}
                >
                  {" "}
                  {reply.userAvatar ? (
                    <img
                      src={reply.userAvatar}
                      alt="profile"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        padding: "5px 8px",
                      }}
                    >
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                  )}
                  <div
                    style={{
                      backgroundColor: "#f0f2f5",
                      minWidth: "150px",
                      borderRadius: "15px",
                      padding: "5px 10px 0px 15px",
                      marginRight: "10px",
                      marginTop: "5px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "3px",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        {reply.firstName} {reply.lastName}:
                      </div>
                      {reply.userId === userId ? (
                        <div
                          style={{ cursor: "pointer", display: "flex" }}
                          onClick={() => {
                            setOpenDelete(!openDelete);
                            setReplyId(reply.replyId);
                          }}
                        >
                          {reply.replyId === replyToDeleteId ? (
                            <div
                              style={{ marginRight: "10px" }}
                              onClick={() => handleDeleteReply(comment)}
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </div>
                          ) : (
                            <div
                              onClick={() => setReplyToDeleteId(reply.replyId)}
                            >
                              <FontAwesomeIcon icon={faEllipsisVertical} />
                            </div>
                          )}
                        </div>
                      ) : null}
                    </div>
                    <p> {reply.reply}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {userId === comment.courseOwnerId ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "5px",
                  marginTop: "15px",
                }}
              >
                {/* {} */}
                {/* {comment._id === videoComments._id ? ( */}
                {comment._id === commentId ? (
                  <>
                    <input
                      type="text"
                      placeholder="أضف رد"
                      value={myReply}
                      autoFocus
                      style={{
                        border: "none",
                        borderBottom: "1px solid grey",
                        width: "90%",
                      }}
                      onChange={(e) => handleChangeReply(e)}
                    />
                  </>
                ) : (
                  <div
                    style={{
                      borderBottom: "1px solid #5f697d",
                      color: "#5f697d",
                      width: "90%",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setCommentId(comment._id);
                      setMyReply("");
                    }}
                  >
                    أضف رد
                  </div>
                )}
                <button onClick={() => handleSubmitReply(comment)}>
                  تثبيت
                </button>
                {/* ) : null} */}
              </div>
            </>
          ) : null}
        </div>
      );
    });
  };
  console.log(videoComments);
  return (
    <div>
      <div className="commentsSection">
        <Comment
          userId={userId}
          userF={userF}
          userL={userL}
          courseInfo={courseInfo}
          lesson={lesson}
        />
        <div className="CommentInput">
          {userAvatar ? (
            <>
              <img src={userAvatar} alt="pofile" className="imgComment" />
            </>
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )}
          <input
            type="text"
            placeholder="أضف تعليق"
            value={myComment}
            style={{
              border: "none",
              width: "70%",
              borderBottom: "1px solid black",
              margin: "0 0 5px 5px",
            }}
            onChange={(e) => handleChangeComment(e)}
          />
          <button onClick={handleSubmitComment}>تثبيت</button>
        </div>

        <div>
          <p style={{ fontSize: "24px", textAlign: "center" }}>التعليقات</p>
        </div>
      </div>
      <div className="showcomments">{showComments()}</div>
    </div>
  );
}
