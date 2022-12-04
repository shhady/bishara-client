import React, { useState, useEffect } from "react";
import "./Lesson.css";
import axios from "axios";
const youtubeurl = "https://www.googleapis.com/youtube/v3/playlistItems";

export default function Lessons() {
  const [courseInfo, setCourseInfo] = useState(
    JSON.parse(localStorage.getItem("courseDetails"))
  );
  const [listId, setListId] = useState("");
  const [lessons, setLessons] = useState([]);
  console.log(courseInfo);
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
      console.log("here is the fetch");
    };
    fetch();
  }, [listId]);
  console.log(lessons);

  const drawLessons = () => {
    return lessons?.map((lesson) => {
      return <div>{lesson.snippet.title}</div>;
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
