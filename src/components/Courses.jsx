import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Posts/styles.css";
import { useHistory } from "react-router-dom";
export default function Courses({
  listId,
  setListId,
  setCourse,
  setUpdateComponent,
}) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [posts, setposts] = useState(null);
  const [userId, setUserId] = useState("");
  const [courseData, setCourseData] = useState(null);
  // const [course, setCourse] = useState(null);
  const [filteredPosts, setFilteredposts] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
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

  console.log(user);
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
          marginTop: "100px",
        }}
      >
        {/* <div className="spinner"> */}
        <div className="loader">
          {/* <div className="balls_container">
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
            </div>
            <span>جاري تحميل البيانات</span> */}
        </div>
        {/* </div> */}
      </div>
    );

  const handleClick = (post) => {
    console.log(post);
    setAll(true);
    // setSelectedTeacher(post.owner);
    // const res = await axios.get(process.env.REACT_APP_BACKEND_URL+`/courses/${post._id}`);
    // console.log(res);
    setCourseData(post._id);
    history.push(`/Lessons`);
    window.localStorage.setItem("courseId", post._id);
    window.localStorage.setItem("ownerId", post.owner);
    window.localStorage.setItem("playlistId", post.playlistId);
    window.localStorage.setItem("teacherId", post.owner);
    setListId(post.playlistId);
    setCourse(post);
    window.localStorage.setItem("courseDetails", JSON.stringify(post));
    setUpdateComponent(post);

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
            src={post.coursePhoto}
            alt={post.firstName}
            width="100%"
            height="150"
            style={{ marginBottom: "10px" }}
          />
          <div style={{ fontWeight: "700" }}>{post.title}</div>
          <div style={{ width: "80%" }}>
            <div className="nameInstrumentLevel">
              {post.firstName} {"  "}
              {post.lastName}
              <div>
                {post.instrument} / {post.level}
              </div>
            </div>
            <div>{post.description.slice(0, 35)}...</div>
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
          {/* <img
            src={post.avatar}
            alt={post.firstName}
            width="150"
            height="150"
            style={{ borderRadius: "50%", marginBottom: "10px" }}
          /> */}
          <img
            src={post.coursePhoto}
            alt={post.firstName}
            width="100%"
            height="150"
            style={{ marginBottom: "10px" }}
          />
          <div style={{ fontWeight: "700" }}>{post.title}</div>
          <div style={{ width: "80%" }}>
            <div className="nameInstrumentLevel">
              {post.firstName} {"  "}
              {post.lastName}
              <div>
                {post.instrument} / {post.level}
              </div>
            </div>
            <div>{post.description.slice(0, 35)}...</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div style={{ display: "grid", gridAutoColumns: "3fr 1fr" }}>
      <div className="TopOfPage">الدورات</div>
      <div className="filterInstruments" onClick={() => setShowPopUp(true)}>
        اختر آلة
      </div>
      {showPopUp ? (
        <div className="popUpAll" onClick={() => setShowPopUp(false)}>
          <div className="thePopUp">
            <div>
              <div className="coursesPopUp">
                <div className="allCourses" onClick={() => setAll(true)}>
                  <img
                    src="https://img.icons8.com/windows/32/null/circle.png"
                    width="5px"
                  />
                  جميع ألآلات
                </div>
                <div
                  className="allCourses"
                  onClick={() => {
                    setTitle("بيانو");
                    setAll(false);
                  }}
                >
                  بيانو
                </div>

                <div
                  onClick={() => {
                    setTitle("عود");
                    setAll(false);
                  }}
                  className="allCourses"
                >
                  عود
                </div>

                <div
                  onClick={() => {
                    setTitle("كمان");
                    setAll(false);
                  }}
                  className="allCourses"
                >
                  كمان
                </div>

                <div
                  onClick={() => {
                    setTitle("قانون");
                    setAll(false);
                  }}
                  className="allCourses"
                >
                  قانون
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="showDataStyle">
        <div>
          {" "}
          <div className="coursesCss">
            <div className="allCourses" onClick={() => setAll(true)}>
              <img
                src="https://img.icons8.com/windows/32/null/circle.png"
                width="12px"
                style={{ paddingLeft: " 5px" }}
              />
              جميع ألآلات
            </div>
            <div
              className="allCourses"
              onClick={() => {
                setTitle("بيانو");
                setAll(false);
              }}
            >
              <img
                src="https://img.icons8.com/windows/32/null/circle.png"
                width="12px"
                style={{ paddingLeft: " 5px" }}
              />
              بيانو
            </div>

            <div
              onClick={() => {
                setTitle("عود");
                setAll(false);
              }}
              className="allCourses"
            >
              <img
                src="https://img.icons8.com/windows/32/null/circle.png"
                width="12px"
                style={{ paddingLeft: " 5px" }}
              />
              عود
            </div>

            <div
              onClick={() => {
                setTitle("كمان");
                setAll(false);
              }}
              className="allCourses"
            >
              <img
                src="https://img.icons8.com/windows/32/null/circle.png"
                width="12px"
                style={{ paddingLeft: " 5px" }}
              />
              كمان
            </div>

            <div
              onClick={() => {
                setTitle("قانون");
                setAll(false);
              }}
              className="allCourses"
            >
              <img
                src="https://img.icons8.com/windows/32/null/circle.png"
                width="12px"
                style={{ paddingLeft: " 5px" }}
              />
              قانون
            </div>
          </div>
        </div>
        <div className="showDataThreeColumns">
          {all ? showData() : showFilteredData()}
        </div>
      </div>
    </div>
  );
}
