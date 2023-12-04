import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './teacherDisc.css';
import { useParams } from 'react-router-dom';
export default function NewTeacherDisc({ id, user }) {
  const [teacher, setTeacher] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [updatedAbout, setUpdatedAbout] = useState('');

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + `/teachers/${id}`
        );
        setTeacher(response.data);
        setUpdatedAbout(response.data.about)
      } catch (error) {
        console.error(error);
      }
    };
    fetchTeacher();
  }, [id]);

  const handleInputChange = (e) => {
    setUpdatedAbout(e.target.value);
  };

  const handleFormSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Handle case where token is missing
        return;
      }

      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/teachers/${id}`,
        { about: updatedAbout },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        setTeacher({...teacher, about: updatedAbout})
      // Optionally, update the teacher state or show a success message
      setEditMode(false); // Exit edit mode
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='discDiv'>
      {editMode ? (
        <div style={{display:"flex", flexDirection:"column", gap:"20px"}}>
          <textarea value={updatedAbout} onChange={handleInputChange} style={{width:"50vw", height:"15vh"}}/>
          <button onClick={handleFormSubmit}>حفظ</button>
        </div>
      ) : (
        <div>
           {user?._id === id && ( <button style={{width:"20vw", display:"flex", alignSelf:"flex-end", alignItems:"center", justifyContent:'center'}} onClick={() => setEditMode(true)}>تعديل</button>)}
          <p>{teacher.about} kkk</p>
        
        </div>
      )}
    </div>
  );
}
