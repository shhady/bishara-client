import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import "./startchat.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
export default function StartChat({ teacherId, userId }) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const history = useHistory();
  //   useEffect(() => {
  //     const getConversations = async () => {
  //       try {
  //         const res = await axios.get(
  //           process.env.REACT_APP_BACKEND_URL + `/conversations/` + userId
  //         );
  //         if (!res) return null;
  //         setConversations(res.data);
  //       } catch (error) {
  //       }
  //     };
  //     getConversations();
  //   }, [userId]);
  useEffect(() => {
    const conv = async () => {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/conversations"
      );
      setConversations(result.data.map((members) => members.members));
    };
    conv();
  }, []);

  const handleClick = async () => {
    //     setTeacherId(teacherId);
    //     setTopPageImg(teacher.avatar);
    //     setTopPageName(teacher.firstName);
    //     setTopPageLastName(teacher.lastName);
    let existingConversations = conversations;
    let newConversation = [userId, teacherId];
    existingConversations = JSON.stringify(existingConversations);
    newConversation = JSON.stringify(newConversation);
    let c = existingConversations.indexOf(newConversation);
    if (c !== -1) {
      const conv = async () => {
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_URL +
            `/conversations/find/${userId}/${teacherId}`
        );
        setCurrentChat(res.data);
      };
      conv();
    } else {
      console.log("no chat");
      await axios
        .post(process.env.REACT_APP_BACKEND_URL + "/conversations", {
          receiverId: teacherId,
          senderId: userId,
          senderReceiver: `${userId}${teacherId}`,
          receiver: `${teacherId}`,
          lastUpdated: new Date(),
          seen: "false",
          showAtTeacher: "false",
        })
        .then(() => {
          conversations.push([...conversations, [userId, teacherId]]);
        })
        .then(async () => {
          const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL +
              `/conversations/find/${userId}/${teacherId}`
          );
          setCurrentChat(res.data);
        });
    }
    history.push("/messenger");
  };
  useEffect(() => {});
  return (
    <div className="buttonStartChat">
      <div style={{ marginLeft: "10px" }}>
        <FontAwesomeIcon icon={faMessage} />
      </div>
      <div onClick={handleClick}>مراسلة</div>
    </div>
  );
}
