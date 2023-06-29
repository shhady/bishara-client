import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faPen, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import AddReply from './AddReply';
import axios from 'axios';
import './NewTeacherPractices.css';
import { Link } from 'react-router-dom';

export default function TeacherPractices({ practices }) {
  const [updatedPractices, setUpdatedPractices] = useState(practices);
  const [poster, setPoster] = useState('');

  useEffect(() => {
    function MyVideo() {
      if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        // code to run if user is using Safari
        setPoster(
          'https://images.pexels.com/photos/6044198/pexels-photo-6044198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        );
      }
    }
    MyVideo();
  }, []);

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

  // const handleDeleteVideoReply = async (practiceId, replyId, replyIndex) => {
  //   try {
  //     // Send a PUT request to delete the video reply
  //     await axios.put(
  //       `${process.env.REACT_APP_BACKEND_URL}/practice/videoReply/${practiceId}`,
  //       {
  //         replyId,
  //       }
  //     );

  //     // Create a copy of the updatedPractices array
  //     const updatedPracticesArray = [...updatedPractices];

  //     // Find the practice by practiceId
  //     const practice = updatedPracticesArray.find((practice) => practice._id === practiceId);

  //     // Check if the practice exists and the replyIndex is valid
  //     if (practice && replyIndex >= 0 && replyIndex < practice.videoReply.length) {
  //       // Remove the video reply at the specified index
  //       practice.videoReply.splice(replyIndex, 1);

  //       // Update the state with the modified array
  //       setUpdatedPractices(updatedPracticesArray);
  //     }
  //   } catch (error) {
  //     console.error('Failed to delete video reply:', error);
  //   }
  // };

  // const handleDeleteRecordReply = async (practiceId, replyId, index) => {
  //   try {
  //     // Send a PUT request to delete the record reply
  //     await axios.put(
  //       `${process.env.REACT_APP_BACKEND_URL}/practice/deleteRecordReply/${practiceId}`,
  //       { replyId }
  //     );

  //     // Create a copy of the updatedPractices array
  //     const updatedPracticesArray = [...updatedPractices];

  //     // Find the practice by practiceId
  //     const practice = updatedPracticesArray.find(
  //       (practice) => practice._id === practiceId
  //     );

  //     // Check if the practice exists and the index is valid
  //     if (practice && index >= 0 && index < practice.RecordReply.length) {
  //       // Remove the record reply with matching replyId
  //       practice.RecordReply = practice.RecordReply.filter(
  //         (rec) => rec.replyId !== replyId
  //       );

  //       // Update the state with the modified array
  //       setUpdatedPractices(updatedPracticesArray);
  //     }
  //   } catch (error) {
  //     console.error('Failed to delete record reply:', error);
  //   }
  // };

  const drawPractices = () => {
    return updatedPractices.map((practice, i) => (
      <div
        key={i}
        className="practicesNew"
        style={{ backgroundColor: i % 2 === 0 ? '#c7c5c5' : 'white', position: 'relative' }}
      >
        <div style={{ position: "absolute", left: "10px", top: '10px' }}>
          <Link to={`/EditReplies/${practice._id}`}>
            <button>تعديل الرد</button>
          </Link>
        </div>
        <div>
          الاسم: {practice.studentFirstName} {practice.studentLastName}
        </div>
        {practice.courseId === 'evaluation' ? (
          <>
            <div>الخبره: {practice.expTime}</div>
            <div>اين تعلم: {practice.whereStudied}</div>
            <div>الهدف: {practice.goal}</div>
          </>
        ) : (
          <>
            <div>
              الدوره: {practice.courseName} / {practice.courseLevel}
            </div>
            <div>{practice.video}</div>
          </>
        )}

        <div className="videoAndRepliesContainer">
          <div className="videoContainer">
            <video
              controls
              preload="metadata"
              className="videoOfPractice"
              poster={poster}
            >
              <source
                src={practice.myPractice.replace('http://', 'https://')}
                type="video/mp4"
              />
            </video>
          </div>
          <div style={{ padding: '10px' }}>
            <div className="RepliesVideos" style={{ marginBottom: '10px' }}>
              {practice.videoReply.map((reply, index) => (
                <div key={index}>
                  <video
                    controls
                    preload="metadata"
                    className="RepliesVideo"
                    poster={poster}
                  >
                    <source
                      src={reply.theVideoReply.replace('http://', 'https://')}
                      type="video/mp4"
                    />
                  </video>
                  {/* <button
                    className="deleteButton"
                    onClick={() => handleDeleteVideoReply(practice._id, reply.replyId, index)}
                  >
                    Delete
                  </button> */}
                </div>
              ))}
            </div>
            <div className="recordings">
              {practice.RecordReply.map((rec, index) => (
                <div key={index}>
                  <audio
                    style={{ width: '100%' }}
                    controls
                  >
                    <source
                      src={rec.RecordingReply.replace('http://', 'https://')}
                      type="audio/mp4"
                    />
                  </audio>
                  {/* <button
                    className="deleteButton"
                    onClick={() => handleDeleteRecordReply(practice._id, rec.replyId, index)}
                  >
                    Delete
                  </button> */}
                </div>
              ))}
            </div>
            {practice.reply ? <div className="commentOnPractice">{practice.reply}</div> : null}
          </div>
        </div>

        <div
          style={{ padding: '15px', border: '1px solid black', marginTop: '10px' }}
        >
          <AddReply
            practice={practice}
            onCommentAdd={handleCommentAdd}
            onVideoAdd={handleVideoAdd}
            onRecordAdd={handleRecordAdd}
          />
        </div>
      </div>
    ));
  };

  return <div>{drawPractices()}</div>;
}
