import React,{useState, useEffect, useRef} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function GeneralButton({user}) {
    const [url, setUrl] = useState(null);
    const [nameOfProblem, setNameOfProblem] = useState("");
    const [video, setVideo] = useState();
    const [fileUpload, setFileUpload] = useState(null);
    const [moreThan, setMoreThan] = useState(null);
    
    const postDetails = () => {
        const formData = new FormData();
        formData.append("file", video);
        formData.append("upload_preset", "bisharaHaroni");
        axios
          .post("https://api.cloudinary.com/v1_1/djvbchw2x/upload", formData, {
            onUploadProgress: (p) => {
              const percentComplete = Math.round((p.loaded * 100) / p.total);
              setFileUpload({ fileName: video.name, percentComplete });
              console.log(`${percentComplete}% uploaded`);
            },
          })
          .then((res) => setUrl(res.data.url))
          .then((res) => console.log(res))
          .then(() => setVideo(null))
          .then(() => setFileUpload(null))
          .catch((err) => {
            console.log("can't upload > 100mb");
          });
      };

      const cancelUpload = () => {
        setUrl(null);
        setFileUpload(null);
        // setPracticeId(null);
        setNameOfProblem("");
        setVideo(null);
        window.location.reload()
      };
       const addTeacherVideoReply = async () => {
            await axios.post(process.env.REACT_APP_BACKEND_URL + `/replies`, {
              theVideoReply: url,
              videoName: "general",
              courseId: "general",
              nameOfProblem: nameOfProblem,
              practiceId: "general",
              uniqueLink: "general",
              teacherId: user.teacher._id
            });
            window.location.reload()
          };
    
  return (
    <div style={{marginTop:'100px'}}> 
      <h1 style={{textAlign:"center"}}>اضافة فيديو عام</h1>
       <div style={{display: "flex", justifyContent:"center",alignItems:"center" ,marginTop:'30px'}}>
                  
                        <input
                        style={{height: "100%"}}
                    type="text"
                    placeholder="عنوان الرد"
                    onChange={(e) => setNameOfProblem(e.target.value)}
                    required
                  />
                     
                   <div style={{marginRight:"10px",backgroundColor:"#black", width:"40px", height:"40px", borderRadius:"50%", display:"flex", justifyContent:"center",alignItems:"center"}}>
                  <label for="inputTag">
                    <FontAwesomeIcon icon={faVideo} />
                    <input
                      type="file"
                      onChange={(e) => {
                        e.target.files[0].size > 104857500
                          ? setMoreThan("more than 100mb")
                          : setVideo(e.target.files[0]);
                      }}
                      id="inputTag"
                      style={{ display: "none" }}
                      onClick={() => {
                        setUrl(null);
                        setVideo(null);
                        setMoreThan(null);
                      }}
                    />
                  </label>
                 
                  </div>
                  </div> {moreThan && (
                    <div style={{ color: "red" }}>
                      لا يمكن رفع فيديو اكبر من 100 ميجا بايت
                    </div>
                  )}

                  <div  style={{display: "flex", justifyContent:"center",alignItems:"center", marginTop:"50px" }}>
                    {video && !moreThan ? (
                      <button onClick={() => postDetails()}  style={{width:"100px" }}>
                        رفع الفيديو
                      </button>
                    ) : null}
                    {"  "}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      {fileUpload && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            width: "50%",
                            height: "fit-content",
                          }}
                        >
                       
                          <p>{fileUpload.percentComplete}%</p>
                        </div>
                      )}

                      {url ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "200px",
                            height: "100%",
                          }}
                        >
                          <button
                            onClick={addTeacherVideoReply}
                            style={{ backgroundColor:"#fee4b9",color:"black" , width:"80px"}}
                          >
                            حفظ
                          </button>
                          <button
                            onClick={cancelUpload}
                            style={{ backgroundColor:"red",color:"white", width:"80px"}}
                          >
                            الغاء
                          </button>
                        </div>
                      ) : null}
                    </div> 
                  </div>
                  </div>
  )
}
