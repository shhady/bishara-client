import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faPen, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import AddReply from './AddReply';
import "./NewTeacherPractices.css";
export default function TeacherPractices({ practices }) {
  const [updatedPractices, setUpdatedPractices] = useState(practices);

  const handleCommentAdd = (updatedPractice) => {
    const updatedPracticesArray = updatedPractices.map((practice) => {
      if (practice._id === updatedPractice._id) {
        return updatedPractice;
      }
      return practice;
    });
    setUpdatedPractices(updatedPracticesArray);
  };
  const handleVideoAdd = (updatedPractice) => {
    const updatedPracticesArray = updatedPractices.map((practice) => {
      if (practice._id === updatedPractice._id) {
        return updatedPractice;
      }
      return practice;
    });
    setUpdatedPractices(updatedPracticesArray);
  };

  const handleRecordAdd = (updatedPractice) => {
    const updatedPracticesArray = updatedPractices.map((practice) => {
      if (practice._id === updatedPractice._id) {
        return updatedPractice;
      }
      return practice;
    });
    setUpdatedPractices(updatedPracticesArray);
  };
  
  const drawPractices = () => {
    return updatedPractices.map((practice, i) => (
      <div key={i} className="practicesNew" style={{ backgroundColor: i % 2 === 0 ? '#c7c5c5' : 'white' }}>
       <div>{practice.studentFirstName} {practice.studentLastName}</div>
        <div>{practice.courseName} / {practice.courseLevel}</div>
        <div>{practice.video}</div>
        <div className="videoAndRepliesContainer">
          <div className="videoContainer">
            <video
              controls
              preload="metadata"
              className="videoOfPractice"
            >
              <source src={practice.myPractice.replace('http://', 'https://')} type="video/mp4" />
            </video>
          </div>
          <div>
            <div className="RepliesVideos">
              {practice.videoReply.map((reply, index) => (
                <video
                  key={index}
                  controls
                  preload="metadata"
                  className="RepliesVideo"
                >
                  <source src={reply.theVideoReply.replace('http://', 'https://')} type="video/mp4" />
                </video>
              ))}
            </div>
            <div className="recordings">
              {practice.RecordReply.map((rec, index) => (
                <audio
                  key={index}
                  style={{ width: '100%' }}
                  controls
                >
                  <source src={rec.RecordingReply.replace('http://', 'https://')} type="audio/mp4" />
                </audio>
              ))}
            </div>
            </div>
            </div>
        {practice.reply ? <div className="commentOnPractice">{practice.reply}</div> : null}
        <div style={{ padding: '15px', border: '1px solid black', marginTop: '10px' }}>
          <AddReply practice={practice} onCommentAdd={handleCommentAdd} onVideoAdd={handleVideoAdd} onRecordAdd={handleRecordAdd}/>
        </div>
      </div>
    ));
  };

  return <div>{drawPractices()}</div>;
}
