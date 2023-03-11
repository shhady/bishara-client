import React, { useState } from "react";
import "./FourBoxes.css";
import { Link, useHistory } from "react-router-dom";

export default function FourBoxes() {
  // const [title, setTitle] = useState(null);
  const history = useHistory();
  function handleClick(e) {
    window.localStorage.setItem("title", e.target.innerText);
    // .then(history.push("/courses"));
  }
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
        <Link to="/courses" style={{ textDecoration: "none" }}>
          <div className="box1" onClick={(e) => handleClick(e)}>
            بيانو{" "}
          </div>
        </Link>
        <Link to="/courses" style={{ textDecoration: "none" }}>
          <div className="box2" onClick={(e) => handleClick(e)}>
            عود
          </div>
        </Link>
        <Link to="/courses" style={{ textDecoration: "none" }}>
          <div className="box3" onClick={(e) => handleClick(e)}>
            كمان
          </div>
        </Link>
        <Link to="/courses" style={{ textDecoration: "none" }}>
          <div className="box4" onClick={(e) => handleClick(e)}>
            جيتار
          </div>
        </Link>
      </div>
      {/* <hr /> */}
    </div>
  );
}
