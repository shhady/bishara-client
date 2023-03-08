// import React ,{useState, useEffect, useRef}from 'react'
// import axios from 'axios'
// export default function CreateCourseForTeacher() {
//     const [teacher, setTeacher]=useState('')
//     const [email,setEmail] = useState('')
//     const [course,setCourse] = useState({
//         owner:teacher._id,
//         firstName:teacher.firstName,
//         lastName:teacher.lastName,
//         avatar:teacher.avatar,
//         title:title.current.value,

//     })

//     const title = useRef()
//         const getMeTeacher = async(e)=>{
//             e.preventDefault();
//             const res =await axios.get("https://bisharaserver.herokuapp.com/teacher",
//             {
//                 params: { email },
//               }
//             )
//             setTeacher(res.data);
//         }
       
//   return (
//     <div>
//         <h1>انشئ دوره لمعلم اخر</h1>
//         <form onSubmit={getMeTeacher}>
//         <input type="email" onChange={(e) =>setEmail(e.target.value)}/>
//         <input type="submit" />
//         </form>

//         <form>
//             <input type="text" value={teacher.firstName}/>
//             <input type="text" value={teacher.lastName}/>
//             <input type="text" ref={title}/>
//             <input />
//             <input />
//             <input />
//             <input />

//         </form>
//     </div>
//   )
// }


import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./createCourse.css";
const youtubeurl = "https://www.googleapis.com/youtube/v3/playlistItems";

