// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./styles.css";
// import { useEffect } from "react";

// export default function CreateTeacher() {
//   const [urlAvatar, setUrlAvatar] = useState(null);
//   const [imageAvatar, setImageAvatar] = useState();
//   const [urlCover, setUrlCover] = useState(null);
//   const [imageCover, setImageCover] = useState();
//   const [fileUploadAvatar, setFileUploadAvatar] = useState(null);
//   const [fileUploadCover, setFileUploadCover] = useState(null);

//   // const [avatar, setAvatar] = useState("")
//   const [teacher, setTeacher] = useState({
//     firstName: "",
//     lastName: "",
//     instrument: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     avatar: "",
//     cover: "",
//     about: "",
//   });

//   const navigate = useNavigate();
//   // const postDetailsAvatar = () => {
//   useEffect(() => {
//     const formData = new FormData();
//     formData.append("file", imageAvatar);
//     formData.append("upload_preset", "bisharaHaroni");
//     // formData.append("cloud_name", "shhady");
//     axios
//       .post("https://api.cloudinary.com/v1_1/djvbchw2x/upload", formData, {
//         onUploadProgress: (p) => {
//           const percentComplete = Math.round((p.loaded * 100) / p.total);
//           setFileUploadAvatar({ fileName: imageAvatar.name, percentComplete });
//           console.log(`${percentComplete}% uploaded`);
//         },
//       })
//       .then((res) => setUrlAvatar(res.data.url))
//       // .then((data) => {
//       //   (data.url);
//       // })
//       // .then(console.log(url))
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [imageAvatar]);

//   useEffect(() => {
//     const formData = new FormData();
//     formData.append("file", imageCover);
//     formData.append("upload_preset", "bisharaHaroni");
//     // formData.append("cloud_name", "shhady");
//     axios
//       .post("https://api.cloudinary.com/v1_1/djvbchw2x/upload", formData, {
//         onUploadProgress: (p) => {
//           const percentComplete = Math.round((p.loaded * 100) / p.total);
//           setFileUploadCover({ fileName: imageAvatar.name, percentComplete });
//           console.log(`${percentComplete}% uploaded`);
//         },
//       })
//       .then((res) => setUrlCover(res.data.url))
  
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [imageCover]);
//   // };


//   useEffect(() => {
//     setTeacher({ ...teacher, avatar: urlAvatar });
//   }, [urlAvatar]);
//   useEffect(() => {
//     setTeacher({ ...teacher, cover: urlCover });
//   }, [urlCover]);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post(
//       process.env.REACT_APP_BACKEND_URL + `/teachers`,
//       teacher
//       // avatar: urlAvatar,
//       // cover: urlCover,
//     );
//     navigate("/teachers");
//   };

//   const handleChange = (e) => {
//     setTeacher({ ...teacher, [e.target.name]: e.target.value });
//   };

//   // const handleAvatar = (e) => {
//   //   const file = e.target.files[0];
//   //   transformFile(file);
//   // };

//   // const transformFile = (file) => {
//   //   const reader = new FileReader();
//   //   if (file) {
//   //     reader.readAsDataURL(file);
//   //     reader.onloadend = () => {
//   //       setTeacher({ ...teacher, avatar: reader.result });
//   //     };
//   //   } else {
//   //     setTeacher({ ...teacher, avatar: "" });
//   //   }
//   // };
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className="formCreateTeacher">
//           <input
//             name="firstName"
//             placeholder="First Name"
//             required
//             onChange={handleChange}
//             style={{
//               textAlign: "center",
//               width: "60%",
//               marginBottom: "20px",
//               marginTop: "20px",
//             }}
//           />
//           <input
//             name="lastName"
//             placeholder="Last Name"
//             required
//             onChange={handleChange}
//             style={{ textAlign: "center", width: "60%", marginBottom: "20px" }}
//           />
//           <input
//             name="instrument"
//             placeholder="Instrument"
//             required
//             onChange={handleChange}
//             style={{ textAlign: "center", width: "60%", marginBottom: "20px" }}
//           />
//           {/* <input name="image" type="file" required onChange={handleChange} /> */}
//           <input
//             name="email"
//             placeholder="Email"
//             required
//             onChange={handleChange}
//             style={{ textAlign: "center", width: "60%", marginBottom: "20px" }}
//           />
//           <input
//             name="password"
//             placeholder="Password"
//             required
//             onChange={handleChange}
//             style={{ textAlign: "center", width: "60%", marginBottom: "20px" }}
//           />
//           <input
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             required
//             onChange={handleChange}
//             style={{ textAlign: "center", width: "60%", marginBottom: "20px" }}
//           />
//           <textarea
//             name="about"
//             placeholder="About"
//             onChange={handleChange}
//             style={{ textAlign: "center", width: "60%", marginBottom: "20px" }}
//           />
//           {/* <input type="file" onChange={handleAvatar} /> */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-around",
//               marginTop: "10px",
//             }}
//           >
//             <div>صورة شخصيه</div>
//             <div>
//               {/* <FileBase
//                 type="file"
//                 multiple={false}
//                 onDone={({ base64 }) =>
//                   setTeacher({ ...teacher, avatar: base64 })
//                 }
//               /> */}
//               <input
//                 type="file"
//                 onChange={(e) => setImageAvatar(e.target.files[0])}
//                 onClick={() => setUrlAvatar(null)}
//               />
//               {fileUploadAvatar && (
//                 <span style={{ textAlign: "center" }}>
//                   {" "}
//                   {fileUploadAvatar.percentComplete}%
//                 </span>
//               )}
//             </div>
//           </div>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-around",
//               marginTop: "20px",
//             }}
//           >
//             <label>صورة غلاف</label>
//             {/* <FileBase
//               type="file"
//               multiple={false}
//               onDone={({ base64 }) => setTeacher({ ...teacher, cover: base64 })}
//             /> */}
//             <input
//               type="file"
//               onChange={(e) => setImageCover(e.target.files[0])}
//               onClick={() => setUrlCover(null)}
//             />
//             {fileUploadCover && (
//               <span style={{ textAlign: "center" }}>
//                 {" "}
//                 {fileUploadCover.percentComplete}%
//               </span>
//             )}
//           </div>
//           <input
//             className="createTeacherSubmit"
//             type="submit"
//             style={{
//               textAlign: "center",
//               width: "60%",
//               height: "30px",
//               marginBottom: "20px",
//               marginTop: "20px",
//               border: "none",
//               cursor: "pointer",
//               borderRadius: "5px",
//               color: "white",
//             }}
//           />
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useEffect } from "react";

