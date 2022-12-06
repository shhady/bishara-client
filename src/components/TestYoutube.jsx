import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Teachers.css";

const youtubeurl = "https://www.googleapis.com/youtube/v3/playlistItems";
export default function TestYoutube({ listId, course }) {
  //prettier-ignore
  // const [courseId, setCourseId] = useState(JSON.parse(localStorage.getItem("courseId")));
  const [teacher, setTeacher] = useState("");
  const [videos, setVideos] = useState([]);
  const [videoSRC, setVideoSRC] = useState("9GejeXh-zKE");
  const [data, setData] = useState(null);
  useEffect(() => {
    // console.log(course);
  }, [videos]);
  // console.log(courseId);
  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(
        `${youtubeurl}?part=snippet&playlistId=${listId}&maxResults=50&key=${process.env.REACT_APP_YOUTUBE_KEY}`
      );
      setVideos(result.data.items);
      setData(result.data.items[0].snippet.thumbnails.default.url);
    };
    fetch();
  }, []);
  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/teachers/${course.owner}`
      );
      setTeacher(result.data);
    };
    fetch();
  }, [course]);
  const drawVideos = () => {
    return videos?.map((video) => {
      return (
        <div>
          <div>
            <div
              className="videosRight"
              style={{
                width: "90%",
                marginTop: "5px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                cursor: "pointer",
                // border: "1px solid grey",
              }}
              onClick={() => {
                setVideoSRC(video.snippet.resourceId.videoId);
              }}
            >
              <div> {video.snippet.title}</div>
              <div>
                {" "}
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt="pic"
                  height="50px"
                />
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <>
      <div style={{ width: "100%", height: "30vh" }}>course Img</div>
      <div className="profile-teacher">
        <div style={{ width: "150px", height: "150px" }}>
          <img
            src={course.avatar}
            alt="profile"
            width="100%"
            height="100%"
            style={{ borderRadius: "50%" }}
          />
        </div>
      </div>
      <div
        style={{
          marginTop: "150px",
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
        }}
      >
        <div>{drawVideos()}</div>
        <div>
          <div style={{ width: "90%", marginTop: "3px" }}>
            <iframe
              width="100%"
              height="361"
              src={`https://www.youtube.com/embed/${videoSRC}`}
              title="Fadi a"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
