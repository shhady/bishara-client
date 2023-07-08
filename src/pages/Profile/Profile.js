import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import CreateCourse from "../../components/Course/CreateCourse";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import "../../components/ChangePassword/ChangePassword.css";
import "./profile.css";
import ChangePasswordUser from "../../components/ChangePassword/ChangePasswordUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AboutUserPop from "../../components/AboutUser/AboutUserPop";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
export default function Profile({ userProp }) {
  const user = JSON.parse(localStorage.getItem("profile"));
 
  const navigate = useNavigate();
  
  const [userPractices, setUserPractices] = useState([]);
  const [userId, setUserId] = useState(null);
  const [firstName, setFirstName] = useState(
    window.localStorage.getItem("firstName")
  );
  const [lastName, setLastName] = useState(
    window.localStorage.getItem("lastName")
  );
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
  const [urlCover, setUrlCover] = useState(null);
  //prettier-ignore
  const [coverPicture, setCoverPicture] = useState(localStorage.getItem("coverPic"));
  const [showPractice, setShowPractice] = useState(true);
  const [showChangePassUser, setShowChangePassUser] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [updateFirstName, setUpdateFirstName] = useState("");
  const [updateLastName, setUpdateLastName] = useState("");
  
  const [updateProfilePic, setUpdateProfilePic] = useState(
    ""
  );
  const [updateDes,setUpdateDes] = useState('')
  const [poster, setPoster] = useState("");

  useEffect(() => {
    try{
      const getavatar = async () => {
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_URL + `/users/${userId}`
        );
        setUpdateProfilePic(res.data.avatar);
        // console.log(res.data);
      };
      getavatar();
    }catch(e){
      console.log("no photo");
    }
    try{
      const getavatar = async () => {
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_URL + `/teachers/${userId}`
        );
        setUpdateProfilePic(res.data.avatar);
        // console.log(res.data);
      };
      getavatar();
    } catch(e){console.log("no photo");}
  }, [userId]);
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
      .then((res) => setUrl(res.data.secure_url))
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
      .then((res) => setUrlCover(res.data.secure_url))
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
        }, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Methods": "PATCH",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          }
        })
        .then(() => {
          window.localStorage.setItem("coverPic", urlCover);
          setCoverPicture(urlCover);
        });
    };
    changePhoto();
   

    setShowButtonCoverUpdate(false);
  }, [urlCover]);
  useEffect(() => {
    if (userProp) {
      // const userid = userProp.user ? userProp.user._id : userProp.teacher._id;
      setUserId(user._id);
    } else {
      // const userid = user.user ? user.user._id : user.teacher._id;
      setUserId(user._id);
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
  //   navigate("/");
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
    try {
      const changePhoto = async () => {
        await axios
          .patch(process.env.REACT_APP_BACKEND_URL + `/teachers/${userId}`,
          {
            avatar: url,
          }, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Methods": "PATCH",
              "Access-Control-Allow-Origin": "*",
              Authorization: "Bearer " + window.localStorage.getItem("token"),
            }
          })
          .then(() => {
            window.localStorage.setItem("profilePic", url);
            setUpdateProfilePic(url);
          });
      };
      changePhoto();
    } catch (error) {
      console.log("not a teacher");
    }
    try {
      const changePhoto = async () => {
        await axios
          .patch(process.env.REACT_APP_BACKEND_URL + `/users/${userId}`, {
            avatar: url,
          }, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Methods": "PATCH",
              "Access-Control-Allow-Origin": "*",
              Authorization: "Bearer " + window.localStorage.getItem("token"),
            }
          })
          .then(() => {
            window.localStorage.setItem("profilePic", url);
            setUpdateProfilePic(url);
          });
      };
      changePhoto();
    } catch (error) {
      console.log("not student");
    }
    
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
  //   navigate("/");
  //   setUser(null);
  // };

  const goToCreateCourse = () => {
    navigate("/createCourse");
  };
  const gotohomepage = () => {
    navigate("/");
  };

  const studentsPractices = () => {
    navigate("/newReview");
  };
  const addStudent = ()=>{
    navigate("/addStudent");
  }

  useEffect(() => {
    if (user.role === "teacher" || user.role === 'admin') return;
    const fetch = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/studentpractices/${user._id}`
      );
      setUserPractices(res.data);
      console.log(res.data)
    };
    fetch();
  }, [userId]);

 
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

  const markAsSeen = async (practice) => {
    await axios.patch(
      process.env.REACT_APP_BACKEND_URL + `/studentpractices/${practice._id}`,
      {
        replySeen: true,
      }
    );
  };

  const showRec =(practice,i)=>{
    return practice.RecordReply?.map((rec)=>{
      return <div key={practice.replyId} style={{display: 'flex', justifyContent:'center', alignItems:'center',marginTop: ".5rem", borderRadius:"20px"}}>
        <audio 
        style={{width:'100%'}}
      controls
    >
      <source src={rec.RecordingReply.replace('http://', 'https://')} type="audio/mp4" />
    </audio>
      </div>
    })
  }
  const showData = () => {
    return userPractices?.map((practice,i) => {
      return (
        <div
          className="practiceAndReply"
          style={{
            height:"fit-content",
            borderRight: "1px solid black",
            borderBottom: "1px solid #e1e1e1",
            padding: "10px",
            backgroundColor: i % 2 === 0 ? "#c7c5c5" : "white"
          }}
          key={practice._id}
          onClick={() => markAsSeen(practice)}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div onClick={()=>console.log(practice)}>
              {" "}
                الاستاذ: {" "}
                {practice.teacherFirstName} {practice.teacherLastName}
              </div>
              <div>
                {" "}
                 {" "}
                {practice.courseName ? <>الدوره: {practice.courseName}</> : <>الهدف: {practice.goal}</>}
              </div>
              <div>
              {" "}
                 {/* {" "}<Link to={`/NewLesson/${course._id}?name=${lesson.snippet.resourceId.videoId}&playlist=${course.playlistId}`}></Link> */}
                 
  {practice.courseName ? <Link to={`/NewLesson/${practice.courseId}?name=${practice.uniqueLink}&playlist=${practice.playlistId
}`} style={{textDecoration:"none", color:"black"}}><>الدرس: {practice.video}</></Link> : <>اين تعلمت: {practice.whereStudied}</>}
                
                
              </div>
            </div>
            <div>
              <button onClick={() => deletePractice(practice)} style={{backgroundColor:"#fee4b9", width:"80px"}}>
                حذف التمرين
              </button>
            </div>
          </div>
          <div
           className="videoAndRepliesProfile">
            <div
            className="StudentVideoProfile"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:"#fee4b9",
                marginBottom:"10px"
              }}
            >
              <video
                key={practice.myPractice}
                controls
                preload="metadata"
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
            
            <div  className="replyForVideoProfile">
              {practice.reply ? (
              <div className="theComment">{practice.reply}</div>):(null)}
              
              {practice.videoReply ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: ".5rem",
                    height: "100%",
                    maxHeight: "250px",
                  }}
                >
                  {practice.videoReply.length === 0 ?(<></>):(<>{practice.videoReply.map((reply, i) => {
                    return (
                      <video
                        key={reply.theVideoReply + `${i}`}
                        controls
                        preload="metadata"
                        className="videos4Profile"
                        poster={poster}
                      >
                        <source src={reply.theVideoReply.replace('http://', 'https://')} type="video/mp4" />
                      </video>
                    );
                  })}</>)}
                  
                </div>
              ) : null}
              <div  className="audioProfile">
                      {showRec(practice,i)}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + window.localStorage.getItem("token")
  }
 

  const changeName = async () => {
    try {
      await axios
        .patch(process.env.REACT_APP_BACKEND_URL + `/users/${userId}`, 
        {
          firstName: updateFirstName,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Methods": "PATCH",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        }
      }
      )
        .then(async () => {
          const response = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/users/${userId}`
          );
          window.localStorage.setItem("firstName", response.data.firstName);
          setFirstName(response.data.firstName);
        });
    } catch (error) {
      console.log("not user, teacher");
    }
    try {
      await axios
        .patch(process.env.REACT_APP_BACKEND_URL + `/teachers/${userId}`, {
          firstName: updateFirstName,
          
        } ,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Methods": "PATCH",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          }
        }
        )
        .then(async () => {
          const response = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/teachers/${userId}`
          );
          window.localStorage.setItem("firstName", response.data.firstName);
          setFirstName(response.data.firstName);
        });
    } catch (error) {
      console.log("not teacher, user");
    }
    setUpdateFirstName("");
  };

  
  const changeDes = async () => {
    try {
      await axios
        .patch(process.env.REACT_APP_BACKEND_URL + `/teachers/${userId}`,
        { 
          about: updateDes,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Methods": "PATCH",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          }
        })
        .then(async () => {
          const response = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/teachers/${userId}`
          );
          window.localStorage.setItem("Des", response.data.Description);
          localStorage.setItem("teacherId", userId);
        });
    } catch (error) {
      console.log("can't update");
    }
    setUpdateDes("");
    navigate("/Teacher")
  };
  const changeLastName = async () => {
    try {
      await axios
        .patch(process.env.REACT_APP_BACKEND_URL + `/users/${userId}`, {
          lastName: updateLastName,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Methods": "PATCH",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          }
        })
        .then(async () => {
          const response = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/users/${userId}`
          );
          window.localStorage.setItem("lastName", response.data.lastName);
          setLastName(response.data.lastName);
        });
    } catch (error) {
      console.log("not user, teacher");
    }
    try {
      await axios
        .patch(process.env.REACT_APP_BACKEND_URL + `/teachers/${userId}`, {
          lastName: updateLastName,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Methods": "PATCH",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          }
        })
        .then(async () => {
          const response = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/teachers/${userId}`
          );
          window.localStorage.setItem("lastName", response.data.lastName);
          setLastName(response.data.lastName);
        });
    } catch (error) {
      console.log("not teacher, user");
    }
    setUpdateLastName("");
  };
  return (
    <div>
      {user ? (
        <div>
          {user.role === 'teacher' || user.role === 'admin' ? (
            <div className="coverProfile">
              <div
                style={{
                  backgroundImage: `url(${coverPicture?.replace('http://', 'https://')})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
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
                  />
                ) : null}
                {showButtonCoverUpdate ? (
                  <button onClick={postDetailsCover}>تثبيت</button>
                ) : null}
              </div>{" "}
              {updateProfilePic ? (
                <div style={{ zIndex: "10", marginTop: "-80px" }}>
                  <img
                    src={updateProfilePic.replace('http://', 'https://')}
                    alt={user.firstName + "me"}
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
                  <label for="inputTag">
                    <FontAwesomeIcon icon={faCamera} />
                    <input
                      type="file"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                        setShowButtonAvatarUpdate(true);
                      }}
                      id="inputTag"
                      style={{ display: "none" }}
                      // onClick={() => setUrl(null)}
                    />
                  </label>
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
                {firstName}
                {"  "}
                {lastName}
              </h2>
              <div className="profileAllButtons">
                <div
                  className="profileButtons1"
                  style={{ height: "40px" }}
                  onClick={studentsPractices}
                >
                  تمارين الطلاب
                </div>
              <div className="profileButtons1"
                  style={{ height: "40px" }}
                  onClick={addStudent}>
                اضافة طالب
              </div>
              
              {user.role === "admin" ? (<Link to="/CreateCourseForTeacher" style={{textDecoration:"none", color:"black"}}> <div className="profileButtons1"
                  style={{ height: "40px" }}>
                انشئ دورة لمعلم اخر
              </div></Link>):(null)}
              {user.role === "admin" || user.role === "teacher" ? (<Link to="/GeneralButton" style={{textDecoration:"none", color:"black"}}> <div className="profileButtons5"
                  style={{ height: "40px" }}>

اضافة فيديو عام              </div></Link>):(null)}
                <div
                  className="profileButtons2"
                  style={{ height: "40px" }}
                  onClick={() => {
                    // {goToCreateCourse}
                    setShowFormCreateCourse(true);
                    setShowChangePassword(false);
                    setShowUpdateProfile(false);
                  }}
                >
                  انشئ دورة
                </div>
                <div
                  className="profileButtons4"
                  style={{ height: "40px" }}
                  onClick={() => {
                    setShowPractice(false);
                    setShowChangePassword(false);
                    setShowUpdateProfile(true);
                    setShowFormCreateCourse(false);
                  }}
                >
                  تعديل الملف
                </div>
                {/* <div
                  className="profileButtons3"
                  style={{ height: "40px" }}
                  onClick={() => {
                    setShowChangePassword(true);
                    setShowFormCreateCourse(false);
                    setShowUpdateProfile(false);
                  }}
                >
                  تغيير كلمة المرور
                </div> */}

              </div>
              {showFormCreateCourse ? <CreateCourse /> : null}
              {showChangePassword ? <ChangePassword userId={userId} /> : null}
              {showUpdateProfile ? (
                <div className="mainChangePass">
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="الاسم"
                      style={{ width: "70%" }}
                      onChange={(e) => setUpdateFirstName(e.target.value)}
                      value={updateFirstName}
                    />
                    <button onClick={changeName}>تثبيت</button>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="العائلة"
                      style={{ width: "70%" }}
                      value={updateLastName}
                      onChange={(e) => setUpdateLastName(e.target.value)}
                    />
                    <button onClick={changeLastName}>تثبيت</button>
                  </div>
                   <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <textarea
                      type="text"
                      placeholder="السيرة الذاتية"
                      style={{ width: "70%" }}
                      value={updateDes}
                      onChange={(e) => setUpdateDes(e.target.value)}
                    />
                    <button onClick={changeDes}>تثبيت</button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              <div
                
                className="userCoverPic"
              >
                <div className="CoverTheCover">
                  <div style={{position:"absolute", right:"5px", top:"250px"}}>
                  <AboutUserPop />
                  </div>
                <div
                  style={{
                    marginTop: "30px",
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
                      updateProfilePic
                        ? updateProfilePic.replace('http://', 'https://')
                        : "https://img.icons8.com/material-rounded/24/null/user.png"
                    }
                    alt="profile"
                    width="100%"
                    height="100%"
                    style={{ borderRadius: "50%" }}
                  />
                </div>
                <div>
                  {!showButtonAvatarUpdate ? (
                    <label for="inputTag">
                      <FontAwesomeIcon icon={faCamera} />
                      <input
                        type="file"
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                          setShowButtonAvatarUpdate(true);
                        }}
                        id="inputTag"
                        style={{ display: "none" }}
                      />
                    </label>
                  ) : null}
                  {showButtonAvatarUpdate ? (
                    <button onClick={postDetails}>تثبيت</button>
                  ) : null}
                </div>
                <h2>
                  {firstName}
                  {"  "}
                  {lastName}
                </h2>
                {/* <h2>{user?.user?.email}</h2> */}
                </div>
              </div>
              <div className="profileAllButtonsUser">
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
                        backgroundColor:"#fee4b9"
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
                        backgroundColor:"#fee4b9"
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
                    <Link to={`/newMessenger/${userId}`} style={{textDecoration:"none", color:"black"}}>
                    <div
                      className="profileButtons3"
                      style={{
                        height: "40px",
                      }}
                    >
                      مراسلة
                    </div>
                    </Link>
                

                  <div
                    onClick={gotohomepage}
                    className="profileButtons1"
                    style={{ height: "40px" }}
                  >
                    الصفحة الرئيسية
                  </div>
                </div>
              {showPractice ? <div>{showData()}</div> : null}

              {showChangePassUser ? (
                <div>
                  {" "}
                  <ChangePasswordUser userId={userId} />
                </div>
              ) : null}

              {showUpdateProfile ? (
                <div className="mainChangePass">
                  تعديل الملف: 
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="الاسم"
                      style={{ width: "80%" }}
                      value={updateFirstName}
                      onChange={(e) => setUpdateFirstName(e.target.value)}
                    />
                    <button onClick={changeName} style={{width:"50px", background:"#fcedd5"}}>تثبيت</button>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="العائلة"
                      style={{ width: "80%" }}
                      value={updateLastName}
                      onChange={(e) => setUpdateLastName(e.target.value)}
                    />
                    <button onClick={changeLastName}  style={{width:"50px", background:"#fcedd5"}}>تثبيت</button>
                  </div>
                    <div style={{marginTop:"25px"}}>
                    تغيير كلمة المرور:

                  <ChangePasswordUser userId={userId} />
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
