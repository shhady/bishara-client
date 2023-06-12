import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faPen, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import AddReply from './AddReply';
import { useParams } from 'react-router-dom';
import "./NewTeacherPractices.css";
import axios from 'axios';
export default function TeacherPractices({ practices }) {
  const [practice, setPractice] = useState(null);
  const [poster, setPoster] = useState("");
    const {id} = useParams()
    console.log(id);
  useEffect(() => {
    function MyVideo() {
      if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        // code to run if user is using Safari
        setPoster(
          "https://images.pexels.com/photos/6044198/pexels-photo-6044198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        );
      }
    }
    MyVideo();
  }, []);

  useEffect(()=>{
    const getPractice = async ()=>{
        const result = await axios.get(process.env.REACT_APP_BACKEND_URL + `/practice/${id}`)
        console.log(result.data);
        setPractice(result.data);
    }
    getPractice();
  },[id])

  const handleCommentAdd = (updatedPractice) => {
//     const updatedPracticesArray = updatedPractices.map((practice) => {
//       if (practice._id === updatedPractice._id) {
//         return updatedPractice;
//       }
//       return practice;
//     });
    setPractice(updatedPractice);
  };
  const handleVideoAdd = (updatedPractice) => {
    // const updatedPracticesArray = updatedPractices.map((practice) => {
    //   if (practice._id === updatedPractice._id) {
    //     return updatedPractice;
    //   }
    //   return practice;
    // });
    setPractice(updatedPractice);
  };

  const handleRecordAdd = (updatedPractice) => {
//     const updatedPracticesArray = updatedPractices.map((practice) => {
//       if (practice._id === updatedPractice._id) {
//         return updatedPractice;
//       }
//       return practice;
//     });
setPractice(updatedPractice);
  };
  
  const drawPractices = () => {
    // return updatedPractices.map((practice, i) => (
    //   <div key={i} className="practicesNew" style={{ backgroundColor: i % 2 === 0 ? '#c7c5c5' : 'white' }}>
    //    <div>الاسم: {practice.studentFirstName} {practice.studentLastName}</div>
    //    {practice.courseId === "evaluation" ? (<>
    //     <div>الخبره: {practice.expTime}</div>
    //     <div>اين تعلم: {practice.whereStudied}</div>
    //     <div>الهدف: {practice.goal}</div>
    //    </>):(<> <div>الدوره: {practice.courseName} / {practice.courseLevel}</div>
    //     <div>{practice.video}</div></>)}
       
    //     <div className="videoAndRepliesContainer">
    //       <div className="videoContainer">
    //         <video
    //           controls
    //           preload="metadata"
    //           className="videoOfPractice"
    //           poster={poster}
    //         >
    //           <source src={practice.myPractice.replace('http://', 'https://')} type="video/mp4" />
    //         </video>
    //       </div>
    //       <div style={{padding:"10px"}}>
    //         <div className="RepliesVideos">
    //           {practice.videoReply.map((reply, index) => (
    //             <video
    //               key={index}
    //               controls
    //               preload="metadata"
    //               className="RepliesVideo"
    //               poster={poster}
    //             >
    //               <source src={reply.theVideoReply.replace('http://', 'https://')} type="video/mp4" />
    //             </video>
    //           ))}
    //         </div>
    //         <div className="recordings">
    //           {practice.RecordReply.map((rec, index) => (
    //             <audio
    //               key={index}
    //               style={{ width: '100%' }}
    //               controls
    //             >
    //               <source src={rec.RecordingReply.replace('http://', 'https://')} type="audio/mp4" />
    //             </audio>
    //           ))}
    //         </div>
    //         {practice.reply ? <div className="commentOnPractice">{practice.reply}</div> : null}
    //         </div>
    //         </div>
       
    //     <div style={{ padding: '15px', border: '1px solid black', marginTop: '10px' }}>
    //       <AddReply practice={practice} onCommentAdd={handleCommentAdd} onVideoAdd={handleVideoAdd} onRecordAdd={handleRecordAdd}/>
    //     </div>
    //   </div>
    // ));
  };

  return <div>
    <div className="practicesNew" style={{marginTop:"80px"}} >
     <div>الاسم: {practice?.studentFirstName} {practice?.studentLastName}</div>
     {practice?.courseId === "evaluation" ? (<>
      <div>الخبره: {practice?.expTime}</div>
      <div>اين تعلم: {practice?.whereStudied}</div>
      <div>الهدف: {practice?.goal}</div>
     </>):(<> <div>الدوره: {practice?.courseName} / {practice?.courseLevel}</div>
      <div>{practice?.video}</div></>)}
     
      <div className="videoAndRepliesContainer">
        <div className="videoContainer">
          <video
            controls
            preload="metadata"
            className="videoOfPractice"
            poster={poster}
          >
            <source src={practice?.myPractice.replace('http://', 'https://')} type="video/mp4" />
          </video>
        </div>
        <div style={{padding:"0px 10px"}}>
          <div className="RepliesVideos" style={{marginBottom:"10px"}}>
            {practice?.videoReply.map((reply, index) => (
              <video
                key={index}
                controls
                preload="metadata"
                className="RepliesVideo"
                poster={poster}
              >
                <source src={reply.theVideoReply.replace('http://', 'https://')} type="video/mp4" />
              </video>
            ))}
          </div>
          <div className="recordings">
            {practice?.RecordReply.map((rec, index) => (
              <audio
                key={index}
                style={{ width: '100%' }}
                controls
              >
                <source src={rec.RecordingReply.replace('http://', 'https://')} type="audio/mp4" />
              </audio>
            ))}
          </div>
          {practice?.reply ? <div className="commentOnPractice">{practice?.reply}</div> : null}
          </div>
          </div>
     
      <div style={{ padding: '15px', border: '1px solid black', marginTop: '10px' }}>
        <AddReply practice={practice} onCommentAdd={handleCommentAdd} onVideoAdd={handleVideoAdd} onRecordAdd={handleRecordAdd}/>
      </div>
    </div>
  </div>;
}
