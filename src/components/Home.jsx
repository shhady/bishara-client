import React from "react";
import Hero from "./Hero";
import LearnTrainCom from "./LearnTrainCom";
import FreeVideos from "./FreeVideos";
import About from "./About";
import Footer from "./Footer";
import FourBoxes from "./FourBoxes";
import TeachersHomePage from "./TeachersHomePage";
export default function Home({ showArrows, user }) {
  return (
    <div className="HomePage">
      <Hero showArrows={showArrows} user={user} />
      <FourBoxes />
      <TeachersHomePage />
      <FreeVideos />
      <LearnTrainCom />
      <About />
      <Footer />
    </div>
  );
}
