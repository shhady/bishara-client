import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./createCourse.css";
const youtubeurl = "https://www.googleapis.com/youtube/v3/playlistItems";

// import Courses from "../Courses";
export default function CreateCourse() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [popUp, setPopUp] = useState(false);
  const [url, setUrl] = useState(null);
  const [image, setImage] = useState();
  const [fileUpload, setFileUpload] = useState(null);
  const [photoFromPlayList, setPhotoFromPlayList] = useState("");
  const [course, setCourse] = useState({
    instrument: "",
    firstName: "",
    lastName: "",
    title: "",
    avatar: "",
    description: "",
    level: "",
    playlistId: "",
    coursePhoto: "",
    // coursePhotoManual: "",
    // videos: [],
  });
  const [final, setFinal] = useState(course);
  const history = useHistory();
  const firstName = useRef(user.teacher.firstName);
  const lastName = useRef(user.teacher.lastName);
  const avatar = useRef(user.teacher.avatar);
  console.log(url);
  console.log(course);
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
      // .then((url) => {
      //   setCourse({ ...course, coursePhoto: url });
      // })
      // .then(console.log(profilePic))
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setCourse({ ...course, coursePhoto: url ? url : photoFromPlayList });
  }, [url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPopUp(true);
    // if (isSignUp) {
    //   dispatch(signup(formData, history));
    // } else {
    //   dispatch(signin(formData, history));
    // }
    await axios.post(process.env.REACT_APP_BACKEND_URL + `/courses`, course, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    });
    // history.push("/courses/");
  };

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(
        `${youtubeurl}?part=snippet&playlistId=${course.playlistId}&maxResults=50&key=${process.env.REACT_APP_YOUTUBE_KEY}`
      );
      // setVideos(result.data.items);
      setPhotoFromPlayList(result.data.items[0].snippet.thumbnails.high.url);
    };
    fetch();
  }, [course.playlistId]);

  // const createNow = () => {};
  useEffect(() => {
    setCourse({
      ...course,
      // [e.target.name]: e.target.value,
      firstName: firstName.current,
      lastName: lastName.current,
      // instrument: e.target.value,
      avatar: avatar.current,
      // level: e.target.value,
    });
  }, [final]);

  return (
    <div style={{ width: "80%" }}>
      <form onSubmit={handleSubmit}>
        <div className="createCourseForm">
          <input
            type="text"
            defaultValue={firstName.current}
            name="firstName"
            style={{
              textAlign: "start",
              width: "100%",
              marginBottom: "20px",
              marginTop: "20px",
            }}

            // onChange={handleChange}
          />
          <input
            type="text"
            defaultValue={user.teacher.lastName}
            name="lastName"
            style={{ textAlign: "start", width: "100%" }}
            // onChange={handleChange}
          />
          <input
            placeholder="?????????? ????????????"
            name="title"
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            style={{ textAlign: "start", width: "100%", marginTop: "20px" }}
            // onChange={handleChange}
            // autoFocus
            required
          />
          <select
            style={{
              textAlign: "start",
              width: "100%",
              marginTop: "20px",
              marginBottom: "20px",
            }}
            onChange={(e) =>
              setCourse({ ...course, instrument: e.target.value })
            }
            required
          >
            <option value=""> ?????????? ??????????????????</option>
            <option value="??????????">??????????</option>
            <option value="??????">??????</option>
            <option value="????????">????????</option>
            <option value="??????????">??????????</option>
            <option value="??????????">??????????</option>
            <option value="??????????">??????????</option>
            <option value="??????">??????</option>
            <option value="??????????">??????????</option>
            <option value="??????">??????</option>
          </select>
          <select
            style={{ textAlign: "start", width: "100%" }}
            onChange={(e) => setCourse({ ...course, level: e.target.value })}
            required
          >
            <option value="">??????????????</option>
            <option value="??????????">??????????</option>
            <option value="??????????/??????????">??????????/??????????</option>
            <option value="??????????">??????????</option>
            <option value="??????????/??????????">??????????/??????????</option>
            <option value="??????????">??????????</option>
          </select>

          <input
            placeholder="playlistId - from youtubeLink"
            name="playlistId"
            onChange={(e) =>
              setCourse({ ...course, playlistId: e.target.value })
            }
            style={{ textAlign: "start", width: "100%", marginTop: "20px" }}
            // onChange={handleChange}
            // autoFocus
            required
          />
          <div className="addFileCoverCourse">
            <input
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />

            <button onClick={postDetails} className="addFileCoverCourseButton">
              ?????????? ???????? ????????????
            </button>
            {/* <div> */}
            {fileUpload && (
              <span style={{ textAlign: "center" }}>
                {" "}
                {fileUpload.percentComplete}%
              </span>
            )}
            {/* </div> */}
          </div>

          <textarea
            placeholder="?????? ????????????"
            name="description"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            style={{ textAlign: "start", width: "100%" }}
            // onChange={handleChange}
            // autoFocus
            required
          />

          {/*  <input
          placeholder="??????????????"
          name="level"
          onChange={handleChange}
          required
        /> */}
          {/* <input type="file" name="videos" onChange={handleChangeVideos} /> */}
          <input
            className="createCourseSubmit"
            type="submit"
            style={{
              textAlign: "center",
              width: "100%",
              marginBottom: "20px",
              cursor: "pointer",
              marginTop: "20px",
            }}
            // onClick={() => setRefresh(!refresh)}
          />
        </div>
      </form>
      {/* <div style={{ display: "none" }}>
        <Courses refresh={refresh} setRefresh={setRefresh} />
      </div> */}
      {popUp ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            width: "100vw",
            height: "100vh",
            background: "grey",
            opacity: 0.8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center", width: "80%", margin: "auto" }}>
            <h2>
              ???????????? ???????? ?????????????? ?????????? ???????????? ???? ???????? ?????????????? ??????????????????
              <br /> ???????? ?????????? ?????????? ???????? ????????????????????
            </h2>
            <br />
            <button
              style={{ width: "60%" }}
              onClick={() => history.push("/courses")}
            >
              ???????? ?????????????? ??????????????????
            </button>
          </div>
          <div
          // style={{
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          // }}
          ></div>
        </div>
      ) : null}
    </div>
  );
}
