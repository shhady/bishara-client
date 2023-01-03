// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./messenger.css";
// export default function ListOfTeachers({
//   userId,
//   setCurrentChat,
//   setTopPageLastName,
//   setTopPageName,
//   setTopPageImg,
//   setTeacherId,
//   teacherId,
// }) {
//   const [teachers, setTeachers] = useState(null);
//   const [conversations, setConversations] = useState([]);
//   // const [teacherId, setTeacherId] = useState(null);
//   useEffect(() => {
//     const teachers = async () => {
//       const res = await axios.get(
//         process.env.REACT_APP_BACKEND_URL + "/teachers"
//       );
//       setTeachers(res.data);
//     };
//     teachers();
//   }, []);

//   // useEffect(() => {
//   //   const conv = async () => {
//   //     const result = await axios.get(
//   //       process.env.REACT_APP_BACKEND_URL + "/conversations"
//   //     );
//   //     setConversations(result.data.map((members) => members.members));
//   //   };
//   //   conv();
//   // }, []);

//   if (!teachers) return null;

//   const handleClick = async (teacher) => {
//     setTeacherId(teacher._id);
//     setTopPageImg(teacher.avatar);
//     setTopPageName(teacher.firstName);
//     setTopPageLastName(teacher.lastName);
//     setTeacherId(teacher._id);
//     // setCurrentChat(`${currentId}${teacherId}`);
//     // let existingConversations = conversations;
//     // let newConversation = [currentId, teacher._id];
//     // existingConversations = JSON.stringify(existingConversations);
//     // newConversation = JSON.stringify(newConversation);

//     // let c = existingConversations.indexOf(newConversation);
//     // if (c !== -1) {
//     // -------------------------

//     // const conv = async () => {
//     const res = await axios.get(
//       process.env.REACT_APP_BACKEND_URL +
//         `/conversations/find/${userId}/${teacherId}`
//     );
//     setCurrentChat(res.data === null ? true : res.data);
//     console.log({ theDataaaaa: res.data });
//     // };
//     // conv();
//     // -------------------------
//     // } else {
//     //   await axios
//     //     .post(process.env.REACT_APP_BACKEND_URL + "/conversations", {
//     //       receiverId: teacher._id,
//     //       senderId: currentId,
//     //     })
//     //     .then(() => {
//     //       conversations.push([...conversations, [currentId, teacher._id]]);
//     //     })
//     // .then(async () => {
//     //   const res = await axios.get(
//     //     process.env.REACT_APP_BACKEND_URL +
//     //       `/conversations/find/${currentId}/${teacher._id}`
//     //   );
//     //   setCurrentChat(res.data);
//     // });
//     // }
//   };

//   const Draw = () => {
//     return teachers.map((teacher) => {
//       return (
//         <div
//           style={{
//             marginTop: "10px",
//             display: "flex",
//             justifyContent: "flex-start",
//             alignItems: "center",
//             marginRight: "10px",
//           }}
//           onClick={() => handleClick(teacher)}
//         >
//           {teacher._id === teacherId ? (
//             <div
//               className="chatSelectedTeacher"
//               style={{
//                 cursor: "pointer",
//                 width: "100%",
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//               }}
//             >
//               <div>
//                 <img
//                   src={teacher?.avatar}
//                   alt={teacher?.name}
//                   width="40px"
//                   height="40px"
//                   style={{ borderRadius: "50%", marginLeft: "5px" }}
//                 />
//               </div>
//               <div
//                 style={{ cursor: "pointer" }}
//                 className="teacherImagesForMobile"
//               >
//                 {teacher?.firstName}
//                 {"  "}
//                 {teacher?.lastName}
//               </div>
//             </div>
//           ) : (
//             <>
//               <div style={{ cursor: "pointer" }}>
//                 <img
//                   src={teacher?.avatar}
//                   alt={teacher?.name}
//                   width="40px"
//                   height="40px"
//                   style={{ borderRadius: "50%", marginLeft: "5px" }}
//                 />
//               </div>
//               <div
//                 style={{ cursor: "pointer" }}
//                 className="teacherImagesForMobile"
//               >
//                 {teacher?.firstName}
//                 {"  "}
//                 {teacher?.lastName}
//               </div>
//             </>
//           )}
//         </div>
//       );
//     });
//   };
//   return <div>{Draw()}</div>;
// }

