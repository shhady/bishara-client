import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentPractice.css";
import { useHistory , useParams} from "react-router-dom";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faEllipsisVertical,
  faVideo
} from "@fortawesome/free-solid-svg-icons";
import AudioRecord from "./AudioRecord";
export default function PracticeReplies({ user }) {
  // State variables
  const [theUser, setTheUser] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const [teacherPractices, setTeacherPractices] = useState([]);
  const [specificTeacherPractice, setSpecificTeacherPractice] = useState([])
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
  const [moreThan, setMoreThan] = useState(null);
  const [recordUrl, setRecordUrl] = useState('')
  // const fileInput = useRef(null);

  const unique_id = uuid();
    const {id} = useParams()
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
    const userid = theUser.user ? theUser.user._id : theUser.teacher._id;
    setUserId(userid);
  }, []);
  useEffect(() => {
    const userid = user.user ? user.user._id : user.teacher._id;
    setUserId(userid);
  }, [user]);
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
  // Filter replies data by teacher's user ID
  useEffect(() => {
    const fetch = async ()=>{
      const res = await axios.get(process.env.REACT_APP_BACKEND_URL + `/practice/${id}`)
      setTeacherPractices([res.data]);
    }
    fetch()
  }, [id]);

  // Fetch practices data when user ID or doneAddingComment changes
  useEffect(() => {
    const fetchPractices = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL +
          `/mypractices/${theUser.teacher._id}`
      );
      // const filterData = res.data.filter(
      //   (practice) => practice.teacherId === userId
      // );
      setTeacherPractices(res.data);
    };
    fetchPractices();
  }, [doneAddingComment]);

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
        })
        .then(async () => {
          await axios.patch(
            process.env.REACT_APP_BACKEND_URL +
              `/studentpractices/${practice._id}`,
            {
              replySeen: false,
            }
          );
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
    if (practice.videoReply.length > 3) return console.log("no more");

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
        })
        .then(async () => {
          await axios.patch(
            process.env.REACT_APP_BACKEND_URL +
              `/studentpractices/${practice._id}`,
            {
              replySeen: false,
            }
          );
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
      .then(() => setVideo(null))
      .then(() => setFileUpload(null))
      .catch((err) => {
        console.log("can't upload > 100mb");
      });
  };

  
  console.log(teacherPractices);
  // Add teacher video reply to practice
  const addTeacherVideoReply = (practice) => {
    if (practice.videoReply.length > 3) return console.log("no more");
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
        .then(async () => {
          await axios.patch(
            process.env.REACT_APP_BACKEND_URL +
              `/studentpractices/${practice._id}`,
            {
              replySeen: false,
            }
          );
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

  const cancelUpload = () => {
    setUrl(null);
    setFileUpload(null);
    setPracticeId(null);
    setNameOfProblem("");
    setVideo(null);
  };

  const showRec =(practice)=>{
    return practice.RecordReply?.map((rec)=>{
      return <div key={practice.replyId} style={{display: 'flex', justifyContent:'center', alignItems:'center',marginTop: ".5rem", padding:"3px", border: "1px solid black"}}>
      <div style={{margin:"10px", cursor:"pointer"}} onClick={() => handleDeleteRecording(rec,practice, reply)}> <FontAwesomeIcon icon={faTrashCan} /></div>
        <audio 
        style={{width:'100%'}}
      controls
      // poster={poster}
    >
      <source src={rec.RecordingReply} type="audio/mp4" />
    </audio>
      </div>
    })
  }
  const handleDeleteRecording = async (rec, practice,reply) => {
    const replyId = rec.replyId
    console.log(rec.replyId)
      // .then(console.log(replyToDelete))
    await axios
      .put(
        process.env.REACT_APP_BACKEND_URL +
          `/practice/deleteRecordReply/${practice._id}`,
        {
          replyId:rec.replyId,
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
  // Render video replies
  const renderVideoReplies = (replies, practice) => {
    return replies.map((reply, i) => {
      return (
        <div key={i} style={{ position: "relative" }}>
          <div className="videoContainer">
            <video
              controls
              preload="metadata"
              // poster={poster}
              className="videos4Practices"
            >
              <source src={reply.theVideoReply} type="video/mp4" />
            </video>
          </div>
          <div
            style={{
              color: "#5f697d",
              position: "absolute",
              top: "0",
              left: "20px",
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

  
  const handleDeleteReply = async (practice, reply) => {
    
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
  useEffect(()=>{
    const res = teacherPractices.filter((practice)=> practice._id ===id ) 
   setSpecificTeacherPractice(res)
  },[teacherPractices])
  console.log(specificTeacherPractice)
  // Render showData component
  const showData = () => {
    return specificTeacherPractice?.map((practice) => {
      return (
        <div
          style={{ padding: "10px" }}
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
              className="videoAndReplies"
            >
              <div className="StudentVideo" style={{ 
                
                display: "flex",
                // flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:"#fee4b9",marginBottom:"10px"}}>
                <video
                 key={practice.myPractice}
                 controls
                 preload="metadata"
                 // poster={poster}
                 height="250px"
                 style={{
                   width: "90%",
                   height: "90%",
                   minHeight: "230px",
                   maxHeight: "230px",
                   border: "1px solid #e1e1e1",
                   marginTop:"10px",marginBottom:"10px"
                 }}
                
                >
                  <source src={practice.myPractice} type="video/mp4" />
                </video>
              </div>
              <div className="replyForVideo">
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
              <div className="audioSpecific">
                {showRec(practice)}
                </div>
              </div>
              
            </div>
            </div>
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
                                  minWidth: "80px",
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
            <div className="SpecificReplies">
            
            <div   style={{
                        display: "flex",
                        flexDirection:"column",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid black", padding:"10px"
                      }}>
              <>
                
                <div>
                  {/* <AudioRecorder/> */}
                  <div>تعليق عن طريق فيديو</div>
                   
                </div>
                <div className="allvideoreply" style={{
                        display: "flex",
                        flexDirection:"column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}>
                        <div style={{display: "flex"}}>
                        <div>
                  <input
                 
                    type="text"
                    placeholder="عنوان الرد"
                    onChange={(e) => setNameOfProblem(e.target.value)}
                  />
                  </div>
                        
                  <div style={{marginRight:"10px",backgroundColor:"#ebebeb", width:"40px", height:"40px", borderRadius:"50%", display:"flex", justifyContent:"center",alignItems:"center"}}>
                  <label for="inputTag">
                    <FontAwesomeIcon icon={faVideo} />
                    <input
                      type="file"
                      onChange={(e) => {
                        e.target.files[0].size > 104857500
                          ? setMoreThan("more than 100mb")
                          : setVideo(e.target.files[0]);
                      }}
                      id="inputTag"
                      style={{ display: "none" }}
                      onClick={() => {
                        setUrl(null);
                        setVideo(null);
                        setMoreThan(null);
                      }}
                      // onClick={() => setUrl(null)}
                    />
                  </label>
                    {/* <input
                      type="file"
                      // ref={fileInput}
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
                    /> */}
                  </div>
                  </div>
                  {moreThan && (
                    <div style={{ color: "red" }}>
                      لا يمكن رفع فيديو اكبر من 100 ميجا بايت
                    </div>
                  )}

                  <div>
                    {video && !moreThan ? (
                      <button onClick={() => postDetails(practice)}>
                        رفع الفيديو
                      </button>
                    ) : null}
                    {"  "}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      {fileUpload && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            width: "50%",
                            height: "fit-content",
                          }}
                        >
                          {/* <p>{fileUpload.fileName}</p> */}
                          <p>{fileUpload.percentComplete}%</p>
                        </div>
                      )}

                      {url ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            width: "50%",
                            height: "100%",
                          }}
                        >
                          <button
                            onClick={() => addTeacherVideoReply(practice)}
                            style={{ backgroundColor:"#fee4b9",color:"black" , width:"80px"}}
                          >
                            ارسال
                          </button>
                          <button
                            onClick={cancelUpload}
                            style={{ backgroundColor:"red",color:"white", width:"80px"}}
                          >
                            الغاء
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {/* <div></div> */}

                {/* </div> */}
              </>
            </div>
       
            <div style={{
                        display: "flex",
                        flexDirection:"column",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid black", padding:"10px"
                      }}>
              <div>رساله صوتيه</div>
                <AudioRecord unique_id={unique_id} userId={userId} setTeacherPractices={setTeacherPractices} setRecordUrl={setRecordUrl} practice={practice}/>
              </div>
              <div style={{
                        display: "flex",
                        flexDirection:"column",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid black", padding:"10px"
                      }}>
            <div> تعليق المعلم:</div>

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
            </div>
            </div>
            {/* <div>{practice.reply}</div> */}
          
        </div>
        // </div>
      );
    });
  };

  return (
    <div style={{ marginTop: "100px" }}>
     
      <div>{showData()}</div>
    </div>
  );
}
