import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import FileBase from "react-file-base64";
import "./profile.css";
import { Input, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const [allPractices, setAllPractices] = useState([]);
  const [userPractices, setUserPractices] = useState([]);
  const [userId, setUserId] = useState(null);
  const [practiceId, setPracticeId] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [showButtonAvatarUpdate, setShowButtonAvatarUpdate] = useState(false);
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [url, setUrl] = useState(null);
  const [image, setImage] = useState();
  const [fileUpload, setFileUpload] = useState(null);
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profilePic")
  );
  console.log(profilePic);
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
      // .then(console.log(url))
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const userid = user.user ? user.user._id : user.teacher._id;
    const userAvatar = user.user ? user.user.avatar : user.teacher.avatar;
    setUserId(userid);
    // console.log(userAvatar);
    setProfilePic(userAvatar);
  }, [user]);
  const handleLogoutFromAllDevices = async () => {
    const response = await axios.post(
      process.env.REACT_APP_BACKEND_URL + `/teachers/logoutAll`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: window.localStorage.getItem("token"),
        },
      }
    );

    if (response.status === 200) {
      // REMOVE TOKEN
      window.localStorage.removeItem("token");
    }

    // localStorage.removeItem("profile");
    // await axios.post(process.env.REACT_APP_BACKEND_URL+"/users/logoutAll");
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };

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
    const changePhoto = async () => {
      await axios
        .patch(process.env.REACT_APP_BACKEND_URL + `/teachers/${userId}`, {
          avatar: url,
        })
        .then(() => {
          window.localStorage.setItem("profilePic", url);
          setProfilePic(url);
        });
    };
    changePhoto();
    setShowButtonAvatarUpdate(false);
  }, [url]);
  const handleUserLogoutFromAllDevices = async () => {
    const response = await axios.post(
      process.env.REACT_APP_BACKEND_URL + `/users/logoutAll`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: window.localStorage.getItem("token"),
        },
      }
    );

    if (response.status === 200) {
      // REMOVE TOKEN
      window.localStorage.removeItem("token");
    }

    // localStorage.removeItem("profile");
    // await axios.post(process.env.REACT_APP_BACKEND_URL+"/users/logoutAll");
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };

  const goToCreateCourse = () => {
    history.push("/createCourse");
  };
  const gotohomepage = () => {
    history.push("/");
  };

  const studentsPractices = () => {
    history.push("/StudentsPractices");
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/practices`
      );
      setAllPractices(res.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/practices`
      );
      setAllPractices(res.data);
    };
    fetch();
  }, [practiceId]);
  useEffect(() => {
    const res = allPractices.filter((practice) => practice.ownerId === userId);
    setUserPractices(res);
  }, [allPractices, userId]);
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
            process.env.REACT_APP_BACKEND_URL + `/practices`
          );
          setAllPractices(res.data);
        });
    };
    deleteThePractice();
  };

  const showData = () => {
    return userPractices?.map((practice) => {
      return (
        <div
          style={{
            borderRight: "1px solid black",
            borderBottom: "1px solid black",
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
              }}
            >
              <div>التمرين</div>
              <video
                key={practice.myPractice}
                controls
                style={{ width: "100%", height: "250px" }}
              >
                <source src={practice.myPractice} type="video/mp4" />
              </video>
            </div>
            <div style={{ padding: "0px 10px", width: "50%" }}>
              رد المعلم:
              {practice.videoReply ? (
                <div>
                  <video
                    key={practice.videoReply}
                    controls
                    style={{ width: "100%", height: "250px" }}
                  >
                    <source src={practice.videoReply} type="video/mp4" />
                  </video>
                </div>
              ) : null}
              {practice.reply}
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "200px",
              }}
            >
              {" "}
              <img
                src={profilePic}
                alt={user.teacher.firstName}
                width="150"
                height="150"
                style={{ borderRadius: "50%" }}
              />
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  justifyContent: "space-around",
                }}
              >
                {fileUpload ? (
                  <span style={{ textAlign: "center", color: "black" }}>
                    {" "}
                    {fileUpload.percentComplete === 100 ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : null}
                  </span>
                ) : (
                  <input
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      setShowButtonAvatarUpdate(true);
                    }}
                    // onClick={() => setUrl(null)}
                  />
                )}
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
              {user.teacher.instrument}
              <div className="profileButtons">
                <button style={{ height: "40px" }} onClick={studentsPractices}>
                  تمارين الطلاب
                </button>

                <button style={{ height: "40px" }} onClick={goToCreateCourse}>
                  انشئ دورة
                </button>
                <button style={{ height: "40px" }} onClick={gotohomepage}>
                  الصفحة الرئيسية
                </button>
                <button
                  style={{ height: "40px" }}
                  onClick={handleLogoutFromAllDevices}
                >
                  خروج من جميع الاجهزة
                </button>
              </div>
            </div>
          ) : (
            <div className="profilePage">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <h2>
                  {user.user.firstName}
                  {"  "}
                  {user.user.lastName}
                </h2>
                <button
                  onClick={gotohomepage}
                  style={{ marginTop: "10px", minWidth: "90%" }}
                >
                  الصفحة الرئيسية
                </button>
                <button
                  onClick={handleUserLogoutFromAllDevices}
                  style={{ marginTop: "10px", minWidth: "90%" }}
                >
                  خروج من جميع الاجهزة
                </button>
              </div>
              <div>{showData()}</div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
