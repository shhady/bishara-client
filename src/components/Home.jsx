import React from "react";
import Hero from "./Hero";
import LearnTrainCom from "./LearnTrainCom";
import FreeVideos from "./FreeVideos";
import About from "./About";
import Footer from "./Footer";
import FourBoxes from "./FourBoxes";
export default function Home() {
  return (
    <div className="HomePage">
      <Hero />
      <FourBoxes />
      <FreeVideos />
      <LearnTrainCom />
      <About />
      <Footer />
    </div>
  );
}
