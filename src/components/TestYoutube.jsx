import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Teachers.css";

const youtubeurl = "https://www.googleapis.com/youtube/v3/playlistItems";
export default function TestYoutube() {
  const [videos, setVideos] = useState([]);
  const [videoSRC, setVideoSRC] = useState("9GejeXh-zKE");
  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(
        `${youtubeurl}?part=snippet&playlistId=PLKAaUs9rBhZD6kCfB1l152CUiqlNU-TVo&maxResults=50&key=${process.env.REACT_APP_YOUTUBE_KEY}`
      );
      setVideos(result.data.items);
      console.log("here is the fetch");
    };
    fetch();
  }, []);
  console.log(videos);
  const drawVideos = () => {
    return videos.map((video) => {
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
              onClick={() => setVideoSRC(video.snippet.resourceId.videoId)}
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
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
