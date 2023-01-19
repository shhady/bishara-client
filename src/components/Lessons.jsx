import React, { useState, useEffect } from "react";
import "./Lessons.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faPenToSquare,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
const youtubeurl = "https://www.googleapis.com/youtube/v3/playlistItems";
export default function Lessons({ user, updateComponent, setUpdateComponent }) {
  const [courseInfo, setCourseInfo] = useState(
    JSON.parse(localStorage.getItem("courseDetails"))
  );
  const [updated, setUpdated] = useState(updateComponent);
  const [courseCover, setCourseCover] = useState(""
    // window.localStorage.getItem("courseCover")
  );
  const [courseTitle, setCourseTitle] = useState(""
    // window.localStorage.getItem("courseTitle")
  );
  const [courseDes, setCourseDes] = useState(""
    // window.localStorage.getItem("coursedes")
  );

  const [listId, setListId] = useState("");
  const [url, setUrl] = useState(null);
  const [image, setImage] = useState();
  const [fileUpload, setFileUpload] = useState(null);
  const [inputTitle, setInputTitle] = useState(false);
  const [inputDescription, setInputDescription] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [newValueDes, setNewValueDes] = useState("");

  const [lessons, setLessons] = useState([]);
  const history = useHistory();
  window.onpopstate = () => {
    history.push("/TeacherData");
    setUpdated("");
  };

  console.log(courseInfo);
  console.log(updateComponent);

  useEffect(() => {
    if (!image) return;
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
    postDetails();
  }, [image]);

  useEffect(() => {
    if (!url) return;
    const changePhoto = async () => {
      await axios
        .patch(
          process.env.REACT_APP_BACKEND_URL + `/courses/${courseInfo._id}`,
          {
            coursePhoto: url,
          }
        )
        .then(() => {
          // window.localStorage.setItem("courseCover", url);
          setCourseCover(url);
        }).then(async () => {
          const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/courses/${courseInfo._id}`
          );
          window.localStorage.setItem("courseDetails", JSON.stringify(res.data));
          setCourseInfo(res.data)
          console.log(res);
        });
    };
    changePhoto();
    console.log(url);
    setUpdateComponent({...updateComponent, coursePhoto:url})

  }, [url]);

  useEffect(() => {
    setUpdated(updateComponent);
  }, [updateComponent]);

  console.log(updated);
  useEffect(() => {
    if (updated) {
      setListId(updated.playlistId);
    } else {
      setListId(courseInfo.playlistId);
    }
  }, [courseInfo, updated]);
  console.log(listId);
  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(
        `${youtubeurl}?part=snippet&playlistId=${listId}&maxResults=50&key=${process.env.REACT_APP_YOUTUBE_KEY}`
      );
      setLessons(result.data.items);
      //   setData(result.data.items[0].snippet.thumbnails.default.url);
    };
    fetch();
  }, [listId]);

  const handleLessonClick = (lesson) => {
    if (user) {
      history.push({
        pathname: `/Lesson/${lesson.snippet.playlistId}/${lesson.snippet.resourceId.videoId}`,
        id: lesson.snippet.playlistId,
      });
    } else {
      history.push("/auth");
    }

    window.localStorage.setItem("lessonDetails", JSON.stringify(lesson));
    window.localStorage.setItem("courseOwnerId", courseInfo.owner);
    window.localStorage.setItem("playlistId", lesson.snippet.playlistId);
    window.localStorage.setItem("teacherId", updated.owner);
  };
  console.log(lessons);
  useEffect(() => {}, [lessons]);
  const drawLessons = () => {
    return lessons?.map((lesson, i) => {
      return (
        <div key={i}>
          {/* <Link to="/Lesson" style={{ textDecoration: "none" }}> */}
          <div onClick={() => handleLessonClick(lesson)}>
            <div
              className="lessonCover"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "210px",
                backgroundImage: `url(${lesson.snippet.thumbnails.high.url})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  color: "white",
                  background: "rgba(0,0,0,0.2)",
                  width: "fit-content",
                  borderRadius: "50%",
                }}
              >
                <FontAwesomeIcon icon={faCirclePlay} size="3x" />
              </div>
              {/* <img
              src={lesson.snippet.thumbnails.high.url}
              alt="photo"
              width="100%"
              height="150px"
            /> */}
              {/* <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/9GejeXh-zKE"
              title="Fadi a"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe> */}
            </div>
            <div style={{ textAlign: "center" }}>{lesson.snippet.title}</div>
          </div>
          {/* </Link> */}
        </div>
      );
    });
  };

  const openInputDescription = () => {
    setInputDescription(true);
  };
  const openInputTitle = () => {
    setInputTitle(true);
  };

  const changeTitle = () => {
    if (!newValue) setInputTitle(false);

    const changeTitle = async () => {
      await axios
        .patch(
          process.env.REACT_APP_BACKEND_URL + `/courses/${courseInfo._id}`,
          {
            title: newValue,
          }
        )
        .then(() => {
          // window.localStorage.setItem("courseTitle", newValue);
          setCourseTitle(newValue);
          setUpdated({...updated, title:newValue})
         
        })
        .then(async () => {
          const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/courses/${courseInfo._id}`
          );
          window.localStorage.setItem("courseDetails", JSON.stringify(res.data));
          setCourseInfo(res.data)
          console.log(res);
        });
    };
    changeTitle();
    setInputTitle(false);
  };
  const changeDescription = () => {
    if (!newValueDes) setInputDescription(false);
    const changeDes = async () => {
      await axios
        .patch(
          process.env.REACT_APP_BACKEND_URL + `/courses/${courseInfo._id}`,
          {
            description: newValueDes,
          }
        )
        .then(() => {
          // window.localStorage.setItem("coursedes", newValueDes);
          setCourseDes(newValueDes);
          setUpdateComponent({...updateComponent, description:newValueDes})

        })
        .then(async () => {
          const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/courses/${courseInfo._id}`
          );
          console.log(res);
          window.localStorage.setItem("courseDetails", JSON.stringify(res.data));
          setCourseInfo(res.data)
        });
    };
    changeDes();
    setInputDescription(false);
  };

  return (
    <div className="courseDataAll">
      <div
        className="lessonCoverBig"
        style={{
          backgroundImage: `url(${
            updated ? updated.coursePhoto : courseInfo.coursePhoto
          })`,
          // backgroundPosition: "center",
          // backgroundSize: "cover",
          // backgroundRepeat: "no-repeat",
          // height: "200px",
          // width: "100%",
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "flex-end",
          // alignItems: "flex-start",
          // position: "relative",
        }}
      >
        {/* <img
          src={
            courseInfo.coursePhoto
              ? courseInfo.coursePhoto
              : "https://images.unsplash.com/photo-1546058256-47154de4046c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fHBpYW5vfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
          }
          width="100%"
          height="100%"
          objectFit="fit"
        /> */}
        <div
          style={{
            height: "100%",
            width: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            // alignItems: "flex-end",
          }}
        >
          {user?.teacher?._id === courseInfo.owner ? (
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <label for="inputTag">
                <FontAwesomeIcon
                  icon={faCamera}
                  style={{ cursor: "pointer" }}
                />
                <input
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  id="inputTag"
                  style={{ display: "none" }}
                  // onClick={() => setUrl(null)}
                />
              </label>
            </div>
          ) : null}
        </div>
      </div>
      <div className="profile1">
        {/* <div
          style={{
            width: "100%",
            // height: "150px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={courseInfo.avatar}
            alt="profile"
            width="150px"
            height="150px"
            style={{ borderRadius: "50%", border: "2px solid white" }}
          />
        </div> */}
        <div className="infoinfo">
          <div className="partInfo">
            {/* <h1>
              {courseInfo.firstName}
              {"  "}
              {courseInfo.lastName}
              {"  "}
            </h1> */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {inputTitle ? (
                  <div style={{ marginTop: "40px" }}>
                    <input onChange={(e) => setNewValue(e.target.value)} />
                    <button onClick={changeTitle}>تثبيت</button>
                  </div>
                ) : (
                  <>
                    <h1 style={{ fontSize: "38px" }}>
                      {updated ? updated.title : courseInfo.title}
                    </h1>
                    {user?.teacher?._id === courseInfo.owner ? (
                      <h3
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: "15px",
                        }}
                        onClick={openInputTitle}
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          style={{ cursor: "pointer" }}
                        />
                      </h3>
                    ) : null}
                  </>
                )}
              </div>
              <h1 style={{ fontSize: "24px" }}>
                {updated ? updated.firstName : courseInfo.firstName}
                {"  "}
                {updated ? updated.lastName : courseInfo.lastName}
              </h1>
            </div>
          </div>
          <div className="part2Info">
            {inputDescription ? (
              <div style={{ marginTop: "20px" }}>
                <textarea
                  onChange={(e) => setNewValueDes(e.target.value)}
                  style={{ width: "100%", height: "100%" }}
                />
                <button onClick={changeDescription}>تثبيت</button>
              </div>
            ) : (
              <>
                {user?.teacher?._id === courseInfo.owner ? (
                  <h3
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "25px",
                    }}
                    onClick={openInputDescription}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ cursor: "pointer" }}
                    />
                  </h3>
                ) : null}

                {updated ? updated.description : courseInfo.description}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="lessonsVideos">{drawLessons()}</div>
    </div>
  );
}
