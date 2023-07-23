import React, { useEffect } from "react";
import FreeVideos from "../../components/FreeVideos";
import About from "../../components/About/About";
import Footer from "../../components/Footer";
import FourBoxes from "../../components/FourBoxes";
import TeachersHomePage from "../../components/TeachersHomePage";
import CoursesHomePage from "../../components/CoursesHomePage";
import NewHero from "../../components/newHero/NewHero";
import ContactUs from "../../components/ContactUs";
export default function Home({user, setUser}) {

  useEffect(() => {
    if(!user) return;
    if(user.role === "admim" || user.role === "teacher") return;
    // Check if user exists and has a valid createdAt date
    if (user && new Date(user.createdAt) < new Date('2023-07-23T00:00:00Z')) {
      // Clear local storage
      window.localStorage.removeItem('profile');
      window.localStorage.removeItem('token');
      setUser(null);
    }
  }, [user, setUser]);

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
