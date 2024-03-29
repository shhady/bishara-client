import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Posts/styles.css";
import { useNavigate, Link } from "react-router-dom";
export default function Courses({

  user
}) {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [posts, setposts] = useState(null);
  const [userId, setUserId] = useState("");
  const [courseData, setCourseData] = useState(null);
  const [filteredPosts, setFilteredposts] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [all, setAll] = useState(true);
  const [title, setTitle] = useState(null);
  const [instruments, setInstruments] = useState("الدورات");
  const navigate = useNavigate();
 
  useEffect(() => {
    if (!user) return;
   setUserId(user._id) 
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem("title")) {
      setAll(false);
      setTitle(window.localStorage.getItem("title"));
      setInstruments(window.localStorage.getItem("title"));
    } else {
      setTitle(null);
    }
  }, []);
  
  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/courses"
      );
      setposts(result.data.filter((global)=>{
       return global.playlistId !== "PLVyh_TRAmEfFr6I1LMZ0EadFWU4tXZmyw" && global.playlistId !== "PLVyh_TRAmEfFSnfgk8-SxeWSpcjn2DnSR" && global.playlistId !== "PLVyh_TRAmEfF0pi95N0lTzhnBWTUFJchf"
      }));
    };
    fetch();
  }, []);
  useEffect(() => {
    const filtered = posts?.filter((post) => post.instrument === title);
    setFilteredposts(filtered);
    // setAll(false);
  }, [title, all, posts]);

 
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
        <div className="loader">  
        </div>
      </div>
    );


  const showData = () => {
    return posts?.map((post) => {
      return (
        <Link to={`/newCourse/${post._id}`} style={{textDecoration:"none", color:"black"}} key={post._id}>
        <div
          key={post._id}
          className="courseContainer"
          style={{ cursor: "pointer", padding: "5px", borderRadius: "25px" }}
        >
          <img
            src={post.coursePhoto? (post.coursePhoto):('https://images.pexels.com/photos/4814061/pexels-photo-4814061.jpeg?auto=compress&cs=tinysrgb&w=600')}
            alt={post.firstName}
            width="80%"
            height="200"
            style={{ marginBottom: "10px", borderRadius: "25px" }}
          />

          <div style={{ fontWeight: "700" }}>{post.title}</div>
          <div style={{ width: "80%" }}>
            <div className="nameInstrumentLevel">
              {post.firstName} {"  "}
              {post.lastName}
              <div>
                {post.instrument} ({post.level})
              </div>
            </div>
            <div>{post.description.slice(0, 35)}...</div>
          </div>
        </div></Link>
      );
    });
  };
  const showFilteredData = () => {
    return filteredPosts?.map((post) => {
      return (
        <Link to={`/newCourse/${post._id}`} style={{textDecoration:"none", color:"black"}}>
        <div
          key={post._id}
          className="courseContainer"
          // onClick={() => {
          //   handleClick(post);
          // }}
          style={{ cursor: "pointer", padding: "5px", borderRadius: "5px", borderRadius: "25px", marginBottom:"20px"  }}
        >
         
          <img
  src={post.coursePhoto? (post.coursePhoto):('https://images.pexels.com/photos/4814061/pexels-photo-4814061.jpeg?auto=compress&cs=tinysrgb&w=600')}            alt={post.firstName}
            width="80%"
            height="200"
            style={{ marginBottom: "10px", borderRadius: "25px"  }}
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
        </Link>
      );
    });
  };

  return (
    <div
      style={{ display: "grid", gridAutoColumns: "3fr 1fr", marginBottom:"70px" }}
      onMouseOver={window.localStorage.removeItem("title")}
    >
      <div className="TopOfPage">{instruments}</div>
      <div className="filterInstruments" onClick={() => setShowPopUp(true)}>
        اختر آلة
      </div>
      {showPopUp ? (
        <div className="popUpAll" onClick={() => setShowPopUp(false)}>
          <div className="thePopUp">
            <div>
              <div className="coursesPopUp">
                <div
                  className="allCourses"
                  onClick={() => {
                    setAll(true);
                    setInstruments("الدورات");
                  }}
                >
                  <img
                    src="https://img.icons8.com/windows/32/null/circle.png"
                    width="5px"
                    alt="icon"
                  />
                  جميع ألآلات
                </div>
                <div
                  className="allCourses"
                  onClick={() => {
                    setTitle("بيانو");
                    setAll(false);
                    setInstruments("بيانو");
                  }}
                >
                  بيانو
                </div>

                <div
                  onClick={() => {
                    setTitle("عود");
                    setAll(false);
                    setInstruments("عود");
                  }}
                  className="allCourses"
                >
                  عود
                </div>

                <div
                  onClick={() => {
                    setTitle("كمان");
                    setAll(false);
                    setInstruments("كمان");
                  }}
                  className="allCourses"
                >
                  كمان
                </div>

                <div
                  onClick={() => {
                    setTitle("جيتار");
                    setAll(false);
                    setInstruments("جيتار");
                  }}
                  className="allCourses"
                >
                  جيتار
                </div>
                <div
                  onClick={() => {
                    setTitle("قانون");
                    setAll(false);
                    setInstruments("قانون");
                  }}
                  className="allCourses"
                >
                  قانون
                </div>
                <div
                  onClick={() => {
                    setTitle("تشيلو");
                    setAll(false);
                    setInstruments("تشيلو");
                  }}
                  className="allCourses"
                >
                  تشيلو
                </div>
                <div
                  onClick={() => {
                    setTitle("فلوت");
                    setAll(false);
                    setInstruments("فلوت");
                  }}
                  className="allCourses"
                >
                  فلوت
                </div>
                <div
                  onClick={() => {
                    setTitle("ايقاع");
                    setAll(false);
                    setInstruments("ايقاع");
                  }}
                  className="allCourses"
                >
                  ايقاع
                </div>
                <div
                  onClick={() => {
                    setTitle("غناء");
                    setAll(false);
                    setInstruments("غناء");
                  }}
                  className="allCourses"
                >
                  غناء
                </div>
                {/* <div
                  onClick={() => {
                    setTitle("بزق");
                    setAll(false);
                    setInstruments("بزق");
                  }}
                  className="allCourses"
                >
                  بزق
                </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="showDataStyle">
        <div>
          {" "}
          <div className="coursesCss">
            <div
              className="allCourses"
              onClick={() => {
                setAll(true);
                setInstruments("الدورات");
              }}
            >
              <img
                src="https://img.icons8.com/windows/32/null/circle.png"
                width="12px"
                alt="icon"
                style={{ paddingLeft: " 5px" }}
              />
              جميع ألآلات
            </div>
            <div
              className="allCourses"
              onClick={() => {
                setTitle("بيانو");
                setAll(false);
                setInstruments("بيانو");
              }}
            >
              <img
                src="https://img.icons8.com/windows/32/null/circle.png"
                width="12px"
                alt="icon"
                style={{ paddingLeft: " 5px" }}
              />
              بيانو
            </div>

            <div
              onClick={() => {
                setTitle("عود");
                setAll(false);
                setInstruments("عود");
              }}
              className="allCourses"
            >
              <img
                src="https://img.icons8.com/windows/32/null/circle.png"
                width="12px"
                alt="icon"
                style={{ paddingLeft: " 5px" }}
              />
              عود
            </div>

            <div
              onClick={() => {
                setTitle("كمان");
                setAll(false);
                setInstruments("كمان");
              }}
              className="allCourses"
            >
              <img
                src="https://img.icons8.com/windows/32/null/circle.png"
                width="12px"
                alt="icon"
                style={{ paddingLeft: " 5px" }}
              />
              كمان
            </div>

            <div
              onClick={() => {
                setTitle("جيتار");
                setAll(false);
                setInstruments("جيتار");
              }}
              className="allCourses"
            >
              <img
                src="https://img.icons8.com/windows/32/null/circle.png"
                width="12px"
                alt="icon"
                style={{ paddingLeft: " 5px" }}
              />
              جيتار
            </div>

            <div
              onClick={() => {
                setTitle("قانون");
                setAll(false);
                setInstruments("قانون");
              }}
              className="allCourses"
            >
              <img
                src="https://img.icons8.com/windows/32/null/circle.png"
                width="12px"
                alt="icon"
                style={{ paddingLeft: " 5px" }}
              />
              قانون
            </div>

            <div
              onClick={() => {
                setTitle("تشيلو");
                setAll(false);
                setInstruments("تشيلو");
              }}
              className="allCourses"
            >
              <img
                src="https://img.icons8.com/windows/32/null/circle.png"
                width="12px"
                alt="icon"
                style={{ paddingLeft: " 5px" }}
              />
              تشيلو
            </div>

            <div
              onClick={() => {
                setTitle("فلوت");
                setAll(false);
                setInstruments("فلوت");
              }}
              className="allCourses"
            >
              <img
                src="https://img.icons8.com/windows/32/null/circle.png"
                width="12px"
                alt="icon"
                style={{ paddingLeft: " 5px" }}
              />
              فلوت
            </div>

            <div
              onClick={() => {
                setTitle("ايقاع");
                setAll(false);
                setInstruments("ايقاع");
              }}
              className="allCourses"
            >
              <img
                src="https://img.icons8.com/windows/32/null/circle.png"
                width="12px"
                alt="icon"
                style={{ paddingLeft: " 5px" }}
              />
              ايقاع
            </div>
            <div
              onClick={() => {
                setTitle("غناء");
                setAll(false);
                setInstruments("غناء");
              }}
              className="allCourses"
            >
              <img
                src="https://img.icons8.com/windows/32/null/circle.png"
                width="12px"
                alt="icon"
                style={{ paddingLeft: " 5px" }}
              />
              غناء
            </div>

            {/* <div
              onClick={() => {
                setTitle("بزق");
                setAll(false);
                setInstruments("بزق");
              }}
              className="allCourses"
            >
              <img
                src="https://img.icons8.com/windows/32/null/circle.png"
                width="12px"
                style={{ paddingLeft: " 5px" }}
              />
              بزق
            </div> */}
          </div>
        </div>
        <div className="showDataThreeColumns">
          {all ? showData() : showFilteredData()}
        </div>
      </div>
    </div>
  );
}
