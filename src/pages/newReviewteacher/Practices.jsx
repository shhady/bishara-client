import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './stylingPractices.css';
import TeacherPractices from '../TeacherPractices/TeacherPractices';

export default function Practices({ user, socket }) {
  const [filteredPractices, setFilteredPractices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPractices = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/mypractices/${user._id}`
      );
      const practices = res.data;

      const filterPracticesUnReplied = () => {
        const filtered = practices.filter(
          (practice) =>
            !practice.reply &&
            (!practice.RecordReply || practice.RecordReply.length === 0) &&
            (!practice.videoReply || practice.videoReply.length === 0) &&
            practice.courseId !== 'evaluation'
        );
        return filtered;
      };

      const filtered = filterPracticesUnReplied();
      setFilteredPractices(filtered);
      setLoading(false);
    };

    fetchPractices();
  }, [user]);

  useEffect(() => {
    // console.log(filteredPractices);
  }, []); // Run once when the component mounts

  return (
    <div>
      {loading ? (
        <div style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "100px",
        }}
      >
        <div className="loader">  
        </div>
      </div>
        </div>
      ) : filteredPractices.length === 0 ? (
        <div style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h1>لا يوجد تمارين جديدة</h1>
        </div>
      ) : (
        <TeacherPractices socket={socket} practices={filteredPractices} user={user} />
      )}
    </div>
  );
}
