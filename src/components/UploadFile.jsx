import React, { useState, useEffect } from "react";
import axios from "axios";
// import { saveAs } from "file-saver";
import "../pages/Lesson/Lesson.css";
export default function UploadFile({ courseInfo, lesson, id , paidUpdate, ifNotUserShow
 , setIfNotUser}) {
  const user=JSON.parse(localStorage.getItem("profile"));
  const paid = useState(window.localStorage.getItem("paid"))

  const [file, setFile] = useState();
  const [url, setUrl] = useState(null);
  // const [video, setVideo] = useState();
  const [fileUploaded, setFileUploaded] = useState(true);
  const [fileUpload, setFileUpload] = useState(null);
  const [theFile, setTheFile] = useState(null);
  useEffect(() => {
    if(!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "bisharaHaroni");
   
    axios
      .post("https://api.cloudinary.com/v1_1/djvbchw2x/upload", formData, {
        onUploadProgress: (p) => {
          const percentComplete = Math.round((p.loaded * 100) / p.total);
          setFileUpload({ fileName: file.name, percentComplete });
          console.log(`${percentComplete}% uploaded`);
        },
      })
      .then((res) => setUrl(res.data.url))
    
      .catch((err) => {
        console.log(err);
      });
  }, [file]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/files/${id}`
      );
      setTheFile(response.data[0]);
      setFile(null);
      setFileUpload(null);
    };
    fetch();
  }, [id]);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL +
          `/files/${lesson.snippet.resourceId.videoId}`
      );
      setTheFile(response.data[0]);
      
      setFileUploaded(null);
    };
    fetch();
  }, [lesson.snippet.resourceId.videoId]);
  
  const postData = async () => {
    setFileUploaded(false);
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/files", {
        fileUrl: file,
        videoId: lesson.snippet.resourceId.videoId,
        teacherId: courseInfo.owner,
        playListId: courseInfo.playlistId,
      })
      .then(async () => {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL +
            `/files/${lesson.snippet.resourceId.videoId}`
        );
        setTheFile(response.data[0]);
        setFileUploaded(null);
      });
  };


  const deleteTheFile = (theFile) => {
    axios
      .delete(process.env.REACT_APP_BACKEND_URL + `/files/${theFile._id}`)
      .then(async () => {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL +
            `/files/${lesson.snippet.resourceId.videoId}`
        );
        setTheFile(response.data[0]);
        setFileUploaded(null);
      });
  };

  return (
    <div className="uploadFile">
      {user?.teacher?._id === courseInfo.owner || user.teacher?.role === "admin" ? (
        <>
          
          <>
         
            {!theFile && (
              <input
                type="text"
                onChange={(e) => setFile(e.target.value)}
                onClick={() => setUrl(null)}
              />
            )}
          </>
         
          {!theFile && (
            <div
              style={{
                textDecoration: "none",
                color: "black",
                width: "150px",
                height: "20px",
                backgroundColor: "white",
                border: "2px solid black",
                borderRadius: "5px",
                textAlign: "center",
                fontWeight: "bold",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={postData}
            >
              ADD PDF LINK
            </div>
          )}

          <div style={{ cursor: "pointer" }}>
         
           
            {theFile && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "50vw",
                }}
              >
              
                <a
                  href={theFile?.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    width:"40vw",
                    maxWidth: "100px",
                    backgroundColor: "white",
                    border: "2px solid black",
                    borderRadius: "5px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  PDF{" "}
                </a>
              
                <div
                  onClick={() => deleteTheFile(theFile)}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    width:"40vw",
                    maxWidth: "100px",
                    backgroundColor: "white",
                    border: "2px solid black",
                    borderRadius: "5px",
                    textAlign: "center",
                    fontWeight: "bold",
                    marginRight: "10px",
                  }}
                >
                  delete
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {(theFile && paid[0] === courseInfo.owner) || (paidUpdate===courseInfo.owner) ? (
            // <button
            <div style={{display:"flex", justifyContent: "center", alignItems: "center",border: "2px solid black"}}>
            
            <a
              href={theFile?.fileUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                color: "black",
                width: "40vw",
                backgroundColor: "white",
                // borderRadius: "5px",
                textAlign: "center",
                fontWeight: "bold",
                maxWidth: "150px",
              }}
            >
              {" "}
              ملف{" "}
            </a>
            </div>
            // </button>
            // <button onClick={() => downloadFile()}>Download File</button>
          ):(  
            <>{theFile?( <div style={{display:"flex", justifyContent: "center", alignItems: "center", flexDirection:"column"}}>
            <div
            onClick={()=> setIfNotUser(!ifNotUserShow)}
              style={{
                textDecoration: "none",
                color: "black",
                width: "40vw",
                backgroundColor: "white",
                // borderRadius: "5px",
                textAlign: "center",
                fontWeight: "bold",
                border: "2px solid black",
                cursor:"pointer",
                maxWidth: "150px",
              }}
            >
              {" "}
              ملف{" "}
            </div>
            {/* {ifNotUserShow && (
            <>يجب ان تكون مسجل لدى المعلم
           
           </> )
            } */}
            </div>):(null)}</>
           )}
        </>
      )}
    </div>
  );
}
