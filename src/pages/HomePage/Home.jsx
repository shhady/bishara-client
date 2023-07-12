import React from "react";
import FreeVideos from "../../components/FreeVideos";
import About from "../../components/About/About";
import Footer from "../../components/Footer";
import FourBoxes from "../../components/FourBoxes";
import TeachersHomePage from "../../components/TeachersHomePage";
import CoursesHomePage from "../../components/CoursesHomePage";
import NewHero from "../../components/newHero/NewHero";
import ContactUs from "../../components/ContactUs";
export default function Home({
  user
}) {
  return (
    <div className="HomePage">
      <NewHero user={user}/>
      <FourBoxes />
      <TeachersHomePage />
      <CoursesHomePage/>
      <FreeVideos />
      <About />
      <ContactUs user={user}/>
      <Footer />
    </div>
  );
}
