import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../components/StudentPractice.css";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faEllipsisVertical,
  faVideo
} from "@fortawesome/free-solid-svg-icons";
import AudioRecord from "../../components/AudioRecord";
import CommentOnVideo from "../../components/CommentOnVideo";
import { useNavigate } from "react-router-dom";
// import YoutubeForPractice from "../../components/youtubeForPractice/YoutubeForPractice";
export default function PracticeReplies({ user, socket, practices }) {
  // State variables
  const theUser=JSON.parse(localStorage.getItem("profile"))
  const [teacherPractices, setTeacherPractices] = useState([]);
  const [userId, setUserId] = useState(user._id);
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
  const [openButtons, setOpenButtons] = useState(false);
  const [showButtons, setShowButtons] = useState([]);
  const [poster, setPoster] = useState("");
  const [replyId, setReplyId] = useState("");
  const [moreThan, setMoreThan] = useState(null);
  const [recordUrl, setRecordUrl] = useState('');
  const [generalButtons, setGeneralButtons] = useState(false)
  const navigate = useNavigate();
  const unique_id = uuid();
  // const userF = user.user ? user.user.firstName : user.teacher.firstName;
  // const userL = user.user ? user.user.lastName : user.teacher.lastName;
  const userF = user.firstName
  const userL = user.lastName
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

  console.log(practices)
  // Set user ID when component mounts
  // useEffect(() => {
  //   const userid = theUser.user ? theUser.user._id : theUser.teacher._id;
  //   setUserId(userid);
  // }, []);
  // useEffect(() => {
  //   const userid = user.user ? user.user._id : user.teacher._id;
  //   setUserId(userid);
  // }, [user]);
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
  // useEffect(() => {
  //   const filterByTeacher = autoReplies.filter(
  //     (teacher) => teacher.teacherId === userId
  //   );

  //   setOnlyForTeacher(filterByTeacher);
  // }, [autoReplies]);

  // Fetch practices data when user ID or doneAddingComment changes
  // useEffect(() => {
  //   const fetchPractices = async () => {
  //     const res = await axios.get(
  //       process.env.REACT_APP_BACKEND_URL +
  //         `/mypractices/${theUser.teacher._id}`
  //     );
  //     // const filterData = res.data.filter(
  //     //   (practice) => practice.teacherId === userId
  //     // );
  //     setTeacherPractices(res.data);
  //   };
  //   fetchPractices();
  // }, [doneAddingComment]);

  // Fetch practices data when component mounts
  useEffect(() => {
    const fetchReplies = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/mypractices/${userId}`
      );
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
  
   
    socket.emit("sendNotificationComment", {
      senderName: userF,
      senderFamily: userL,
      senderId: userId,
      receiverId: practice.ownerId,
      videoName: practice.video,
      videoId: practice.uniqueLink,
      courseid: practice.courseId,
    });
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

  const getGeneralButtons = (practice) => {
    const generalBU = autoReplies?.filter(
      (filteredPractices) =>
        filteredPractices.uniqueLink === "general"
    );
    setOpenButtons(true);
    setGeneralButtons(generalBU);
  };
  // Add teacher video reply to practice
  const buttonDetails = (buttonD, practice) => {
    if (practice.videoReply.length > 3) return console.log("no more");
    socket.emit("sendNotificationComment", {
      senderName: practice.teacherFirstName,
      senderFamily: practice.teacherLastName,
      senderId: practice.teacherId,
      receiverId: practice.ownerId,
      videoName: practice.video,
      videoId: practice.uniqueLink,
      courseid: practice.courseId,
    });
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

  const deleteButton = async(buttonD)=>{
    
    await axios.delete(process.env.REACT_APP_BACKEND_URL + `/replies/${buttonD._id}`)
    const removeBtn = showButtons.filter((b)=>b._id !== buttonD._id)
      setShowButtons(removeBtn)
    
  }
  const deleteButtonG = async(buttonD)=>{
    
    await axios.delete(process.env.REACT_APP_BACKEND_URL + `/replies/${buttonD._id}`)
    const removeBtnG = generalButtons.filter((b)=>b._id !== buttonD._id)
      setShowButtons(removeBtnG)
    
  }
  // Add teacher video reply to practice
  const addTeacherVideoReply = (practice) => {
    if (practice.videoReply.length > 3) return console.log("no more");
    
    socket.emit("sendNotificationComment", {
      senderName: practice.teacherFirstName,
      senderFamily: practice.teacherLastName,
      senderId: practice.teacherId,
      receiverId: practice.ownerId,
      videoName: practice.video,
      videoId: practice.uniqueLink,
      courseid: practice.courseId,
    });
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
  // Render video replies
  const renderVideoReplies = (replies, practice) => {
    return replies.map((reply, i) => {
      return (
        <div key={i} style={{ position: "relative" }}>
          <div className="videoContainer">
            <video
              controls
              preload="metadata"
              poster={poster}
              className="videos4Practices"
            >
              <source src={reply.theVideoReply.replace('http://', 'https://')} type="video/mp4" />
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
  const showRec =(practice)=>{
    return practice.RecordReply?.map((rec)=>{
      return <div key={practice.replyId} style={{display: 'flex', justifyContent:'center', alignItems:'center',marginTop: ".5rem", padding:"3px", border: "1px solid black", borderRadius:"20px"}}>
      <div style={{margin:"10px", cursor:"pointer"}} onClick={() => handleDeleteRecording(rec,practice, reply)}> <FontAwesomeIcon icon={faTrashCan} /></div>
        <audio 
        style={{width:'100%'}}
      controls
      poster={poster}
    >
      <source src={rec.RecordingReply.replace('http://', 'https://')} type="audio/mp4" />
    </audio>
      </div>
    })
  }
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
  const handleDeleteRecording = async (rec, practice,reply) => {
    const replyId = rec.replyId
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
  const openLesson = (practice)=>{
    window.localStorage.setItem("lessonReview", practice.uniqueLink);
    navigate('/lessonReview');
  }

  console.log(teacherPractices)
  // Render showData component
  const showData = () => {
    return practices?.map((practice, i) => {
      return (
        
        <div
          style={{ 
            height:"fit-content",
            borderBottom: "1px solid #e1e1e1", padding: "10px",
          backgroundColor: i%2===0 ? "#c7c5c5":"white"
        }}
          key={practice._id}
          onClick={() => {getPracticeUnique(practice);
            getGeneralButtons(practice)}}
        >
         <div onClick={()=> console.log(practice)}> 
            {/* الطالب: */}
            {practice.studentFirstName} {practice.studentLastName}
          </div>
          <div>
            {" "}
           
            {practice.courseName} <br/>
            {practice.courseLevel}
          </div>
          <Link to={`/NewLesson/course?name=${practice.uniqueLink}&playlist=${practice.courseId
}`} style={{textDecoration:"none"}}>
          <div style={{  marginBottom:"10px"}}>
         
            {practice.video}
          </div>
          </Link>
          <div style={{
               marginBottom:"10px" 
              }}>
            <div className="videoAndReplies">
              <div className="StudentVideo" style={{
                height:"100%",
                display: "flex",
                // flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:"#fee4b9",
                marginBottom:"10px"}}>
                <video
                 key={practice.myPractice}
                 controls
                 preload="metadata"
                 poster={poster}
                 height="250px"
                 style={{
                   width: "90%",
                   height: "90%",
                   minHeight: "230px",
                   maxHeight: "230px",
                   border: "1px solid #e1e1e1",
                   marginTop:"10px",
                   marginBottom:"10px"
                 }}
                
                >
                  <source src={practice.myPractice.replace('http://', 'https://')} type="video/mp4" />
                </video>
              </div>
              <div
               className="replyForVideo"
               >
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
                       
                        <div style={{display:"flex", width:"fit-content", marginBottom:"10px", flexWrap:"wrap", maxWidth:"98%"}}>
                          {showButtons.map((buttonD, i) => {
                            return (
                              <div
                                key={i}
                                style={{
                                  width:"fit-content",
                                  display:"flex",
                                  justifyContent:"center",
                                  alignItems:"center",
                                  marginLeft: "20px",
                                  marginBottom:"10px"
                                  , cursor:"pointer"
                                }}
                              >
                                {" "}
                              <div onClick={() => buttonDetails(buttonD, practice)}
                                style={{
                                  borderBottomRightRadius:"5px",
                                  borderTopRightRadius:"5px",
                                  backgroundColor: "#373f4c",
                                  color: "white",
                                  minWidth: "80px",
                                  width:"fit-content"}}>{buttonD.nameOfProblem}</div>  
                              <div onClick={() => deleteButton(buttonD, practice)} style={{backgroundColor:"#fee4b9", width:"20px", textAlign:"center", borderBottomLeftRadius:"5px",
                                  borderTopLeftRadius:"5px", cursor:"pointer"}}>x</div>
                              </div>
                            );
                          })}
                        </div>
                       
                        </>
                      ) : null}
                    
                        <div style={{display:"flex", width:"fit-content", marginBottom:"10px", flexWrap:"wrap", maxWidth:"98%"}}>
                          {generalButtons.map((buttonD, i) => {
                            return (
                              <div
                                key={i}
                                style={{
                                  width:"fit-content",
                                  display:"flex",
                                  justifyContent:"center",
                                  alignItems:"center",
                                  marginLeft: "20px",
                                  marginBottom:"10px"
                                  , cursor:"pointer"
                                }}
                              >
                                {" "}
                              <div onClick={() => buttonDetails(buttonD, practice)}
                                style={{
                                  borderBottomRightRadius:"5px",
                                  borderTopRightRadius:"5px",
                                  backgroundColor: "#fee4b9",
                                  color: "black",
                                  minWidth: "80px",
                                  width:"fit-content"}}>{buttonD.nameOfProblem}</div>  
                              <div onClick={() => deleteButtonG(buttonD, practice)} style={{backgroundColor:"#373f4c", width:"20px", textAlign:"center", borderBottomLeftRadius:"5px",
                                  borderTopLeftRadius:"5px", color:"white" , cursor:"pointer"}}>x</div>
                              </div>
                            );
                          })}
                        </div>
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
              <div style={{}}>
                <div>
                  
                  <div>تعليق عن طريق فيديو</div>
                      
                  
                </div>
                
                <div className="allvideoreply" style={{
                        display: "flex",
                        flexDirection:"column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}>
                        <div style={{display: "flex", justifyContent:"center",alignItems:"center"}}>
                        <input
                        style={{height: "100%"}}
                    type="text"
                    placeholder="عنوان الرد"
                    onChange={(e) => setNameOfProblem(e.target.value)}
                    required
                  />
                       
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
                    />
                  </label>
                 
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
                </div>
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
                <AudioRecord unique_id={unique_id} userId={userId} userF={userF} userL={userL} socket={socket} setTeacherPractices={setTeacherPractices} setRecordUrl={setRecordUrl} practice={practice}/>
              </div>
              <div style={{
                        display: "flex",
                        flexDirection:"column",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid black"
                      }}>
            <div> تعليق المعلم:</div>
            <CommentOnVideo practice={practice} socket={socket}/>
           
            </div>
            </div>
           
          </div>
        
      );
    });
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <div>
      </div>
      <div>{showData()}</div>
    </div>
  );
}
