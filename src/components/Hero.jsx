import React, { useState, useEffect } from "react";
import "./Hero.css";
// import { Link } from "react-router-dom";

// const images = [
//   "https://images.pexels.com/photos/159448/piano-instrument-music-keys-159448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   "https://images.unsplash.com/photo-1546058256-47154de4046c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fHBpYW5vfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
//   "https://images.unsplash.com/photo-1593550573849-1d608bb469ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
//   "https://images.unsplash.com/photo-1460036521480-ff49c08c2781?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dmlvbGlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
// ];
// let number = 0;
export default function Hero() {
  const images = [
    'url("https://images.pexels.com/photos/159448/piano-instrument-music-keys-159448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
    'url("https://images.unsplash.com/photo-1546058256-47154de4046c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fHBpYW5vfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60")',
    'url("https://images.unsplash.com/photo-1593550573849-1d608bb469ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80")',
    'url("https://images.unsplash.com/photo-1460036521480-ff49c08c2781?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dmlvbGlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60")',
  ];

  // const [number, setNumber] = useState(0);
  // const [backGroundImage, setBackGroundImage] = useState(images[number]);
  // console.log(backGroundImage);
  // let number = 0;
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (number > 3) return;
  //     let number = number + 1;
  //   }, 100);
  // });

  // console.log(number);

  return (
    <div className="hero" style={{ backgroundImage: images[1] }}>
      <div className="coverblack">
        <div>Text Here</div>
        <button>click</button>
      </div>
      {/* <div className="coverblack"> */}
      {/* <div className="title">
          <h1>تعلم من أفضل الموسيقيين</h1>
          <p>طور شغفك وحقق اهدافك</p>
          <p>هدفنا الوصول إلى تعليم الموسيقى عالي الجودة والتعلم من الأفضل</p>
          <h2> اختر الالة وابدأ التعلم الان:</h2>
        </div> */}
      {/* <div className="cards">
          <Link to="PianoPage" style={{ textDecoration: "none" }}>
            <div className="cardPiano">
              <div className="wcoverblack">
                <div>
                  <h1 style={{ textDecoration: "none" }}>بيانو</h1>
                </div>
              </div>
            </div>
          </Link>
          <Link to="OudPage" style={{ textDecoration: "none" }}>
            <div className="cardOud">
              <div className="wcoverblack">
                <div>
                  <h1 style={{ textDecoration: "none" }}>عود</h1>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/ViolinPage" style={{ textDecoration: "none" }}>
            <div className="cardViolin">
              <div className="wcoverblack">
                <div>
                  <h1 style={{ textDecoration: "none" }}>كمان</h1>
                </div>
              </div>
            </div>
          </Link>
        </div>*/}
      {/* </div> */}
    </div>
  );
}
