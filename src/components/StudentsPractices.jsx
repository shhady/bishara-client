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
  const [video, setVideo] = useState();
  const [fileUpload, setFileUpload] = useState(null);
  const postDetails = (practice) => {
    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", "bisharaHaroni");
    setPracticeId(practice._id);
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
      // .then(() => setPracticeId(practice._id))
      // .then((data) => {
      //   (data.url);
      // })
      // .then(console.log(url))
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {}, [url]);

  const addTeacherVideoReply = (practice) => {
    const addTheVideo = async () => {
      await axios
        .patch(
          process.env.REACT_APP_BACKEND_URL + `/practices/${practice._id}`,
          {
            videoReply: url,
          }
        )
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
  useEffect(() => {
    const userid = user.user ? user.user._id : user.teacher._id;
    setUserId(userid);
  }, [user]);
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

  // useEffect(() => {
  //   const res = allPracrices.filter();
  //   setTeacherPractices(res);
  // }, [allPracrices]);

  console.log(teacherPractices);

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
          console.log(teacherPractices);
          console.log(nowDo);
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
  // useEffect(() => {
  //   const fetchNew = async () => {
  //     const res = await axios.get(
  //       process.env.REACT_APP_BACKEND_URL + `/practices`
  //     );
  //     console.log(res);
  //   };
  //   fetchNew();
  // }, [doneAddingComment]);
  console.log(myReply);
  console.log(showReply);

  useEffect(() => {}, [doneAddingComment, nowDo]);

  const showData = () => {
    return teacherPractices?.map((practice) => {
      return (
        <div
          style={{ borderRight: "1px solid black", padding: "10px" }}
          key={practice._id}
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
                  <source src={practice.myPractice} type="video/mp4" />
                </video>
              </div>
              <div>
                {practice.videoReply ? (
                  <>
                    <span>رد المعلم</span>
                    <video
                      key={practice.videoReply}
                      controls
                      style={{ width: "100%", height: "250px" }}
                    >
                      <source src={practice.videoReply} type="video/mp4" />
                    </video>
                  </>
                ) : null}
              </div>
            </div>
            <div>
              {/* {practice.reply && showLastReply ? (
                <div>
                  <div>{practice.reply}</div>
                  <button
                    onClick={() => {
                      setShowLastReply(null);
                      setPracticeId(practice._id);
                    }}
                  >
                    تعديل
                  </button>
                </div>
              ) : (
                <>
                  {practice.id === practiceId ? (
                    <div>
                      {showReply === myReply ? (
                        <div>
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
                              style={{ height: "70%", width: "100%" }}
                            />
                            <button onClick={() => addTeacherReply(practice)}>
                              تثبيت
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <>{practice.reply}</>
                  )}
                </>
              )} */}
            </div>
            <div style={{ padding: "30px" }}>
              <>
                <div>للتعليق على التمرين من خلال ارسال فيديو</div>
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
