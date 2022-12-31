import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "./Lesson.css";
export default function UploadFile({ courseInfo, lesson, id }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [file, setFile] = useState();
  const [url, setUrl] = useState(null);
  // const [video, setVideo] = useState();
  const [fileUploaded, setFileUploaded] = useState(true);

  const [fileUpload, setFileUpload] = useState(null);
  const [theFile, setTheFile] = useState(null);
  useEffect(() => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "bisharaHaroni");
    // formData.append("cloud_name", "shhady");
    axios
      .post("https://api.cloudinary.com/v1_1/djvbchw2x/upload", formData, {
        onUploadProgress: (p) => {
          const percentComplete = Math.round((p.loaded * 100) / p.total);
          setFileUpload({ fileName: file.name, percentComplete });
          console.log(`${percentComplete}% uploaded`);
        },
      })
      .then((res) => setUrl(res.data.url))
      // .then((data) => {
      //   (data.url);
      // })
      // .then(console.log(url))
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
      console.log(response.data);
      console.log(id);
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
      console.log(response.data);
      console.log(id);
      setFileUploaded(null);
    };
    fetch();
  }, []);
  //   useEffect(() => {
  const postData = async () => {
    setFileUploaded(false);
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/files", {
        fileUrl: url,
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

  //   console.log(theFile[0]?.fileUrl);

  //   const downloadFile = () => {
  //     console.log("clickkkeddd");
  //     // saveAs(theFile[0]?.fileUrl);
  //   };
  //   }, [url]);
  useEffect(() => {
    console.log(theFile?.fileUrl);
  }, [theFile, id]);

  //   const downloadFile = async (url) => {
  //     try {
  //       const response = await fetch(url);
  //       const blob = await response.blob();
  //       saveAs(blob, `${theFile.fileUrl}`);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  const downloadFile = async (url) => {
    try {
      // Append the fl_attachment flag to the URL
      const downloadUrl = `${theFile?.fileUrl}?fl_attachment`;
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      // Set the file name as the download attribute
      a.download = `${theFile?.fileUrl}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  //   const downloadFile = async (url) => {
  //     try {
  //       const response = await fetch(theFile?.fileUrl);
  //       const blob = await response.blob();
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement("a");
  //       a.style.display = "none";
  //       a.href = url;
  //       a.download = `${theFile?.fileUrl}`;
  //       document.body.appendChild(a);
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  return (
    <div className="uploadFile">
      {user?.teacher?._id === courseInfo.owner ? (
        <>
          {fileUpload ? (
            <div style={{ textAlign: "center" }}>
              {" "}
              {fileUpload.percentComplete}%
            </div>
          ) : (
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              onClick={() => setUrl(null)}
            />
          )}
          <button onClick={postData}>add photo</button>
          <div style={{ cursor: "pointer" }}>
            {/* <a href={theFile[0]?.fileUrl} download>
          Download
        </a> */}
            {/* <button onClick={downloadFile}>Download</button> */}
            {theFile && (
              <button onClick={() => downloadFile(`${theFile?.fileUrl}`)}>
                Download File
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          {theFile && (
            <button onClick={() => downloadFile(`${theFile?.fileUrl}`)}>
              Download File
            </button>
          )}
        </>
      )}
      {/* <>
        {theFile && (
          <button onClick={() => downloadFile(`${theFile?.fileUrl}`)}>
            Download File
          </button>
        )}
      </> */}
    </div>
  );
}
