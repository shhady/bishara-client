import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faPen, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import AddReply from './AddReply';
import axios from 'axios';
import './NewTeacherPractices.css';
import { Link } from 'react-router-dom';

export default function TeacherPractices({ practices }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [updatedPractices, setUpdatedPractices] = useState(practices);

  // useEffect(() => {
  //   setUpdatedPractices(practices);
  // }, [practices]);

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

  // Get current practices based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPractices = updatedPractices.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };
  const renderPractices = () => {
    return currentPractices.map((practice, index) => (
      <div
        key={index}
        className="practicesNew"
        style={{ backgroundColor: index % 2 === 0 ? '#c7c5c5' : 'white', position: 'relative' }}
      >
        {/* Practice details */}
        <div>
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
        </div>

        {/* Video and replies */}
        <div className="videoAndRepliesContainer">
          <div className="videoContainer">
            <video
              key={practice.myPractice}
              controls
              preload="metadata"
              className="videoOfPractice"
              poster={getVideoPoster(practice.myPractice)}
            >
              <source
                src={replaceProtocol(practice.myPractice)}
                type="video/mp4"
              />
            </video>
          </div>
          <div style={{ padding: '10px' }}>
            <div className="RepliesVideos" style={{ marginBottom: '10px' }}>
              {practice.videoReply.map((reply, index) => (
                <div key={index}>
                  <video
                    key={reply.theVideoReply}
                    controls
                    preload="metadata"
                    className="RepliesVideo"
                    poster={getVideoPoster(reply.theVideoReply)}
                  >
                    <source
                      src={replaceProtocol(reply.theVideoReply)}
                      type="video/mp4"
                    />
                  </video>
                </div>
              ))}
            </div>
            <div className="recordings">
              {practice.RecordReply.map((rec, index) => (
                <div key={index}>
                  <audio
                    key={rec.RecordingReply}
                    style={{ width: '100%' }}
                    controls
                  >
                    <source
                      src={replaceProtocol(rec.RecordingReply)}
                      type="audio/mp4"
                    />
                  </audio>
                </div>
              ))}
            </div>
            {practice.reply ? <div className="commentOnPractice">{practice.reply}</div> : null}
          </div>
        </div>

        {/* Edit reply button */}
        {practice.RecordReply.length > 0 || practice.videoReply.length > 0 && 
        <div style={{ position: 'absolute', left: '10px', top: '10px' }}>
          <Link to={`/EditReplies/${practice._id}`}>
            <button>تعديل الرد</button>
          </Link>
        </div>
          }
        {/* Add reply section */}
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

  // Utility function to replace HTTP with HTTPS in video URLs
  const replaceProtocol = (url) => {
    if (url === null) {
      return null; // Return null if the URL is null
    }
  
    return url.replace(/^http:\/\//i, 'https://');
  };
  // Utility function to get video poster based on browser compatibility
  const getVideoPoster = (videoUrl) => {
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      // code to run if the user is using Safari
      return 'https://images.pexels.com/photos/6044198/pexels-photo-6044198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
    } else {
      return '';
    }
  };

  // Render pagination
  const renderPagination = () => {
    const pageNumbers = Math.ceil(updatedPractices.length / itemsPerPage);

    return (
      <nav style={{ width: "100%" }}>
      <ul className="pagination" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", listStyleType: "none", margin:"30px" }}>
        {pageNumbers > 1 &&
          Array.from({ length: pageNumbers }, (_, index) => (
            <li key={index} className="page-item">
              <button  className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
      </ul>
    </nav>
    );
  };
  const renderPaginationSelect = () => {
    const pageNumbers = Math.ceil(updatedPractices.length / itemsPerPage);
  
    return (
      <nav style={{ width: "100%" }}>
        <ul className="pagination" style={{display:'flex', justifyContent:"flex-end", alignItems:"center", marginLeft:"5%", listStyleType: "none"}}>
          {pageNumbers > 1 &&
            <li className="page-item">
              <select className="page-select-link" onChange={(e) => setCurrentPage(parseInt(e.target.value))} >
              <option value="" disabled selected>
                الصفحات
              </option>
                {Array.from({ length: pageNumbers }, (_, index) => (
                  
                  <option key={index} value={index + 1}>{index + 1}</option>
                ))}
              </select>
            </li>
          }
        </ul>
      </nav>
    );
  };
  return (
    <div>
      <div style={{ display:'flex', justifyContent:"flex-end", alignItems:"flex-end"}}>
      {renderPaginationSelect()}
      </div>
      {renderPractices()}
      {renderPagination()}
    </div>
  );
}
