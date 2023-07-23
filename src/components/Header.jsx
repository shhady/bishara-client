import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import TeachersPop from "./TeachersPop";
import CoursesPop from "./CoursesPop";
import NotificationsPop from "./NotificationsPop";
import axios from "axios";
import MessengerIcon from "./Messenger/messengerIcon/MessengerIcon";

// import { io } from "socket.io-client";
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
export default function Header({
  user,
  setUser,
  socket,
  // setShowArrows,
  setUpdateComponent,
  updateComponent,
  setCourseDetails,
  setLessonDetails,
  setListId,
  chatNotification,
  setChatNotification,
}) {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  // const [socket, setSocket] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState([]);
  const [notificationNotification, setNotificationNotification] = useState([]);
  // const [openNotifications, setOpenNotifications] = useState(false);
  const [openNotificationsMessage, setOpenNotificationsMessage] =
    useState(false);
  const [backNot, setBackNot] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userPractices, setUserPractices] = useState([]);
  const [userPracticesNotSeen, setUserPracticesNotSeen] = useState([]);
  const [notificationNumber, setNotificationNumber] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState(null);

  const [teachersHover, setTeachersHover] = useState(false);
  const [replies, setReplies] = useState([]);
  const [coursesHover, setCoursesHover] = useState(false);
  const [comments, setComments] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [redLightNotification, setRedLightNotification] = useState(false);
  const [redLightNotificationReply, setRedLightNotificationReply] =
    useState(false);
  const [allConversations, setAllConversations] = useState([]);
  const [showNotificationPopUp, setShowNotificationPopUp] = useState(false);
  const [teacherPracticesNotifications, setTeacherPracticesNotifications] =
    useState([]);
  const [teacherPracticesUnReplied, setTeacherPracticesUnreplied] = useState(
    []
  );
  useEffect(() => {
    setNotificationNumber(backNot.filter((number) => number.read === false));
  }, [backNot]);

  useEffect(() => {
    if (!user) return;
    setUserId(user._id)
    // user.teacher ? setUserId(user?.teacher?._id) : setUserId(user?.user?._id);
  }, []);
  // const location = useLocation();
  useEffect(() => {
    const comments = async () => {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/comments/`
      );
      setBackNot(
        result.data.filter((comment) => comment.courseOwnerId === userId)
      );
    };
    comments();
  }, [userId]);
  useEffect(() => {
    if (!user) return;
    // if (user?.teacher) return;
    const fetch = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL +
          `/studentpractices/${user._id}`
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

 

  useEffect(() => {
    const comments = async () => {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/comments/`
      );
      setBackNot(result.data);
    };
    comments();
  }, []);
  // useEffect(() => {
  //   setSocket(io("http://localhost:8900"));
  //   console.log(socket);
  // }, []);

  useEffect(() => {
    socket?.on("getNotificationComment", (data) => {
      console.log('listening for getNotificationComment event...');
      
      setRedLightNotification(data);
      // setRedLightNotificationReply(true);
    });
  }, [socket]);

  useEffect(() => {
    if (chatNotification) return;
   
    socket?.on("getMessage", (data) => {
      
      notificationMessage.includes(data.senderId);
      // setNotifyMessage((prev) => [...prev, data]);
      setNotifyMessage(true);
      setChatNotification("got a new message");
      
    });
  }, [socket]);

  useEffect(() => {
    const unreadMessage = async () => {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/conversations/${userId}`
      );
      setAllConversations(response.data);
     
    };
    unreadMessage();
  }, [userId]);

  useEffect(() => {
    const conversationsToNotify = allConversations.find((conversation) => {
      return (
        conversation.seen === "false" && conversation.lastSender !== userId
      );
    });
    
    setNotifyMessage(conversationsToNotify);
  }, [allConversations]);

  const handleLogoutTeacher = async () => {
    const response = await axios.post(
      process.env.REACT_APP_BACKEND_URL + `/teachers/logout`,
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      }
    );

    // if (response.status === 200) {
    //   // REMOVE TOKEN
    //   console.log(response);
    //   window.localStorage.removeItem("token");
    // }
    
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("profile");
    setUser(null);
    // await axios.post(process.env.REACT_APP_BACKEND_URL+"/teachers/logoutAll");
    dispatch({ type: "LOGOUT" });
    navigate("/");
    
    setNotificationNotification([]);
    setNotificationMessage([]);
    setOpenMenu(false);
    // setOpenNotifications(false);
    setIsHovering(false);
  };

  const handleLogoutStudent = async () => {
    const response = await axios.post(
      process.env.REACT_APP_BACKEND_URL + `/users/logout`,
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      }
    );

    // if (response.status === 200) {
    //   // REMOVE TOKEN
    //   window.localStorage.removeItem("token");
    // }
    setUser(null);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("profile");
    // await axios.post(process.env.REACT_APP_BACKEND_URL+"/teachers/logoutAll");
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setOpenMenu(false);
    setNotificationNotification([]);
    setNotificationMessage([]);
    setIsHovering(false);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/comments`
      );
      setComments(res.data);
    };
    fetch();
  }, [user]);

  useEffect(() => {
    const filterReplies = comments.filter(
      (comment) => comment.userid === userId
    );
    setReplies(filterReplies);
  }, [comments]);

  useEffect(() => {
    const filterReplies = replies?.some((reply) => reply.replyRead === "false");
    setRedLightNotificationReply(filterReplies);
  }, [replies, user]);

  useEffect(() => {
    const filterComment = () => {
      const specificComments = comments?.filter(
        (comment) => comment.courseOwnerId === userId
      );
      const redlight = specificComments.find(
        (comment) => comment.read === false
      );
      setRedLightNotification(redlight);
      setUserComments(specificComments);
      
    };
    filterComment();
  }, [comments, user]);


  const uniques = notificationMessage
    .map((obj) => {
      return obj.userName;
    })
    .filter((item, index, arr) => {
      return arr.indexOf(item) === index;
    });

  const drawNotificationsMessages = () => {
    return uniques.map((notification, i) => {
      return (
        <div key={i} style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{ border: "1px solid gray", padding: "5px" }}
            onClick={() => {
              navigate("/messenger");
              setOpenNotificationsMessage(!openNotificationsMessage);
            }}
          >
            {notification} ارسل رسالة
          </div>
        </div>
      );
    });
  };

  
  const handleMouseOver = () => {
    setIsHovering(!isHovering);
  };

  const getUserDetailsAgain = async()=>{
   const res= await axios.get(process.env.REACT_APP_BACKEND_URL + `/users/me`, 
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      }
    })
    window.localStorage.setItem("paid",res.data.paid)
  }

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
  }, [userId, user]);


  useEffect(() => {
    const filteredPractices = teacherPracticesNotifications.filter(
      (practice) => {
        return practice.videoReply.length === 0 && !practice.reply && practice.RecordReply.length === 0;
      }
    );
    setTeacherPracticesUnreplied(filteredPractices);
  }, [teacherPracticesNotifications]);
  return (
    <div
      style={{ width: "100%", margin: "auto" }}
      // onMouseOver={window.localStorage.removeItem("title")}
    >
      <div className="header">
        {isHovering && user ? (
          <div className="backgroundHover" onClick={() => setIsHovering(false)}>
            <div
              className="sideMenu"
              style={{
                zIndex: "5",
                // top: 85,
                position: "fixed",
                backgroundColor: "white",
                right: 30,
                width: "200px",
                boxShadow:
                  "rgb(0 0 0 / 6%) 0px 4px 8px, rgb(35 41 54 / 14%) 0px 12px 32px",
                textAlign: "center",
                height: "fit-content",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                gap:"15px"
              }}
              onMouseLeave={() => setIsHovering(false)}
            >
              {user ? (
                <div
                  style={{
                    borderBottom: "1px solid #e1e1e1",
                    width: "80%",
                    margin: " 20px auto",
                    paddingBottom: "15px",
                    paddingTop: "15px",
                  }}
                >
                  {/* {user.teacher ? (
                    <Link to="/profile"  style={{textDecoration:"none", color:"black"}}>
                    <div>
                      {user.teacher.firstName}
                      {"  "}
                      {user.teacher.lastName}
                      
                    </div>
                    </Link>
                  ) : ( */}
                    <Link to="/profile" style={{textDecoration:"none", color:"black"}}>
                    <div>
                      {user.firstName}
                      {"  "}
                      {user.lastName}
                    </div>
                    </Link>
                  {/* )} */}
                </div>
              ) : null}
              <div
                style={{ width: "80%", margin: "auto", color: "black" }}
                onClick={() => setIsHovering(false)}
              >
                {" "}
                <Link
                  to="/profile"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  الملف الشخصي
                </Link>
              </div>
              {user?.role === "admin" ? (
                <Link
                  to="/CreateTeacher"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div
                    style={{
                      width: "80%",
                      margin: "auto",
                      // marginTop: "20px",
                      color: "black",
                    }}
                  >
                    تسجيل معلمين
                  </div>
                </Link>
              ) : null}
            {user.role === "admin" || user.role === "teacher" ? (<Link
                  to="/NewReview"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div
                    style={{
                      width: "80%",
                      margin: "auto",
                      // marginTop: "20px",
                      color: "black",
                    }}
                  >
                     تمارين الطلاب
                  </div>
                </Link>):(null)}   
              <div
                style={{ width: "80%", margin: "auto" }}
                onClick={() => setIsHovering(false)}
              >
                <Link
                  to="/Notifications"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  الاشعارات
                </Link>
              </div>
              <div
                style={{
                  width: "80%",
                  margin: "auto",
                  // marginBottom: "20px",
                  color: "black",
                }}
                onClick={() => setIsHovering(false)}
              >
                {" "}
                <Link
                  to={`/newmessenger/${userId}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  الرسائل المباشره
                </Link>
              </div>
              <div
                style={{ width: "80%", margin: "auto" }}
                onClick={() => setIsHovering(false)}
              >
                <Link to="/QA" style={{ textDecoration: "none", color: "black" }}>
                  الاسئلة المتكررة
                </Link>
              </div>
              <div
                style={{
                  width: "80%",
                  margin: "20px auto",
                  borderTop: "1px solid #e1e1e1",
                  paddingBottom: "15px",
                  paddingTop: "15px",
                }}
                onClick={() => setIsHovering(false)}
              >
                {user ? (
                  <>
                    {user.role === 'teacher' || user.role === "admin" ? (
                      <div
                        onClick={handleLogoutTeacher}
                        style={{ cursor: "pointer" }}
                      >
                        خروج
                      </div>
                    ) : (
                      <div
                        onClick={handleLogoutStudent}
                        style={{ cursor: "pointer" }}
                      >
                        خروج
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        <div
          className="middle"
          // style={{ marginLeft: "20px", marginRight: "20px" }}
        >
          <div
            className="menuMobile"
            // onClick={() => {
            //   setShowArrows(true);
            // }}
          >
            <div onClick={() => setOpenMenu(!openMenu)}  style={{height:"60px", display:"flex", justifyContent:"center", alignItems:"center"}}>
              {!openMenu ? (
                <>
                  <img
                    src="https://img.icons8.com/external-tal-revivo-filled-tal-revivo/24/null/external-mobile-application-hamburger-menu-setting-interface-basic-filled-tal-revivo.png"
                    alt="menu"
                    width="25px"
                  />
                </>
              ) : null}{" "}
            </div>
            
              {user ? (
                <>
                  <Link to="/Notifications" style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        // display: "flex",
                        // justifyContent: "flex-end",
                        height:"60px", display:"flex", justifyContent:"center", alignItems:"center",
                        padding: "0px 20px",
                        color: "black",
                        // border: "1px solid transparent",
                        cursor: "pointer",
                        position: "relative",
                      }}
                      onClick={() => {
                        setRedLightNotification(false);
                        setRedLightNotificationReply(false);
                        setTeacherPracticesUnreplied([]);
                        setUserPracticesNotSeen([]);
                      }}
                    >
                      <img
                        src="https://img.icons8.com/material-sharp/24/null/bell.png"
                        alt="noti"
                        width="20px"
                      />
                      {/* <FontAwesomeIcon icon={faBell} /> */}
                      {redLightNotification ||
                      redLightNotificationReply ||
                      teacherPracticesUnReplied.length !== 0 ||
                      userPracticesNotSeen.length !== 0 ? (
                        <div
                          // onClick={setRedLightNotification(false)}
                          className="notificationNotification"
                          // style={{ position: "absolute" }}
                        ></div>
                      ) : null}
                    </div>
                  </Link>
                </>
              ) : null}
            
            
              {user ? (
                 <div  style={{height:"60px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                 <MessengerIcon socket={socket}/>
                 </div>
                // <div
                //   style={{
                //     // padding: "2px",
                //     // border: "1px solid white",
                //     cursor: "pointer",
                //     position: "relative",
                //   }}
                //   onMouseOver={() => setIsHovering(false)}
                //   onClick={() => {
                //     // if (uniques.length === 0) {
                //     navigate(`/newmessenger/${userId}`);
                //     setNotifyMessage(null);
                //     // } else {
                //     //   setOpenNotificationsMessage(!openNotificationsMessage);
                //     // }
                //   }}
                // >
                //   {/* <FontAwesomeIcon icon={faMessage} /> */}
                //   <img
                //     src="https://img.icons8.com/fluency-systems-filled/48/null/filled-chat.png"
                //     alt="message"
                //     width="20px"
                //   />
                //   {notifyMessage && chatNotification ? (
                //     <div className="notificationMessage"></div>
                //   ) : null}
                // </div>
              ) : null}
           
          </div>

          <div className="dontShowOnMobile">
            {user ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseOver={() => setTeachersHover(false)}
              >
                {user ? (
                  <div style={{ paddingRight: "20px" }}>
                    {user.role === 'teacher' || user.role === 'admin' ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onMouseOver={() => setIsHovering(!isHovering)}
                      >
                        <img
                          src={user.avatar ? user.avatar.replace('http://', 'https://'): "https://img.icons8.com/material-rounded/24/null/user.png"}
                          alt={user.firstName}
                          style={{
                            height: "40px",
                            width: "40px",
                            borderRadius: "50%",
                            // marginLeft: "20px",
                            // marginRight: "20px",
                          }}
                        />
                      </div>
                    ) : (
                      // <Link to="/profile" style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          marginRight: "20px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onMouseOver={() => setIsHovering(!isHovering)}
                      >
                        <img
                          src={user.avatar ? user.avatar.replace('http://', 'https://'): "https://img.icons8.com/material-rounded/24/null/user.png"}
                          alt="user"
                          style={{
                            height: "25px",
                            width: "25px",
                            borderRadius: "50%",
                            // marginLeft: "20px",
                            // marginRight: "20px",
                          }}
                        />
                        {/* <FontAwesomeIcon icon={faUser} size="1.5em" /> */}
                      </div>
                     
                    )}
                  </div>
                ) : (
                  <div

              
                  ></div>
                )}
                {user ? (
                  <>
                    
                    <div
                      style={{
                        color: "black",
                        padding: "0px 35px",
                        height: "80px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        position: "relative",
                      }}
                      onClick={() => {
                        setRedLightNotification(false);
                        setRedLightNotificationReply(false);
                        setShowNotificationPopUp(!showNotificationPopUp);
                        setTeacherPracticesUnreplied([]);
                        setUserPracticesNotSeen([]);
                      }}
                      onMouseOver={() => setIsHovering(false)}
                    >
                      <img
                        src="https://img.icons8.com/material-sharp/24/null/bell.png"
                        alt="noti"
                        width="20px"
                      />
                      
                      {redLightNotification ||
                      redLightNotificationReply ||
                      teacherPracticesUnReplied.length !== 0 ||
                      userPracticesNotSeen.length !== 0 ? (
                        <div
                          
                          className="notificationNotification"
                          
                        ></div>
                      ) : null}
                    </div>
                   
                  </>
                ) : null}
                {user ? (
                 <div style={{
                 display: "flex",
                 justifyContent: "center",
                 alignItems: "center",
                 cursor: "pointer"}}>
                  <MessengerIcon socket={socket}/>
                  </div>
                ) : null}
              </div>
            ) : (
             
              <Link to="/auth" style={{ textDecoration: "none" }}>
                <div
                  style={{
                  
                    color: "black",
                  }}
                  
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "black",
                      fontWeight: "bold",
                      minWidth: "163px",
                    }}
                  >
                    تسجيل الدخول
                  </div>
                </div>
              </Link>
            )}
          </div>
          {showNotificationPopUp ? (
            <div
              className="notificationOut"
              onClick={() => setShowNotificationPopUp(false)}
            >
              <div
                className="NotificationPopUp"
                onMouseLeave={() => setShowNotificationPopUp(false)}
              >
                <NotificationsPop
                user={user}
                  setShowNotificationPopUp={setShowNotificationPopUp}
                  setCourseDetails={setCourseDetails}
                  setLessonDetails={setLessonDetails}
                  setListId={setListId}
                  setRedLightNotification={setRedLightNotification}
                />
              </div>
            </div>
          ) : null}
          {teachersHover ? (
            <div
              className="teachersOut"
              onClick={() => setTeachersHover(false)}
            >
              <div
                style={{
                  zIndex: "5",
                  top: 85,
                  position: "fixed",
                  backgroundColor: "white",
                  // margin: "auto",
                  left: "25%",
                  width: "50%",
                  boxShadow:
                    "rgb(0 0 0 / 6%) 0px 4px 8px, rgb(35 41 54 / 14%) 0px 12px 32px",
                }}
                onMouseLeave={() => setTeachersHover(false)}
              >
                <TeachersPop
                  setTeachersHover={setTeachersHover}
                  setUpdateComponent={setUpdateComponent}
                />
              </div>
            </div>
          ) : null}
          {coursesHover ? (
            <div
              style={{
                zIndex: "5",
                top: 85,
                position: "fixed",
                backgroundColor: "white",
                // margin: "auto",
                left: "25%",
                width: "50%",
                boxShadow:
                  "rgb(0 0 0 / 6%) 0px 4px 8px, rgb(35 41 54 / 14%) 0px 12px 32px",
              }}
              onMouseLeave={() => setCoursesHover(false)}
            >
              <CoursesPop
                setCoursesHover={setCoursesHover}
                updateComponent={updateComponent}
                setUpdateComponent={setUpdateComponent}
              />
            </div>
          ) : null}
          <div className="menu-details-computer">
            <div
              onMouseOver={() => setTeachersHover(false)}
              style={{
                height: "80px",
                width: "5%",
                color: "transparent",
              }}
            >
              11
            </div>
            <Link to="/teachers" style={{ textDecoration: "none" }}>
              <div
                className="headeroud"
                onClick={() => setTeachersHover(false)}
              >
                <div style={{ display: "flex" }}>
                  <div
                    className="logoAndText"
                    onMouseOver={() => {
                      setTeachersHover(true);
                      setCoursesHover(false);
                     
                    }}
                  >
                  
                    <img
                      src="https://img.icons8.com/ios/50/null/user-group-man-man.png"
                      width="25px"
                    />
                    <div style={{ fontWeight: "700" }}>مدرسين</div>
                  </div>
                </div>
              </div>
            </Link>
            {user ? (
              
              <div
                className="headeroud"
                onMouseOver={() => {
                  setTeachersHover(false);
                  setCoursesHover(true);
                  // setUpdateComponent("");
                }}
                onClick={() => {
                  navigate("/courses");
                  // window.location.reload();
                }}
              >
                <div className="logoAndText">
                  {/* <FontAwesomeIcon icon={faMusic} /> */}
                  <img
                    src="https://img.icons8.com/ios/50/null/youtube-music.png"
                    alt="courses"
                    width="25px"
                  />
                  <div style={{ fontWeight: "700" }}>دورات</div>
                </div>
              </div>
            ) : (
              //</Link>
              <Link to="/auth" style={{ textDecoration: "none" }}>
                <div className="headeroud">
                  <div className="logoAndText">
                    <img
                      src="https://img.icons8.com/ios/50/null/youtube-music.png"
                      alt="courses"
                      width="25px"
                    />
                    <div style={{ fontWeight: "700" }}>دورات</div>
                  </div>
                </div>
              </Link>
            )}

            <Link to="/subscription" style={{ textDecoration: "none", color:"black" }}>
              <div
                className="headerpiano"
                onMouseOver={() => {
                  // setTeachersHover(true);
                  setCoursesHover(false);
                }}
                onClick={getUserDetailsAgain}
              >
                <div className="logoAndText">
                  {/* <FontAwesomeIcon icon={faUsersRays} /> */}
                  <img
                    src="https://img.icons8.com/ios/50/null/project.png"
                    alt="subscribe"
                    width="25px"
                  />
                  <div style={{ fontWeight: "700" }}>اشتراك </div>
                </div>
              </div>
            </Link>
            <div
              onMouseOver={() => setTeachersHover(false)}
              style={{
                height: "80px",
                width: "5%",
                color: "transparent",
              }}
            >
              11
            </div>
            {/* <div onMouseOver={() => setTeachersHover(false)}></div> */}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <div
                style={{
                  fontSize: "28px",
                  color: "black",
                  padding: "0px 20px",
                  fontFamily: "Noto Sans Arabic,sans-serif",
                }}
                onClick={() => setUpdateComponent("")}
              >
                <b>FUN</b>AN
              </div>{" "}
            </Link>
          </div>
        </div>

        {openMenu && (
          <div className="menu-details">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "90%",
              }}
            >
              <h3
                style={{ color: "white", cursor: "pointer" }}
                onClick={() => {
                  setOpenMenu(!openMenu);
                  // setShowArrows(false);
                  setUpdateComponent("");
                }}
              >
                X
              </h3>
              <span style={{ fontSize: "30px", color: "white" }}>
                <b>FUN</b>AN
              </span>
              <span style={{ color: "black" }}>X</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                height: "70%",
                // alignItems: "center",
                // textAlign: "center",
                width: "100%",
                marginRight: "10px",
              }}
            >
              {user ? null : (
                <Link to="/auth" style={{ textDecoration: "none" }}>
                  <div onClick={() => setOpenMenu(!openMenu)}>
                    <span
                      className="blackBackgroundtext"
                      style={{
                        color: "white",
                      }}
                    >
                      {" "}
                      تسجيل الدخول
                    </span>
                  </div>
                </Link>
              )}
              <Link to="/" style={{ textDecoration: "none" }}>
                <div
                  onClick={() => {
                    setOpenMenu(!openMenu);
                    // setShowArrows(false);
                    setUpdateComponent("");
                  }}
                >
                  <span
                    className="blackBackgroundtext"
                    style={{ color: "white" }}
                  >
                    الرئيسية
                  </span>
                </div>
              </Link>
              <Link to="/courses" style={{ textDecoration: "none" }}>
                <div
                  onClick={() => {
                    setOpenMenu(!openMenu);
                    setUpdateComponent("");
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span
                    className="blackBackgroundtext"
                    style={{
                      color: "white",
                      width: "40%",
                    }}
                  >
                    الدورات الموسيقية
                  </span>
                </div>
              </Link>
              <Link to="/teachers" style={{ textDecoration: "none" }}>
                <div
                  onClick={() => {
                    setOpenMenu(!openMenu);
                    setUpdateComponent("");
                  }}
                >
                  <span
                    className="blackBackgroundtext"
                    style={{ color: "white" }}
                  >
                    المدرسين
                  </span>
                </div>
              </Link>
              <div
                style={{
                  borderBottom: "1px solid #e1e1e1",
                  width: "30%",
                }}
              >
                {/* <hr /> */}
              </div>
              {user ? (
                <>
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    <div
                      onClick={() => {
                        setOpenMenu(!openMenu);
                        setUpdateComponent("");
                      }}
                    >
                      <span
                        className="blackBackgroundtext"
                        style={{ color: "white" }}
                      >
                        {" "}
                        الملف الشخصي
                      </span>
                    </div>
                  </Link>
                  {user.role === "admin" || user.role === "teacher" ? (<Link to="/newReview" style={{ textDecoration: "none" }}>
                    <div
                      onClick={() => {
                        setOpenMenu(!openMenu);
                        setUpdateComponent("");
                      }}
                    >
                      <span
                        className="blackBackgroundtext"
                        style={{ color: "white" }}
                      >
                        {" "}
                        تمارين الطلاب 
                      </span>
                    </div>
                  </Link>):(null)}
                  
                  <Link to="/Notifications" style={{ textDecoration: "none" }}>
                    <div
                      onClick={() => {
                        setOpenMenu(!openMenu);
                        setUpdateComponent("");
                      }}
                    >
                      <span
                        className="blackBackgroundtext"
                        style={{ color: "white" }}
                      >
                        الاشعارات
                      </span>
                    </div>
                  </Link>
                  <Link to={`/newmessenger/${userId}`} style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        color: "white",
                      }}
                      onClick={() => {
                        setOpenMenu(!openMenu);
                        setUpdateComponent("");
                      }}
                    >
                      <span className="blackBackgroundtext">
                        {" "}
                        الرسائل المباشره
                      </span>
                    </div>
                  </Link>
                  <Link to="" style={{ textDecoration: "none" }}>
                    <div
                      onClick={() => {
                        setOpenMenu(!openMenu);
                        setUpdateComponent("");
                        getUserDetailsAgain()
                      }}
                    >
                      <span
                        className="blackBackgroundtext"
                        style={{ color: "white" }}
                      >
                        الاشتراك{" "}
                      </span>
                    </div>
                  </Link>
                  <div
                    style={{
                      borderBottom: "1px solid #e1e1e1",
                      width: "30%",
                    }}
                  >
                    {/* <hr /> */}
                  </div>
                </>
              ) : null}

              <div>
                {user ? (
                  <div onClick={() => setUpdateComponent("")}>
                    {user.role === 'teacher' || user.role === 'admin' ? (
                      <div onClick={handleLogoutTeacher}>
                        <div className="blackBackgroundtext" style={{ cursor: "pointer", color:"white" }}>خروج</div>
                      </div>
                    ) : (
                      <div onClick={handleLogoutStudent}>
                        <div className="blackBackgroundtext" style={{ cursor: "pointer", color:"white" }}>خروج</div>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
