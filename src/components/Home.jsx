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
      <CoursesHomePage
        setUpdateComponent={setUpdateComponent}
        updateComponent={updateComponent}
      />
      {/* <FreeVideos /> */}
      <LearnTrainCom />
      <About />
      <Footer />
    </div>
  );
}
