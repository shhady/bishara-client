import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";
// import Home from "./components/Home";
// import Piano from "./components/PianoPage";
import Header from "./components/Header";
import { io } from "socket.io-client";
// import Oud from "./components/Oud";
// import Auth from "./components/Auth/Auth";
// import CreateTeacher from "./components/Form/CreateTeacher";
// import Profile from "./components/Profile/Profile";
// import CreateCourse from "./components/Course/CreateCourse";
// import Teachers from "./components/Teachers";
// import Courses from "./components/Courses";
// import Messenger from "./components/Messenger/Messenger";
// import Course from "./components/Course";
const Home = React.lazy(() => import("./components/Home"));
const StudentsPractices = React.lazy(() =>
  import("./components/StudentsPractices")
);

const Course = React.lazy(() => import("./components/Course"));
const Messenger = React.lazy(() => import("./components/Messenger/Messenger"));
const Courses = React.lazy(() => import("./components/Courses"));
const Teachers = React.lazy(() => import("./components/Teachers"));
const CreateCourse = React.lazy(() =>
  import("./components/Course/CreateCourse")
);
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const CreateTeacher = React.lazy(() =>
  import("./components/Form/CreateTeacher")
);
const Auth = React.lazy(() => import("./components/Auth/Auth"));
const PianoPage = React.lazy(() => import("./components/PianoPage"));
const OudPage = React.lazy(() => import("./components/OudPage"));
const ViolinPage = React.lazy(() => import("./components/ViolinPage"));

// const Oud = React.lazy(() => import("./components/Oud"));
// const Piano = React.lazy(() => import("./components/PianoPage"));

// import Hero from "./components/Hero";
export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (!user) return;
    user.user ? setUserId(user.user._id) : setUserId(user.teacher._id);
  }, [user]);
  useEffect(() => {
    if (!userId) return;
    setSocket(io("http://localhost:5000"));
    console.log(socket);
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    socket?.emit("addUser", userId);
  }, [socket, userId]);
  return (
    <div>
      <Suspense>
        <BrowserRouter>
          <Header user={user} setUser={setUser} socket={socket} />
          <Route path="/" exact>
            <Home user={user} setUser={setUser} />
          </Route>
          {/* <Route path="/Oud" exact component={Oud} />
          <Route path="/Piano" exact component={Piano} /> */}
          <Route path="/auth" exact>
            <Auth user={user} setUser={setUser} />
          </Route>
          <Route path="/CreateTeacher" exact component={CreateTeacher} />
          <Route path="/profile" exact>
            <Profile user={user} setUser={setUser} />
          </Route>
          <Route path="/createcourse" exact component={CreateCourse} />
          {/* <Route path="/courses" exact component={Courses} /> */}
          <Route path="/courses" exact>
            <Courses user={user} setUser={setUser} socket={socket} />
          </Route>
          <Route path="/course/:id" exact>
            <Course user={user} setUser={setUser} socket={socket} />
          </Route>
          {/* <Route path="/teachers" exact component={Teachers} /> */}
          <Route path="/teachers" exact>
            <Teachers user={user} setUser={setUser} />
          </Route>
          <Route path="/StudentsPractices" exact>
            <StudentsPractices user={user} setUser={setUser} />
          </Route>
          <Route path="/PianoPage" exact>
            <PianoPage user={user} setUser={setUser} />
          </Route>
          <Route path="/OudPage" exact>
            <OudPage user={user} setUser={setUser} />
          </Route>
          <Route path="/ViolinPage" exact>
            <ViolinPage user={user} setUser={setUser} />
          </Route>

          <Route path="/messenger" exact>
            {user ? (
              <Messenger user={user} setUser={setUser} socket={socket} />
            ) : (
              <Home />
            )}
          </Route>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}
