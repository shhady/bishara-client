import React from "react";
import Post from "./Post/PostOud";
import { useSelector } from "react-redux";
export default function PostsPiano() {
  const posts = useSelector((state) => state.posts);
  console.log(posts);
  return (
    <>
      <div>Posts Oud</div>
      <Post />
    </>
  );
}
