import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import axios from "axios";
export default function CourseVideo({ chooseVideo, setChooseVideo, course }) {
  const [videoId, setVideoId] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [videoMatch, setVideoMatch] = useState(true);

  useEffect(() => {
    if (!chooseVideo?._id) {
      setVideoMatch(false);
    } else {
      setVideoMatch(true);
    }
  }, [chooseVideo]);
  // const [courseId, setCourseId] = useState(JSON.parse(localStorage.getItem("courseId")));
  // useEffect(() => {
  //   const fetch = async () => {
  //     const result = await axios.get(
  //       process.env.REACT_APP_BACKEND_URL + `/courses/${courseId}`
  //     );
  //     setAllVideos(result.data.videos[result.data.videos.length]._id);
  //   };
  //   fetch();
  // }, [course]);
  console.log(course);
  console.log(chooseVideo?._id);
  console.log(videoId);
  const deleteVideo = async () => {
    const res = await axios.put(
      process.env.REACT_APP_BACKEND_URL + `/course/${courseId}`,
      {
        videoId,
      }
    );
    setChooseVideo(null);
  };

  useEffect(() => {
    setVideoId(localStorage.getItem("videoId"));
    setCourseId(localStorage.getItem("courseId"));
  }, [chooseVideo]);
  const showVideos = () => {
    console.log(chooseVideo);
    return (
      <>
        {chooseVideo ? (
          <div>
            <video
              key={chooseVideo.url}
              controls
              style={{ width: "100%", height: "370px", marginTop: "10px" }}
            >
              <source src={chooseVideo.url} type="video/mp4" />
            </video>
          </div>
        ) : null}
      </>
    );
  };
  return (
    <div>
      <div>{showVideos()}</div>
      <div>
        {chooseVideo ? (
          <>
            {videoMatch ? (
              <>
                {course.owner === user.teacher?._id ? (
                  <div>
                    <button onClick={deleteVideo}>حذف الدرس</button>
                  </div>
                ) : null}
              </>
            ) : null}
            <Comment chooseVideo={chooseVideo} course={course} />
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            اضغط على الدرس لبدأ الدوره
          </div>
        )}
      </div>
    </div>
  );
}
