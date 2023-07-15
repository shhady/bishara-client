// import React, { useEffect, useState } from 'react'
// import "./youtubeForPractice.css"
// import { useNavigate } from 'react-router-dom'
// export default function YoutubeForPractice({theLessonToShowId, showLesson, setShowLesson}) {
//   const [id, setId]=useState(window.localStorage.getItem('lessonReview'))
//   const navigate = useNavigate()
//   useEffect(() => {
//     console.log(id)
//   }, []) // only execute once when component mounts
// window.onpopstate = () => {
//     navigate("/practiceReplies");
//   };
//   return (
//     <div  className="LessonVideoPractice">
//       <iframe
//         width="100%"
//         height="95%"
//         src={`https://www.youtube.com/embed/${id}?modestbranding=1&autoplay=1&rel=0&showinfo=0&fs=1`}
//         title="Fadi a"
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       ></iframe>
//     </div>
//   )
// }