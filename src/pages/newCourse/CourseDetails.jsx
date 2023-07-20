import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen,faCamera } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './newCourse.css';

export default function CourseDetails({ course, setCourse, user }) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingLevel, setEditingLevel] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(course.title);
  const [updatedLevel, setUpdatedLevel] = useState(course.level);
  const [updatedPhoto, setUpdatedPhoto] = useState(course.coursePhoto);
  const [photoUrl, setPhotoUrl] = useState('')
   const [imageCourse, setImageCourse] = useState();
    const [fileUpload, setFileUpload] = useState(null);

    useEffect(()=>{
      const postDetails = () => {
        if(!imageCourse) return;
        const formData = new FormData();
        formData.append("file", imageCourse);
        formData.append("upload_preset", "bisharaHaroni");
        // formData.append("cloud_name", "shhady");
        axios
          .post("https://api.cloudinary.com/v1_1/djvbchw2x/upload", formData, {
            onUploadProgress: (p) => {
              const percentComplete = Math.round((p.loaded * 100) / p.total);
              setFileUpload({ fileName: imageCourse.name, percentComplete });
              setFileUpload(`${percentComplete}%`);
            },
          })
          .then((res) => setPhotoUrl(res.data.secure_url))
          .catch((err) => {
            console.log(err);
          });
      };
      postDetails()
    },[imageCourse])
    
  

  useEffect(()=>{
    const handleSavePhotoClick = async () => {
      if(!photoUrl) return;
      try {
        // Make the patch request to update the course title
        await axios.patch(process.env.REACT_APP_BACKEND_URL +`/courses/${course._id}`, {
          coursePhoto: photoUrl,
        });
  
        // Update the course state with the new title
        setCourse({ ...course, coursePhoto: photoUrl });
        setFileUpload(null)
        // Exit the editing mode for title
      } catch (error) {
        console.error(error);
      }
    };
    handleSavePhotoClick()
  },[photoUrl])
  useEffect(()=>{
    setUpdatedTitle(course.title)
    setUpdatedLevel(course.level)
    setUpdatedPhoto(course.coursePhoto)
    
  },[course])
  const handleEditTitleClick = () => {
    setEditingTitle(true);
  };

  const handleEditLevelClick = () => {
    setEditingLevel(true);
  };
  
  const handleSaveTitleClick = async () => {
    if(!updatedTitle) return;
    try {
      // Make the patch request to update the course title
      await axios.patch(process.env.REACT_APP_BACKEND_URL +`/courses/${course._id}`, {
        title: updatedTitle,
      });

      // Update the course state with the new title
      setCourse({ ...course, title: updatedTitle });

      // Exit the editing mode for title
      setEditingTitle(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveLevelClick = async () => {
    if(!updatedLevel) return;
    try {
      // Make the patch request to update the course level
      await axios.patch(process.env.REACT_APP_BACKEND_URL +`/courses/${course._id}`, {
        level: updatedLevel,
      });

      // Update the course state with the new level
      setCourse({ ...course, level: updatedLevel });

      // Exit the editing mode for level
      setEditingLevel(false);
    } catch (error) {
      console.error(error);
    }
  };

  
  return (
    <div>
      <div
        className='courseCover'
        style={{ backgroundImage: `url(${updatedPhoto})` , position:"relative"}}
      >
       {user?._id === course.owner ? (<div style={{position:"absolute", right:"50%", bottom:"0", background:"white", borderRadius:"50%", padding:"5px 5px", width:"30px", height:"30px", display:"flex", justifyContent:"center", alignItems:"center"}} >
         <label htmlFor="file-input" className="file-input-label">
            <FontAwesomeIcon icon={faCamera} />
          </label>
          <input
            type="file"
            id="file-input"
            className="file-input"
            onChange={(e) => setImageCourse(e.target.files[0])}
          />
        </div>):(null)} 
      </div>
      <div style={{textAlign:"center"}}>{fileUpload ? (fileUpload):(null)}</div>
        <h1 style={{ fontSize: '28px', textAlign: 'center' }}>
          {course.firstName} {course.lastName}
        </h1>
      {editingTitle ? (
        <div style={{display:"flex", justifyContent:'center', alignItems:"center", flexDirection:"column", gap:'10px', maxWidth:"200px", margin:'auto'}}>
        <input
          type='text'
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          style={{width:"100%"}}
        />
        <button style={{width:"100%"}} onClick={handleSaveTitleClick}>حفظ</button></div>
      ) : (
        <h2 style={{ fontSize: '22px', textAlign: 'center'}}>{course.title}
         {user?._id === course.owner ? (  <FontAwesomeIcon
            icon={faPen}
            size='xs'
            onClick={handleEditTitleClick}
            className='editIcon'
            
          />):(null)}
        </h2>
      )}
      <div className='instAndLevel'>
      <h2 style={{ textAlign: 'center' }}>{course.instrument}</h2>
        {editingLevel ? (
          <div style={{display:"flex", justifyContent:'center', alignItems:"center", flexDirection:"column", gap:'10px'}}>
          <input
            type='text'
            value={updatedLevel}
            onChange={(e) => setUpdatedLevel(e.target.value)}
            style={{width:"100%"}} 
          />
          <button  style={{width:"100%"}}  onClick={handleSaveLevelClick}>حفظ</button>
          </div>
        ) : (
          <h2 style={{ textAlign: 'center' }}>
          {course.level}
       {user?._id === course.owner ? ( <FontAwesomeIcon
            icon={faPen}
            size='xs'
            onClick={handleEditLevelClick}
            className='editIcon'
          />):(null)}  
        </h2>
        )}
        
      </div>
    </div>
  );
}
