import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./NewTeacherPractices.css";

export default function EditReplies() {
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

  const handleDeleteVideo = async (replyId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/practice/videoReply/${id}`,
        { replyId }
      );
      
      const updatedPractice = { ...practice };
      updatedPractice.videoReply = updatedPractice.videoReply.filter(reply => reply.replyId !== replyId);
      setPractice(updatedPractice);
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const handleDeleteRecord = async (replyId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/practice/deleteRecordReply/${id}`,
        { replyId }
      );
      
      const updatedPractice = { ...practice };
      updatedPractice.RecordReply = updatedPractice.RecordReply.filter(reply => reply.replyId !== replyId);
      setPractice(updatedPractice);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div>
      {practice && (
        <div className="practicesNew" style={{ marginTop: "80px" }}>
          <div>الاسم: {practice.studentFirstName} {practice.studentLastName}</div>
          {practice.courseId === "evaluation" ? (
            <>
              <div>الخبره: {practice.expTime}</div>
              <div>اين تعلم: {practice.whereStudied}</div>
              <div>الهدف: {practice.goal}</div>
            </>
          ) : (
            <>
              <div>الدوره: {practice.courseName} / {practice.courseLevel}</div>
              <div>{practice.video}</div>
            </>
          )}

          <div className="videoAndRepliesContainer">
            <div className="videoContainer">
              {practice.myPractice && (
                <video controls preload="metadata" className="videoOfPractice" poster={poster}>
                  <source src={practice.myPractice.replace('http://', 'https://')} type="video/mp4" />
                </video>
              )}
            </div>
            <div style={{ padding: "0px 10px" }}>
              <div className="RepliesVideos" style={{ marginBottom: "10px" }}>
              {practice.videoReply.map((reply) => (
  <div key={reply.replyId}  style={{border:"1px solid black", padding:"10px", borderRadius:"10px"}}>
    {reply.theVideoReply && (
      <video
        controls
        preload="metadata"
        className="RepliesVideo"
        poster={poster}
      >
        <source src={reply.theVideoReply.replace('http://', 'https://')} type="video/mp4" />
      </video>
    )}
    <button onClick={() => handleDeleteVideo(reply.replyId)}>حذف</button>
  </div>
))}

{practice.RecordReply.map((rec) => (
  <div key={rec.replyId} style={{border:"1px solid black", padding:"10px", borderRadius:"10px"}}>
    {rec.RecordingReply && (
      <audio style={{ width: '100%' }} controls>
        <source src={rec.RecordingReply.replace('http://', 'https://')} type="audio/mp4" />
      </audio>
    )}
    <button onClick={() => handleDeleteRecord(rec.replyId)}>حذف</button>
  </div>
))}

              </div>
              {practice.reply ? <div className="commentOnPractice">{practice.reply}</div> : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
