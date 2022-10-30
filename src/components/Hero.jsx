import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="hero">
      <div className="coverblack">
        <div className="title">
          <h1>تعلم من أفضل الموسيقيين</h1>
          <p>طور شغفك وحقق اهدافك</p>
          <p>هدفنا الوصول إلى تعليم الموسيقى عالي الجودة والتعلم من الأفضل</p>
          <h2> اختر الالة وابدأ التعلم الان:</h2>
        </div>
        <div className="cards">
          <Link to="PianoPage" style={{ textDecoration: "none" }}>
            <div className="cardPiano">
              <div className="wcoverblack">
                <div>
                  <h1 style={{ textDecoration: "none", color: "white" }}>
                    بيانو
                  </h1>
                </div>
              </div>
            </div>
          </Link>
          <Link to="OudPage" style={{ textDecoration: "none" }}>
            <div className="cardOud">
              <div className="wcoverblack">
                <div>
                  <h1 style={{ color: "white", textDecoration: "none" }}>
                    عود
                  </h1>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/ViolinPage" style={{ textDecoration: "none" }}>
            <div className="cardViolin">
              <div className="wcoverblack">
                <div>
                  <h1 style={{ textDecoration: "none", color: "white" }}>
                    كمان
                  </h1>
                </div>
              </div>
            </div>
          </Link>
          {/* <Link to="/" style={{ textDecoration: "none" }}>
            <div className="cardPiano">
              <div className="wcoverblack">
                <div>
                  <h1 style={{ textDecoration: "none", color: "white" }}>
                    قانون
                  </h1>
                </div>
              </div>
            </div>
          </Link> */}
        </div>
      </div>
    </div>
  );
}
