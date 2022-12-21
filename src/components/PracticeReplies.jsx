import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentPractice.css";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
export default function PracticeReplies({ user }) {
  // State variables
  const [theUser, setTheUser] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const [teacherPractices, setTeacherPractices] = useState([]);
  const [userId, setUserId] = useState(null);
  const [reply, setReply] = useState("");
  const [myReply, setMyReply] = useState("");
  const [showReply, setShowReply] = useState(true);
  const [practiceId, setPracticeId] = useState("");
  const [doneAddingComment, setDoneAddingComment] = useState(false);
  const [nowDo, setNowDo] = useState("true");
  const [url, setUrl] = useState(null);
  const [nameOfProblem, setNameOfProblem] = useState("");
  const [video, setVideo] = useState();
  const [fileUpload, setFileUpload] = useState(null);
  const [teacherReplies, setTeacherReplies] = useState([]);
  const [autoReplies, setAutoReplies] = useState([]);
  // const [onlyForTeacher, setOnlyForTeacher] = useState([]);
  const [openButtons, setOpenButtons] = useState(false);
  const [showButtons, setShowButtons] = useState([]);
  const [poster, setPoster] = useState("");
  const [replyId, setReplyId] = useState("");
  const [replyIdtoDelete, setReplyIdtoDelete] = useState("");

  const unique_id = uuid();

  const history = useHistory();
  window.onpopstate = () => {
    history.push("/profile");
  };

  useEffect(() => {
    function MyVideo() {
      if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        // code to run if user is using Safari
        setPoster(
          "https://images.pexels.com/photos/6044198/pexels-photo-6044198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        );
      }
    }
    MyVideo();
  }, []);
  // Set user ID when component mounts
  useEffect(() => {
    if (user) {
      const userid = user.user ? user.user._id : user.teacher._id;
      setUserId(userid);
    } else {
      const userid = theUser.user ? theUser.user._id : theUser.teacher._id;
      setUserId(userid);
    }
  }, [user]);
  console.log(theUser);
  // Fetch replies data when component mounts
  useEffect(() => {
    const fetchReplies = async () => {
      const getReplies = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/replies/${userId}`
      );
      setAutoReplies(getReplies.data);
    };
    fetchReplies();
  }, [userId]);
  console.log(autoReplies);
  // Filter replies data by teacher's user ID
  // useEffect(() => {
  //   const filterByTeacher = autoReplies.filter(
  //     (teacher) => teacher.teacherId === userId
  //   );

  //   setOnlyForTeacher(filterByTeacher);
  // }, [autoReplies]);

  // Fetch practices data when user ID or doneAddingComment changes
  useEffect(() => {
    const fetchPractices = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/mypractices/${userId}`
      );
      console.log(res.data);
      // const filterData = res.data.filter(
      //   (practice) => practice.teacherId === userId
      // );
      setTeacherPractices(res.data);
    };
    fetchPractices();
  }, [userId, doneAddingComment]);

  // Fetch practices data when component mounts
  useEffect(() => {
    const fetchReplies = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/mypractices/${userId}`
      );
      // const filterData = res.data.filter(
      //   (practice) => practice.teacherId === userId
      // );
      setTeacherReplies(res);
    };
    fetchReplies();
  }, [user, userId]);

  // Update nowDo state when doneAddingComment changes
  useEffect(() => {
    setNowDo("false");
  }, [doneAddingComment]);

  // Handle input change for reply
  const handleReply = (e) => {
    setReply(e.target.value);
  };

  // Update myReply state when reply changes
  useEffect(() => {
    setMyReply(reply);
  }, [reply]);

  // Add teacher reply to practice
  const addTeacherReply = (practice) => {
    const addReply = async () => {
      await axios
        .patch(
          process.env.REACT_APP_BACKEND_URL + `/practices/${practice._id}`,
          {
            reply: myReply,
          }
        )
        .then(async () => {
          const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/mypractices/${userId}`
          );
          // const filter = res.data.filter(
          //   (practice) => practice.teacherId === userId
          // );
          setTeacherPractices(res.data);
          setMyReply("");
        });
    };
    addReply();
    setShowReply(myReply);
    setPracticeId(null);
    setDoneAddingComment(!doneAddingComment);
  };

  // Filter buttons data by unique link
  const getPracticeUnique = (practice) => {
    const newBU = autoReplies?.filter(
      (filteredPractices) =>
        filteredPractices.uniqueLink === practice.uniqueLink
    );
    setOpenButtons(true);
    setShowButtons(newBU);
  };

  // Add teacher video reply to practice
  const buttonDetails = (buttonD, practice) => {
    const addTheVideo = async () => {
      await axios
        .put(process.env.REACT_APP_BACKEND_URL + `/practices/${practice._id}`, {
          theVideoReply: buttonD.theVideoReply,
          videoName: practice.video,
          courseId: practice.courseId,
          nameOfProblem: nameOfProblem,
          practiceId: practice._id,
          uniqueLink: practice.uniqueLink,
          teacherId: practice.teacherId,
          replyId: unique_id,
        })
        .then(async () => {
          const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/mypractices/${userId}`
          );
          // const filterData = res.data.filter(
          //   (practice) => practice.teacherId === userId
          // );
          setTeacherPractices(res.data);
        });
    };
    addTheVideo();
    setUrl(null);
    setFileUpload(null);
    setPracticeId(null);
  };

  // Upload video to Cloudinary
  const postDetails = (practice) => {
    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", "bisharaHaroni");
    setPracticeId(practice._id);
    axios
      .post("https://api.cloudinary.com/v1_1/djvbchw2x/upload", formData, {
        onUploadProgress: (p) => {
          const percentComplete = Math.round((p.loaded * 100) / p.total);
          setFileUpload({ fileName: video.name, percentComplete });
          console.log(`${percentComplete}% uploaded`);
        },
      })
      .then((res) => setUrl(res.data.url))
      .then((res) => console.log(res))

      .catch((err) => {
        console.log(err);
      });
  };

  // Add teacher video reply to practice
  const addTeacherVideoReply = (practice) => {
    const addTheVideo = async () => {
      await axios
        .put(process.env.REACT_APP_BACKEND_URL + `/practices/${practice._id}`, {
          theVideoReply: url,
          videoName: practice.video,
          courseId: practice.courseId,
          nameOfProblem: nameOfProblem,
          practiceId: practice._id,
          uniqueLink: practice.uniqueLink,
          teacherId: practice.teacherId,
          replyId: unique_id,
        })
        .then(async () => {
          const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/mypractices/${userId}`
          );
          // const filterData = res.data.filter(
          //   (practice) => practice.teacherId === userId
          // );
          setTeacherPractices(res.data);
        })
        .then(console.log(practice))
        .then(async () => {
          await axios.post(process.env.REACT_APP_BACKEND_URL + `/replies`, {
            theVideoReply: url,
            videoName: practice.video,
            courseId: practice.courseId,
            nameOfProblem: nameOfProblem,
            practiceId: practice._id,
            uniqueLink: practice.uniqueLink,
            teacherId: practice.teacherId,
          });
        });
    };
    addTheVideo();

    setUrl(null);
    setFileUpload(null);
    setPracticeId(null);
  };

  const cancelUpload = () => {
    setUrl(null);
    setFileUpload(null);
    setPracticeId(null);
    setNameOfProblem("");
    setVideo(null);
  };
  // Render video replies
  // console.log(replyId);
  const renderVideoReplies = (replies, practice) => {
    return replies.map((reply, i) => {
      return (
        <div key={i} style={{ position: "relative" }}>
          <div>
            <video
              controls
              preload="metadata"
              // poster={poster}
              style={{ width: "100%", height: "115px", zIndex: 1 }}
            >
              <source src={reply.theVideoReply} type="video/mp4" />
            </video>
          </div>
          <div
            style={{
              color: "#5f697d",
              position: "absolute",
              top: "0",
              left: "0",
              zIndex: 2,
            }}
            onClick={() => {
              // setReplyId(reply.replyId);
              // handleDeleteReply(practice, reply);
            }}
          >
            {reply.replyId === replyId ? (
              <div
                style={{ marginLeft: "15px", cursor: "pointer" }}
                onClick={() => handleDeleteReply(practice, reply)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </div>
            ) : (
              <div
                style={{ marginLeft: "15px", cursor: "pointer" }}
                onClick={() => {
                  setReplyId("");
                  setReplyId(reply.replyId);
                }}
              >
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
            )}
          </div>
        </div>
      );
    });
  };
  console.log({ replytodelete: replyId });

  const handleDeleteReply = async (practice, reply) => {
    console.log(practice);
    console.log(reply.replyId);
    console.log(replyId);
    //   .then(console.log(replyToDelete))
    await axios
      .put(
        process.env.REACT_APP_BACKEND_URL +
          `/practice/videoReply/${practice._id}`,
        {
          replyId,
        }
      )
      .then(setTeacherPractices([]))
      .then(async () => {
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_URL + `/mypractices/${userId}`
        );
        setTeacherPractices(res.data);
      });
  };
  console.log(teacherPractices);
  // Render showData component
  const showData = () => {
    return teacherPractices?.map((practice) => {
      return (
        <div
          style={{ borderBottom: "1px solid #e1e1e1", padding: "10px" }}
          key={practice._id}
          onClick={() => getPracticeUnique(practice)}
        >
          <div>
            الطالب:
            {practice.studentFirstName} {practice.studentLastName}
          </div>
          <div>
            {" "}
            الدورة:
            {practice.courseName}, {practice.courseLevel}
          </div>
          <div>
            الدرس:
            {practice.video}
          </div>
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              <div>
                <video
                  key={practice.myPractice}
                  controls
                  preload="metadata"
                  // poster={poster}
                  style={{ width: "100%", height: "100%", maxHeight: "250px" }}
                >
                  <source src={practice.myPractice} type="video/mp4" />
                </video>
              </div>
              <div>
                {practice.videoReply ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: ".5rem",
                      height: "97%",
                      maxHeight: "250px",
                      // overflow: "hidden",
                    }}
                  >
                    {renderVideoReplies(practice.videoReply, practice)}
                  </div>
                ) : null}
              </div>
            </div>
            <div></div>
            <div style={{ padding: "30px" }}>
              <>
                <div>
                  {openButtons ? (
                    <>
                      {showButtons[0]?.uniqueLink === practice.uniqueLink ? (
                        <>
                          {showButtons.map((buttonD, i) => {
                            return (
                              <button
                                key={i}
                                onClick={() => buttonDetails(buttonD, practice)}
                                style={{
                                  marginLeft: "20px",
                                  borderRadius: "5px",
                                  backgroundColor: "black",
                                  color: "white",
                                  minWidth: "100px",
                                }}
                              >
                                {" "}
                                {buttonD.nameOfProblem}
                              </button>
                            );
                          })}
                        </>
                      ) : null}
                    </>
                  ) : null}
                </div>
                <div>
                  <div>للتعليق على التمرين من خلال ارسال فيديو</div>

                  <input
                    type="text"
                    placeholder="عنوان الرد"
                    onChange={(e) => setNameOfProblem(e.target.value)}
                  />
                </div>
                <div className="allvideoreply">
                  <div>
                    <input
                      type="file"
                      onChange={(e) => setVideo(e.target.files[0])}
                      onClick={() => setUrl(null)}
                    />
                  </div>
                  <div>
                    {url ? null : (
                      <button onClick={() => postDetails(practice)}>
                        رفع الفيديو
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  {fileUpload ? (
                    <div>
                      <p>{fileUpload.fileName}</p>
                      <p>{fileUpload.percentComplete}%</p>
                    </div>
                  ) : null}
                </div>
                {url ? (
                  <>
                    <button
                      onClick={() => addTeacherVideoReply(practice)}
                      className="btnSendVideoReply"
                    >
                      ارسال
                    </button>
                    <button
                      onClick={cancelUpload}
                      className="btnSendVideoReply"
                    >
                      cancel
                    </button>
                  </>
                ) : null}

                {/* </div> */}
              </>
            </div>
            <div style={{ marginTop: "30px" }}> تعليق المعلم:</div>

            <div>
              {showReply && practice.reply ? (
                <>
                  {practice.reply}{" "}
                  <button
                    onClick={() => {
                      // setShowLastReply(false);
                      setPracticeId(practice._id);
                    }}
                  >
                    تعديل
                  </button>
                </>
              ) : (
                <>
                  {/* {showReply}{" "} */}
                  <div>
                    {" "}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <textarea
                        name="reply"
                        onChange={handleReply}
                        placeholder="Reply"
                        value={myReply}
                        style={{
                          height: "70%",
                          width: "100%",
                          marginBottom: "10px",
                        }}
                      />
                      <button onClick={() => addTeacherReply(practice)}>
                        تثبيت
                      </button>
                    </div>
                  </div>
                </>
              )}{" "}
              {practiceId === practice._id && !url ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <textarea
                      name="reply"
                      onChange={handleReply}
                      placeholder="Reply"
                      value={myReply}
                      style={{
                        height: "70%",
                        width: "100%",
                        marginBottom: "10px",
                      }}
                    />
                    <button onClick={() => addTeacherReply(practice)}>
                      تثبيت
                    </button>
                  </div>
                </>
              ) : null}
            </div>
            {/* <div>{practice.reply}</div> */}
          </div>
        </div>
        // </div>
      );
    });
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <div>
        <h2 style={{ textAlign: "center" }}>تمارين الطلاب</h2>
      </div>
      <div>{showData()}</div>
    </div>
  );
}
