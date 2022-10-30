import React, { useEffect } from "react";
// import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
// import logo from "./images/Logo.JPG";
import "./PianoPage.css";
import PostsOud from "./Posts/PostsOud";
import Form from "./Form/FormPiano";
import { useDispatch } from "react-redux";
import { getPosts } from "../actions/posts";
export default function Piano() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <div className="mainContainer">
      <div className="postsContainer">
        <PostsOud />
      </div>
    </div>
  );
}
