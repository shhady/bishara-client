// import React, { useState } from "react";
// import "./FreeVideos.css";
// import Pianovideo from "./Pianovideo";
// import Oudvideo from "./Oudvideo";
// import Violinvideo from "./Violinvideo";
// export default function FreeVideos() {
//   const [showPiano, setShowPiano] = useState(true);
//   const [showOud, setShowOud] = useState(false);
//   const [showViolin, setShowViolin] = useState(false);
//   const showOud1 = () => {
//     setShowPiano(false);
//     setShowViolin(false);
//     setShowOud(true);
//   };
//   const showPiano1 = () => {
//     setShowPiano(true);
//     setShowOud(false);
//     setShowViolin(false);
//   };

//   const showViolin1 = () => {
//     setShowPiano(false);
//     setShowOud(false);
//     setShowViolin(true);
//   };
//   return (
//     <div>
//       <div className="trustUs">
//         <div className="learnFromTheBest">تعلم من الافضل</div>
//         <div>
//           <h2>
//             قم ببناء مستقبلك الموسيقي وتطوير شغفك وإحراز تقدم هادف - بسرعة.
//           </h2>
//         </div>
//         <div>
//           تعرّف على كيف يمكن أن تساعدك "Dawrat Fun" على إحراز تقدم واكتشف لماذا
//           يثق أكثر من 10000 موسيقي حول العالم بنا كمنصة للتعلم عبر الإنترنت.
//         </div>
//       </div>
//       <div style={{ textAlign: "center", marginTop: "30px" }}>
//         {/* <h2>دورات تدريبية</h2> */}
//       </div>
//       <div className="mainVideos">
//         <div className="buttons">
//           <button className="buttonP" onClick={showPiano1}>
//             {showPiano === true ? (
//               <h3
//                 style={{
//                   borderRight: "3px solid rgb(231, 108, 108)",
//                   padding: "4px",
//                 }}
//               >
//                 بيانو
//               </h3>
//             ) : (
//               <h3>بيانو</h3>
//             )}
//           </button>{" "}
//           <button className="buttonO" onClick={showOud1}>
//             {showOud === true ? (
//               <h3
//                 style={{
//                   borderRight: "3px solid rgb(231, 108, 108)",
//                   padding: "4px",
//                 }}
//               >
//                 عود
//               </h3>
//             ) : (
//               <h3>عود</h3>
//             )}
//           </button>
//           <button className="buttonO" onClick={showViolin1}>
//             {showViolin === true ? (
//               <h3
//                 style={{
//                   borderRight: "3px solid rgb(231, 108, 108)",
//                   padding: "4px",
//                 }}
//               >
//                 كمان
//               </h3>
//             ) : (
//               <h3>كمان</h3>
//             )}
//           </button>
//         </div>
//         <div className="videos">
//           {showPiano && <Pianovideo />}
//           {showOud && <Oudvideo />}
//           {showViolin && <Violinvideo />}
//         </div>
//       </div>
//     </div>
//   );
// }


import React from 'react'
import "./FreeVideos.css"

export default function FreeVideos() {
  return (
    <div className='mainFreeVideos'>
        <div style={{
              color: "black",
              cursor: "pointer",
              fontSize: "34px",
              fontWeight: "bold",
              marginRight:"5px"
            }}>عزف مدرسين</div>
            <div className='allVideos'>
            <div  className="videoFree">
            <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/XcIChKQLEXU`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
            </div>
            <div className="videoFree">
            <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/RJRhMdO8vo0`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
            </div>
            
            <div  className="videoFree">
            <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/XbHqqqjqLsc?list=PLVyh_TRAmEfFFMHb4lkDnnp_aExzNaMli`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
            </div>
            <div  className="videoFree">
            <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/y1gYGUhrccs`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
            </div>
            </div>
    </div>
  )
}
