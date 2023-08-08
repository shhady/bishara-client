import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const AddVideo = ({ practice, onVideoAdd, socket, user }) => {
  const [commentText, setCommentText] = useState('');
  const [video, setVideo] = useState('');
  const [autoReplies, setAutoReplies] = useState([]);
  const unique_id = uuid();
  const [videoUrl, setVideoUrl] = useState('')
  const [fileUpload, setFileUpload] = useState(null);
  const [moreThan, setMoreThan] = useState(null);
  const {id}  = useParams()
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const getReplies = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/replies/${user._id}`);
        setAutoReplies(getReplies.data.filter(replies => replies.uniqueLink === practice.uniqueLink && replies.nameOfProblem || !replies.uniqueLink && !practice.uniqueLink && replies.nameOfProblem ));
        // console.log(getReplies.data.filter(replies => replies.uniqueLink === practice.uniqueLink));
      } catch (error) {
        console.log(error);
      }
    };
    fetchReplies();
  }, [id, practice.uniqueLink, user._id]);


  const postDetails = () => {
    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", "bisharaHaroni");
    // formData.append("cloud_name", "shhady");
    axios
      .post("https://api.cloudinary.com/v1_1/djvbchw2x/upload", formData, {
        onUploadProgress: (p) => {
          const percentComplete = Math.round((p.loaded * 100) / p.total);
          setFileUpload({ fileName: video.name, percentComplete });
          console.log(`${percentComplete}% uploaded`);
        },
      })
      .then((res) => setVideoUrl(res.data.secure_url))
      .catch((err) => {
        console.log(err);
      });
  };


  // const handleSubmit = async (e) => {
    // e.preventDefault();
    useEffect(() => {
      const submitVideoReply = async () => {
        if (practice.videoReply && practice.videoReply.length > 3) {
          return console.log("Can't submit");
        }
        if (!videoUrl) return;
    
        const updatedPractice = {
          ...practice,
          videoReply: [
            ...(practice.videoReply || []),
            {
              theVideoReply: videoUrl,
              replyId: unique_id,
            },
          ],
          
        };
    
        onVideoAdd(updatedPractice);
    
        try {
          await axios.put(`${process.env.REACT_APP_BACKEND_URL}/practices/${practice._id}`, {
            theVideoReply: videoUrl,
            videoName: practice.video ? practice.video : 'فيديو تقييم',
            courseId: practice.courseId,
            nameOfProblem: commentText,
            practiceId: practice._id,
            uniqueLink: practice.uniqueLink || null,
            teacherId: practice.teacherId,
            replyId: unique_id,
            replySeen: "false"
          });
          await axios.patch(
            process.env.REACT_APP_BACKEND_URL + `/studentpractices/${practice._id}`,
            {
              replySeen: false,
            }
          )
          if (commentText) {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/replies`, {
              theVideoReply: videoUrl,
              videoName: practice.video ? practice.video : 'فيديو تقييم',
              courseId: practice.courseId,
              nameOfProblem: commentText,
              practiceId: practice._id,
              uniqueLink: practice.uniqueLink || null,
              teacherId: practice.teacherId,
              replyId: unique_id,
            });
          }
    
          setCommentText('');
          setVideo('');
    
          socket.emit('sendNotificationComment', {
            senderName: user.firstName,
            senderFamily: user.lastName,
            senderId: user._id,
            receiverId: practice.ownerId,
            videoName: practice.video,
            videoId: practice.uniqueLink,
            courseid: practice.courseId,
          });
        } catch (error) {
          console.log(error);
        }
      };
    
      submitVideoReply();
    }, [videoUrl]);
    

  const handleSubmitSelect = async (selectedVideo, selectedUniqueId) => {
    if (practice.videoReply && practice.videoReply.length > 3) {
      return console.log("Can't submit");
    }
    if (!selectedVideo) return;

    const updatedPractice = {
      ...practice,
      videoReply: [
        ...(practice.videoReply || []),
        {
          theVideoReply: selectedVideo,
          replyId: selectedUniqueId,
        },
      ],
      replySeen:"false"
    };

    onVideoAdd(updatedPractice);

    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/practices/${practice._id}`, {
        theVideoReply: selectedVideo,
        videoName: practice.video ? practice.video : 'فيديو تقييم',
        courseId: practice.courseId,
        nameOfProblem: commentText,
        practiceId: practice._id,
        uniqueLink: practice.uniqueLink || null,
        teacherId: practice.teacherId,
        replyId: selectedUniqueId,
      });
      await axios.patch(
        process.env.REACT_APP_BACKEND_URL + `/studentpractices/${practice._id}`,
        {
          replySeen: false,
        }
      )
      setCommentText('');
      setVideo('');

      socket.emit('sendNotificationComment', {
        senderName: user.firstName,
        senderFamily: user.lastName,
        senderId: user._id,
        receiverId: practice.ownerId,
        videoName: practice.video,
        videoId: practice.uniqueLink,
        courseid: practice.courseId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setCommentText(event.target.value);
  };

  return (
    <div onClick={() => console.log(practice)}>
      {/* <label htmlFor="selectOption">Select Option:</label> */}
      <div style={{ width: '80%', margin: '20px auto' }}>
      <select id="selectOption" onChange={(e) => handleSubmitSelect(e.target.value, unique_id)} style={{minWidth:"150px"}}>
        <option value="">اختر فيديو</option>
        {autoReplies.map((item) => (
          <option key={item._id} value={item.theVideoReply}>
            {item.nameOfProblem}
          </option>
        ))}
      </select>
      </div>
      {/* <form onSubmit={handleSubmit} style={{ width: '80%', margin: '20px auto' }}> */}
        <textarea
          style={{
            width: '80%',
            margin:'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
          type="text"
          placeholder="اكتب عنوان الفيديو"
          value={commentText}
          onChange={handleInputChange}
        />
        {video ? (<button style={{
                cursor:"pointer",
                textAlign:"center",
                background: '#fcedd5',
                padding:"5px 25px",
                margin:'10px auto'}} onClick={postDetails}>ارسال</button>):(null)}
         {video ? <>
          {fileUpload?.percentComplete ? 
          (<>{fileUpload?.percentComplete}%</>):
           (<div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
             {video.name}  <button onClick={()=> {setVideo(null); setVideoUrl(null)}} 
             style={{background:"red", marginRight:"10px"}}>X</button></div>)}</>:  <><label for="inputTag">
              <div style={{
                cursor:"pointer",
                textAlign:"center",
                background: '#fcedd5',
                width:"fit-content",
                padding:"5px 25px",
                margin:'10px auto'
                
              }}
              >
              ارفع فيديو  </div>
              <input
        type="file"
         id="inputTag"
         accept="audio/*, video/*"
         onChange={(e) => {
         const file = e.target.files[0];
         if (file) {
          if (file.type.includes("image")) {
        // Handle the case when a photo is selected
        alert("لا يمكن رفع صورة, الرجاء رفع فيديو او تسجيل صوتي");
        e.target.value = null; // Clear the file input
      } else if (file.size > 104857500) {
        setMoreThan(`${Math.round(file.size / 1024 / 1024)} MB more than 100MB`);
      } else {
        setVideo(file);
      }
     }
      }}
     style={{ display: "none" }}
     onClick={() => {
      setVideoUrl(null);
      setVideo(null);
       setMoreThan(null);
       }}
/>

            </label>
            {moreThan ? (<>الفيديو اكبر من الحجم الاقصى وهو 100 ميجا بايت 
            <div>{moreThan}</div></>
              ):(
              <div style={{textAlign:"center"}}>الحجم الاقصى"100" ميجا بايت</div>)}
            
             </>
            }
      {/* </form> */}
    </div>
  );
};

export default AddVideo;
