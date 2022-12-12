import React, { useState, useEffect } from "react";
import "./Lessons.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
const youtubeurl = "https://www.googleapis.com/youtube/v3/playlistItems";

export default function Lessons({ user }) {
  const [courseInfo, setCourseInfo] = useState(
    JSON.parse(localStorage.getItem("courseDetails"))
  );
  const [listId, setListId] = useState("");
  const [lessons, setLessons] = useState([]);
  const history = useHistory();
  window.onpopstate = () => {
    history.push("/TeacherData");
  };
  useEffect(() => {
    setListId(courseInfo.playlistId);
  }, [courseInfo]);
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
  };
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
                height: "150px",
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

  return (
    <div className="courseDataAll">
      <div
        className="lessonCoverBig"
        style={{
          backgroundImage: `url(${
            courseInfo.coursePhoto
              ? courseInfo.coursePhoto
              : "https://images.unsplash.com/photo-1546058256-47154de4046c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fHBpYW5vfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
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
      </div>
      <div className="profile">
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
              <h1 style={{ fontSize: "38px" }}>{courseInfo.title}</h1>
              <h1 style={{ fontSize: "24px" }}>
                من قبل المدرس {courseInfo.firstName}
                {"  "}
                {courseInfo.lastName}
              </h1>
            </div>
          </div>
          <div className="part2Info">{courseInfo.description}</div>
        </div>
      </div>

      <div className="lessonsVideos">{drawLessons()}</div>
    </div>
  );
}
