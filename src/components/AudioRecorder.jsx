import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);

  let mediaRecorder;

  
  const startRecording = () => {
    setRecording(true);

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.addEventListener('dataavailable', (event) => {
        setAudioChunks((chunks) => [...chunks, event.data]);
      });

      mediaRecorder.start();
    });
  };

  const stopRecording = () => {
    setRecording(false);
    console.log("stopped")
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
  };
  useEffect(() => {
    if (audioChunks.length === 0) {
      return console.log("can't upload");
    }
    console.log("uploading")
    const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });

    const formData = new FormData();
    formData.append('file', audioBlob);
    formData.append('upload_preset', 'bisharaHaroni');

    axios
      .post('https://api.cloudinary.com/v1_1/djvbchw2x/upload', formData)
      .then((response) => {
        console.log('File uploaded to Cloudinary', response);
      })
      .catch((error) => {
        console.error('Error uploading file to Cloudinary', error);
      });
  }, [audioChunks]);
  return (
    <div>
      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
    </div>
  );
}

export default AudioRecorder;
