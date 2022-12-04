import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Lesson.css";
import { useHistory } from "react-router-dom";
const youtubeurl = "https://www.googleapis.com/youtube/v3/playlistItems";

export default function Lesson() {
  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState(
    JSON.parse(localStorage.getItem("lessonDetails"))
  );
  const [courseInfo, setCourseInfo] = useState(
    JSON.parse(localStorage.getItem("courseDetails"))
  );
  const [listId, setListId] = useState("");

  const history = useHistory();
  window.onpopstate = () => {
    history.push("/lessons");
  };
  useEffect(() => {
    setListId(courseInfo.playlistId);
  }, [courseInfo]);
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
      console.log("here is the fetch");
    };
    fetch();
  }, [listId]);

  const handleLessonClick = (lessonSuggest) => {
    console.log(lessonSuggest);
    setLesson(lessonSuggest).then(() => {
      window.localStorage.setItem(
        "lessonDetails",
        JSON.stringify(lessonSuggest)
      );
    });
  };
  const drawSuggestions = () => {
    return lessons?.map((lessonSuggest, i) => {
      return (
        <div key={i} onClick={() => handleLessonClick(lessonSuggest)}>
          <div>
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
          {lesson.snippet.position + 1}
        </div>
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${lesson.snippet.resourceId.videoId}`}
          title="Fadi a"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div className="suggestions">{drawSuggestions()}</div>
    </div>
  );
}
