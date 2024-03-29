import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";
export default function Post() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [posts, setposts] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/courses"
      );
      setposts(result.data);
    };
    fetch();
  }, []);

  if (!posts) return null;

  const results = posts.filter((obj) => {
    return obj.instrument === "piano";
  });

  const goToCourse = (result) => {
    navigate({ pathname: "/course", id: result._id });
  };
  const showData = () => {
    return results.map((result) => {
      return (
        <div
          key={result._id}
          className="courseContainer"
          onClick={() => goToCourse(result)}
        >
          {result.firstName} {"  "}
          {result.lastName}
          <div>{result.instrument}</div>
          <div>{result.level}</div>
          <img
            src={result.avatar}
            alt={result.firstName}
            width="150"
            height="150"
            style={{ borderRadius: "50%" }}
          />
        </div>
      );
    });
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      {showData()}
    </div>
  );
}
