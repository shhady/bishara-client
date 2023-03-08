import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header";
import { io } from "socket.io-client";

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
const QA = React.lazy(() => import("./components/QA"));

const TestYoutube = React.lazy(() => import("./components/TestYoutube"));
const TeacherData = React.lazy(() => import("./components/TeacherData"));
const Lessons = React.lazy(() => import("./components/Lessons"));
const Lesson = React.lazy(() => import("./components/Lesson"));
const SpecificPractice = React.lazy(() => import("./components/SpecificPractice"));
const PaidStudent = React.lazy(() => import("./components/PaidStudent"));
const ForgetPassword = React.lazy(() => import("./components/ForgetPassword"));
const Notifications = React.lazy(() => import("./components/Notifications"));
const PracticeReplies = React.lazy(() =>
  import("./components/PracticeReplies")
);

const CreateCourseForTeacher = React.lazy(() => import("./components/Course/CreateCourseForTeacher"));

const Subscribe = React.lazy(() => import("./components/Subscribe"));

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showArrows, setShowArrows] = useState(null);
  const [listId, setListId] = useState("");
  const [course, setCourse] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [updateComponent, setUpdateComponent] = useState(null);
  const [userProp, setUserProp] = useState(null);
  const [chatNotification, setChatNotification] = useState(null);
 
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
            chatNotification={chatNotification}
            setChatNotification={setChatNotification}
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
            <Auth user={user} setUser={setUser} setUserProp={setUserProp} />
          </Route>
          <Route path="/forgetpassword" exact>
            <ForgetPassword />
          </Route>
          
          <Route path="/qa">
            <QA user={user}/>
          </Route>
        
          
          <Route path="/PracticeReplies" exact>
            <PracticeReplies user={user} setUser={setUser} />
          </Route>
          
          <Route path="/SpecificPractice/:id" exact>
            <SpecificPractice user={user} setUser={setUser}/>
          </Route>
          <Route path="/addStudent" exact>
            <PaidStudent user={user} setUser={setUser}/>
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
              setUpdateComponent={setUpdateComponent}
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
              socket={socket}
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
              updateComponent={updateComponent}
            />
          </Route>

          <Route path="/CreateTeacher" exact component={CreateTeacher} />
          <Route path="/profile" exact>
            <Profile user={user} setUser={setUser} userProp={userProp} />
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
          <Route path="/CreateCourseForTeacher" exact component={CreateCourseForTeacher} />
          <Route path="/teachers" exact>
            <Teachers
              user={user}
              setUser={setUser}
              setTeacher={setTeacher}
              teacher={teacher}
              setUpdateComponent={setUpdateComponent}
              updateComponent={setUpdateComponent}
            />
          </Route>
          <Route path="/StudentsPractices" exact>
            <StudentsPractices user={user} setUser={setUser} />
          </Route>
          

          <Route path="/messenger" exact>
            {user ? (
              <Messenger
                user={user}
                setUser={setUser}
                socket={socket}
                chatNotification={chatNotification}
                setChatNotification={setChatNotification}
              />
            ) : (
              <Home />
            )}
          </Route>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}
