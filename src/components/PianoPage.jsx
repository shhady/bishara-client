import React, { useEffect } from "react";
// import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
// import logo from "./images/Logo.JPG";
import "./PianoPage.css";
import Pianovideo from "./Pianovideo";
import { Link } from "react-router-dom";
// import PostsPiano from "./Posts/PostsPiano";
// import Form from "./Form/FormPiano";
// import { useDispatch } from "react-redux";
// import { getPosts } from "../actions/posts";
export default function PianoPage({ user, setUser }) {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [dispatch]);
  return (
    <div className="mainContainer">
      <div className="first">
        <div>
          <Pianovideo />
        </div>
        <div className="firstContent">
          <h2>دروس ودورات من أفضل عازفي البيانو في العالم.</h2>
          <div>
            صقل أسسك ، وطور شغفك ، وحقق تقدمًا بتوجيهات من العقول الرائدة في
            البيانو الكلاسيكي.
          </div>
          {user ? (
            <Link to="courses">
              <button className="btn-PianoPage">الدورات </button>
            </Link>
          ) : (
            <Link to="/Auth">
              <button className="btn-PianoPage">تسجيل دخول</button>
            </Link>
          )}
        </div>
      </div>
      <div className="second">
        <h2>يضم مدربين من مؤسسات ذات شهرة عالمية.</h2>
        <h4>
          لقد استخدمنا العقول الرائدة في البيانو الكلاسيكي لمساعدتك على التعلم
          وإحراز تقدم أسرع.
        </h4>
      </div>
      <div className="third">
        <div className="learnFromTheBest"> جرب بنفسك</div>
        <div>
          <h2>جرب دورات البيانو بدورات فن "دروس مجانية". </h2>
        </div>
        <div>
          استمتع ببعض دروس البيانو الكلاسيكية الأكثر شهرة أدناه مجانًا. عندما
          تكون مستعدًا للمزيد ، ابدأ تجربتك المجانية وقم بالوصول إلى أكثر من 500
          درس ودورة ومقابلات من أفضل عازفي البيانو في العالم!{" "}
        </div>
      </div>
      <div className="freeLessons">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="https://images.pexels.com/photos/4016579/pexels-photo-4016579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="free"
            width="200px"
            height="200px"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="https://images.pexels.com/photos/4016579/pexels-photo-4016579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="free"
            width="200px"
            height="200px"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="https://images.pexels.com/photos/4016579/pexels-photo-4016579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="free"
            width="200px"
            height="200px"
          />
        </div>
      </div>

      {/* <div className="postsContainer"> */}
      {/* <PostsPiano /> */}
      {/* </div> */}
    </div>
  );
}
