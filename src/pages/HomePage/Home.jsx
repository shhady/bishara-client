import React from "react";
import Hero from "../../components/Hero";
import FreeVideos from "../../components/FreeVideos";
import About from "../../components/About/About";
import Footer from "../../components/Footer";
import FourBoxes from "../../components/FourBoxes";
import TeachersHomePage from "../../components/TeachersHomePage";
import CoursesHomePage from "../../components/CoursesHomePage";
import NewHero from "../../components/newHero/NewHero";

export default function Home({
  showArrows,
  user,
  setUpdateComponent,
  updateComponent,
}) {
  return (
    <div className="HomePage">
      {/* <NewHero/> */}
      <Hero showArrows={showArrows} user={user} />
      <FourBoxes />

      <TeachersHomePage />
     
      <CoursesHomePage
        setUpdateComponent={setUpdateComponent}
        updateComponent={updateComponent}
      />
      <FreeVideos />
     
      <About />
      <Footer />
    </div>
  );
}
