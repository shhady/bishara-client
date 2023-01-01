// import axios from "axios";
// import React, { useState } from "react";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// // import { getUser } from "../../api/UserRequests";
// const Conversation = ({ data, currentUser, online }) => {
//   const [user, setUser] = useState(
//     JSON.parse(window.localStorage.getItem("profile"))
//   );
//   const [userData, setUserData] = useState(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const userId = data.members.find((id) => id !== currentUser);
//     if(user.user) return;
//     if (user?.teacher) {
//       const getUserData = async () => {
//         try {
//           const { data } = await axios.get(
//             process.env.REACT_APP_BACKEND_URL + `/users/${userId}`
//           );
//           setUserData(data);
//           console.log(data);
//           // dispatch({ type: "SAVE_USER", data: data });
//           // const { data } = await getUser(userId);
//           // setUserData(data);
//           // dispatch({ type: "SAVE_USER", data: data });
//         } catch (error) {
//           console.log(error);
//         }
//       };
//       getUserData();
//     }
//   }, []);

//   return (
//     <>
//       <div className="follower conversation">
//         <div>
//           {online && <div className="online-dot"></div>}
//           <img
//             src={
//               userData?.avatar
//                 ? userData.avatar
//                 : "https://img.icons8.com/material-rounded/24/null/user.png"
//             }
//             alt="Profile"
//             className="followerImage"
//             style={{ width: "50px", height: "50px" }}
//           />
//           <div className="name" style={{ fontSize: "0.8rem" }}>
//             <span style={{ color: "black" }}>
//               {userData?.firstName} {userData?.lastName}
//             </span>
//             <span style={{ color: online ? "#51e200" : "" }}>
//               {online ? "Online" : "Offline"}
//             </span>
//           </div>
//         </div>
//       </div>
//       <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
//     </>
//   );
// };

// export default Conversation;
