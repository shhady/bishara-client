import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

export default function Comment({
  userId,
  userF,
  userL,
  courseInfo,
  lesson,
  socket,
}) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  // const [ownerId, setOwnerId] = useState(localStorage.getItem("ownerId"));
  // const [comments, setComments] = useState(null);
  // const [submited, setSubmited] = useState("");
  // const [addComment, setAddComment] = useState({});
  // const [courseComments, setCourseComments] = useState(null);
  // const [courseid, setCourseid] = useState(courseId);
  // const [myReply, setMyReply] = useState("");
  // const [addReply, setAddReply] = useState({});
  // const [clicked, setClicked] = useState("");
  // const [replyingDone, setReplyingDone] = useState("");
  // const [commentDone, setCommentDone] = useState("");
  // const [videoId, setVideoId] = useState(localStorage.getItem("videoId"));
  // const [videoName, setVideoName] = useState(localStorage.getItem("videoName"));
  // const [doneAddingComment, setDoneAddingComment] = useState(false);
  // const [socket, setSocket] = useState(null);
  const [url, setUrl] = useState(null);
  const [video, setVideo] = useState();
  const [fileUpload, setFileUpload] = useState(null);
  const [practiceInfo, setPracticeInfo] = useState({
    // ownerId: user.user._id,
    // studentFirstName: user.user.firstName,
    // studentLastName: user.user.lastName,
    // teacherId: course.owner,
    // teacherFirstName: course.firstName,
    // teacherLastName: course.lastName,
    // courseId: course._id,
    // courseName: course.instrument,
    // courseLevel: course.level,
    // video: chooseVideo.episode,
  });
  const [moreThan, setMoreThan] = useState(null);
  console.log(userF);
  console.log(lesson);
  console.log(courseInfo);

  useEffect(() => {
    if (!user) return;
    const userF = user.user ? user.user.firstName : user.teacher.firstName;
    const userL = user.user ? user.user.lastName : user.teacher.lastName;
    const userid = user.user ? user.user._id : user.teacher._id;
    setPracticeInfo({
      ...practiceInfo,
      studentFirstName: userF,
      studentLastName: userL,
      ownerId: userid,
      teacherId: courseInfo.owner,
      teacherFirstName: courseInfo.firstName,
      teacherLastName: courseInfo.lastName,
      courseId: courseInfo.playlistId,
      courseName: courseInfo.title,
      courseLevel: courseInfo.level,
      video: lesson.snippet.title,
      uniqueLink: lesson.snippet.resourceId.videoId,
    });
  }, [user, lesson]);

  const postDetails = () => {
    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", "bisharaHaroni");
    // formData.append("cloud_name", "shhady");
    axios
      .post("https://api.cloudinary.com/v1_1/djvbchw2x/upload", formData, {
        onUploadProgress: (p) => {
          const percentComplete = Math.round((p.loaded * 100) / p.total);
          setFileUpload({ fileName: video.name, percentComplete });
          console.log(`${percentComplete}% uploaded`);
        },
      })
      .then((res) => setUrl(res.data.url))
      .then(() => {
        console.log(lesson);
      })
      // .then(console.log(url))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetch = async () => {
      if (!url) return;
      await axios.post(process.env.REACT_APP_BACKEND_URL + "/practices/", {
        ...practiceInfo,
        myPractice: url,
      });
    };
    fetch();
    socket.emit("sendNotificationComment", {
      senderName: userF,
      senderFamily: userL,
      senderId: userId,
      receiverId: courseInfo.owner,
      videoName: lesson.snippet.title,
      videoId: lesson.snippet.resourceId.videoId,
      courseid: courseInfo._id,
    });
  }, [url]);

  console.log(url);
  console.log(practiceInfo);
  // useEffect(() => {
  //   setSocket(
  //     io(
  //       // "https://dawrafun1.herokuapp.com/" ||
  //       "https://bisharaserver.herokuapp.com/"
  //     )
  //   );
  // }, []);
  // useEffect(() => {
  //   setCourseid(course._id);
  // }, [course]);
  // useEffect(() => {
  //   setVideoId(localStorage.getItem("videoId"));
  //   setVideoName(localStorage.getItem("videoName"));
  // }, [chooseVideo]);
  // useEffect(() => {
  //   const fetch = async () => {
  //     const res = await axios.get(
  //       process.env.REACT_APP_BACKEND_URL + `/comments`
  //     );
  //     setComments(res.data);
  //   };
  //   fetch();
  // }, []);
  // console.log(course);
  // console.log(user.teacher._id);
  // useEffect(() => {
  //   const resultComments = comments?.filter(
  //     (comment) => comment.courseId === videoId
  //   );
  //   if (!videoId) return;
  //   setCourseComments(resultComments);
  // }, [comments, videoId]);
  // console.log(courseComments);
  // useEffect(() => {
  //   setSubmited(submited);
  // }, [submited]);

  // const deleteComment = (comment) => {
  //   console.log(comment._id);
  //   setDoneAddingComment(!doneAddingComment);
  //   const deleteTheComment = async () => {
  //     await axios
  //       .delete(process.env.REACT_APP_BACKEND_URL + `/comments/${comment._id}`)
  //       .then(async () => {
  //         const freshComments = await axios.get(
  //           process.env.REACT_APP_BACKEND_URL + `/comments`
  //         );
  //         console.log(freshComments.data);
  //         const resultComments = freshComments?.data.filter(
  //           (comment) => comment.courseId === videoId
  //         );
  //         setCourseComments(resultComments);
  //         console.log(resultComments);
  //       });
  //   };
  //   deleteTheComment();
  // };

  // const showComments = () => {
  //   return courseComments?.map((comment, i) => {
  //     return (
  //       <div key={i} style={{ border: "1px solid gray", padding: "5px" }}>
  //         <div style={{ color: "black", fontWeight: "bold" }}>
  //           {comment.firstName}
  //           {"  "}
  //           {comment.lastName}:
  //         </div>
  //         <div>{comment.comment}</div>
  //         <div style={{ marginRight: "20px" }}>
  //           <div>
  //             {comment.replies.map((reply, i) => (
  //               <div key={i}>
  //                 <div style={{ color: "black", fontWeight: "bold" }}>
  //                   <FontAwesomeIcon icon={faReply} /> {reply.firstName}{" "}
  //                   {reply.lastName}:
  //                 </div>
  //                 <div>{reply.reply}</div>
  //               </div>
  //             ))}
  //             {"  "}
  //           </div>
  //         </div>
  //         <div
  //           style={{
  //             display: "flex",
  //             justifyContent: "flex-start",
  //             alignItems: "center",
  //           }}
  //         >
  //           <div style={{ marginLeft: "30px" }}>
  //             {user.teacher?._id === ownerId ? (
  //               <div>
  //                 <h5
  //                   style={{
  //                     fontWeight: "bold",
  //                     borderBottom: "1px solid gray",
  //                     cursor: "pointer",
  //                   }}
  //                   onClick={() => setClicked(comment._id)}
  //                 >
  //                   Reply
  //                 </h5>
  //               </div>
  //             ) : null}

  //             {comment._id === clicked ? (
  //               <>
  //                 <input
  //                   name="reply"
  //                   onChange={handleReply}
  //                   placeholder="Reply"
  //                   value={myReply}
  //                   onClick={() => console.log(comment)}
  //                 />
  //                 <input
  //                   type="submit"
  //                   style={{ cursor: "pointer" }}
  //                   onClick={() => SubmitReply(comment)}
  //                 />
  //               </>
  //             ) : null}
  //           </div>
  //           {user.user?._id === comment.userid ||
  //           user.teacher?._id === ownerId ? (
  //             <div
  //               style={{
  //                 marginTop: "10px",
  //                 cursor: "pointer",
  //               }}
  //               onClick={() => deleteComment(comment)}
  //             >
  //               <span
  //                 style={{
  //                   border: "1px solid gray",
  //                   width: "fitContent",
  //                   cursor: "pointer",
  //                 }}
  //               >
  //                 ??????
  //               </span>
  //             </div>
  //           ) : null}
  //         </div>
  //       </div>
  //     );
  //   });
  // };
  // const handleReply = (e) => {
  //   setMyReply(e.target.value);
  //   const userF = user.user ? user.user.firstName : user.teacher.firstName;
  //   const userL = user.user ? user.user.lastName : user.teacher.lastName;

  //   setAddReply({
  //     courseId: videoId,
  //     firstName: userF,
  //     lastName: userL,
  //   });
  // };

  // const SubmitReply = async (comment) => {
  //   setMyReply("");
  //   setReplyingDone(myReply);
  //   await axios
  //     .put(process.env.REACT_APP_BACKEND_URL + `/comments/${comment._id}`, {
  //       ...addReply,
  //       reply: myReply,
  //     })
  //     .then(async () => {
  //       const freshComments = await axios.get(
  //         process.env.REACT_APP_BACKEND_URL + `/comments`
  //       );
  //       console.log(freshComments.data);
  //       const resultComments = freshComments?.data.filter(
  //         (comment) => comment.courseId === videoId
  //       );
  //       setCourseComments(resultComments);
  //       console.log(resultComments);
  //     });
  // };

  // const handleChange = (e) => {
  //   setSubmited(e.target.value);
  //   const userF = user.user ? user.user.firstName : user.teacher.firstName;
  //   const userL = user.user ? user.user.lastName : user.teacher.lastName;
  //   const userid = user.user ? user.user._id : user.teacher._id;

  //   setAddComment({
  //     userid: userid,
  //     courseId: videoId,
  //     theCourse: courseid,
  //     firstName: userF,
  //     lastName: userL,
  //     courseOwnerId: ownerId,
  //     videoName: videoName,
  //     read: false,
  //   });
  // };
  // const handleSubmit = async () => {
  //   setSubmited("");
  //   const userF = user.user ? user.user.firstName : user.teacher.firstName;
  //   const userL = user.user ? user.user.lastName : user.teacher.lastName;
  //   const userid = user.user ? user.user._id : user.teacher._id;
  //   setCommentDone(submited);
  //   await axios
  //     .post(process.env.REACT_APP_BACKEND_URL + `/comments`, {
  //       ...addComment,
  //       comment: submited,
  //     })
  //     .then(() => setDoneAddingComment(!doneAddingComment))
  //     .then(async () => {
  //       const freshComments = await axios.get(
  //         process.env.REACT_APP_BACKEND_URL + `/comments`
  //       );
  //       console.log(freshComments.data);
  //       const resultComments = freshComments?.data.filter(
  //         (comment) => comment.courseId === videoId
  //       );
  //       setCourseComments(resultComments);
  //       console.log(resultComments);
  //     })
  //     .then(() => {
  //       socket.emit("sendNotificationComment", {
  //         senderName: userF,
  //         senderFamily: userL,
  //         senderId: userid,
  //         videoName: videoName,
  //         receiverId: ownerId,
  //         videoId: videoId,
  //         courseid: courseid,
  //       });
  //     });
  // };

  // useEffect(() => {
  //   const refresh = async () => {
  //     const freshComments = await axios.get(
  //       process.env.REACT_APP_BACKEND_URL + `/comments`
  //     );
  //     console.log(freshComments.data);
  //     const resultComments = freshComments?.data.filter(
  //       (comment) => comment.courseId === videoId
  //     );
  //     setCourseComments(resultComments);
  //     console.log(resultComments);
  //   };
  //   refresh();
  // }, [doneAddingComment]);

  // const deleteFromDataBase = () => {
  //   const getNewArray = async () => {
  //     const newA = await axios.get(
  //       process.env.REACT_APP_BACKEND_URL + "/comments/"
  //     );
  //     console.log(newA);
  //     const commetToDelete = newA?.data.find((c) => c.comment === commentDone);
  //     console.log(commetToDelete);
  //     const deleteNow = async () => {
  //       await axios.delete(
  //         process.env.REACT_APP_BACKEND_URL + `/comments/${commetToDelete._id}`
  //       );
  //     };
  //     deleteNow();
  //   };
  //   getNewArray();
  // };

  return (
    <div>
      {user?.user ? (
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
              onChange={(e) => {
                e.target.files[0].size > 104857500
                  ? setMoreThan("more than 100mb")
                  : setVideo(e.target.files[0]);
              }}
              onClick={() => {
                setUrl(null);
                setVideo(null);
                setMoreThan(null);
              }}
            />
            {moreThan && (
              <div style={{ color: "red" }}>
                ???? ???????? ?????? ?????????? ???????? ???? 100 ???????? ????????
              </div>
            )}
            {video && !moreThan ? (
              <button onClick={postDetails}>?????? ??????????????</button>
            ) : null}
            {/* <button onClick={postDetails}>???????? ??????????????</button> */}
            <div style={{ minWidth: "70px" }}>
              {fileUpload && (
                <span style={{ textAlign: "center", color: "black" }}>
                  {" "}
                  ???? ?????? {fileUpload.percentComplete}%
                </span>
              )}
              {url ? (
                <Link to="/profile">
                  <button style={{ textAlign: "center" }}>?????????? ????????????</button>
                </Link>
              ) : null}
            </div>
          </div>
          {/* <div>Comment</div> */}
          {/* 
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
          </div> */}
        </>
      ) : null}

      {/* <div>{showComments()}</div> */}
      <div></div>
    </div>
  );
}
