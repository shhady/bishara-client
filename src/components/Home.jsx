import React from "react";
import Hero from "./Hero";
import LearnTrainCom from "./LearnTrainCom";
import FreeVideos from "./FreeVideos";
import About from "./About";
import Footer from "./Footer";
export default function Home() {
  return (
    <div className="HomePage">
      <Hero />
      <FreeVideos />
      <LearnTrainCom />
      <About />
      <Footer />
    </div>
  );
}
