// import React, { useState, useEffect } from "react";
// import "./Lessons.css";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCirclePlay,
//   faPenToSquare,
//   faCamera,
// } from "@fortawesome/free-solid-svg-icons";
// import { Link, useNavigate } from "react-router-dom";
// const youtubeurl = "https://www.googleapis.com/youtube/v3/playlistItems";
// export default function Lessons({ user, updateComponent, setUpdateComponent }) {
//   const [courseInfo, setCourseInfo] = useState(
//     JSON.parse(localStorage.getItem("courseDetails"))
//   );
//   const [updated, setUpdated] = useState(updateComponent);
//   // const [courseCover, setCourseCover] = useState(""
   
//   // );
//   // const [courseTitle, setCourseTitle] = useState(""
   
//   // );
//   // const [courseDes, setCourseDes] = useState(""
   
//   // );

//   const [listId, setListId] = useState("");
//   const [url, setUrl] = useState(null);
//   const [image, setImage] = useState();
//   const [fileUpload, setFileUpload] = useState(null);
//   const [inputTitle, setInputTitle] = useState(false);
//   const [inputDescription, setInputDescription] = useState(false);
//   const [newValue, setNewValue] = useState("");
//   const [newValueDes, setNewValueDes] = useState("");

//   const [lessons, setLessons] = useState([]);
//   const navigate = useNavigate();
//   // window.onpopstate = () => {
//   //   navigate("/TeacherData");
//   //   setUpdated("");
//   // };

 

//   useEffect(() => {
//     if (!image) return;
//     const postDetails = () => {
//       const formData = new FormData();
//       formData.append("file", image);
//       formData.append("upload_preset", "bisharaHaroni");
      
//       axios
//         .post("https://api.cloudinary.com/v1_1/djvbchw2x/upload", formData, {
//           onUploadProgress: (p) => {
//             const percentComplete = Math.round((p.loaded * 100) / p.total);
//             setFileUpload({ fileName: image.name, percentComplete });
//             console.log(`${percentComplete}% uploaded`);
//           },
//         })
//         .then((res) => setUrl(res.data.secure_url))
     
//         .catch((err) => {
//           console.log(err);
//         });
//     };
//     postDetails();
//   }, [image]);

//   useEffect(() => {
//     if (!url) return;
//     const changePhoto = async () => {
//       await axios
//         .patch(
//           process.env.REACT_APP_BACKEND_URL + `/courses/${courseInfo._id}`,
//           {
//             coursePhoto: url,
//           }
//         )
//         // .then(() => {
         
//         //   setCourseCover(url);
//         // })
//         .then(async () => {
//           const res = await axios.get(
//             process.env.REACT_APP_BACKEND_URL + `/courses/${courseInfo._id}`
//           );
//           window.localStorage.setItem("courseDetails", JSON.stringify(res.data));
//           setCourseInfo(res.data)
//           setUpdated(res.data)
         
//         });
//     };
//     changePhoto();
    
   

//   }, [url]);

//   useEffect(() => {
//     setUpdated(updateComponent);
//   }, [updateComponent]);


//   useEffect(() => {
//     if (updated) {
//       setListId(updated.playlistId);
//     } else {
//       setListId(courseInfo.playlistId);
//     }
//   }, [courseInfo, updated]);
  
//   useEffect(() => {
//     const fetch = async () => {
//       const result = await axios.get(
//         `${youtubeurl}?part=snippet&playlistId=${listId}&maxResults=50&key=${process.env.REACT_APP_YOUTUBE_KEY}`
//       );
//       setLessons(result.data.items);
    
//     };
//     fetch();
//   }, [listId]);

//   const handleLessonClick = (lesson) => {
   
//     if (user) {
//       navigate(`/Lesson/${lesson.snippet.playlistId}/${lesson.snippet.resourceId.videoId}`, { state: { id: lesson.snippet.playlistId } });
//     } else {
//       navigate("/auth");
//     }

//     window.localStorage.setItem("lessonDetails", JSON.stringify(lesson));
//     window.localStorage.setItem("courseOwnerId", courseInfo.owner);
//     window.localStorage.setItem("playlistId", lesson.snippet.playlistId);
//     window.localStorage.setItem("teacherId", updated.owner);
//   };
 
//   useEffect(() => {}, [lessons]);
//   const drawLessons = () => {
//     return lessons?.map((lesson, i) => {
//       return (
//         <div key={i}>
       
//           <div onClick={() => handleLessonClick(lesson)}>
//             <div
//               className="lessonCover"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 width: "100%",
//                 height: "210px",
//                 backgroundImage: lesson.snippet.thumbnails.high ? `url(${lesson.snippet.thumbnails.high.url.replace('http://', 'https://')})`: `url('https://images.unsplash.com/photo-1554050857-c84a8abdb5e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2t8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60')`,
//                 backgroundPosition: "center",
//                 backgroundSize: "cover",
//                 backgroundRepeat: "no-repeat",
//                 cursor: "pointer",
//               }}
//             >
//               <div
//                 style={{
//                   color: "white",
//                   background: "rgba(0,0,0,0.2)",
//                   width: "fit-content",
//                   borderRadius: "50%",
//                 }}
//               >
//                 <FontAwesomeIcon icon={faCirclePlay} size="3x" />
//               </div>
             
              
//             </div>
//             <div style={{ textAlign: "center" }}>{lesson.snippet.title}</div>
//           </div>
          
