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
  const [notificationNumber, setNotificationNumber] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [teachersHover, setTeachersHover] = useState(false);
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
  console.log(backNot.filter((comment) => comment.read === false));

  const clickOnBill = () => {
    setOpenNotifications(!openNotifications);
    // setNotificationNotification([]);
    console.log("bill clicked");
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
    setOpenNotifications(false);
    setIsHovering(!isHovering);
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
        .then(() => setNotificationNumber(notificationNumber.length - 1))
        // .then(async () => {
        //   const result = await axios.get(
        //     process.env.REACT_APP_BACKEND_URL + `/comments/`
        //   );
        //   console.log(result);
        //   setBackNot(
        //     result.data.filter((comment) => comment.courseOwnerId === userId)
        //   );
        // })
        .then(window.localStorage.setItem("courseId", notification.theCourse))
        .then(history.push({ pathname: `/course/${notification.theCourse}` }))
        .then(window.location.reload());
    };
    setAsRead();
    // setNotificationClicked(!notificationClicked);
    // setCourseIdNew(notification.courseid);
    setOpenNotifications(!openNotifications);
    console.log(notificationNumber.length);
  };

  console.log(notificationNumber.length);

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
  console.log(backNot);
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

  const handleMouseOver = () => {
    setIsHovering(!isHovering);
    console.log("niceee");
  };

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <div className="header">
        {isHovering ? (
          <div
            style={{
              zIndex: "5",
              top: 85,
              position: "fixed",
              backgroundColor: "white",
              left: 1,
              width: "150px",
              boxShadow:
                "rgb(0 0 0 / 6%) 0px 4px 8px, rgb(35 41 54 / 14%) 0px 12px 32px",
              textAlign: "center",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
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

            <div style={{ width: "80%", margin: "auto" }}>الملف الشخصي</div>
            {user?.teacher?.role === "admin" ? (
              <Link to="/CreateTeacher" style={{ textDecoration: "none" }}>
                <div
                  style={{ width: "80%", margin: "auto", marginTop: "20px" }}
                >
                  تسجيل معلمين
                </div>
              </Link>
            ) : null}
            <div style={{ width: "80%", margin: "20px auto" }}>الاشعارات</div>
            <div
              style={{ width: "80%", margin: " auto", marginBottom: "20px" }}
            >
              الرسائل المباشره
            </div>
            <div style={{ width: "80%", margin: "auto" }}>الاسئلة المتكررة</div>
            <div
              style={{
                width: "80%",
                margin: "20px auto",
                borderTop: "1px solid grey",
                paddingBottom: "15px",
                paddingTop: "15px",
              }}
            >
              {user ? (
                <>
                  {user.teacher ? (
                    <div onClick={handleLogoutTeacher}>خروج</div>
                  ) : (
                    <div onClick={handleLogoutStudent}>خروج</div>
                  )}
                </>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="middle">
          <div
            className="menuMobile"
            style={{
              marginLeft: "70px",
              // minWidth: "60px",
              // padding: "2px",
            }}
            onClick={() => setOpenMenu(!openMenu)}
          >
            {!openMenu ? <FontAwesomeIcon icon={faBars} /> : null}{" "}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              // paddingRight: "15px",
              alignItems: "center",
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              {/* <img
                src="https://res.cloudinary.com/shhady/image/upload/v1666188610/avatars/wjph4gkbarqbnntmpcvw.jpg"
                alt="logo"
                className="logoImage"
              /> */}
              <h2 style={{ color: "black", marginLeft: "70px" }}>FUNAN</h2>
            </Link>
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
              >
                <div>
                  <FontAwesomeIcon icon={faChalkboardUser} />
                </div>
                <div>المدرسين</div>
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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {user ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
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
                    onClick={clickOnBill}
                  >
                    <FontAwesomeIcon icon={faBell} />
                    {notificationNumber.length > 0 ? (
                      <div className="notificationNotification">
                        {notificationNumber.length}
                      </div>
                    ) : null}
                  </div>
                ) : null}
                {user ? (
                  <div
                    style={{
                      padding: "2px",
                      border: "1px solid white",
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
              <div style={{ visibility: "hidden" }}>X</div>
            )}
            {user ? (
              <>
                {user.teacher ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseOver={() => setIsHovering(true)}
                  >
                    <img
                      src={user.teacher.avatar}
                      alt={user.teacher.firstName}
                      style={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%",
                        marginLeft: "20px",
                        marginRight: "20px",
                      }}
                    />
                  </div>
                ) : (
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    <div
                      style={{ marginLeft: "20px", marginRight: "20px" }}
                      onMouseOver={() => setIsHovering(true)}
                    >
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                  </Link>
                )}
              </>
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

        <div className="header-down">
          <div className="Menu-message">{user ? <></> : null}</div>

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

          {openNotifications ? (
            <div className="notification-container">{drawNotifications()}</div>
          ) : null}
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
                  }}
                >
                  X
                </h3>
                <h2 style={{ color: "white" }}>FUNAN</h2>
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
                <Link to="/" style={{ textDecoration: "none" }}>
                  <div onClick={() => setOpenMenu(!openMenu)}>
                    <h3 style={{ color: "white" }}>الرئيسية</h3>
                  </div>
                </Link>
                <Link to="/teachers" style={{ textDecoration: "none" }}>
                  <div onClick={() => setOpenMenu(!openMenu)}>
                    <h3 style={{ color: "white" }}>المدرسين</h3>
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
                    <h3
                      style={{
                        color: "white",
                        borderBottom: "1px solid white",
                        width: "40%",
                      }}
                    >
                      الدورات الموسيقية
                    </h3>
                    <Link to="/PianoPage" style={{ textDecoration: "none" }}>
                      <span onClick={() => setOpenMenu(!openMenu)}>بيانو</span>
                    </Link>
                    <Link to="/PianoPage" style={{ textDecoration: "none" }}>
                      <span
                        style={{ margin: "20px 0px" }}
                        onClick={() => setOpenMenu(!openMenu)}
                      >
                        عود
                      </span>
                    </Link>
                    <Link to="/PianoPage" style={{ textDecoration: "none" }}>
                      <span onClick={() => setOpenMenu(!openMenu)}>كمان</span>
                    </Link>
                  </div>
                </Link>
                <Link to="" style={{ textDecoration: "none" }}>
                  <div onClick={() => setOpenMenu(!openMenu)}>
                    <h3 style={{ color: "white" }}>الاشتراك </h3>
                  </div>
                </Link>
                <div>
                  {user ? (
                    <>
                      {user.teacher ? (
                        <div onClick={handleLogoutTeacher}>
                          <h3>خروج</h3>
                        </div>
                      ) : (
                        <div onClick={handleLogoutStudent}>
                          <h3>خروج</h3>
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
    </div>
  );
}
