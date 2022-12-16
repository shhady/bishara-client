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
const TestYoutube = React.lazy(() => import("./components/TestYoutube"));
const TeacherData = React.lazy(() => import("./components/TeacherData"));
const Lessons = React.lazy(() => import("./components/Lessons"));
const Lesson = React.lazy(() => import("./components/Lesson"));
const Notifications = React.lazy(() => import("./components/Notifications"));
const ChatGPTpage = React.lazy(() => import("./components/ChatGPTpage"));

const Subscribe = React.lazy(() => import("./components/Subscribe"));

// const Oud = React.lazy(() => import("./components/Oud"));
// const Piano = React.lazy(() => import("./components/PianoPage"));

// import Hero from "./components/Hero";
export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showArrows, setShowArrows] = useState(null);
  const [listId, setListId] = useState("");
  const [course, setCourse] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [updateComponent, setUpdateComponent] = useState(null);
  useEffect(() => {
    if (!user) return;
    user.user ? setUserId(user.user._id) : setUserId(user.teacher._id);
  }, [user]);
  useEffect(() => {
    if (!userId) return;
    setSocket(
      io(
        // "https://dawrafun1.herokuapp.com/" ||
        "https://bisharaserver.herokuapp.com/"
      )
    );
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
          <Header
            user={user}
            setUser={setUser}
            socket={socket}
            showArrows={showArrows}
            setShowArrows={setShowArrows}
            updateComponent={updateComponent}
            setUpdateComponent={setUpdateComponent}
          />
          <Route path="/" exact>
            <Home
              user={user}
              setUser={setUser}
              showArrows={showArrows}
              setUpdateComponent={setUpdateComponent}
              updateComponent={updateComponent}
            />
          </Route>
          {/* <Route path="/Oud" exact component={Oud} />
          <Route path="/Piano" exact component={Piano} /> */}
          <Route path="/auth" exact>
            <Auth user={user} setUser={setUser} />
          </Route>
          <Route path="/ChatGPTpage" exact>
            <ChatGPTpage user={user} setUser={setUser} />
          </Route>

          <Route path="/TestYoutube/:id" exact>
            <TestYoutube
              user={user}
              setUser={setUser}
              listId={listId}
              course={course}
            />
          </Route>

          <Route path="/Lessons" exact>
            <Lessons
              user={user}
              setUser={setUser}
              setTeacher={setTeacher}
              teacher={teacher}
              listId={listId}
              updateComponent={updateComponent}
            />
          </Route>
          <Route path="/Notifications" exact>
            <Notifications user={user} setUser={setUser} />
          </Route>
          <Route path="/subscribe" exact>
            <Subscribe user={user} setUser={setUser} />
          </Route>
          <Route path="/Lesson/:id/:id" exact>
            <Lesson
              user={user}
              setUser={setUser}
              setTeacher={setTeacher}
              teacher={teacher}
              listId={listId}
            />
          </Route>

          <Route path="/TeacherData" exact>
            <TeacherData
              user={user}
              setUser={setUser}
              setTeacher={setTeacher}
              teacher={teacher}
              listId={listId}
              setUpdateComponent={setUpdateComponent}
            />
          </Route>

          <Route path="/CreateTeacher" exact component={CreateTeacher} />
          <Route path="/profile" exact>
            <Profile user={user} setUser={setUser} />
          </Route>
          <Route path="/createcourse" exact component={CreateCourse} />
          {/* <Route path="/courses" exact component={Courses} /> */}
          <Route path="/courses" exact>
            <Courses
              user={user}
              setUser={setUser}
              socket={socket}
              setListId={setListId}
              list={listId}
              setCourse={setCourse}
              course={course}
              setUpdateComponent={setUpdateComponent}
            />
          </Route>
          <Route path="/course/:id" exact>
            <Course user={user} setUser={setUser} socket={socket} />
          </Route>
          {/* <Route path="/teachers" exact component={Teachers} /> */}
          <Route path="/teachers" exact>
            <Teachers
              user={user}
              setUser={setUser}
              setTeacher={setTeacher}
              teacher={teacher}
            />
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
