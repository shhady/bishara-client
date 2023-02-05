// import React,{useState, useEffect} from 'react'
// import axios from 'axios';
// const youtubeurl = "https://www.googleapis.com/youtube/v3/playlistItems";
// export default function Evaluation({teacherInfo}) {
//     const [courseEva, setCourseEva] = useState();
//     useEffect(() => {
//         const fetch = async () => {
//           const result = await axios.get(
//             `${youtubeurl}?part=snippet&playlistId=PLVyh_TRAmEfFr6I1LMZ0EadFWU4tXZmyw&maxResults=50&key=${process.env.REACT_APP_YOUTUBE_KEY}`
//           );
//           setCourseEva(result.data.items);
//           //   setData(result.data.items[0].snippet.thumbnails.default.url);
//         };
//         fetch();
//       }, []);
//       console.log(courseEva);
//       console.log(teacherInfo)
//   return (
//     <div>evaluation</div>
//   )
// }