export default function CreateTeacher() {
  const [urlAvatar, setUrlAvatar] = useState(null);
  const [imageAvatar, setImageAvatar] = useState();
  const [urlCover, setUrlCover] = useState(null);
  const [imageCover, setImageCover] = useState();
  const [fileUploadAvatar, setFileUploadAvatar] = useState(null);
  const [fileUploadCover, setFileUploadCover] = useState(null);
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    instrument: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
    cover: "",
    about: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const formData = new FormData();
    formData.append("file", imageAvatar);
    formData.append("upload_preset", "bisharaHaroni");

    axios
      .post("https://api.cloudinary.com/v1_1/djvbchw2x/upload", formData, {
        onUploadProgress: (p) => {
          const percentComplete = Math.round((p.loaded * 100) / p.total);
          setFileUploadAvatar({ fileName: imageAvatar.name, percentComplete });
          console.log(`${percentComplete}% uploaded`);
        },
      })
      .then((res) => setUrlAvatar(res.data.url))
      .catch((err) => {
        console.log(err);
      });
  }, [imageAvatar]);

  useEffect(() => {
    const formData = new FormData();
    formData.append("file", imageCover);
    formData.append("upload_preset", "bisharaHaroni");

    axios
      .post("https://api.cloudinary.com/v1_1/djvbchw2x/upload", formData, {
        onUploadProgress: (p) => {
          const percentComplete = Math.round((p.loaded * 100) / p.total);
          setFileUploadCover({ fileName: imageAvatar?.name, percentComplete });
          console.log(`${percentComplete}% uploaded`);
        },
      })
      .then((res) => setUrlCover(res.data.url))
      .catch((err) => {
        console.log(err);
      });
  }, [imageCover]);

  useEffect(() => {
    setTeacher({ ...teacher, avatar: urlAvatar });
  }, [urlAvatar]);

  useEffect(() => {
    setTeacher({ ...teacher, cover: urlCover });
  }, [urlCover]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(process.env.REACT_APP_BACKEND_URL + `/teachers`, teacher);
    navigate("/teachers");
  };

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };
  console.log(fileUploadCover);
  return (
    <div className="createTeacherContainer">
      <form className="createTeacherForm" onSubmit={handleSubmit}>
        <h2>أضف معلم</h2>
        <div className="formGroup">
          <input
            className="inputField"
            name="firstName"
            placeholder="First Name"
            required
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <input
            className="inputField"
            name="lastName"
            placeholder="Last Name"
            required
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <input
            className="inputField"
            name="instrument"
            placeholder="Instrument"
            required
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <input
            className="inputField"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <input
            className="inputField"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <input
            className="inputField"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <textarea
            className="inputField"
            name="about"
            placeholder="About"
            onChange={handleChange}
          />
        </div>
        <div  style={{ display: "flex", alignItems: "flex-start" , justifyContent:"space-between"}}>
        <div style={{ display: "flex", flexDirection: "column" }}>
  {/* <label
    htmlFor="avatarFileInput"
    style={{ marginBottom: "10px", fontWeight: "bold" }}
  >
    صورة شخصيه
  </label> */}
  <div style={{ display: "flex", alignItems: "center"}}>
    <input
      id="avatarFileInput"
      type="file"
      onChange={(e) => setImageAvatar(e.target.files[0])}
      onClick={() => setUrlAvatar(null)}
      style={{ display: "none" }}
    />
    <label
      htmlFor="avatarFileInput"
      style={{
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
       صورة شخصيه
    </label>
  </div>
  {fileUploadAvatar && (
    <span style={{ marginTop: "10px", color:"black" }}>
      {fileUploadAvatar.percentComplete}%
    </span>
  )}
</div>

        <div style={{ display: "flex", flexDirection: "column" }}>
  {/* <label
    htmlFor="coverFileInput"
    style={{ marginBottom: "10px", fontWeight: "bold" }}
  >
     
  </label> */}
  <div style={{ display: "flex", alignItems: "flex-start" }}>
    <input
      id="coverFileInput"
      type="file"
      onChange={(e) => setImageCover(e.target.files[0])}
      onClick={() => setUrlCover(null)}
      style={{ display: "none" }}
    />
    <label
      htmlFor="coverFileInput"
      style={{
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
       صورة غلاف
    </label>
  </div>
  {fileUploadCover && (
    <>
     <span style={{ marginTop: "10px",color:'black'}}>
      {fileUploadCover.fileName}
    </span>
    <span style={{ marginTop: "10px",color:'black'}}>
      {fileUploadCover.percentComplete}%
    </span>
    </>
  )}
</div>
</div>
        <button className="submitButton" type="submit">
          انشاء
        </button>
      </form>
    </div>
  );
}
