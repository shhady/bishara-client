import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import CreateCourse from "../Course/CreateCourse";
import ChangePassword from "../ChangePassword";
import ChangePasswordForm from "../ChangePasswordForm";
import FileBase from "react-file-base64";
import "./profile.css";
import { Input, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import ChangePasswordUser from "../ChangePasswordUser";

export default function Profile({ userProp }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const [allPractices, setAllPractices] = useState([]);
  const [userPractices, setUserPractices] = useState([]);
  const [userId, setUserId] = useState(null);
  const [practiceId, setPracticeId] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [showButtonAvatarUpdate, setShowButtonAvatarUpdate] = useState(false);
  const [showButtonCoverUpdate, setShowButtonCoverUpdate] = useState(false);
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [showFormCreateCourse, setShowFormCreateCourse] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [url, setUrl] = useState(null);
  const [image, setImage] = useState();
  const [fileUpload, setFileUpload] = useState(null);
  //prettier-ignore
  const [profilePicture, setProfilePicture] = useState(localStorage.getItem("profilePic"));
  const [urlCover, setUrlCover] = useState(null);
  //prettier-ignore
  const [coverPicture, setCoverPicture] = useState(localStorage.getItem("coverPic"));
  const [showPractice, setShowPractice] = useState(true);
  const [showChangePassUser, setShowChangePassUser] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [poster, setPoster] = useState("");
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

  console.log({ user: userProp });
  console.log({ local: user });
  console.log(localStorage.getItem("profilePic"));
  const postDetails = () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "bisharaHaroni");
    // formData.append("cloud_name", "shhady");
    axios
      .post("https://api.cloudinary.com/v1_1/djvbchw2x/upload", formData, {
        onUploadProgress: (p) => {
          const percentComplete = Math.round((p.loaded * 100) / p.total);
          setFileUpload({ fileName: image.name, percentComplete });
          console.log(`${percentComplete}% uploaded`);
        },
      })
      .then((res) => setUrl(res.data.url))
      // .then((data) => {
      //   (data.url);
      // })
      // .then(console.log(profilePic))
      .catch((err) => {
        console.log(err);
      });
  };

  const postDetailsCover = () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "bisharaHaroni");
    // formData.append("cloud_name", "shhady");
    axios
      .post("https://api.cloudinary.com/v1_1/djvbchw2x/upload", formData, {
        onUploadProgress: (p) => {
          const percentComplete = Math.round((p.loaded * 100) / p.total);
          setFileUpload({ fileName: image.name, percentComplete });
          console.log(`${percentComplete}% uploaded`);
        },
      })
      .then((res) => setUrlCover(res.data.url))
      // .then((data) => {
      //   (data.url);
      // })
      // .then(console.log(profilePic))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!urlCover) return;
    const changePhoto = async () => {
      await axios
        .patch(process.env.REACT_APP_BACKEND_URL + `/teachers/${userId}`, {
          cover: urlCover,
        })
        .then(() => {
          window.localStorage.setItem("coverPic", urlCover);
          setCoverPicture(urlCover);
        });
    };
    changePhoto();
    console.log(url);

    setShowButtonCoverUpdate(false);
  }, [urlCover]);
  useEffect(() => {
    if (userProp) {
      const userid = userProp.user ? userProp.user._id : userProp.teacher._id;
      setUserId(userid);
    } else {
      const userid = user.user ? user.user._id : user.teacher._id;
      setUserId(userid);
    }
    // const userAvatar = user.user ? user.user.avatar : user.teacher.avatar;
    // console.log(userAvatar);
    // setProfilePicture(userAvatar);
  }, [userProp, user]);
  // const handleLogoutFromAllDevices = async () => {
  //   const response = await axios.post(
  //     process.env.REACT_APP_BACKEND_URL + `/teachers/logoutAll`,
  //     {},
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: window.localStorage.getItem("token"),
  //       },
  //     }
  //   );

  //   if (response.status === 200) {
  //     // REMOVE TOKEN
  //     window.localStorage.removeItem("token");
  //   }

  //   // localStorage.removeItem("profile");
  //   // await axios.post(process.env.REACT_APP_BACKEND_URL+"/users/logoutAll");
  //   dispatch({ type: "LOGOUT" });
  //   history.push("/");
  //   setUser(null);
  // };

  // useEffect(() => {
  //   const fetch = async () => {
  //     const result = await axios.get(
  //       process.env.REACT_APP_BACKEND_URL + `/teachers/${userId}`
  //     );
  //     setTeacherDetails(result.data);
  //   };
  //   fetch();
  //   console.log(teacherDetails);
  // }, [user, userId]);

  useEffect(() => {
    if (!url) return;
    const changePhoto = async () => {
      await axios
        .patch(process.env.REACT_APP_BACKEND_URL + `/teachers/${userId}`, {
          avatar: url,
        })
        .then(() => {
          window.localStorage.setItem("profilePic", url);
          setProfilePicture(url);
        });
    };
    changePhoto();
    console.log(url);

    setShowButtonAvatarUpdate(false);
  }, [url]);
  // const handleUserLogoutFromAllDevices = async () => {
  //   const response = await axios.post(
  //     process.env.REACT_APP_BACKEND_URL + `/users/logoutAll`,
  //     {},
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: window.localStorage.getItem("token"),
  //       },
  //     }
  //   );

  //   if (response.status === 200) {
  //     // REMOVE TOKEN
  //     window.localStorage.removeItem("token");
  //   }

  //   // localStorage.removeItem("profile");
  //   // await axios.post(process.env.REACT_APP_BACKEND_URL+"/users/logoutAll");
  //   dispatch({ type: "LOGOUT" });
  //   history.push("/");
  //   setUser(null);
  // };

  const goToCreateCourse = () => {
    history.push("/createCourse");
  };
  const gotohomepage = () => {
    history.push("/");
  };

  const studentsPractices = () => {
    history.push("/PracticeReplies");
  };

  useEffect(() => {
    if (user.teacher) return;
    const fetch = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/studentpractices/${user.user._id}`
      );
      setUserPractices(res.data);
      console.log(res.data);
    };
    fetch();
  }, [userId]);

  // useEffect(() => {
  //   const fetch = async () => {
  //     const res = await axios.get(
  //       process.env.REACT_APP_BACKEND_URL + `/practices`
  //     );
  //     setAllPractices(res.data);
  //   };
  //   fetch();
  // }, [practiceId]);
  // useEffect(() => {
  //   const res = allPractices.filter((practice) => practice.ownerId === userId);
  //   setUserPractices(res);
  // }, [allPractices, userId]);
  // const showData = () => {
  //   const res = allPractices.filter(
  //     (practice) => practice.ownerId === user.user._id
  //   );
  //   console.log(res);
  //   const draw = () => {
  //     return res.map((draw) => {
  //       return <div>{draw.courseName}</div>;
  //     });
  //   };
  //   draw();

  // };
  const deletePractice = (practice) => {
    setPracticeId(practice._id);
    const deleteThePractice = async () => {
      await axios
        .delete(
          process.env.REACT_APP_BACKEND_URL + `/practices/${practice._id}`
        )
        .then(async () => {
          const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/studentpractices/${userId}`
          );
          setUserPractices(res.data);
        });
    };
    deleteThePractice();
  };

  const showData = () => {
    return userPractices?.map((practice) => {
      return (
        <div
          className="practiceAndReply"
          style={{
            borderRight: "1px solid black",
            borderBottom: "1px solid #e1e1e1",
            padding: "10px",
          }}
          key={practice._id}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div>
                الاستاذ:
                {practice.teacherFirstName} {practice.teacherLastName}
              </div>
              <div>
                {" "}
                الدورة:
                {practice.courseName}
              </div>
              <div>
                الدرس:
                {practice.video}
              </div>
            </div>
            <div>
              <button onClick={() => deletePractice(practice)}>
                حذف التمرين
              </button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <div
              style={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "felx-start",
                alignItems: "flex-start",
              }}
            >
              {/* <div>التمرين</div> */}
              <video
                key={practice.myPractice}
                controls
                preload="metadata"
                // poster={poster}
                height="250px"
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "250px",
                  maxHeight: "250px",
                  border: "1px solid #e1e1e1",
                }}
              >
                <source src={practice.myPractice} type="video/mp4" />
              </video>
              <div className="theComment">{practice.reply}</div>
            </div>
            <div style={{ padding: "0px 10px", width: "50%" }}>
              {/* {practice.videoReply ? (
                <div>
                  <video
                    key={practice.videoReply}
                    controls
                    style={{ width: "100%", height: "250px" }}
                  >
                    <source src={practice.videoReply} type="video/mp4" />
                  </video>
                </div>
              ) : null} */}
              {practice.videoReply ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: ".5rem",
                    height: "100%",
                    maxHeight: "250px",
                    // overflow: "hidden",
                  }}
                >
                  {practice.videoReply.map((reply, i) => {
                    return (
                      <video
                        key={reply.theVideoReply + `${i}`}
                        controls
                        preload="metadata"
                        // poster={poster}
                        style={{
                          width: "100%",
                          height: "121px",
                          border: "1px solid #e1e1e1",
                        }}
                      >
                        <source src={reply.theVideoReply} type="video/mp4" />
                      </video>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      {user ? (
        <div>
          {user.teacher ? (
            <div className="coverProfile">
              <div
                style={{
                  backgroundImage: `url(${coverPicture})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  // objectFit:"cover",
                  backgroundRepeat: "no-repeat",
                  height: "200px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  position: "relative",
                }}
              >
                صورة غلاف
                {!showButtonCoverUpdate ? (
                  <input
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      setShowButtonCoverUpdate(true);
                    }}
                    // onClick={() => setUrl(null)}
                  />
                ) : null}
                {showButtonCoverUpdate ? (
                  <button onClick={postDetailsCover}>تثبيت</button>
                ) : null}
              </div>{" "}
              {profilePicture ? (
                <div style={{ zIndex: "10", marginTop: "-80px" }}>
                  <img
                    src={profilePicture}
                    alt={user.teacher.firstName + "me"}
                    width="150"
                    height="150"
                    style={{ borderRadius: "50%", border: "5px solid white" }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    backgroundColor: "black",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  أضف صورة شخصيه
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  justifyContent: "space-around",
                }}
              >
                {!showButtonAvatarUpdate ? (
                  <input
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      setShowButtonAvatarUpdate(true);
                    }}
                    // onClick={() => setUrl(null)}
                  />
                ) : null}
                {showButtonAvatarUpdate ? (
                  <button onClick={postDetails}>تثبيت</button>
                ) : null}
                {/* <Input
                  type="file"
                  id="changeProfilePic"
                  hidden
                  onClick={() => setShowButtonAvatarUpdate(true)}
                />
                {!showButtonAvatarUpdate ? (
                  <Button as="label" htmlFor="changeProfilePic">
                    <FontAwesomeIcon icon={faCamera} />
                  </Button>
                ) : null}

                {showButtonAvatarUpdate ? (
                  <button type="submit" onClick={handleUpdateAvatar}>
                    تثبيت
                  </button>
                ) : null} */}
              </div>
              <h2>
                {user.teacher.firstName}
                {"  "}
                {user.teacher.lastName}
              </h2>
              {/* <div className="profileAllButtonsMobile">
                <div
                  className="profileButtons1"
                  style={{ height: "40px" }}
                  onClick={studentsPractices}
                >
                  تمارين الطلاب
                </div>

                <div
                  className="profileButtons2"
                  style={{ height: "40px" }}
                  onClick={() => {
                    // {goToCreateCourse}
                    setShowFormCreateCourse(true);
                    setShowChangePassword(false);
                  }}
                >
                  انشئ دورة
                </div>
                <div
                  className="profileButtons3"
                  style={{ height: "40px" }}
                  onClick={() => {
                    setShowChangePassword(true);
                    setShowFormCreateCourse(false);
                  }}
                >
                  تغيير كلمة المرور
                </div>
               
              </div> */}
              <div className="profileAllButtons">
                <div
                  className="profileButtons1"
                  style={{ height: "40px" }}
                  onClick={studentsPractices}
                >
                  تمارين الطلاب
                </div>

                <div
                  className="profileButtons2"
                  style={{ height: "40px" }}
                  onClick={() => {
                    // {goToCreateCourse}
                    setShowFormCreateCourse(true);
                    setShowChangePassword(false);
                  }}
                >
                  انشئ دورة
                </div>
                <div
                  className="profileButtons4"
                  style={{ height: "40px" }}
                  onClick={() => {
                    setShowPractice(false);
                    setShowChangePassUser(true);
                  }}
                >
                  تعديل الملف
                </div>
                <div
                  className="profileButtons3"
                  style={{ height: "40px" }}
                  onClick={() => {
                    setShowChangePassword(true);
                    setShowFormCreateCourse(false);
                  }}
                >
                  تغيير كلمة المرور
                </div>

                {/* <div
                  className="profileButtons4"
                  style={{ height: "40px" }}
                  onClick={handleLogoutFromAllDevices}
                >
                  خروج
                </div> */}
              </div>
              {showFormCreateCourse ? <CreateCourse /> : null}
              {showChangePassword ? <ChangePassword userId={userId} /> : null}
            </div>
          ) : (
            <div>
              <div
                style={{
                  display: "flex",
                  marginTop: "100px",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "130px",
                    height: "130px",
                    borderRadius: "50%",
                    backgroundColor: "#c3c1c1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={
                      user.user.avatar
                        ? user.user.avatar
                        : "https://img.icons8.com/material-rounded/24/null/user.png"
                    }
                    alt="profile"
                    width="80px"
                    height="80px"
                  />
                </div>
                <h2>
                  {user.user.firstName}
                  {"  "}
                  {user.user.lastName}
                </h2>
                <div className="profileAllButtons">
                  {showPractice ? (
                    <div
                      onClick={() => {
                        setShowPractice(true);
                        setShowChangePassUser(false);
                        setShowUpdateProfile(false);
                      }}
                      className="profileButtons2"
                      style={{
                        height: "40px",
                        borderBottom: "3px solid black",
                      }}
                    >
                      تمارين
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setShowPractice(true);
                        setShowChangePassUser(false);
                        setShowUpdateProfile(false);
                      }}
                      className="profileButtons2"
                      style={{ height: "40px" }}
                    >
                      تمارين
                    </div>
                  )}
                  {showUpdateProfile ? (
                    <div
                      className="profileButtons3"
                      style={{
                        height: "40px",
                        borderBottom: "3px solid black",
                      }}
                      onClick={() => {
                        setShowPractice(false);
                        setShowChangePassUser(false);
                        setShowUpdateProfile(true);
                      }}
                    >
                      تعديل الملف
                    </div>
                  ) : (
                    <div
                      className="profileButtons4"
                      style={{ height: "40px" }}
                      onClick={() => {
                        setShowPractice(false);
                        setShowChangePassUser(false);
                        setShowUpdateProfile(true);
                      }}
                    >
                      تعديل الملف
                    </div>
                  )}
                  {showChangePassUser ? (
                    <div
                      className="profileButtons3"
                      style={{
                        height: "40px",
                        borderBottom: "3px solid black",
                      }}
                      onClick={() => {
                        setShowPractice(false);
                        setShowChangePassUser(true);
                        setShowUpdateProfile(false);
                      }}
                    >
                      تغيير كلمة المرور
                    </div>
                  ) : (
                    <div
                      className="profileButtons3"
                      style={{ height: "40px" }}
                      onClick={() => {
                        setShowPractice(false);
                        setShowChangePassUser(true);
                        setShowUpdateProfile(false);
                      }}
                    >
                      تغيير كلمة المرور
                    </div>
                  )}

                  <div
                    onClick={gotohomepage}
                    className="profileButtons1"
                    style={{ height: "40px" }}
                  >
                    الصفحة الرئيسية
                  </div>
                </div>
              </div>
              {showPractice ? <div>{showData()}</div> : null}

              {showChangePassUser ? (
                <div>
                  {" "}
                  <ChangePasswordUser />
                </div>
              ) : null}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
