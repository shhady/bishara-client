import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Lesson.css";
import { useHistory, useParams } from "react-router-dom";
import CommentYouTubeVideo from "./CommentYouTubeVideo";
const youtubeurl = "https://www.googleapis.com/youtube/v3/playlistItems";

export default function Lesson({ socket }) {
  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState(
    JSON.parse(localStorage.getItem("lessonDetails"))
  );
  const [courseInfo, setCourseInfo] = useState(
    JSON.parse(localStorage.getItem("courseDetails"))
  );
  const [listId, setListId] = useState(localStorage.getItem("playlistId"));
  const [videoChosen, setVideoChosen] = useState(
    localStorage.getItem("videoName")
  );
  const [videoNumber, setVideoNumber] = useState(lesson.snippet.position + 1);
  let { id } = useParams();
  const history = useHistory();
  window.onpopstate = () => {
    history.push("/lessons");
  };

  console.log(id);
  useEffect(() => {
    setListId(courseInfo.playlistId);
  }, [courseInfo]);
  console.log(
    window.location.pathname.slice(43, window.location.pathname.length)
  );
  console.log(lesson);
  console.log(courseInfo);
  console.log(lessons);

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

  const handleLessonClick = (lessonSuggest) => {
    setLesson(lessonSuggest);
    // history.push({
    //   pathname: `/Lesson/${lesson.snippet.playlistId}/${id}`,
    //   id: lesson.snippet.playlistId,
    // });
    window.localStorage.setItem("lessonDetails", JSON.stringify(lessonSuggest));
    window.localStorage.setItem(
      "videoName",
      lessonSuggest.snippet.resourceId.videoId
    );
  };
  useEffect(() => {
    history.replace(`${lesson.snippet.resourceId.videoId}`);
  }, [lesson]);
  console.log(lesson.snippet.position + 1);

  const drawSuggestions = () => {
    return lessons?.map((lessonSuggest, i) => {
      return (
        <div key={i} onClick={() => handleLessonClick(lessonSuggest)}>
          <div>
            {id === lessonSuggest.snippet.resourceId.videoId ? (
              <div className="VideoSuggested">
                <div
                  style={{
                    position: "absolute",
                    zIndex: 10,
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  ...Playing
                </div>
                <img
                  src={lessonSuggest.snippet.thumbnails.high.url}
                  alt="suggested"
                  width="110px"
                  height="110px"
                />
              </div>
            ) : (
              <div className="VideoSuggested">
                <div
                  style={{
                    position: "absolute",
                    zIndex: 10,
                    backgroundColor: "white",
                    width: "30px",
                    textAlign: "center",
                    borderBottomLeftRadius: "50%",
                  }}
                >
                  {lessonSuggest.snippet.position + 1}
                </div>
                <img
                  src={lessonSuggest.snippet.thumbnails.high.url}
                  alt="suggested"
                  width="110px"
                  height="110px"
                />
              </div>
            )}

            {/* <div>{lessonSuggest.snippet.title}</div> */}
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="videoLesson">
        <div
          style={{
            position: "absolute",
            zIndex: 2,
            backgroundColor: "white",
            width: "30px",
            textAlign: "center",
            borderBottomLeftRadius: "50%",
          }}
        >
          {/* {videoNumber} */}
        </div>
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${id}`}
          title="Fadi a"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="suggestions">{drawSuggestions()}</div>
      <div style={{ marginTop: "50px" }}>
        <CommentYouTubeVideo
          lesson={lesson}
          id={id}
          courseInfo={courseInfo}
          socket={socket}
        />
      </div>
    </div>
  );
}
