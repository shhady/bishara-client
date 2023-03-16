import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import "./StudentPractice.css"
export default function StudentMyPractice() {
  const [practice, setPractice] = useState({})
  const { id } = useParams()
  console.log(id)

  useEffect(() => {
    const fetch= async()=>{
      const res = await axios.get(process.env.REACT_APP_BACKEND_URL +`/practice/${id}`)
      setPractice(res.data)
    }
    fetch()
    
  },[id])

  const showRec =(practice)=>{
    return practice.RecordReply?.map((rec)=>{
      return <div key={practice.replyId} style={{display: 'flex', justifyContent:'center', alignItems:'center',marginTop: ".5rem", borderRadius:"20px"}}>
        <audio 
        style={{width:'100%'}}
      controls
    >
      <source src={rec.RecordingReply.replace('http://', 'https://')} type="audio/mp4" />
    </audio>
      </div>
    })
  }

  const markAsSeen = async () => {
    await axios.patch(
      process.env.REACT_APP_BACKEND_URL + `/practice/${id}`,
      {
        replySeen: true,
      }
    );
  };

  
  const deletePractice = () => {
   
    const deleteThePractice = async () => {
      await axios
        .delete(
          process.env.REACT_APP_BACKEND_URL + `/practice/${id}`
        )
        
    };
    deleteThePractice();
  };

  const showData = () => {
      return (
        <div
          className="practiceAndReply"
          style={{
            height:"fit-content",
            borderRight: "1px solid black",
            borderBottom: "1px solid #e1e1e1",
            // padding: "10px",
            marginTop: "100px",
          }}
          key={practice._id}
          onClick={() => markAsSeen(practice)}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div>
              {" "}
                الاستاذ: {" "}
                {practice.teacherFirstName} {practice.teacherLastName}
              </div>
              <div>
                {" "}
                الدورة: {" "}
                {practice.courseName}
              </div>
              <div>
              {" "}
                الدرس: {" "}
                {practice.video}
              </div>
            </div>
            <div>
              <button onClick={() => deletePractice(practice)} style={{backgroundColor:"#fee4b9", width:"80px"}}>
                حذف التمرين
              </button>
            </div>
          </div>
          <div
           className="videoAndRepliesProfile">
            <div
            className="StudentVideoProfile"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:"#fee4b9",
                marginBottom:"10px"
              }}
            >
              <video
                key={practice.myPractice}
                controls
                preload="metadata"
                height="250px"
                style={{
                  width: "90%",
                  height: "90%",
                  minHeight: "230px",
                  maxHeight: "230px",
                  border: "1px solid #e1e1e1",
                  marginTop:"10px",
                  marginBottom:"10px"
                }}
              >
                <source src={practice.myPractice?.replace('http://', 'https://')} type="video/mp4" />
              </video>
              
            </div>
            
            <div  className="replyForVideoProfile">
              {practice.reply ? (
              <div className="theCommentStudentPractice">{practice.reply}</div>):(null)}
              
              {practice.videoReply ? (
                <div className='StudentPracticeVideos'>
                  {practice.videoReply.length === 0 ?(<></>):(<>{practice.videoReply.map((reply, i) => {
                    return (
                      <video
                        key={reply.theVideoReply}
                        controls
                        preload="metadata"
                        className="videos4ProfilePractice"
                      >
                        <source src={reply.theVideoReply.replace('http://', 'https://')} type="video/mp4" />
                      </video>
                    );
                  })}</>)}
                  
                </div>
              ) : null}
              <div  className="audioProfile">
                      {showRec(practice)}
              </div>
            </div>
          </div>
        </div>
      );
  };

  return (
    <div>{showData()}</div>
  )
}
