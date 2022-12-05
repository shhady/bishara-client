import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CommentYouTube.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
export default function CommentYouTubeVideo({ lesson, courseInfo }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [userF, setUserF] = useState("");
  const [userL, setUserL] = useState("");
  const [userId, setUserId] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [myComment, setMyComment] = useState("");
  const [comment, setComment] = useState("");
  const [courseComments, setCourseComments] = useState([]);
  const [videoComments, setVideoComments] = useState([]);
  const [myReply, setMyReply] = useState("");
  console.log(courseInfo);
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
      read: false,
    });
  };
  const handleSubmitComment = async () => {
    console.log(comment);
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
  const showComments = () => {
    return videoComments?.map((comment) => {
      return (
        <div
          style={{
            boxShadow:
              "rgb(0 0 0 / 6%) 0px 1px 2px, rgb(35 41 54 / 14%) 0px 3px 8px",
          }}
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
                alignItems: "center",
              }}
            >
              <div>
                <img
                  src={comment.userAvatar}
                  alt="profile"
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
              </div>
              <div style={{ fontWeight: "bold", marginRight: "10px" }}>
                {comment.firstName} {comment.lastName}:
              </div>
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleDeleteComment(comment)}
            >
              حذف
            </div>
          </div>
          <div style={{ width: "90%", margin: "auto" }}>{comment.comment}</div>
          <div>replies</div>
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

            <input
              type="text"
              placeholder="أضف رد"
              value={comment._id === videoComments._id ? myReply : null}
              style={{
                border: "none",
                borderBottom: "1px solid grey",
                width: "90%",
              }}
              onChange={(e) => handleChangeReply(e)}
            />
            <button>تثبيت</button>

            {/* ) : null} */}
          </div>
        </div>
      );
    });
  };
  console.log(videoComments);
  return (
    <div className="commentsSection">
      <div className="CommentInput">
        {userAvatar ? (
          <>
            <img
              src={userAvatar}
              alt="pofile"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          </>
        ) : (
          <FontAwesomeIcon icon={faUser} size="2x" />
        )}
        <input
          type="text"
          placeholder="أضف تعليق"
          value={myComment}
          style={{
            border: "none",
            width: "80%",
            borderBottom: "1px solid black",
          }}
          onChange={(e) => handleChangeComment(e)}
        />
        <button onClick={handleSubmitComment}>تثبيت</button>
      </div>

      <div>
        <p style={{ fontSize: "24px", textAlign: "center" }}>التعليقات</p>
      </div>
      <div className="showcomments">{showComments()}</div>
    </div>
  );
}
