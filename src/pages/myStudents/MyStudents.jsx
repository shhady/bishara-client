import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MyStudents() {
  const [students, setStudents] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/myUsers/${id}`);
        setStudents(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudents();
  }, [id]);

  const drawStudents = () => {
    return students.map((student, i) => (
      <div key={i} style={styles.studentContainer}>
        <img
          src={student.avatar ? student.avatar : 'https://img.icons8.com/material-rounded/24/null/user.png'}
          alt={student.firstName}
          style={styles.avatar}
        />
        <div style={styles.infoContainer}>
          <div style={styles.name}>{`${student.firstName} ${student.lastName}`}</div>
          <div style={styles.email}>{student.email}</div>
          <div style={styles.daysLeft}>باقي ايام:  {student.daysLeft}</div>
        </div>
      </div>
    ));
  };

  return <div style={styles.container}>{drawStudents()}</div>;
}

const styles = {
  container: {
    marginTop: '100px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '10px',
  },
  studentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '5px',
  },
  avatar: {
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    marginBottom: '10px',
  },
  infoContainer: {
    textAlign: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    marginBottom: '5px',
  },
  email: {
    color: 'gray',
    marginBottom: '5px',
  },
  daysLeft: {
    fontSize: '0.9rem',
  },
};
