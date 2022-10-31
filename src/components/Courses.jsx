import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Posts/styles.css";
import { useHistory } from "react-router-dom";
export default function Courses() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [posts, setposts] = useState(null);
  const [userId, setUserId] = useState("");
  const [courseData, setCourseData] = useState(null);
  const [course, setCourse] = useState(null);
  const [filteredPosts, setFilteredposts] = useState([]);
  const [all, setAll] = useState(true);
  const [title, setTitle] = useState(null);
  const history = useHistory();
  window.onpopstate = () => {
    history.push("/");
  };
  useEffect(() => {
    if (!user) return;
    user.teacher ? setUserId(user.teacher._id) : setUserId(user.user._id);
  }, []);

  useEffect(() => {
    // console.log(all);
    const fetch = async () => {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/courses"
      );
      setposts(result.data);
    };
    fetch();
  }, []);
  // console.log(posts);
  // const filterCourses = (e) => {
  // console.log(e.target.innerText);
  useEffect(() => {
    const filtered = posts?.filter((post) => post.instrument === title);
    setFilteredposts(filtered);
    // setAll(false);
  }, [title]);

  // };
  // useEffect(() => {
  //   if (!courseData) return;
  //   const fetch = async () => {
  //     const res = await axios.get(
  //       process.env.REACT_APP_BACKEND_URL+`/courses/${courseData}`
  //     );
  //     console.log(res.data);
  //     setCourse(res.data);
  //   };
  //   fetch();
  //   //   console.log(res);
  //   //   setCourse(res.data);
  // }, [courseData]);

  // console.log(user);
  if (!posts)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "10%",
        }}
      >
        <div className="spinner">
          <div className="loader">
            <div className="balls_container">
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
            </div>
            <span>جاري تحميل البيانات</span>
          </div>
        </div>
      </div>
    );

  const handleClick = (post) => {
    console.log(post.owner);
    setAll(true);
    // setSelectedTeacher(post.owner);
    // const res = await axios.get(process.env.REACT_APP_BACKEND_URL+`/courses/${post._id}`);
    // console.log(res);
    setCourseData(post._id);
    history.push({ pathname: `/course/${post._id}`, id: post._id });
    window.localStorage.setItem("courseId", post._id);
    window.localStorage.setItem("ownerId", post.owner);
    // window.localStorage.setItem("courseId", post.owner);

    // history.push("/course");
  };

  // const handlechat = async (post) => {
  //   await axios.post(process.env.REACT_APP_BACKEND_URL+`/conversations/`, {
  //     senderId: userId,
  //     receiverId: post.owner,
  //   });
  // };
  // const showAll = () => {
  //   setAll(true);
  // };
  const showData = () => {
    return posts?.map((post) => {
      return (
        <div
          key={post._id}
          className="courseContainer"
          onClick={() => {
            handleClick(post);
          }}
          style={{ cursor: "pointer", padding: "5px", borderRadius: "5px" }}
        >
          <img
            src={post.avatar}
            alt={post.firstName}
            width="150"
            height="150"
            style={{ borderRadius: "50%", marginBottom: "10px" }}
          />
          <div>
            المدرس:
            {"  "} {post.firstName} {"  "}
            {post.lastName}
            <div>
              الآلة:{"  "}
              {post.instrument}
            </div>
            <div>
              المستوى:{"  "}
              {post.level}
            </div>
          </div>
        </div>
      );
    });
  };
  const showFilteredData = () => {
    return filteredPosts?.map((post) => {
      return (
        <div
          key={post._id}
          className="courseContainer"
          onClick={() => {
            handleClick(post);
          }}
          style={{ cursor: "pointer", padding: "5px", borderRadius: "5px" }}
        >
          {/* {post.firstName} {"  "}
          {post.lastName}
          <div>{post.instrument}</div>
          <div>{post.level}</div>
          <img
            src={post.avatar}
            alt={post.firstName}
            width="150"
            height="150"
            style={{ borderRadius: "50%" }}
          /> */}
          <img
            src={post.avatar}
            alt={post.firstName}
            width="150"
            height="150"
            style={{ borderRadius: "50%", marginBottom: "10px" }}
          />
          <div>
            المدرس:
            {"  "} {post.firstName} {"  "}
            {post.lastName}
            <div>
              الآلة:{"  "}
              {post.instrument}
            </div>
            <div>
              المستوى:{"  "}
              {post.level}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="coursesCss">
        <div className="allCourses" onClick={() => setAll(true)}>
          جميع الدورات الموسيقية
        </div>
        {/* <Link to="/Piano"> */}
        <div
          className="allCourses"
          // style={{
          //   border: "1px solid gray",
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          // }}
          onClick={() => {
            setTitle("بيانو");
            setAll(false);
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1579685055980-48dd748d862e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
            alt="بيانو"
            width="40px"
            height="40px"
            style={{ borderRadius: "50%", marginLeft: "10px" }}
          />
          بيانو
        </div>
        {/* </Link> */}
        {/* <Link to="/Oud"> */}
        <div
          onClick={() => {
            setTitle("عود");
            setAll(false);
          }}
          className="allCourses"

          // style={{
          //   border: "1px solid gray",
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          // }}
        >
          <img
            src="https://images.unsplash.com/photo-1593550573849-1d608bb469ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
            alt="piano"
            width="40px"
            height="40px"
            style={{ borderRadius: "50%", marginLeft: "10px" }}
          />
          عود
        </div>
        {/* </Link> */}
        {/* <Link to="/"> */}
        <div
          // style={{
          //   border: "1px solid gray",
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          // }}
          onClick={() => {
            setTitle("كمان");
            setAll(false);
          }}
          className="allCourses"
        >
          <img
            src="https://images.unsplash.com/photo-1460036521480-ff49c08c2781?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dmlvbGlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
            alt="piano"
            width="40px"
            height="40px"
            style={{ borderRadius: "50%", marginLeft: "10px" }}
          />
          كمان
        </div>
        {/* </Link> */}
        {/* <Link to="/"> */}
        {/* <div
          // style={{
          //   border: "1px solid gray",
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          // }}
          onClick={() => {
            setTitle("قانون");
            setAll(false);
          }}
          className="allCourses"
        >
          <img
            src="https://images.unsplash.com/photo-1579685055980-48dd748d862e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
            alt="piano"
            width="40px"
            height="40px"
            style={{ borderRadius: "50%", marginLeft: "10px" }}
          />
          قانون
        </div>
        {/* </Link> */}
      </div>

      <div className="showDataStyle">
        {all ? showData() : showFilteredData()}
      </div>
    </>
  );
}
