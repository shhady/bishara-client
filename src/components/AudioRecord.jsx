import React,{useState} from 'react';
import {AudioRecorder} from 'react-audio-voice-recorder';
import axios from 'axios';

function AudioRecord({setTeacherPractices, practice, unique_id, userId}) {
  const [audioBlob, setAudioBlob] = useState(null);
  const [url ,setUrl]= useState('')
  const [resetRecorder, setResetRecorder] = useState(true);
  const addAudioElement = async (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.controls = true;
    // document.body.appendChild(audio);
    setAudioBlob(blob);
    console.log('completed')
  };
  const confirmUploading = async()=>{
    // const audio = document.querySelector('audio');
    // if (audio) {
    //   audio.remove();
    // }
    console.log(practice)
    try {
      const formData = new FormData();
      formData.append('file', audioBlob);
      formData.append('upload_preset', "bisharaHaroni"); // replace with your own upload preset

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/djvbchw2x/upload', // replace with your own cloud name
        formData
      )
      await axios
        .put(process.env.REACT_APP_BACKEND_URL + `/practiceRec/${practice._id}`, {
          RecordingReply: response.data.url,
          videoName: practice.video,
          courseId: practice.courseId,
          nameOfProblem: "recording",
          practiceId: practice._id,
          uniqueLink: practice.uniqueLink,
          teacherId: practice.teacherId,
          replyId: unique_id,
        }) .then(async () => {
          await axios.patch(
            process.env.REACT_APP_BACKEND_URL +
              `/studentpractices/${practice._id}`,
            {
              replySeen: false,
            }
          );
        })
        .then(async () => {
          const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/mypractices/${userId}`
          );
          // const filterData = res.data.filter(
          //   (practice) => practice.teacherId === userId
          // );
          setTeacherPractices(res.data);
        })
       
        setAudioBlob(null)
        
    setResetRecorder(false)
    
    
  
    } catch (error) {
      console.error(error);
    }
  }
  
  const deleteRec = ()=>{
    setAudioBlob(null)
    // setResetRecorder(false)
     const audio = document.querySelector('audio');
    if (audio) {
      audio.remove();
    }
  }
  // console.log(resetRecorder);
  return (
    <div>
      {practice.RecordReply.length > 1 ? (<>max two replies</>):(<>
        {audioBlob ? <> <button onClick={confirmUploading}  style={{ backgroundColor:"#fee4b9",color:"black" , width:"80px"}}>ارسال</button><button onClick={deleteRec} style={{ backgroundColor:"red",color:"white", width:"80px"}}>الغاء</button></> : <AudioRecorder onRecordingComplete={addAudioElement} />}
</>)}
    </div>
  );
}

export default AudioRecord;

