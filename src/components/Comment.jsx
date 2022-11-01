import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

export default function Comment({ course, courseId, chooseVideo }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [ownerId, setOwnerId] = useState(localStorage.getItem("ownerId"));
  const [comments, setComments] = useState(null);
  const [submited, setSubmited] = useState("");
  const [addComment, setAddComment] = useState({});
  const [courseComments, setCourseComments] = useState(null);
  const [courseid, setCourseid] = useState(courseId);
  const [myReply, setMyReply] = useState("");
  const [addReply, setAddReply] = useState({});
  const [clicked, setClicked] = useState("");
  const [replyingDone, setReplyingDone] = useState("");
  const [commentDone, setCommentDone] = useState("");
  const [videoId, setVideoId] = useState(localStorage.getItem("videoId"));
  const [videoName, setVideoName] = useState(localStorage.getItem("videoName"));
  const [doneAddingComment, setDoneAddingComment] = useState(false);
  const [socket, setSocket] = useState(null);
  const [url, setUrl] = useState(null);
  const [video, setVideo] = useState();
  const [fileUpload, setFileUpload] = useState(null);
  const [practiceInfo, setPracticeInfo] = useState({
    // ownerId: user.user._id,
    // studentFirstName: user.user.firstName,
    // studentLastName: user.user.lastName,
    teacherId: course.owner,
    teacherFirstName: course.firstName,
    teacherLastName: course.lastName,
    courseId: course._id,
    courseName: course.instrument,
    courseLevel: course.level,
    video: chooseVideo.episode,
  });

  useEffect(() => {
    const userF = user.user ? user.user.firstName : user.teacher.firstName;
    const userL = user.user ? user.user.lastName : user.teacher.lastName;
    const userid = user.user ? user.user._id : user.teacher._id;
    setPracticeInfo({
      ...practiceInfo,
      studentFirstName: userF,
      studentLastName: userL,
      ownerId: userid,
    });
  }, [user]);

  console.log(user);
  const postDetails = () => {
    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", "bisharaHaroni");
    // formData.append("cloud_name", "shhady");
    axios
      .post("https://api.cloudinary.com/v1_1/shhady/upload", formData, {
        onUploadProgress: (p) => {
          const percentComplete = Math.round((p.loaded * 100) / p.total);
          setFileUpload({ fileName: video.name, percentComplete });
          console.log(`${percentComplete}% uploaded`);
        },
      })
      .then((res) => setUrl(res.data.url))
      // .then((data) => {
      //   (data.url);
      // })
      // .then(console.log(url))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetch = async () => {
      console.log(practiceInfo);
      if (!url) return;
      await axios.post(process.env.REACT_APP_BACKEND_URL + "/practices/", {
        ...practiceInfo,
        myPractice: url,
      });
    };
    fetch();
  }, [url]);

  useEffect(() => {
    setSocket(io("https://dawrafun1.herokuapp.com/"));
    console.log(socket);
  }, []);
  useEffect(() => {
    setCourseid(course._id);
  }, [course]);
  console.log(course._id);
  useEffect(() => {
    setVideoId(localStorage.getItem("videoId"));
    setVideoName(localStorage.getItem("videoName"));
  }, [chooseVideo]);
  console.log(videoName);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/comments`
      );
      setComments(res.data);
    };
    fetch();
  }, []);
  console.log(course);
  // console.log(user.teacher._id);
  useEffect(() => {
    const resultComments = comments?.filter(
      (comment) => comment.courseId === videoId
    );
    if (!videoId) return;
    setCourseComments(resultComments);
  }, [comments, videoId]);
  console.log(courseComments);
  useEffect(() => {
    setSubmited(submited);
  }, [submited]);

  const deleteComment = (comment) => {
    console.log(comment._id);
    setDoneAddingComment(!doneAddingComment);
    const deleteTheComment = async () => {
      await axios
        .delete(process.env.REACT_APP_BACKEND_URL + `/comments/${comment._id}`)
        .then(async () => {
          const freshComments = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/comments`
          );
          console.log(freshComments.data);
          const resultComments = freshComments?.data.filter(
            (comment) => comment.courseId === videoId
          );
          setCourseComments(resultComments);
          console.log(resultComments);
        });
    };
    deleteTheComment();
    // showComments();
  };

  const showComments = () => {
    return courseComments?.map((comment, i) => {
      return (
        <div key={i} style={{ border: "1px solid gray", padding: "5px" }}>
          <div style={{ color: "black", fontWeight: "bold" }}>
            {comment.firstName}
            {"  "}
            {comment.lastName}:
          </div>
          <div>{comment.comment}</div>
          <div style={{ marginRight: "20px" }}>
            <div>
              {comment.replies.map((reply, i) => (
                <div key={i}>
                  <div>
                    <FontAwesomeIcon icon={faReply} /> {reply.firstName}{" "}
                    {reply.lastName}:
                  </div>
                  <div>{reply.reply}</div>
                </div>
              ))}
              {"  "}
            </div>
            {/* {replyingDone ? (
              <>
                <div>
                  <FontAwesomeIcon icon={faReply} /> {user.teacher?.firstName}{" "}
                  {user.teacher?.lastName}:
                </div>
                <div>{replyingDone}</div>
              </>
            ) : null} */}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div style={{ marginLeft: "30px" }}>
              {user.teacher?._id === ownerId ? (
                <div>
                  <h5
                    style={{
                      fontWeight: "bold",
                      borderBottom: "1px solid gray",
                      cursor: "pointer",
                    }}
                    onClick={() => setClicked(comment._id)}
                  >
                    Reply
                  </h5>
                </div>
              ) : null}

              {comment._id === clicked ? (
                <>
                  <input
                    name="reply"
                    onChange={handleReply}
                    placeholder="Reply"
                    value={myReply}
                    onClick={() => console.log(comment)}
                  />
                  <input
                    type="submit"
                    style={{ cursor: "pointer" }}
                    onClick={() => SubmitReply(comment)}
                  />
                </>
              ) : null}
            </div>
            {user.user?._id === comment.userid ||
            user.teacher?._id === ownerId ? (
              <div
                style={{
                  marginTop: "10px",
                  cursor: "pointer",
                }}
                onClick={() => deleteComment(comment)}
              >
                <span
                  style={{
                    border: "1px solid gray",
                    width: "fitContent",
                    cursor: "pointer",
                  }}
                >
                  حذف
                </span>
              </div>
            ) : null}
          </div>
        </div>
      );
    });
  };
  const handleReply = (e) => {
    setMyReply(e.target.value);
    const userF = user.user ? user.user.firstName : user.teacher.firstName;
    const userL = user.user ? user.user.lastName : user.teacher.lastName;

    setAddReply({
      courseId: videoId,
      firstName: userF,
      lastName: userL,
    });
  };

  const SubmitReply = async (comment) => {
    setMyReply("");
    setReplyingDone(myReply);
    await axios
      .put(process.env.REACT_APP_BACKEND_URL + `/comments/${comment._id}`, {
        ...addReply,
        reply: myReply,
      })
      .then(async () => {
        const freshComments = await axios.get(
          process.env.REACT_APP_BACKEND_URL + `/comments`
        );
        console.log(freshComments.data);
        const resultComments = freshComments?.data.filter(
          (comment) => comment.courseId === videoId
        );
        setCourseComments(resultComments);
        console.log(resultComments);
      });
  };

  const handleChange = (e) => {
    setSubmited(e.target.value);
    const userF = user.user ? user.user.firstName : user.teacher.firstName;
    const userL = user.user ? user.user.lastName : user.teacher.lastName;
    const userid = user.user ? user.user._id : user.teacher._id;

    setAddComment({
      userid: userid,
      courseId: videoId,
      theCourse: courseid,
      firstName: userF,
      lastName: userL,
      courseOwnerId: ownerId,
      videoName: videoName,
      read: false,
    });
  };
  const handleSubmit = async () => {
    setSubmited("");
    const userF = user.user ? user.user.firstName : user.teacher.firstName;
    const userL = user.user ? user.user.lastName : user.teacher.lastName;
    const userid = user.user ? user.user._id : user.teacher._id;
    setCommentDone(submited);
    await axios
      .post(process.env.REACT_APP_BACKEND_URL + `/comments`, {
        ...addComment,
        comment: submited,
      })
      .then(() => setDoneAddingComment(!doneAddingComment))
      .then(async () => {
        const freshComments = await axios.get(
          process.env.REACT_APP_BACKEND_URL + `/comments`
        );
        console.log(freshComments.data);
        const resultComments = freshComments?.data.filter(
          (comment) => comment.courseId === videoId
        );
        setCourseComments(resultComments);
        console.log(resultComments);
      })
      .then(() => {
        socket.emit("sendNotificationComment", {
          senderName: userF,
          senderFamily: userL,
          senderId: userid,
          videoName: videoName,
          receiverId: ownerId,
          videoId: videoId,
          courseid: courseid,
        });
      });
  };

  useEffect(() => {
    const refresh = async () => {
      const freshComments = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/comments`
      );
      console.log(freshComments.data);
      const resultComments = freshComments?.data.filter(
        (comment) => comment.courseId === videoId
      );
      setCourseComments(resultComments);
      console.log(resultComments);
    };
    refresh();
  }, [doneAddingComment]);

  const deleteFromDataBase = () => {
    const getNewArray = async () => {
      const newA = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/comments/"
      );
      console.log(newA);
      const commetToDelete = newA?.data.find((c) => c.comment === commentDone);
      console.log(commetToDelete);
      const deleteNow = async () => {
        await axios.delete(
          process.env.REACT_APP_BACKEND_URL + `/comments/${commetToDelete._id}`
        );
      };
      deleteNow();
    };
    getNewArray();
  };

  return (
    <div>
      {user.user ? (
        <>
          <div
            style={{
              // width: "100%",
              margin: "20px 0px",
              border: "1px solid gray",
              padding: "5px",
            }}
          >
            <input
              type="file"
              onChange={(e) => setVideo(e.target.files[0])}
              onClick={() => setUrl(null)}
            />
            <button onClick={postDetails}>ارفع التمرين</button>
            <div style={{ minWidth: "70px" }}>
              {fileUpload && (
                <span style={{ textAlign: "center" }}>
                  {" "}
                  تم رفع {fileUpload.percentComplete}%
                </span>
              )}
              {url ? (
                <Link to="/profile">
                  <button style={{ textAlign: "center" }}>الملف الشخصي</button>
                </Link>
              ) : null}
            </div>
          </div>
          <div>Comment</div>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              onChange={handleChange}
              value={submited}
              name="comment"
            />
            <input
              type="submit"
              style={{ cursor: "pointer" }}
              onClick={handleSubmit}
            />
          </div>
        </>
      ) : null}

      <div>{showComments()}</div>
      <div>
        {/* {commentDone ? (
          <div style={{ border: "1px solid gray", padding: "5px" }}>
            <div>
              {user.user?.firstName} {user.user?.lastName}:
            </div>
            <div>{commentDone}</div>
            <div
              style={{
                marginTop: "10px",
                cursor: "pointer",
              }} */}
        {/* onClick={() => setCommentDone(null)}
            >
              <span
                style={{
                  border: "1px solid gray",
                  width: "fitContent",
                  cursor: "pointer",
                }}
                onClick={() => {
                  deleteFromDataBase();
                }}
              >
                حذف
              </span>
            </div>
          </div>
        ) : null}*/}
      </div>
    </div>
  );
}
