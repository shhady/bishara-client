import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Done from './Done';
import Evaluations from './Evaluations';
import Practices from './Practices';
import './stylingPractices.css';

export default function NewReview({ socket }) {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [filter, setFilter] = useState('Practices');
  const [practices, setPractices] = useState([]);
  const [numOfPractices, setNumOfPractices] = useState(0);
  const [numOfEvaluations, setNumOfEvaluations] = useState(0);

  useEffect(() => {
    const fetchPractices = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/mypractices/${user._id}`
      );
      setPractices(res.data);
    };
    fetchPractices();
  }, [user]);

  useEffect(() => {
    const filterPractices = () => {
      const filterEva = practices.filter(
        (practice) =>
          !practice.reply &&
          (!practice.RecordReply || practice.RecordReply.length === 0) &&
          (!practice.videoReply || practice.videoReply.length === 0) &&
          practice.courseId === 'evaluation'
      );

      const filterNonEva = practices.filter(
        (practice) =>
          !practice.reply &&
          (!practice.RecordReply || practice.RecordReply.length === 0) &&
          (!practice.videoReply || practice.videoReply.length === 0) &&
          practice.courseId !== 'evaluation'
      );

      setNumOfEvaluations(filterEva.length);
      setNumOfPractices(filterNonEva.length);
    };

    filterPractices();
  }, [practices]);

  return (
    <div style={{ marginTop: '80px' }}>
      <h2 style={{ textAlign: 'center', margin: '15px' }}>تمارين الطلاب</h2>
      <div className='titlesPracticesTeacher'>
        <div
          onClick={() => setFilter('Practices')}
          style={{
            cursor: 'pointer',
            background: filter === 'Practices' ? '#fee4b9' : 'none',
            // position:'relative'
          }}
        >
           {numOfPractices > 0 ? <strong>تمارين ({numOfPractices})</strong> : 'تمارين'}

          {/* {numOfPractices > 0 && <div style={{position:'absolute', borderRadius:"50%", width:"15px", height:'15px', top:"0px", right:"0px", background:"red"}}></div>} */}
        </div>
        <div
          onClick={() => setFilter('Evaluations')}
          style={{
            cursor: 'pointer',
            background: filter === 'Evaluations' ? '#fee4b9' : 'none',
            // position:'relative'
          }}
        >
           {numOfEvaluations > 0 ? <strong>منهاج ({numOfEvaluations}) </strong> : 'منهاج'}
          {/* {numOfEvaluations > 0 && <div style={{borderRadius:"50%", width:"15px", height:'15px', top:"0px", right:"15px", background:"red"}}></div>} */}

        </div>
        <div
          onClick={() => setFilter('Done')}
          style={{
            cursor: 'pointer',
            background: filter === 'Done' ? '#fee4b9' : 'none',
          }}
        >
          تم الرد
        </div>
      </div>
      {filter === 'Practices' && (
        <Practices user={user} practices={practices} />
      )}
      {filter === 'Evaluations' && (
        <Evaluations user={user} practices={practices} socket={socket} />
      )}
      {filter === 'Done' && (
        <Done user={user} practices={practices} socket={socket} />
      )}
    </div>
  );
}
