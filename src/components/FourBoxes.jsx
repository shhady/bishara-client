import React from "react";
import "./FourBoxes.css";
import { Link } from "react-router-dom";
export default function FourBoxes() {
  return (
    <div>
      <div className="FourBoxesTop">
        <div>
          <h2>ابدأ الان</h2>{" "}
        </div>
        <Link to="/courses" style={{ textDecoration: "none" }}>
          <div className="allInstruments" style={{ color: "black" }}>
            جميع الالات
          </div>
        </Link>
      </div>
      <div className="fourboxesMain">
        <Link to="/PianoPage" style={{ textDecoration: "none" }}>
          <div className="box1">piano </div>
        </Link>
        <Link to="/OudPage" style={{ textDecoration: "none" }}>
          <div className="box2">Oud</div>
        </Link>
        <Link to="/ViolinPage" style={{ textDecoration: "none" }}>
          <div className="box3">Violin</div>
        </Link>
        <Link to="" style={{ textDecoration: "none" }}>
          <div className="box4">Guitar</div>
        </Link>
      </div>
      <hr />
    </div>
  );
}