//---------------------------------------------------- original

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./messenger.css";
export default function ListOfTeachers({
  currentId,
  setCurrentChat,
  setTopPageLastName,
  setTopPageName,
  setTopPageImg,
}) {
  const [teachers, setTeachers] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [teacherId, setTeacherId] = useState(null);
  useEffect(() => {
    const teachers = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/teachers"
      );
      setTeachers(res.data);
    };
    teachers();
  }, []);

  useEffect(() => {
    const conv = async () => {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/conversations"
      );
      setConversations(result.data.map((members) => members.members));
    };
    conv();
  }, []);

  if (!teachers) return null;

  const handleClick = async (teacher) => {
    setTeacherId(teacher._id);
    setTopPageImg(teacher.avatar);
    setTopPageName(teacher.firstName);
    setTopPageLastName(teacher.lastName);
    let existingConversations = conversations;
    let newConversation = [currentId, teacher._id];
    existingConversations = JSON.stringify(existingConversations);
    newConversation = JSON.stringify(newConversation);

    let c = existingConversations.indexOf(newConversation);
    if (c !== -1) {
      const conv = async () => {
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_URL +
            `/conversations/find/${currentId}/${teacher._id}`
        );
        setCurrentChat(res.data);
      };
      conv();
    } else {
      await axios
        .post(process.env.REACT_APP_BACKEND_URL + "/conversations", {
          receiverId: teacher._id,
          senderId: currentId,
          senderReceiver: `${currentId}${teacherId}`,
          receiverSender: `${teacherId}${currentId}`,
          lastUpdated: new Date(),
          seen: "false",
          showAtTeacher: "false",
        })
        .then(() => {
          conversations.push([...conversations, [currentId, teacher._id]]);
        })
        .then(async () => {
          const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL +
              `/conversations/find/${currentId}/${teacher._id}`
          );
          setCurrentChat(res.data);
        });
    }
    // try {
    //   await axios
    //     .post(process.env.REACT_APP_BACKEND_URL + "/conversations", {
    //       receiverId: teacher._id,
    //       senderId: currentId,
    //     })
    //     // .then(() => {
    //     //   conversations.push([...conversations, [currentId, teacher._id]]);
    //     // })
    //     .then(async () => {
    //       const res = await axios.get(
    //         process.env.REACT_APP_BACKEND_URL +
    //           `/conversations/find/${currentId}/${teacher._id}`
    //       );
    //       setCurrentChat(res.data);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const Draw = () => {
    return teachers.map((teacher) => {
      return (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginRight: "10px",
          }}
          onClick={() => handleClick(teacher)}
        >
          {teacher._id === teacherId ? (
            <div
              className="chatSelectedTeacher"
              style={{
                cursor: "pointer",
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <div>
                <img
                  src={teacher?.avatar}
                  alt={teacher?.name}
                  width="40px"
                  height="40px"
                  style={{ borderRadius: "50%", marginLeft: "5px" }}
                />
              </div>
              <div
                style={{ cursor: "pointer" }}
                className="teacherImagesForMobile"
              >
                {teacher?.firstName}
                {"  "}
                {teacher?.lastName}
              </div>
            </div>
          ) : (
            <>
              <div style={{ cursor: "pointer" }}>
                <img
                  src={teacher?.avatar}
                  alt={teacher?.name}
                  width="40px"
                  height="40px"
                  style={{ borderRadius: "50%", marginLeft: "5px" }}
                />
              </div>
              <div
                style={{ cursor: "pointer" }}
                className="teacherImagesForMobile"
              >
                {teacher?.firstName}
                {"  "}
                {teacher?.lastName}
              </div>
            </>
          )}
        </div>
      );
    });
  };
  return <div>{Draw()}</div>;
}
