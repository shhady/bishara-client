import React, { useState, useEffect } from 'react';
import "./bottomMenu.css";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faMusic, faUsersLine, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

export default function BottomMenu({ user, socket }) {
  const [menu, setMenu] = useState('bottomMenu');
  const location = useLocation();
  const urlContent = location.pathname; // Extract content after the first "/"
  const [userPractices, setUserPractices] = useState([]);
  const [practices, setPractices] = useState([]);
  const history = useHistory(); // Get the history object

  useEffect(() => {
    if (location.pathname.includes('auth') || location.pathname.includes('chatting')) {
      setMenu("auth");
    } else {
      setMenu('bottomMenu');
    }
  }, [location]);

  console.log("Content after /:", urlContent);

  useEffect(() => {
    socket?.on("getNotificationComment", (data) => {
      console.log('listening for getNotificationComment event...');
      if (user.role === "admin" || user.role === "teacher") {
        setPractices((prevPractices) => [...prevPractices, data]);
      } else {
        setUserPractices((prevUserPractices) => [...prevUserPractices, data]);
      }
    });
  }, [socket]);

  const handlePracticesClick = () => {
    if (user.role === 'admin' || user.role === 'teacher') {
      setPractices([]);
    } else {
      setUserPractices([]);
    }
    // Navigate to the desired page after updating the state
    history.push("/newReview");
  };

  return (
    <div className={menu}>
      <Link style={{ textDecoration: "none", color: "black" }} to="/">
        <div className='icon-content'>
          <div><FontAwesomeIcon icon={faHome} /></div>
          <div>الرئيسيه</div>
        </div>
      </Link>
      {user ? (<>
        <Link style={{ textDecoration: "none", color: "black" }} to="/profile">
          <div className='icon-content'>
            <div><FontAwesomeIcon icon={faUser} /></div>
            <div>الملف</div>
          </div>
        </Link>
        {user.role === 'admin' || user.role === 'teacher' ? (
          <Link onClick={handlePracticesClick} style={{ textDecoration: "none", color: "black" }} to="/newReview">
            {practices.length > 0 ? (
              <div className='icon-content'>
                <div className='practiceIcon'><FontAwesomeIcon icon={faLayerGroup} /><div className='redDot'></div></div>
                <div>التمارين</div>
              </div>
            ) : (
              <div className='icon-content'>
                <div><FontAwesomeIcon icon={faLayerGroup} /></div>
                <div>التمارين</div>
              </div>
            )}
          </Link>
        ) : (
          <Link onClick={handlePracticesClick} style={{ textDecoration: "none", color: "black" }} to="/profile">
            {userPractices.length > 0 ? (
              <>
                <div className='icon-content'>
                  <div className='practiceIcon'><FontAwesomeIcon icon={faLayerGroup} /><div className='redDot'></div></div>
                  <div>التمارين</div>
                </div>
              </>
            ) : (
              <>
                <div className='icon-content'>
                  <div><FontAwesomeIcon icon={faLayerGroup} /></div>
                  <div>التمارين</div>
                </div>
              </>
            )}
          </Link>
        )}
      </>) : (
        <Link style={{ textDecoration: "none", color: "black" }} to="/auth">
          <div className='icon-content'>
            <div><FontAwesomeIcon icon={faUser} /></div>
            <div>تسجيل دخول</div>
          </div>
        </Link>
      )}
      <Link style={{ textDecoration: "none", color: "black" }} to="/courses">
        <div className='icon-content'>
          <div><FontAwesomeIcon icon={faMusic} /></div>
          <div>الدورات</div>
        </div>
      </Link>
      <Link style={{ textDecoration: "none", color: "black" }} to="/teachers">
        <div className='icon-content'>
          <div><FontAwesomeIcon icon={faUsersLine} /></div>
          <div>المدرسين</div>
        </div>
      </Link>
    </div>
  );
}
