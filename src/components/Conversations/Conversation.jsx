// import React, { useState, useEffect } from "react";
// import "./conversation.css";
// import axios from "axios";
// export default function Conversation({ conversation, currentUser }) {
//   const [user, setUser] = useState(null);

//   //   console.log(user);
//   useEffect(() => {
//     const friendId = conversation.members.find((m) => m !== currentUser);

//     const getUser = async () => {
//       try {
//         const response = await axios.get(
//           process.env.REACT_APP_BACKEND_URL + "/users/" + friendId
//         );
//         setUser(response.data);
//       } catch (error) {
//         console.log("error");
//       }
//       try {
//         const response = await axios.get(
//           process.env.REACT_APP_BACKEND_URL + "/teachers/" + friendId
//         );
//         setUser(response.data);
//       } catch (error) {
//         console.log("error");
//       }
//     };
//     getUser();
//   }, [conversation, currentUser]);
//   console.log(conversation);
//   console.log(currentUser);
//   return (
//     <>
//       <div className="conversation">
//         <img
//           className="imageConversation"
//           src={
//             currentUser?.avatar
//               ? currentUser.avatar
//               : "https://img.icons8.com/material-rounded/24/null/user.png"
//           }
//           alt="Img"
//           style={{
//             borderRadius: "50%",
//             backgroundColor: "#e1e1e1",
//             padding: "1px",
//           }}
//         />

//         <span className="nameConversation" style={{ color: "black" }}>
//           {user?.firstName}
//           {"  "}
//           {user?.lastName}
//         </span>
//       </div>
//     </>
//   );
// }
//---------------------------------------------
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
//   const [avatar, setAvatar] = useState("");
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // const userId = data.members.find((id) => id !== currentUser);
//     if (user?.user) {
//       const getTeachers = async () => {
//         try {
//           const teachers = await axios.get(
//             process.env.REACT_APP_BACKEND_URL + `/teachers`
//           );
//           setUserData(teachers.data);
//         } catch (error) {
//           console.log(error);
//         }
//       };
//       getTeachers();
//     }
//   }, []);

//   // useEffect(() => {
//   //   setAvatar(userData?.avatar.toString());
//   // }, [userData]);
//   console.log(userData);

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
//---------------------------------------------------------------original

import React, { useState, useEffect } from "react";
import "./conversation.css";
import axios from "axios";
export default function Conversation({
  setConversation,
  conversation,
  currentUser,
  currentChat,
  setCurrentChat,
  setConversations,
  setTopPageLastName,
  setTopPageName,
  setTopPageImg,
}) {
  const [user, setUser] = useState(null);

  console.log(user);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);

    const getUser = async () => {
      try {
        if (user?.user) return;
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/users/" + friendId
        );
        setUser(response.data);
      } catch (error) {
        console.log("error");
      }
      try {
        if (user?.teacher) return;
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/teachers/" + friendId
        );
        setUser(response.data);
      } catch (error) {
        console.log("error");
      }
    };
    getUser();
  }, [conversation, currentUser]);
  console.log(conversation);
  console.log(currentChat);
  console.log(currentUser);

  const makeItSeen = async (conversation) => {
    console.log(conversation);
    try {
      await axios
        .patch(
          process.env.REACT_APP_BACKEND_URL +
            `/conversations/${conversation?._id}`,
          { seen: "true" }
        )
        .then(async () => {
          const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/conversations/${currentUser}`
          );
          setConversations(res.data);
        });
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  return (
    <>
      <div
        className="conversation"
        onClick={() => {
          makeItSeen(conversation);
          setTopPageLastName(user.firstName);
          setTopPageName(user.lastName);
          {
            user.avatar
              ? setTopPageImg(user.avatar)
              : setTopPageImg(
                  "https://img.icons8.com/material-rounded/24/null/user.png"
                );
          }
        }}
      >
        {conversation.seen === "false" &&
        conversation.lastSender !== currentUser ? (
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "red",
              marginRight: "5px",
              marginLeft: "10px",
              borderRadius: "50%",
            }}
          ></div>
        ) : (
          <div></div>
        )}
        <img
          className="imageConversation"
          src={
            user?.avatar
              ? user.avatar
              : "https://img.icons8.com/material-rounded/24/null/user.png"
          }
          alt="Img"
          style={{
            borderRadius: "50%",
            backgroundColor: "#e1e1e1",
            padding: "1px",
          }}
        />

        <div className="nameConversation" style={{ color: "black" }}>
          {/* <div className="nameLastName"> */}
          <span style={{ color: "black" }}>{user?.firstName}</span>
          {"  "}
          <span className="lastNameChat" style={{ color: "black" }}>
            {" "}
            {user?.lastName}
          </span>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
