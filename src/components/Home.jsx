import React from "react";
import Hero from "./Hero";
import LearnTrainCom from "./LearnTrainCom";
import FreeVideos from "./FreeVideos";
import About from "./About";
import Footer from "./Footer";
import FourBoxes from "./FourBoxes";
export default function Home({ showArrows }) {
  return (
    <div className="HomePage">
      <Hero showArrows={showArrows} />
      <FourBoxes />
      <FreeVideos />
      <LearnTrainCom />
      <About />
      <Footer />
    </div>
  );
}
