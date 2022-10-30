import React from "react";
import Post from "./Post/PostPiano";
import { useSelector } from "react-redux";
export default function PostsPiano() {
  const posts = useSelector((state) => state.posts);
  console.log(posts);
  return (
    <>
      <div style={{ color: "black", marginTop: "50px" }}>دروس بيانو</div>

      <Post />
    </>
  );
}