// import Courses from "../Courses";
export default function CreateCourseForTeacher() {
    const [teacher, setTeacher]=useState('')
  const [popUp, setPopUp] = useState(false);
  const [url, setUrl] = useState(null);
  const [image, setImage] = useState();
  const [fileUpload, setFileUpload] = useState(null);
  const [email,setEmail] = useState('');
  const [showFormCreation, setShowFormCreation] = useState(true)
  const [photoFromPlayList, setPhotoFromPlayList] = useState("");
  const [course, setCourse] = useState({
    owner:"",
    instrument: "",
    firstName: "",
    lastName: "",
    title: "",
    avatar: "",
    description: "",
    level: "",
    playlistId: "",
    coursePhoto: "",
  });
  console.log(course)
  const [final, setFinal] = useState(course);
  const history = useHistory();
 
  const getMeTeacher = async(e)=>{
                e.preventDefault();
                const res =await axios.get("https://bisharaserver.herokuapp.com/teacher",
                {
                    params: { email },
                  }
                )
                setTeacher(res.data);
                setShowFormCreation(!showFormCreation);
                
            }
           
  
            useEffect(()=>{
                setCourse({
                    ...course,
                    firstName: teacher.firstName,
                    lastName: teacher.lastName,
                    avatar: teacher.avatar,
                    owner:teacher._id
                  });
            },[teacher])

  const postDetails = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "bisharaHaroni");
    // formData.append("cloud_name", "shhady");
    axios
      .post("https://api.cloudinary.com/v1_1/djvbchw2x/upload", formData, {
        onUploadProgress: (p) => {
          const percentComplete = Math.round((p.loaded * 100) / p.total);
          setFileUpload({ fileName: image.name, percentComplete });
          console.log(`${percentComplete}% uploaded`);
        },
      })
      .then((res) => setUrl(res.data.url))
      
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setCourse({ ...course, coursePhoto: url ? url : photoFromPlayList });
  }, [url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPopUp(true);
    await axios.post(process.env.REACT_APP_BACKEND_URL + `/addCourses`, course
    );
    // history.push("/courses/");
  };

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(
        `${youtubeurl}?part=snippet&playlistId=${course.playlistId}&maxResults=50&key=${process.env.REACT_APP_YOUTUBE_KEY}`
      );
      // setVideos(result.data.items);
      setPhotoFromPlayList(result.data.items[0].snippet.thumbnails.high.url);
    };
    fetch();
  }, [course.playlistId]);

  // const createNow = () => {};
  useEffect(() => {
    
  }, [final]);

  return (
    <div style={{ marginTop:"100px" }}>
{showFormCreation ? (<div style={{ backgroundColor:"#c7c5c5",display:"flex", justifyContent:"center", alignItems: "center", flexDirection: "column"}}>
    <h1>انشئ دوره لمعلم اخر</h1>
         <form onSubmit={getMeTeacher} style={{display:"flex", justifyContent:"space-evenly", alignItems: "center", flexDirection: "column", height: "20vh", width:"40vw", }}>
         <input type="email" onChange={(e) =>setEmail(e.target.value)} required style={{width:"100%", height:"30px"}}/>
        <input type="submit" style={{width:"100%", height:"30px", backgroundColor:"#fee4b9"}}/>
   </form></div>):(<form onSubmit={handleSubmit}>
        <div className="createCourseForm">
          <input
            type="text"
            defaultValue={teacher.firstName}
            name="firstName"
            style={{
              textAlign: "start",
              width: "100%",
              marginBottom: "20px",
              marginTop: "20px",
            }}

            // onChange={handleChange}
          />
          <input
            type="text"
            defaultValue={teacher.lastName}
            name="lastName"
            style={{ textAlign: "start", width: "100%" }}
            // onChange={handleChange}
          />
          <input
            placeholder="عنوان الدورة"
            name="title"
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            style={{ textAlign: "start", width: "100%", marginTop: "20px" }}
            // onChange={handleChange}
            // autoFocus
            required
          />
          <select
            style={{
              textAlign: "start",
              width: "100%",
              marginTop: "20px",
              marginBottom: "20px",
            }}
            onChange={(e) =>
              setCourse({ ...course, instrument: e.target.value })
            }
            required
          >
            <option value=""> الآلة الموسيقية</option>
            <option value="بيانو">بيانو</option>
            <option value="عود">عود</option>
            <option value="كمان">كمان</option>
            <option value="جيتار">جيتار</option>
            <option value="تشيلو">تشيلو</option>
            <option value="قانون">قانون</option>
            <option value="ناي">ناي</option>
            <option value="ايقاع">ايقاع</option>
            <option value="بزق">بزق</option>
            <option value="غناء">غناء</option>
            <option value="عام">عام</option>
          </select>
          <select
            style={{ textAlign: "start", width: "100%" }}
            onChange={(e) => setCourse({ ...course, level: e.target.value })}
            required
          >
            <option value="">المستوى</option>
            <option value="مبتدأ">مبتدأ</option>
            <option value="مبتدأ/متوسط">مبتدأ/متوسط</option>
            <option value="متوسط">متوسط</option>
            <option value="متوسط/متقدم">متوسط/متقدم</option>
            <option value="متقدم">متقدم</option>
          </select>

          <input
            placeholder="playlistId - from youtubeLink"
            name="playlistId"
            onChange={(e) =>
              setCourse({ ...course, playlistId: e.target.value })
            }
            style={{ textAlign: "start", width: "100%", marginTop: "20px" }}
            // onChange={handleChange}
            // autoFocus
            required
          />
          <div className="addFileCoverCourse">
            <input
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />

            <button onClick={postDetails} className="addFileCoverCourseButton">
              تثبيت صورة الغلاف
            </button>
            {/* <div> */}
            {fileUpload && (
              <span style={{ textAlign: "center" }}>
                {" "}
                {fileUpload.percentComplete}%
              </span>
            )}
            {/* </div> */}
          </div>

          <textarea
            placeholder="وصف الدورة"
            name="description"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            style={{ textAlign: "start", width: "100%" }}
            // onChange={handleChange}
            // autoFocus
            required
          />

          {/*  <input
          placeholder="المستوى"
          name="level"
          onChange={handleChange}
          required
        /> */}
          {/* <input type="file" name="videos" onChange={handleChangeVideos} /> */}
          <input
            className="createCourseSubmit"
            type="submit"
            style={{
              textAlign: "center",
              width: "100%",
              marginBottom: "20px",
              cursor: "pointer",
              marginTop: "20px",
            }}
            // onClick={() => setRefresh(!refresh)}
          />
        </div>
      </form>)}

      
      {/* <div style={{ display: "none" }}>
        <Courses refresh={refresh} setRefresh={setRefresh} />
      </div> */}
      {popUp ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            width: "100vw",
            height: "100vh",
            background: "grey",
            opacity: 0.8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center", width: "80%", margin: "auto" }}>
            <h2>
              الدورة التي انشئتها ستكون الاولى في صفحة الدورات الموسيقية
              <br /> اضغط عليها وابدأ برفع الفيديوهات
            </h2>
            <br />
            <button
              style={{ width: "60%" }}
              onClick={() => history.push("/courses")}
            >
              صفحة الدورات الموسيقية
            </button>
          </div>
          <div
          // style={{
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          // }}
          ></div>
        </div>
      ) : null}
    </div>
  );
}
