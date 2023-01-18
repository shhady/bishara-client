import React from "react";
import Hero from "./Hero";
import LearnTrainCom from "./LearnTrainCom";
import FreeVideos from "./FreeVideos";
import About from "./About";
import Footer from "./Footer";
import FourBoxes from "./FourBoxes";
import TeachersHomePage from "./TeachersHomePage";
import CoursesHomePage from "./CoursesHomePage";

export default function Home({
  showArrows,
  user,
  setUpdateComponent,
  updateComponent,
}) {
  return (
    <div className="HomePage">
      <Hero showArrows={showArrows} user={user} />
      <FourBoxes />

      <TeachersHomePage />
      {/* <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          height: "100px",
        }}
      >
        <div style={{ background: "yellow", height: "100px" }}>
          teachers playing
        </div>
        <div style={{ background: "blue", height: "100px" }}>
          teachers playing
        </div>
        <div style={{ background: "red", height: "100px" }}>
          teachers playing
        </div>
        <div style={{ background: "green", height: "100px" }}>
          teachers playing
        </div>
      </div> */}
      <CoursesHomePage
        setUpdateComponent={setUpdateComponent}
        updateComponent={updateComponent}
      />
      <FreeVideos />
      {/* <LearnTrainCom /> */}
      <About />
      <Footer />
    </div>
  );
}
