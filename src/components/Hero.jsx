import React, { useState, useEffect } from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import { sliderData } from "./Slider.jsx";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
export default function Hero({ showArrows, user }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);
  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);
  return (
    <div className="hero">
      {showArrows ? null : (
        <>
          <AiOutlineRight className="arrow next" onClick={prevSlide} />
          <AiOutlineLeft className="arrow prev" onClick={nextSlide} />
        </>
      )}

      {sliderData.map((slide, i) => {
        return (
          <div
            className={i === currentSlide ? "slide current" : "slide"}
            key={i}
          >
            {i === currentSlide && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <img src={slide.image} alt="slide" width="100%" height="100%" />
                <div className="content">
                  <h1>{slide.heading}</h1>
                  <p>{slide.desc}</p>

                  {/* {user ? (
                    <Link to="/Subscribe" style={{ textDecoration: "none" }}>
                      <button className="getStarted">
                        ?????? ?????????? ????????????????{" "}
                      </button>
                    </Link>
                  ) : (
                    <Link to="/auth" style={{ textDecoration: "none" }}>
                      <button className="getStarted">?????????? ????????????</button>
                    </Link>
                  )} */}
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
        <button>????????????</button>
      </div> */

// {/* <div className="coverblack"> */}

/* <div className="title">
          <h1>???????? ???? ???????? ????????????????????</h1>
          <p>?????? ???????? ???????? ????????????</p>
          <p>?????????? ???????????? ?????? ?????????? ???????????????? ???????? ???????????? ?????????????? ???? ????????????</p>
          <h2> ???????? ?????????? ?????????? ???????????? ????????:</h2>
        </div> */

/* <div className="cards">
          <Link to="PianoPage" style={{ textDecoration: "none" }}>
            <div className="cardPiano">
              <div className="wcoverblack">
                <div>
                  <h1 style={{ textDecoration: "none" }}>??????????</h1>
                </div>
              </div>
            </div>
          </Link>
          <Link to="OudPage" style={{ textDecoration: "none" }}>
            <div className="cardOud">
              <div className="wcoverblack">
                <div>
                  <h1 style={{ textDecoration: "none" }}>??????</h1>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/ViolinPage" style={{ textDecoration: "none" }}>
            <div className="cardViolin">
              <div className="wcoverblack">
                <div>
                  <h1 style={{ textDecoration: "none" }}>????????</h1>
                </div>
              </div>
            </div>
          </Link>
        </div>*/

/* </div> */
