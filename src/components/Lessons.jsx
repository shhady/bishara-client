import React, { useState, useEffect } from "react";
import "./Lessons.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
const youtubeurl = "https://www.googleapis.com/youtube/v3/playlistItems";

export default function Lessons() {
  const [courseInfo, setCourseInfo] = useState(
    JSON.parse(localStorage.getItem("courseDetails"))
  );
  const [listId, setListId] = useState("");
  const [lessons, setLessons] = useState([]);
  const history = useHistory();

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
    history.push({
      pathname: `/Lesson/${lesson.snippet.playlistId}/${lesson.snippet.resourceId.videoId}`,
      id: lesson.snippet.playlistId,
    });
    window.localStorage.setItem("lessonDetails", JSON.stringify(lesson));
  };
  const drawLessons = () => {
    return lessons?.map((lesson, i) => {
      return (
        <div key={i}>
          {/* <Link to="/Lesson" style={{ textDecoration: "none" }}> */}
          <div onClick={() => handleLessonClick(lesson)}>
            <div
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
      <div className="cover">
        <img
          src={
            courseInfo.coursePhoto
              ? courseInfo.coursePhoto
              : "https://images.unsplash.com/photo-1546058256-47154de4046c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fHBpYW5vfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
          }
          width="70%"
          height="100%"
          objectFit="fit"
        />
      </div>
      <div className="profile">
        <div
          style={{
            width: "150px",
            height: "150px",
            border: "2px solid white",
            borderRadius: "50%",
          }}
        >
          <img
            src={courseInfo.avatar}
            alt="profile"
            width="150px"
            height="150px"
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginTop: "10px",
            textAlign: "center",
            // alignItems: "flex-start",
          }}
        >
          <div>
            <h1>
              {courseInfo.firstName}
              {"  "}
              {courseInfo.lastName}
            </h1>
          </div>
          <div>
            <span
              style={{ fontWeight: "bold", fontSize: "24px", color: "black" }}
            >
              {courseInfo.title}
            </span>
          </div>
        </div>
      </div>
      <div className="hrMargin">{courseInfo.description}</div>

      <div>
        <hr />
      </div>
      <div className="lessonsVideos">{drawLessons()}</div>
    </div>
  );
}
