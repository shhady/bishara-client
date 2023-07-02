import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

const AddVideo = ({ practice, onVideoAdd, socket, user }) => {
  const [commentText, setCommentText] = useState('');
  const [formData, setFormData] = useState({});
  const [video, setVideo] = useState('');
  const [autoReplies, setAutoReplies] = useState([]);
  const unique_id = uuid();

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const getReplies = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/replies/${user._id}`);
        setAutoReplies(getReplies.data.filter(replies => replies.uniqueLink === practice.uniqueLink));
        console.log(getReplies.data.filter(replies => replies.uniqueLink === practice.uniqueLink));
      } catch (error) {
        console.log(error);
      }
    };
    fetchReplies();
  }, []);

  const handleOpenWidget = () => {
    let myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'djvbchw2x',
        uploadPreset: 'bisharaHaroni',
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          setFormData({ ...formData, image: result.info.secure_url });
          setVideo(result.info.secure_url);
        }
      }
    );
    myWidget.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (practice.videoReply && practice.videoReply.length > 3) {
      return console.log("Can't submit");
    }
    if (!video) return;

    const updatedPractice = {
      ...practice,
      videoReply: [
        ...(practice.videoReply || []),
        {
          theVideoReply: video,
          replyId: unique_id,
        },
      ],
    };

    onVideoAdd(updatedPractice);

    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/practices/${practice._id}`, {
        theVideoReply: video,
        videoName: practice.video ? practice.video : 'فيديو تقييم',
        courseId: practice.courseId,
        nameOfProblem: commentText,
        practiceId: practice._id,
        uniqueLink: practice.uniqueLink || null,
        teacherId: practice.teacherId,
        replyId: unique_id,
      });

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/replies`, {
        theVideoReply: video,
        videoName: practice.video ? practice.video : 'فيديو تقييم',
        courseId: practice.courseId,
        nameOfProblem: commentText,
        practiceId: practice._id,
        uniqueLink: practice.uniqueLink || null,
        teacherId: practice.teacherId,
        replyId: unique_id,
      });

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
      <form onSubmit={handleSubmit} style={{ width: '80%', margin: '20px auto' }}>
        <textarea
          style={{
            width: '100%',
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
        <button onClick={handleOpenWidget} style={{ width: '100%' }}>
          اضغط هنا لرفع الرد عن طريق فيديو
        </button>
        {video && <span>تم الرفع تأكد من اضافة عنوان لاستخدام الفيديو مرة اخرى</span>}
        <button type="submit" style={{ width: '100%', background: '#fee4b9' }}>
          اضف
        </button>
      </form>
    </div>
  );
};

export default AddVideo;
