import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentPractice.css";
export default function StudentsPractices({ user }) {
  // const [allPracrices, setAllPracrices] = useState([]);
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
  const [onlyForTeacher, setOnlyForTeacher] = useState([]);
  const [openButtons, setOpenButtons] = useState(false);
  const [showButtons, setShowButtons] = useState([]);
  const postDetails = (practice) => {
    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", "bisharaHaroni");
    setPracticeId(practice._id);
    // formData.append("cloud_name", "shhady");
    axios
      .post("https://api.cloudinary.com/v1_1/djvbchw2x/upload", formData, {
        onUploadProgress: (p) => {
          const percentComplete = Math.round((p.loaded * 100) / p.total);
          setFileUpload({ fileName: video.name, percentComplete });
          console.log(`${percentComplete}% uploaded`);
        },
      })
      .then((res) => setUrl(res.data.secure_url))
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {}, [url]);

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
        })
        .then(async () => {
          const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/practices`
          );
          const filterData = res.data.filter(
            (practice) => practice.teacherId === userId
          );
          setTeacherPractices(filterData);
        })
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
  useEffect(() => {
    // const userid = user.user ? user.user._id : user.teacher._id;
    setUserId(user._id);
  }, [user]);

  useEffect(() => {
    const respo = async () => {
      const getReplies = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/replies`
      );
      setAutoReplies(getReplies.data);
    };
    respo();
  }, []);
  useEffect(() => {
    const filterByTeacher = autoReplies.filter(
      (teacher) => teacher.teacherId === userId
    );
    setOnlyForTeacher(filterByTeacher);
  }, [autoReplies]);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/practices`
      );
      const filterData = res.data.filter(
        (practice) => practice.teacherId === userId
      );
      setTeacherPractices(filterData);
    };
    fetch();
  }, [userId]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/practices`
      );
      const filterData = res.data.filter(
        (practice) => practice.teacherId === userId
      );
      setTeacherReplies(filterData);
    };
    fetch();
  }, []);


  const handleReply = (e) => {
    setReply(e.target.value);
  };
  useEffect(() => {
    setMyReply(reply);
  }, [reply]);

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
            process.env.REACT_APP_BACKEND_URL + `/practices`
          );
          const filter = res.data.filter(
            (practice) => practice.teacherId === userId
          );
          setTeacherPractices(filter);
          setMyReply("");
        });
    };
    addReply();
    setShowReply(myReply);
    setPracticeId(null);
    setDoneAddingComment(!doneAddingComment);
  };

  useEffect(() => {
    setNowDo("false");
  }, [doneAddingComment]);


  const getPracticeUnique = (practice) => {
    const newBU = onlyForTeacher.filter(
      (filteredPractices) =>
        filteredPractices.uniqueLink === practice.uniqueLink
    );
    setOpenButtons(true);
    setShowButtons(newBU);
  };

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
        })
        .then(async () => {
          const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/practices`
          );
          const filterData = res.data.filter(
            (practice) => practice.teacherId === userId
          );
          setTeacherPractices(filterData);
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
  };

  const showData = () => {
    return teacherPractices?.reverse().map((practice) => {
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
                <span> التمرين:</span>
                <video
                  key={practice.myPractice}
                  controls
                  style={{ width: "100%", height: "250px" }}
                >
                  <source src={practice.myPractice.replace('http://', 'https://')} type="video/mp4" />
                </video>
              </div>
              <div>
                <span style={{ color: "black" }}>رد المعلم</span>
                {practice.videoReply ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: ".5rem",
                      height: "97%",
                      maxHeight: "250px",
                    }}
                  >
                    {practice.videoReply.map((reply, i) => {
                      return (
                        <video
                          key={reply.theVideoReply}
                          controls
                          style={{ width: "100%", height: "121px" }}
                        >
                          <source src={reply.theVideoReply.replace('http://', 'https://')} type="video/mp4" />
                        </video>
                      );
                    })}
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
                          {showButtons.map((buttonD) => {
                            return (
                              <button
                                onClick={() => buttonDetails(buttonD, practice)}
                                style={{
                                  marginLeft: "20px",
                                  borderRadius: "5px",
                                  backgroundColor: "black",
                                  color: "white",
                                  minWidth: "100px",
                                }}
                              >
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
                        ارفع الفيديو
                      </button>
                    )}
                  </div>
                  <div>
                    {practiceId === practice._id ? (
                      <div className="SendVideoReply">
                        <div
                          style={{
                            minWidth: "70px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          {fileUpload && (
                            <span style={{ textAlign: "center" }}>
                              {" "}
                              تم رفع {fileUpload.percentComplete}%
                            </span>
                          )}
                        </div>
                        {url ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <button
                              onClick={() => addTeacherVideoReply(practice)}
                              className="btnSendVideoReply"
                            >
                              ارسال
                            </button>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </>
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
        </div>
      );
    });
  };

  return (
    <div
      style={{
        marginTop: "150px",
      }}
    >
      <div>
        <h2 style={{ textAlign: "center" }}>تمارين الطلاب</h2>
      </div>
      <div>{showData()}</div>
    </div>
  );
}