//         </div>
//       );
//     });
//   };

//   const openInputDescription = () => {
//     setInputDescription(true);
//   };
//   const openInputTitle = () => {
//     setInputTitle(true);
//   };

//   const changeTitle = () => {
//     if (!newValue) setInputTitle(false);

//     const changeTitle = async () => {
//       await axios
//         .patch(
//           process.env.REACT_APP_BACKEND_URL + `/courses/${courseInfo._id}`,
//           {
//             title: newValue,
//           }
//         )
//         // .then(() => {
//         //   setCourseTitle(newValue);
//         // })
//         .then(async () => {
//           const res = await axios.get(
//             process.env.REACT_APP_BACKEND_URL + `/courses/${courseInfo._id}`
//           );
//           window.localStorage.setItem("courseDetails", JSON.stringify(res.data));
//           setCourseInfo(res.data)
//           setUpdated(res.data)
          
//         });
//     };
//     changeTitle();
//     setInputTitle(false);
//   };
//   const changeDescription = () => {
//     if (!newValueDes) setInputDescription(false);
//     const changeDes = async () => {
//       await axios
//         .patch(
//           process.env.REACT_APP_BACKEND_URL + `/courses/${courseInfo._id}`,
//           {
//             description: newValueDes,
//           }
//         )
//         // .then(() => {
          
//         //   setCourseDes(newValueDes);
          

//         // })
//         .then(async () => {
//           const res = await axios.get(
//             process.env.REACT_APP_BACKEND_URL + `/courses/${courseInfo._id}`
//           );
        
//           window.localStorage.setItem("courseDetails", JSON.stringify(res.data));
//           setCourseInfo(res.data)
//           setUpdated(res.data)
//         });
//     };
//     changeDes();
//     setInputDescription(false);
//   };

//   return (
//     <div className="courseDataAll">
//       <div
//         className="lessonCoverBig"
//         style={{
//           backgroundImage: `url(${
//             updated ? updated.coursePhoto?.replace('http://', 'https://') : courseInfo.coursePhoto?.replace('http://', 'https://')
//           })`,
          
//         }}
//       >
      
//         <div
//           style={{
//             height: "100%",
//             width: "20px",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "flex-end",
            
//           }}
//         >
//           {user?.teacher?._id === courseInfo.owner || user?.teacher?.role === "admin" ? (
//             <div
//               style={{
//                 backgroundColor: "white",
//                 borderRadius: "50%",
//                 width: "40px",
//                 height: "40px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 cursor: "pointer",
//               }}
//             >
//               <label for="inputTag">
//                 <FontAwesomeIcon
//                   icon={faCamera}
//                   style={{ cursor: "pointer" }}
//                 />
//                 <input
//                   type="file"
//                   onChange={(e) => {
//                     setImage(e.target.files[0]);
//                   }}
//                   id="inputTag"
//                   style={{ display: "none" }}
                  
//                 />
//               </label>
//             </div>
//           ) : null}
//         </div>
//       </div>
//       <div className="profile1">
       
//         <div className="infoinfo">
//           <div className="partInfo">
//             <div>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                 }}
//               >
//                 {inputTitle ? (
//                   <div style={{ marginTop: "40px" }}>
//                     <input onChange={(e) => setNewValue(e.target.value)} />
//                     <button onClick={changeTitle}>تثبيت</button>
//                   </div>
//                 ) : (
//                   <>
//                     <h1 style={{ fontSize: "38px" }}>
//                       {updated ? updated.title : courseInfo.title}
//                     </h1>
//                     {user?.teacher?._id === courseInfo.owner || user?.teacher?.role === "admin" ? (
//                       <h3
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           marginRight: "15px",
//                         }}
//                         onClick={openInputTitle}
//                       >
//                         <FontAwesomeIcon
//                           icon={faPenToSquare}
//                           style={{ cursor: "pointer" }}
//                         />
//                       </h3>
//                     ) : null}
//                   </>
//                 )}
//               </div>
//               <h1 style={{ fontSize: "24px" }}>
//                 {updated ? updated.firstName : courseInfo.firstName}
//                 {"  "}
//                 {updated ? updated.lastName : courseInfo.lastName}
//               </h1>
//             </div>
//           </div>
//           <div className="part2Info">
//             {inputDescription ? (
//               <div style={{ marginTop: "20px" }}>
//                 <textarea
//                   onChange={(e) => setNewValueDes(e.target.value)}
//                   style={{ width: "100%", height: "100%" }}
//                 />
//                 <button onClick={changeDescription}>تثبيت</button>
//               </div>
//             ) : (
//               <div>           
//                 {user?.teacher?._id === courseInfo.owner|| user?.teacher?.role === "admin"  ? (
//                   <h3
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       marginLeft: "25px",
//                     }}
//                     onClick={openInputDescription}
//                   >
//                     <FontAwesomeIcon
//                       icon={faPenToSquare}
//                       style={{ cursor: "pointer" }}
//                     />
//                   </h3>
//                 ) : null}

//                 {updated ? updated.description : courseInfo.description}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="lessonsVideos">{drawLessons()}</div>
//     </div>
//   );
// }
