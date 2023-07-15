import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./userPractices.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTableCellsLarge,
    faBars
} from "@fortawesome/free-solid-svg-icons";

export default function UserPracticesForProfile({ user }) {
  const [userPractices, setUserPractices] = useState([]);
  const [poster, setPoster] = useState('');
    const [videosStyle,setVideosStyle] = useState(false)
  useEffect(() => {
    if (user.role === 'teacher' || user.role === 'admin') return;
    const fetchUserPractices = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/studentpractices/${user._id}`
        );
        setUserPractices(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching user practices:', error);
      }
    };
    fetchUserPractices();
  }, [user._id]);

  useEffect(() => {
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      // code to run if user is using Safari
      setPoster(
        'https://images.pexels.com/photos/6044198/pexels-photo-6044198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      );
    }
  }, []);

  const showRec = (practice, i) => {
    return practice.RecordReply?.map((rec) => {
      return (
        <div
          key={practice.replyId}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '.5rem',
            borderRadius: '20px',
          }}
        >
          <audio style={{ width: '100%' }} controls>
            <source
              src={rec.RecordingReply.replace('http://', 'https://')}
              type="audio/mp4"
            />
          </audio>
        </div>
      );
    });
  };

  const markAsSeen = async (practice) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/studentpractices/${practice._id}`,
        {
          replySeen: true,
        }
      );
    } catch (error) {
      console.error('Error marking practice as seen:', error);
    }
  };

const deletePractice = async (practice) => {
  try {
    await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/studentpractices/${practice._id}`,
      {
        replySeen: true,
      }
    );
    await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/practices/${practice._id}`
    );
    setUserPractices((prevUserPractices) =>
      prevUserPractices.filter((item) => item._id !== practice._id)
    );
  } catch (error) {
    console.error('Error deleting practice:', error);
  }
};

const changeToOneFr = ()=>{
    setVideosStyle(!videosStyle)
}
  const showData = () => {
    return userPractices?.map((practice, i) => {
      return (
        <div
          className="practiceAndReply"
          style={{
            height: 'fit-content',
            borderRight: '1px solid black',
            borderBottom: '1px solid #e1e1e1',
            padding: '10px',
            backgroundColor: i % 2 === 0 ? '#c7c5c5' : 'white',
          }}
          key={practice._id}
          onClick={() => markAsSeen(practice)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div onClick={() => console.log(practice)}>
                {' '}
                الاستاذ: {practice.teacherFirstName} {practice.teacherLastName}
              </div>
              <div>
                {' '}
                {practice.courseName ? (
                  <>الدوره: {practice.courseName}</>
                ) : (
                  <>الهدف: {practice.goal}</>
                )}
              </div>
              <div>
                {' '}
                {practice.courseName ? (
                  <Link
                    to={`/NewLesson/${practice.courseId}?name=${practice.uniqueLink}&playlist=${practice.playlistId}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <>الدرس: {practice.video}</>
                  </Link>
                ) : (
                  <>اين تعلمت: {practice.whereStudied}</>
                )}
              </div>
            </div>
            <div>
              <button
                onClick={() => deletePractice(practice)}
                style={{ backgroundColor: '#fee4b9', width: '80px' }}
              >
                حذف التمرين
              </button>
            </div>
          </div>
          <div className="videoAndRepliesNewProfile">
            <div
              className="StudentVideoProfile"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fee4b9',
                marginBottom: '10px',
              }}
            >
              <video
                key={practice.myPractice}
                controls
                preload="metadata"
                height="250px"
                style={{
                  width: '90%',
                  height: '90%',
                  minHeight: '230px',
                  maxHeight: '230px',
                  border: '1px solid #e1e1e1',
                  marginTop: '10px',
                  marginBottom: '10px',
                }}
              >
                <source
                  src={practice.myPractice.replace('http://', 'https://')}
                  type="video/mp4"
                />
              </video>
            </div>

            <div className="replyForVideoProfile">
              {practice.reply ? (
                <div className="theComment">{practice.reply}</div>
              ) : null}
                
              {practice.videoReply && practice.videoReply.length > 0 ? (<>
                <div className='changeStyle' onClick={changeToOneFr}>{videosStyle ? <FontAwesomeIcon icon={faTableCellsLarge} />:<FontAwesomeIcon icon={faBars} />}</div>
                <div
                 className={videosStyle ? "oneFr":"twoFr"}
                >
                  {practice.videoReply.map((reply, i) => {
                    return (
                      <video
                        key={reply.theVideoReply + `${i}`}
                        controls
                        preload="metadata"
                        className="videos4Profile"
                        poster={poster}
                      >
                        <source
                          src={reply.theVideoReply.replace('http://', 'https://')}
                          type="video/mp4"
                        />
                      </video>
                    );
                  })}
                </div></>
              ) : null}

              <div className="audioProfile">{showRec(practice, i)}</div>
            </div>
          </div>
        </div>
      );
    });
  };

  return <div>{showData()}</div>;
}
