import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./createCourse.css";
const youtubeurl = "https://www.googleapis.com/youtube/v3/playlistItems";

// import Courses from "../Courses";
export default function CreateCourse() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [popUp, setPopUp] = useState(false);
  const [url, setUrl] = useState(null);
  const [image, setImage] = useState();
  const [fileUpload, setFileUpload] = useState(null);
  const [photoFromPlayList, setPhotoFromPlayList] = useState("");
  const [course, setCourse] = useState({
    instrument: "",
    firstName: "",
    lastName: "",
    title: "",
    avatar: "",
    description: "",
    level: "",
    playlistId: "",
    coursePhoto: "",
    // coursePhotoManual: "",
    // videos: [],
  });
  const [final, setFinal] = useState(course);
  const navigate = useNavigate();
  const firstName = useRef(user.firstName);
  const lastName = useRef(user.lastName);
  const avatar = useRef(user.avatar);
  
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
      .then((res) => setUrl(res.data.secure_url))
      // .then((url) => {
      //   setCourse({ ...course, coursePhoto: url });
      // })
      // .then(console.log(profilePic))
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
    // if (isSignUp) {
    //   dispatch(signup(formData, history));
    // } else {
    //   dispatch(signin(formData, history));
    // }
    await axios.post(process.env.REACT_APP_BACKEND_URL + `/courses`, course, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    });
    // navigate("/courses/");
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
    setCourse({
      ...course,
      // [e.target.name]: e.target.value,
      firstName: firstName.current,
      lastName: lastName.current,
      // instrument: e.target.value,
      avatar: avatar.current,
      // level: e.target.value,
    });
  }, [final]);

  return (
    <div style={{ width: "80%" }}>
      <form onSubmit={handleSubmit}>
        <div className="createCourseForm">
          <input
            type="text"
            defaultValue={firstName.current}
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
            defaultValue={user.lastName}
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
            <option value="فلوت">فلوت</option>
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
      </form>
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
              onClick={() => navigate("/courses")}
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

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function CreateCourse() {
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
//   const [popUp, setPopUp] = useState(false);
//   const [url, setUrl] = useState(null);
//   const [image, setImage] = useState();
//   const [fileUpload, setFileUpload] = useState(null);
//   const [photoFromPlayList, setPhotoFromPlayList] = useState("");
//   const [course, setCourse] = useState({
//     instrument: "",
//     firstName: "",
//     lastName: "",
//     title: "",
//     avatar: "",
//     description: "",
//     level: "",
//     playlistId: "",
//     coursePhoto: "",
//   });
//   const navigate = useNavigate();
//   const firstName = useRef(user.teacher.firstName);
//   const lastName = useRef(user.teacher.lastName);
//   const avatar = useRef(user.teacher.avatar);

//   const handleFileChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const postDetails = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("file", image);
//     formData.append("upload_preset", "bisharaHaroni");

//     axios
//       .post("https://api.cloudinary.com/v1_1/djvbchw2x/upload", formData, {
//         onUploadProgress: (p) => {
//           const percentComplete = Math.round((p.loaded * 100) / p.total);
//           setFileUpload({ fileName: image.name, percentComplete });
//           console.log(`${percentComplete}% uploaded`);
//         },
//       })
//       .then((res) => setUrl(res.data.url))
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setPopUp(true);

//     await axios.post(process.env.REACT_APP_BACKEND_URL + `/courses`, course, {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: window.localStorage.getItem("token"),
//       },
//     });

//     // navigate("/courses/");
//   };

//   useEffect(() => {
//     const fetchPlaylist = async () => {
//       const result = await axios.get(
//         `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${course.playlistId}&maxResults=50&key=${process.env.REACT_APP_YOUTUBE_KEY}`
//       );
//       setPhotoFromPlayList(result.data.items[0].snippet.thumbnails.high.url);
//     };

//     fetchPlaylist();
//   }, [course.playlistId]);

//   useEffect(() => {
//     setCourse({
//       ...course,
//       firstName: firstName.current,
//       lastName: lastName.current,
//       avatar: avatar.current,
//     });
//   }, [course]);

//   return (
//     <div style={{ width: "80%" }}>
//       <form onSubmit={handleSubmit}>
//         <div style={{ display: "flex", flexDirection: "column" }}>
//           <div style={{ marginBottom: "20px" }}>
//             <label htmlFor="firstName">First Name:</label>
//             <input
//               type="text"
//               id="firstName"
//               defaultValue={firstName.current}
//               name="firstName"
//               style={{ width: "100%" }}
//             />
//           </div>
//           <div style={{ marginBottom: "20px" }}>
//             <label htmlFor="lastName">Last Name:</label>
//             <input
//               type="text"
//               id="lastName"
//               defaultValue={user.teacher.lastName}
//               name="lastName"
//               style={{ width: "100%" }}
//             />
//           </div>
//           <div style={{ marginBottom: "20px" }}>
//             <label htmlFor="title">Course Title:</label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               style={{ width: "100%" }}
//             />
//           </div>
//           <div style={{ marginBottom: "20px" }}>
//             <label htmlFor="description">Description:</label>
//             <textarea
//               id="description"
//               name="description"
//               style={{ width: "100%", minHeight: "100px" }}
//             />
//           </div>
//           <div style={{ marginBottom: "20px" }}>
//             <label htmlFor="level">Course Level:</label>
//             <select
//               id="level"
//               name="level"
//               style={{ width: "100%" }}
//             >
//               <option value="">Select Level</option>
//               <option value="Beginner">Beginner</option>
//               <option value="Intermediate">Intermediate</option>
//               <option value="Advanced">Advanced</option>
//             </select>
//           </div>
//           <div style={{ marginBottom: "20px" }}>
//             <label htmlFor="playlistId">Playlist ID:</label>
//             <input
//               type="text"
//               id="playlistId"
//               name="playlistId"
//               style={{ width: "100%" }}
//             />
//           </div>
//           <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               style={{ display: "none" }}
//               id="courseFileInput"
//             />
//             <label
//               htmlFor="courseFileInput"
//               style={{
//                 padding: "10px 20px",
//                 backgroundColor: "#007bff",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//                 marginRight: "10px",
//               }}
//             >
//               Upload Course Cover Photo
//             </label>
//             {fileUpload && (
//               <span style={{ fontWeight: "bold" }}>
//                 {fileUpload.percentComplete}%
//               </span>
//             )}
//           </div>
//           <input
//             type="submit"
//             value="Submit"
//             style={{
//               padding: "10px 20px",
//               backgroundColor: "#007bff",
//               color: "#fff",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//               marginTop: "20px",
//             }}
//           />
//         </div>
//       </form>
//       {popUp ? (
//          <div
//            style={{
//              position: "fixed",
//              top: 0,
//              width: "100vw",
//              height: "100vh",
//              background: "grey",
//              opacity: 0.8,
//              display: "flex",
//              flexDirection: "column",
//              justifyContent: "center",
//              alignItems: "center",
//            }}
//          >
//            <div style={{ textAlign: "center", width: "80%", margin: "auto" }}>
//              <h2>
//                الدورة التي انشئتها ستكون الاولى في صفحة الدورات الموسيقية
//                <br /> اضغط عليها وابدأ برفع الفيديوهات
//              </h2>
//              <br />
//              <button
//                style={{ width: "60%" }}
//                onClick={() => navigate("/courses")}
//              >
//                صفحة الدورات الموسيقية
//              </button>
//            </div>
//            <div
//            // style={{
//              // display: "flex",
//               //justifyContent: "center",
//               //alignItems: "center",
//             //}}
//            ></div>
//          </div>
//        ) : null}
//     </div>
//   );
// }
