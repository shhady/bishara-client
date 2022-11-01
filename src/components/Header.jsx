import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faBars,
  faMessage,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
// import { io } from "socket.io-client";
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
export default function Header({ user, setUser, socket }) {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const [openMenu, setOpenMenu] = useState(false);
  // const [socket, setSocket] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState([]);
  const [notificationNotification, setNotificationNotification] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openNotificationsMessage, setOpenNotificationsMessage] =
    useState(false);
  const [backNot, setBackNot] = useState([]);
  const [userId, setUserId] = useState(null);
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
  console.log(backNot);

  const clickOnBill = () => {
    setOpenNotifications(!openNotifications);
    setNotificationNotification([]);
    const comments = async () => {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/comments/`
      );
      setBackNot(
        result.data.filter((comment) => comment.courseOwnerId === userId)
      );
    };
    comments();
  };
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

  console.log(notificationNotification);
  console.log(notificationMessage);
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
    setNotificationNotification([]);
    setNotificationMessage([]);
  };
  const handleClickOnNotification = (notification) => {
    console.log(notification);
    const setAsRead = async () => {
      await axios
        .patch(
          process.env.REACT_APP_BACKEND_URL + `/comments/${notification._id}`,
          {
            read: true,
          }
        )
        .then(async () => {
          const result = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/comments/`
          );
          setBackNot(
            result.data.filter((comment) => comment.courseOwnerId === userId)
          );
        })
        .then(window.localStorage.setItem("courseId", notification.theCourse))
        .then(history.push({ pathname: `/course/${notification.theCourse}` }))
        .then(window.location.reload());
    };
    setAsRead();
    // setNotificationClicked(!notificationClicked);
    // setCourseIdNew(notification.courseid);
    setOpenNotifications(!openNotifications);
  };

  const drawNotifications = () => {
    return backNot
      ?.sort((a, b) => a.createdAt > b.createdAt)
      .map((notification, i) => {
        return (
          <div key={i} style={{ display: "flex", flexDirection: "column" }}>
            {notification.read ? (
              <div
                style={{
                  border: "1px solid gray",
                  padding: "5px",
                }}
                onClick={() => handleClickOnNotification(notification)}
              >
                {notification.firstName} {notification.lastName} علق على الدرس
                {notification.videoName}
              </div>
            ) : (
              <div
                style={{
                  border: "1px solid gray",
                  padding: "5px",
                  backgroundColor: "grey",
                }}
                onClick={() => handleClickOnNotification(notification)}
              >
                {notification.firstName} {notification.lastName} علق على الدرس
                {notification.videoName}
              </div>
            )}
          </div>
        );
      });
  };

  const uniques = notificationMessage
    .map((obj) => {
      return obj.userName;
    })
    .filter((item, index, arr) => {
      return arr.indexOf(item) === index;
    });

  console.log(uniques);
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

  return (
    <div>
      <div className="header">
        <div className="middle">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingRight: "20px",
              alignItems: "center",
            }}
          >
            <Link to="/">
              <img
                src="https://res.cloudinary.com/shhady/image/upload/v1666188610/avatars/wjph4gkbarqbnntmpcvw.jpg"
                alt="logo"
                className="logoImage"
              />
            </Link>
            <Link to="/PianoPage" style={{ textDecoration: "none" }}>
              <div
                className="pianoHeader"
                style={{
                  marginLeft: "20px",
                  marginRight: "20px",
                  cursor: "pointer",
                }}
              >
                <h3>بيانو</h3>
              </div>
            </Link>
            <Link to="/OudPage" style={{ textDecoration: "none" }}>
              <div
                className="oudHeader"
                style={{
                  marginLeft: "20px",
                  cursor: "pointer",
                }}
              >
                <h3>عود</h3>
              </div>
            </Link>
            <Link to="/ViolinPage" style={{ textDecoration: "none" }}>
              <div
                className="violinHeader"
                style={{
                  cursor: "pointer",
                }}
              >
                <h3>كمان</h3>{" "}
              </div>
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {user ? (
              <div>
                {user.teacher ? (
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={user.teacher.avatar}
                        alt={user.teacher.firstName}
                        style={{
                          height: "40px",
                          width: "40px",
                          borderRadius: "50%",
                          marginLeft: "10px",
                          marginRight: "10px",
                        }}
                      />
                      {user.teacher.firstName} {user.teacher.lastName}
                    </div>
                  </Link>
                ) : (
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    <>
                      <FontAwesomeIcon icon={faUser} /> {user.user.firstName}{" "}
                      {user.user.lastName}
                    </>
                  </Link>
                )}
              </div>
            ) : (
              <div style={{ visibility: "hidden" }}>X</div>
            )}

            {/* <div>
            <Link to="/">
              <img
                src="https://res.cloudinary.com/shhady/image/upload/v1666188610/avatars/wjph4gkbarqbnntmpcvw.jpg"
                alt="logo"
                className="logoImage"
              />
            </Link>
          </div> */}

            {user ? (
              <div
                className="auth"
                style={{
                  border: "none",
                  height: "100%",
                  display: "flex",
                  paddingLeft: "20px",
                }}
              >
                <Link to="/profile">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* <h4>
                    {user.teacher ? user.teacher.lastName : user.user.lastName}
                  </h4> */}
                    {/* <h4 style={{ marginRight: "5px" }}>
                    {user.teacher
                      ? user.teacher.firstName
                      : user.user.firstName}
                  </h4> */}
                    {"  "}
                    {/* {user.teacher ? (
                    <img
                      src={user.teacher ? user.teacher.avatar : "profile.jpg"}
                      alt={user.teacher?.image}
                      style={{
                        height: "40px",
                        borderRadius: "50%",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        margin: "3px",
                        padding: "3px",
                        borderRadius: "50%",
                        border: "1px solid gray",
                      }}
                    >
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                  )} */}
                  </div>
                </Link>
                {user.teacher ? (
                  // <div
                  //   style={{
                  //     display: "flex",
                  //     alignItems: "center",
                  //     justifyContent: "center",
                  //   }}
                  // >
                  //   <button
                  //     onClick={handleLogoutTeacher}
                  //     style={{
                  //       border: "none",
                  //       width: "10rem",
                  //       cursor: "pointer",
                  //     }}
                  //   >
                  //     خروج
                  //   </button>
                  <div
                    style={{
                      display: "flex",
                      // flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      // border: "1px solid gray",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      onClick={handleLogoutTeacher}
                      style={{
                        display: "flex",
                        marginRight: "10px",
                        // border: "1px solid gray",
                        borderRadius: "5px",
                        height: "30px",
                        padding: "0px 5px ",
                      }}
                      className="logOutHeader"
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: "2px",
                        }}
                      >
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />{" "}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          // paddingRight: "20px",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        خروج
                      </div>
                    </div>

                    {user?.teacher?.role === "admin" ? (
                      <Link
                        to="/CreateTeacher"
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "10px",
                            // background: "#cdcaca",
                            cursor: "pointer",
                            height: "30px",
                            padding: "0px 5px",
                          }}
                          className="logOutHeader"
                        >
                          تسجيل معلمين
                        </div>
                        {/* <button
                        style={{
                          border: "none",
                          width: "10rem",
                          cursor: "pointer",
                        }}
                      >
                        تسجيل معلمين
                      </button> */}
                      </Link>
                    ) : null}
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      // border: "1px solid gray",
                      // borderRadius: "10px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                    className="logOutHeader"
                  >
                    <div
                      onClick={handleLogoutStudent}
                      style={{
                        display: "flex",
                        // border: "1px solid gray",
                        borderRadius: "10px",
                        height: "30px",
                        padding: "3px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: "2px",
                        }}
                      >
                        {" "}
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        خروج
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="auth"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link to="/auth" style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      display: "flex",
                      // borderStyle: "outset",
                      // border: "1px solid gray",
                      // borderRadius: "5px",
                      height: "30px",
                      padding: "3px",
                      color: "black",
                    }}
                    className="registerBox"
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "3px",
                      }}
                    >
                      <FontAwesomeIcon icon={faArrowRightToBracket} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "20px",
                      }}
                    >
                      تسجيل الدخول
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {/* <div></div>
          <div className="menuMobile">
            {" "}
            <FontAwesomeIcon icon={faBars} />
            القائمة
          </div> */}
        </div>
        <div className="header-down">
          <div className="Menu-message">
            {/* <div></div> */}
            <div
              className="menuMobile"
              style={{
                // textAlign: "center",
                // border: "1px solid gray",
                padding: "2px",
              }}
              onClick={() => setOpenMenu(!openMenu)}
            >
              {!openMenu ? <FontAwesomeIcon icon={faBars} /> : "X اغلاق"}{" "}
            </div>
          </div>
          <div className="menu-details-computer">
            <Link to="/teachers" style={{ textDecoration: "none" }}>
              <div>
                <h3 className="headeroud">المدرسين</h3>
              </div>
            </Link>
            {user ? (
              <Link to="/courses" style={{ textDecoration: "none" }}>
                <div>
                  <h3 className="headeroud">الدورات الموسيقية</h3>
                </div>
              </Link>
            ) : (
              <Link to="/auth" style={{ textDecoration: "none" }}>
                <div>
                  <h3 className="headeroud">الدورات الموسيقية</h3>
                </div>
              </Link>
            )}

            {/* <Link to="Piano" style={{ textDecoration: "none" }}>
              <div>
                <h3 className="headerpiano">نوتات موسيقية</h3>
              </div>
            </Link> */}
            <Link to="" style={{ textDecoration: "none" }}>
              <div>
                <h3 className="headerpiano">الاشتراك </h3>
              </div>
            </Link>
          </div>
          {user ? (
            <div
              style={{
                padding: "2px",
                border: "1px solid white",
                cursor: "pointer",
                position: "relative",
              }}
              onClick={() => {
                if (uniques.length === 0) {
                  history.push("/messenger");
                } else {
                  setOpenNotificationsMessage(!openNotificationsMessage);
                }
                // history.push("/messenger");
              }}
            >
              <FontAwesomeIcon icon={faMessage} />
              {uniques.length > 0 ? (
                <div className="notificationMessage">{uniques.length}</div>
              ) : null}
            </div>
          ) : null}

          {openNotificationsMessage ? (
            <div className="notificationMessage-container">
              {drawNotificationsMessages()}
              <div
                style={{
                  border: "1px solid gray",
                  background: "skyblue",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setOpenNotificationsMessage(!openNotificationsMessage);
                  setNotificationMessage([]);
                }}
              >
                حذف جميع الاشعارات
              </div>
            </div>
          ) : null}
          {user ? (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingLeft: "20px",
                border: "1px solid white",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <FontAwesomeIcon icon={faBell} onClick={clickOnBill} />
              {notificationNotification.length > 0 ? (
                <div
                  className="notificationNotification"
                  onClick={() => setOpenNotifications(!openNotifications)}
                >
                  .
                </div>
              ) : null}
            </div>
          ) : null}

          {openNotifications ? (
            <div className="notification-container">
              {drawNotifications()}
              {/* <div
                style={{
                  border: "1px solid gray",
                  background: "skyblue",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setOpenNotifications(!openNotifications);
                  setNotificationNotification([]);
                }}
              >
                حذف جميع الاشعارات
              </div> */}
            </div>
          ) : null}
          {openMenu && (
            <div className="menu-details">
              <Link to="/" style={{ textDecoration: "none" }}>
                <div onClick={() => setOpenMenu(!openMenu)}>
                  <h3 className="headeroud">الرئيسية</h3>
                </div>
              </Link>
              <Link to="/teachers" style={{ textDecoration: "none" }}>
                <div onClick={() => setOpenMenu(!openMenu)}>
                  <h3 className="headeroud">المدرسين</h3>
                </div>
              </Link>
              <Link to="/courses" style={{ textDecoration: "none" }}>
                <div onClick={() => setOpenMenu(!openMenu)}>
                  <h3 className="headeroud">الدورات الموسيقية</h3>
                </div>
              </Link>
              {/* <Link to="Piano" style={{ textDecoration: "none" }}>
                <div onClick={() => setOpenMenu(!openMenu)}>
                  <h3 className="headerpiano">نوتات موسيقية</h3>
                </div>
              </Link> */}
              <Link to="" style={{ textDecoration: "none" }}>
                <div onClick={() => setOpenMenu(!openMenu)}>
                  <h3 className="headerpiano">الاشتراك </h3>
                </div>
              </Link>
            </div>
          )}
          {/* <div className="menuMobile">
            {" "}
            <FontAwesomeIcon icon={faBars} />
            القائمة
          </div> */}
        </div>
      </div>
    </div>
  );
}
