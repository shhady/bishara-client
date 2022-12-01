import React, { useState, useEffect } from "react";
import "./Hero.css";
import { sliderData } from "./Slider.jsx";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const nextSlide = () => {
    setCurrentSlide(currentSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide - 1);
  };
  useEffect(() => {
    setCurrentSlide(0);
  }, []);
  return (
    <div className="hero">
      <AiOutlineArrowRight className="arrow next" onClick={prevSlide} />
      <AiOutlineArrowLeft className="arrow prev" onClick={nextSlide} />

      {sliderData.map((slide, i) => {
        return (
          <div
            className={i === currentSlide ? "slide current" : "slide"}
            key={i}
          >
            {i === currentSlide && (
              <div>
                <img src={slide.image} alt="slide" />
                <div className="content">
                  <h1>{slide.heading}</h1>
                  <p>{slide.desc}</p>
                  <button className="getStarted">Get Started</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* <div className="coverblack">
        <div>Text Here</div>
        <button>اشتراك</button>
      </div> */

// {/* <div className="coverblack"> */}

/* <div className="title">
          <h1>تعلم من أفضل الموسيقيين</h1>
          <p>طور شغفك وحقق اهدافك</p>
          <p>هدفنا الوصول إلى تعليم الموسيقى عالي الجودة والتعلم من الأفضل</p>
          <h2> اختر الالة وابدأ التعلم الان:</h2>
        </div> */

/* <div className="cards">
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
        </div>*/

/* </div> */
