import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import TeachersPop from "./TeachersPop";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faBars,
  faMessage,
  faBell,
  faChalkboardUser,
  faMusic,
  faUsersRays,
} from "@fortawesome/free-solid-svg-icons";

// import { io } from "socket.io-client";
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
export default function Header({ user, setUser, socket, setShowArrows }) {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const [openMenu, setOpenMenu] = useState(false);
  // const [socket, setSocket] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState([]);
  const [notificationNotification, setNotificationNotification] = useState([]);
  // const [openNotifications, setOpenNotifications] = useState(false);
  const [openNotificationsMessage, setOpenNotificationsMessage] =
    useState(false);
  const [backNot, setBackNot] = useState([]);
  const [userId, setUserId] = useState(null);
  const [notificationNumber, setNotificationNumber] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [teachersHover, setTeachersHover] = useState(false);
  const [comments, setComments] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [redLightNotification, setRedLightNotification] = useState(false);
  useEffect(() => {
    setNotificationNumber(backNot.filter((number) => number.read === false));
  }, [backNot]);

  useEffect(() => {
    if (!user) return;
    user.teacher ? setUserId(user.teacher._id) : setUserId(user.user._id);
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

  const clickOnBill = () => {
    // setOpenNotifications(!openNotifications);
    // setNotificationNotification([]);
    // console.log("bill clicked");
  };

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
      setNotificationNotification([...notificationNotification, data]);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on("getMessage", (data) => {
      notificationMessage.includes(data.senderId);
      setNotificationMessage((prev) => [...prev, data]);
    });
  }, [socket]);

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

    if (response.status === 200) {
      // REMOVE TOKEN
      window.localStorage.removeItem("token");
    }

    // localStorage.removeItem("profile");
    // await axios.post(process.env.REACT_APP_BACKEND_URL+"/teachers/logoutAll");
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
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

    if (response.status === 200) {
      // REMOVE TOKEN
      window.localStorage.removeItem("token");
    }

    // localStorage.removeItem("profile");
    // await axios.post(process.env.REACT_APP_BACKEND_URL+"/teachers/logoutAll");
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
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
    const filterComment = () => {
      const specificComments = comments?.filter(
        (comment) => comment.courseOwnerId === userId
      );
      const redlight = specificComments.find(
        (comment) => comment.read === false
      );
      setRedLightNotification(redlight);
      setUserComments(specificComments);
      console.log(specificComments);
    };
    filterComment();
  }, [comments, user]);
  console.log(userComments);

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
              history.push("/messenger");
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

  return (
    <div style={{ width: "100%", margin: "auto" }}>
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
                left: 1,
                width: "150px",
                boxShadow:
                  "rgb(0 0 0 / 6%) 0px 4px 8px, rgb(35 41 54 / 14%) 0px 12px 32px",
                textAlign: "center",
                height: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                textAlign: "center",
              }}
              onMouseLeave={() => setIsHovering(false)}
            >
              {user ? (
                <div
                  style={{
                    borderBottom: "1px solid gray",
                    width: "80%",
                    margin: " 20px auto",
                    paddingBottom: "15px",
                    paddingTop: "15px",
                  }}
                >
                  {user.teacher ? (
                    <div>
                      {user.teacher.firstName}
                      {"  "}
                      {user.teacher.lastName}
                    </div>
                  ) : (
                    <div>
                      {user.user.firstName}
                      {"  "}
                      {user.user.lastName}
                    </div>
                  )}
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
              {user?.teacher?.role === "admin" ? (
                <Link
                  to="/CreateTeacher"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div
                    style={{
                      width: "80%",
                      margin: "auto",
                      marginTop: "20px",
                      color: "black",
                    }}
                  >
                    تسجيل معلمين
                  </div>
                </Link>
              ) : null}
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
                  to="/messenger"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  الرسائل المباشره
                </Link>
              </div>
              <div
                style={{ width: "80%", margin: "auto" }}
                onClick={() => setIsHovering(false)}
              >
                <Link to="" style={{ textDecoration: "none", color: "black" }}>
                  الاسئلة المتكررة
                </Link>
              </div>
              <div
                style={{
                  width: "80%",
                  margin: "20px auto",
                  borderTop: "1px solid grey",
                  paddingBottom: "15px",
                  paddingTop: "15px",
                }}
                onClick={() => setIsHovering(false)}
              >
                {user ? (
                  <>
                    {user.teacher ? (
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
            onClick={() => {
              setShowArrows(true);
            }}
          >
            <div onClick={() => setOpenMenu(!openMenu)}>
              {!openMenu ? <FontAwesomeIcon icon={faBars} /> : null}{" "}
            </div>
            <div>
              {user ? (
                <>
                  <Link to="/Notifications" style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        // display: "flex",
                        // justifyContent: "flex-end",
                        padding: "0px 20px",
                        color: "black",
                        // border: "1px solid transparent",
                        cursor: "pointer",
                        position: "relative",
                      }}
                      onClick={() => setRedLightNotification(false)}
                    >
                      <FontAwesomeIcon icon={faBell} />
                      {redLightNotification ? (
                        <div
                          className="notificationNotification"
                          // style={{ position: "absolute" }}
                        ></div>
                      ) : null}
                    </div>
                  </Link>
                </>
              ) : null}
            </div>
            <div>
              {user ? (
                <div
                  style={{
                    padding: "2px",
                    // border: "1px solid white",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onMouseOver={() => setIsHovering(false)}
                  onClick={() => {
                    if (uniques.length === 0) {
                      history.push("/messenger");
                    } else {
                      setOpenNotificationsMessage(!openNotificationsMessage);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faMessage} />
                  {uniques.length > 0 ? (
                    <div className="notificationMessage">{uniques.length}</div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>

          <div className="dontShowOnMobile">
            {user ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {user ? (
                  <div style={{ paddingRight: "20px" }}>
                    {user.teacher ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onMouseOver={() => setIsHovering(!isHovering)}
                      >
                        <img
                          src={localStorage.getItem("profilePic")}
                          alt={user.teacher.firstName}
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
                        style={{ marginLeft: "20px", marginRight: "20px" }}
                        onMouseOver={() => setIsHovering(!isHovering)}
                      >
                        <FontAwesomeIcon icon={faUser} />
                      </div>
                      // </Link>
                    )}
                  </div>
                ) : (
                  <div

                  // style={{
                  //   display: "flex",
                  //   flexDirection: "column",
                  //   justifyContent: "center",
                  //   alignItems: "center",
                  // }}
                  ></div>
                )}
                {user ? (
                  <>
                    <Link
                      to="/Notifications"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        style={{
                          // display: "flex",
                          // justifyContent: "flex-end",
                          // paddingLeft: "20px",
                          color: "black",
                          padding: "0px 20px",
                          // border: "1px solid transparent",
                          cursor: "pointer",
                          position: "relative",
                        }}
                        onClick={() => setRedLightNotification(false)}
                      >
                        <FontAwesomeIcon icon={faBell} />
                        {redLightNotification ? (
                          <div
                            className="notificationNotification"
                            // style={{ position: "absolute" }}
                          ></div>
                        ) : null}
                      </div>
                    </Link>
                  </>
                ) : null}
                {user ? (
                  <div
                    style={{
                      // padding: "2px",

                      // border: "1px solid white",
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onMouseOver={() => setIsHovering(false)}
                    onClick={() => {
                      if (uniques.length === 0) {
                        history.push("/messenger");
                      } else {
                        setOpenNotificationsMessage(!openNotificationsMessage);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faMessage} />
                    {uniques.length > 0 ? (
                      <div className="notificationMessage">
                        {uniques.length}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : (
              // <div style={{ visibility: "hidden" }}>X</div>
              <Link to="/auth" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    //   display: "flex",
                    //   height: "30px",
                    //   padding: "3px",
                    color: "black",
                  }}
                  // className="registerBox"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "20px",
                      color: "black",
                    }}
                  >
                    تسجيل الدخول
                  </div>
                </div>
              </Link>
            )}
          </div>
          {teachersHover ? (
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
              <TeachersPop setTeachersHover={setTeachersHover} />
            </div>
          ) : null}
          <div className="menu-details-computer">
            <div
              onMouseOver={() => setTeachersHover(false)}
              style={{ height: "80px", color: "transparent" }}
            >
              1
            </div>
            <Link to="/teachers" style={{ textDecoration: "none" }}>
              <div
                className="headeroud"
                onMouseOver={() => setTeachersHover(true)}
                onClick={() => setTeachersHover(false)}
              >
                <div>
                  <FontAwesomeIcon
                    icon={faChalkboardUser}
                    className="highlight"
                  />
                </div>
                <div style={{ fontWeight: "80" }}>المدرسين</div>
              </div>
            </Link>
            {user ? (
              <Link to="/courses" style={{ textDecoration: "none" }}>
                <div
                  className="headeroud"
                  onMouseOver={() => setTeachersHover(false)}
                >
                  <div>
                    <FontAwesomeIcon icon={faMusic} />
                  </div>
                  <div>الدورات الموسيقية</div>
                </div>
              </Link>
            ) : (
              <Link to="/auth" style={{ textDecoration: "none" }}>
                <div className="headeroud">
                  <div>
                    <FontAwesomeIcon icon={faMusic} />
                  </div>
                  <div>الدورات الموسيقية</div>
                </div>
              </Link>
            )}

            <Link to="" style={{ textDecoration: "none" }}>
              <div className="headerpiano">
                <div>
                  <FontAwesomeIcon icon={faUsersRays} />
                </div>
                <div>الاشتراك </div>
              </div>
            </Link>
            <div onMouseOver={() => setTeachersHover(false)}></div>
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
                }}
              >
                FUNAN<b>.AI</b>
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
                  setShowArrows(false);
                }}
              >
                X
              </h3>
              <span style={{ fontSize: "30px", color: "white" }}>
                FUNAN<b>.AI</b>
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
                      style={{ color: "white" }}
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
                    setShowArrows(false);
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
                  onClick={() => setOpenMenu(!openMenu)}
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
                <div onClick={() => setOpenMenu(!openMenu)}>
                  <span
                    className="blackBackgroundtext"
                    style={{ color: "white" }}
                  >
                    المدرسين
                  </span>
                </div>
              </Link>
              <div style={{ color: "white", width: "50%" }}>
                <hr />
              </div>
              {user ? (
                <>
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    <div onClick={() => setOpenMenu(!openMenu)}>
                      <span
                        className="blackBackgroundtext"
                        style={{ color: "white" }}
                      >
                        {" "}
                        الملف الشخصي
                      </span>
                    </div>
                  </Link>
                  <Link to="/Notifications" style={{ textDecoration: "none" }}>
                    <div onClick={() => setOpenMenu(!openMenu)}>
                      <span
                        className="blackBackgroundtext"
                        style={{ color: "white" }}
                      >
                        الاشعارات
                      </span>
                    </div>
                  </Link>
                  <Link to="/messenger" style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        color: "white",
                      }}
                      onClick={() => setOpenMenu(!openMenu)}
                    >
                      <span className="blackBackgroundtext">
                        {" "}
                        الرسائل المباشره
                      </span>
                    </div>
                  </Link>
                  <Link to="" style={{ textDecoration: "none" }}>
                    <div onClick={() => setOpenMenu(!openMenu)}>
                      <span
                        className="blackBackgroundtext"
                        style={{ color: "white" }}
                      >
                        الاشتراك{" "}
                      </span>
                    </div>
                  </Link>
                  <div style={{ color: "white", width: "50%" }}>
                    <hr />
                  </div>
                </>
              ) : null}

              <div>
                {user ? (
                  <>
                    {user.teacher ? (
                      <div onClick={handleLogoutTeacher}>
                        <span className="blackBackgroundtext">خروج</span>
                      </div>
                    ) : (
                      <div onClick={handleLogoutStudent}>
                        <span className="blackBackgroundtext">خروج</span>
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
