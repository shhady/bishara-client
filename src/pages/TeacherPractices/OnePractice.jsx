import React, { useState, useEffect } from 'react';
import AddReply from './AddReply';
import { useParams, Link } from 'react-router-dom';
import "./NewTeacherPractices.css";
import axios from 'axios';

export default function TeacherPractices({ practices }) {
  const [practice, setPractice] = useState(null);
  const [poster, setPoster] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchPractice = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/practice/${id}`);
        setPractice(response.data);
      } catch (error) {
        console.error("Error fetching practice:", error);
      }
    };

    fetchPractice();
  }, [id]);

  useEffect(() => {
    function checkSafari() {
      if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        setPoster("https://images.pexels.com/photos/6044198/pexels-photo-6044198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
      }
    }

    checkSafari();
  }, []);

  const handleCommentAdd = (updatedPractice) => {
    setPractice(updatedPractice);
  };

  const handleVideoAdd = (updatedPractice) => {
    setPractice(updatedPractice);
  };

  const handleRecordAdd = (updatedPractice) => {
    setPractice(updatedPractice);
  };

  return (
    <div>
      {practice && (
        <div className="practicesNew" style={{ marginTop: "80px", position:'relative' }}>
           {practice.RecordReply.length > 0 || practice.videoReply.length > 0 && 
           <div style={{ position: "absolute", left: "10px", top: '10px' }}>
          <Link to={`/EditReplies/${practice._id}`}>
            <button>تعديل الرد</button>
          </Link>
        </div>}
          <div>الاسم: {practice?.studentFirstName} {practice?.studentLastName}</div>
          {practice?.courseId === "evaluation" ? (
            <>
              <div>الخبره: {practice?.expTime}</div>
              <div>اين تعلم: {practice?.whereStudied}</div>
              <div>الهدف: {practice?.goal}</div>
            </>
          ) : (
            <>
              <div>الدوره: {practice?.courseName} / {practice?.courseLevel}</div>
              <Link to={`/NewLesson/${practice.courseId}?name=${practice.uniqueLink}&playlist=${practice.playlistId}`}
               style={{textDecoration:"none", color:"black"}}><>الدرس: {practice.video}</></Link>
            </>
          )}

          <div className="videoAndRepliesContainer">
            <div className="videoContainer">
              <video controls preload="metadata" className="videoOfPractice" poster={poster}>
                <source src={practice?.myPractice.replace('http://', 'https://')} type="video/mp4" />
              </video>
            </div>
            <div style={{ padding: "0px 10px" }}>
              <div className="RepliesVideos" style={{ marginBottom: "10px" }}>
                {practice?.videoReply.map((reply, index) => (
                  <video
                    key={index}
                    controls
                    preload="metadata"
                    className="RepliesVideo"
                    poster={poster}
                  >
                    <source src={reply.theVideoReply.replace('http://', 'https://')} type="video/mp4" />
                  </video>
                ))}
              </div>
              <div className="recordings">
                {practice?.RecordReply.map((rec, index) => (
                  <audio key={index} style={{ width: '100%' }} controls>
                    <source src={rec.RecordingReply.replace('http://', 'https://')} type="audio/mp4" />
                  </audio>
                ))}
              </div>
              {practice?.reply ? <div className="commentOnPractice">{practice?.reply}</div> : null}
            </div>
          </div>

          <div style={{ padding: '15px', border: '1px solid black', marginTop: '10px' }}>
            <AddReply
              practice={practice}
              onCommentAdd={handleCommentAdd}
              onVideoAdd={handleVideoAdd}
              onRecordAdd={handleRecordAdd}
            />
          </div>
        </div>
      )}
    </div>
  );
}
