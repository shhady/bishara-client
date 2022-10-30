import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import Comment from "./Comment";
import CourseVideo from "./CourseVideo";
import "./course.css";
export default function Course() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [userId, setUserId] = useState("");
  // const [posts, setposts] = useState(null);
  const [course, setCourse] = useState(null);
  //prettier-ignore
  const [courseId, setCourseId] = useState(localStorage.getItem("courseId"));
  const [video, setVideo] = useState(null);
  const [url, setUrl] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);
  const [episode, setEpisode] = useState("");
  const [chooseVideo, setChooseVideo] = useState(null);
  const [arrayVideos, setArrayVideos] = useState([]);
  const [test, setTest] = useState(true);
  const [buttonNew, setButtonNew] = useState([]);
  const [buttonName, setButtonName] = useState("");
  const [markedButton, setMarkedButton] = useState(null);
  // const [submitComment, setSubmitComment] = useState("");
  // const [submittedText, setSubmitedText] = useState(null);
  // const [allComments, setAllComments] = useState(null);
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const location = useLocation();
  const history = useHistory();
  const handleepisode = (e) => {
    setEpisode(e.target.value);
  };

  window.onpopstate = () => {
    history.push("/courses");
  };
  console.log(user);
  useEffect(() => {
    if (!user) return;
    user.teacher ? setUserId(user.teacher._id) : setUserId(user.user._id);

    // setCourseId(location.id);
  }, []);
  console.log(course);

  useEffect(() => {
    if (!courseId) return;
    const fetch = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/courses/${courseId}`
      );
      console.log(res.data);
      setCourse(res.data);
    };
    fetch();
  }, [courseId]);

  const postDetails = () => {
    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", "bisharaHaroni");
    // formData.append("cloud_name", "shhady");
    axios
      .post("https://api.cloudinary.com/v1_1/shhady/upload", formData, {
        onUploadProgress: (p) => {
          const percentComplete = Math.round((p.loaded * 100) / p.total);
          setFileUpload({ fileName: video.name, percentComplete });
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
    const fetch = async () => {
      console.log(url);
      setFileUpload(null);
      if (!url) return;
      setChooseVideo({ url: url });
      if (episode === "") return;
      //   setButtonNew([...buttonNew, episode]);
      // } else {
      //   return console.log("no name");
      // }
      setEpisode("");
      if (!courseId) return console.log("addeddd");
      await axios.put(
        process.env.REACT_APP_BACKEND_URL + `/courses/${courseId}`,
        {
          episode,
          url,
        }
      );
    };
    fetch();
  }, [url]);
  console.log(buttonNew);

  useEffect(() => {
    const res = async () => {
      const getData = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/courses/${courseId}`
      );
      setCourse(getData.data);
      console.log(getData.data.videos[getData.data.videos.length - 1]);
    };
    res();
    // window.localStorage.setItem("videoId", post.owner);
  }, [chooseVideo]);
  // useEffect(() => {
  //   setTest(true);
  // }, [test]);
  const clickToOpenVideo = (episode) => {
    const chosenVideo = course?.videos.find(
      (obj) => obj.episode === episode.episode
    );
    setMarkedButton(episode.episode);
    setChooseVideo(chosenVideo);
    window.localStorage.setItem("videoId", chosenVideo._id);
    window.localStorage.setItem("videoName", episode.episode);
  };
  // console.log(chooseVideo);
  const showButtons = () => {
    return course?.videos.map((episode, i) => {
      return (
        <div key={i}>
          {markedButton === episode.episode ? (
            <button
              className="buttonChooseVideo"
              onClick={() => clickToOpenVideo(episode)}
              style={{ backgroundColor: "grey" }}
            >
              {episode.episode}
            </button>
          ) : (
            <button
              className="buttonChooseVideo"
              onClick={() => clickToOpenVideo(episode)}
            >
              {episode.episode}
            </button>
          )}
        </div>
      );
    });
  };

  const showData = () => {
    return (
      <div className="coursePage">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={course?.avatar}
            alt={course?.instrument}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              marginLeft: "20px",
            }}
          />
          <div>
            {course?.firstName}
            {"  "}
            {course?.lastName}
          </div>
        </div>
        {/* <div className="detailsOfCourse"> */}
        <div>{course?.instrument}</div>
        <div>{course?.level}</div>
        {/* </div> */}
      </div>
    );
  };

  const chooseVideoAfterUpload = (e) => {
    setButtonName(e.target.innerText);
    const fetchVideos = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/courses/${courseId}`
      );
      // setChooseVideoAfterUploadAndFetch
      const result = res?.data.videos.find(
        (video) => video.episode === e.target.innerText
      );
      setChooseVideo(result);
    };
    fetchVideos();
  };

  const deletecourse = () => {
    const deleteTheCourse = async () => {
      await axios.delete(
        process.env.REACT_APP_BACKEND_URL + `/courses/${course._id}`
      );
    };
    deleteTheCourse();
    history.push("/courses");
  };
  return (
    <>
      <div style={{ marginTop: "130px" }}>{showData()}</div>
      {userId === course?.owner ? (
        <div className="teacherSection">
          <div>
            <button style={{ width: "100%" }} onClick={deletecourse}>
              حذف الدوره بشكل كامل
            </button>
          </div>
          <div className="uploadVideos">
            <span>قم برفع الدروس حسب الترتيب</span>
            <input
              name="episode"
              placeholder="اسم الدرس"
              onChange={handleepisode}
              value={episode}
              required
              className="episodeNameInput"
            />
            <input
              type="file"
              onChange={(e) => setVideo(e.target.files[0])}
              onClick={() => setUrl(null)}
            />
            <button onClick={postDetails} className="submitVideo">
              Submit
            </button>
          </div>
          <div style={{ minWidth: "70px" }}>
            {fileUpload && (
              <span style={{ textAlign: "center" }}>
                {" "}
                تم رفع {fileUpload.percentComplete}%
              </span>
            )}
            {url ? (
              <span style={{ textAlign: "center" }}>يمكنك رفع فيديو اخر</span>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="videosAndComments">
        <div>
          {showButtons()}{" "}
          {/* {buttonNew.length > 0
            ? buttonNew.map((button, i) => (
                <button
                  key={i}
                  className="buttonChooseVideo"
                  onClick={chooseVideoAfterUpload}
                >
                  {button}
                </button>
              ))
            : null} */}
        </div>
        {/* <div>{showVideos()}</div> */}
        <div>
          <CourseVideo
            chooseVideo={chooseVideo}
            setChooseVideo={setChooseVideo}
            course={course}
          />
          <div
            style={{
              marginTop: "10px",
            }}
          >
            {/* <Comment course={course} courseId={courseId} /> */}
          </div>
        </div>
      </div>
    </>
  );
}
