import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Route , Routes} from "react-router-dom";
import Header from "./components/Header";
import { io } from "socket.io-client";

const Home = React.lazy(() => import("./pages/HomePage/Home"));
const StudentsPractices = React.lazy(() => import("./components/StudentsPractices"));
const Messenger = React.lazy(() => import("./components/Messenger/Messenger"));
const Courses = React.lazy(() => import("./components/Courses"));
const Teachers = React.lazy(() => import("./pages/Teachers/Teachers"));
const CreateCourse = React.lazy(() => import("./components/Course/CreateCourse"));
const Profile = React.lazy(() => import("./pages/Profile/Profile"));
const CreateTeacher = React.lazy(() => import("./components/Form/CreateTeacher"));
const Auth = React.lazy(() => import("./components/Auth/Auth"));
const QA = React.lazy(() => import("./pages/QA/QA"));
const TestYoutube = React.lazy(() => import("./components/TestYoutube"));
const Teacher = React.lazy(() => import("./pages/Teacher/Teacher"));
const Lessons = React.lazy(() => import("./pages/Lessons/Lessons"));
const Lesson = React.lazy(() => import("./pages/Lesson/Lesson"));
const SpecificPractice = React.lazy(() => import("./pages/TeacherPractices/SpecificPractice"));
const PaidStudent = React.lazy(() => import("./pages/addingStudent/PaidStudent"));
const ForgetPassword = React.lazy(() => import("./components/ForgetPassword"));
const Notifications = React.lazy(() => import("./components/Notifications"));
const PracticeReplies = React.lazy(() =>import("./pages/TeacherPractices/PracticeReplies"));
const CreateCourseForTeacher = React.lazy(() => import("./components/Course/CreateCourseForTeacher"));
const StudentMyPractice = React.lazy(() => import("./pages/StudentPractice/StudentMyPractice"));
const GeneralButton = React.lazy(() => import("./pages/GeneralButton"));
const Subscribe = React.lazy(() => import("./pages/Subscribe"));

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
      <Suspense fallback={<></>}>
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
          <Routes>
          <Route path="/" exact element={<Home
              user={user}
              setUser={setUser}
              showArrows={showArrows}
              setUpdateComponent={setUpdateComponent}
              updateComponent={updateComponent}
            />}/>
          <Route path="/auth" exact element={ <Auth user={user} setUser={setUser} setUserProp={setUserProp} />}/>
          <Route path="/forgetpassword" exact element={ <ForgetPassword />}/>
          <Route path="/GeneralButton" exact element={ <GeneralButton user={user} />}/>
          <Route path="/qa" element={ <QA user={user}/>}/>
          <Route path="/PracticeReplies" exact element={<PracticeReplies user={user} setUser={setUser} socket={socket}/>}/>
          <Route path="/SpecificPractice/:id" exact element={ <SpecificPractice user={user} setUser={setUser} socket={socket}/>}/>
          <Route path="/StudentMyPractice/:id" exact element={<StudentMyPractice user={user} setUser={setUser}/>}/>
          <Route path="/addStudent" exact element={<PaidStudent user={user} setUser={setUser}/>}/>
          <Route path="/TestYoutube/:id" exact element={  <TestYoutube
              user={user}
              setUser={setUser}
              listId={listId}
              course={course}
            />}/>
          <Route path="/Lessons" exact element={<Lessons
              user={user}
              setUser={setUser}
              setTeacher={setTeacher}
              teacher={teacher}
              listId={listId}
              updateComponent={updateComponent}
              setUpdateComponent={setUpdateComponent}
            />}/>
          <Route path="/Notifications" exact element={<Notifications user={user} setUser={setUser} />}/>
          <Route path="/subscribe" exact element={<Subscribe user={user} setUser={setUser} />}/>
          <Route path="/Lesson/:id/:id" exact element={  <Lesson
              user={user}
              setUser={setUser}
              setTeacher={setTeacher}
              teacher={teacher}
              listId={listId}
              socket={socket}
            />}/>
          <Route path="/Teacher" exact element={ <Teacher
              user={user}
              setUser={setUser}
              setTeacher={setTeacher}
              teacher={teacher}
              listId={listId}
              setUpdateComponent={setUpdateComponent}
              updateComponent={updateComponent}
            />}/>
          <Route path="/CreateTeacher" exact element={<CreateTeacher/>} />
          <Route path="/profile" exact element={ <Profile user={user} setUser={setUser} userProp={userProp} />}/>
          <Route path="/createcourse" exact element={<CreateCourse/>} />
          <Route path="/courses" exact element={<Courses
              user={user}
              setUser={setUser}
              socket={socket}
              setListId={setListId}
              list={listId}
              setCourse={setCourse}
              course={course}
              setUpdateComponent={setUpdateComponent}
            />}/>
          <Route path="/CreateCourseForTeacher" element={<CreateCourseForTeacher/>} />
          <Route path="/teachers" exact element={ <Teachers
              user={user}
              setUser={setUser}
              setTeacher={setTeacher}
              teacher={teacher}
              setUpdateComponent={setUpdateComponent}
              updateComponent={setUpdateComponent}
            />}/>
          <Route path="/StudentsPractices" exact element={<StudentsPractices user={user} setUser={setUser} />}/>
          <Route path="/messenger" exact element={ user ? (
              <Messenger
                user={user}
                setUser={setUser}
                socket={socket}
                chatNotification={chatNotification}
                setChatNotification={setChatNotification}
              />
            ) : (
              <Home />
            )}/>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}
