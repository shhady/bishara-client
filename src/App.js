import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Navigate, Route , Routes} from "react-router-dom";
import Header from "./components/Header";
import { io } from "socket.io-client";
import Zoom from "./pages/zoom/Zoom";
import YoutubeForPractice from "./pages/youtubeForPractice/YoutubeForPractice";
import EditReplies from "./pages/TeacherPractices/EditReplies";
// import NewMessenger from "./pages/NewMessenger/NewMessenger"
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
// const TestYoutube = React.lazy(() => import("./components/TestYoutube"));
// const Teacher = React.lazy(() => import("./pages/Teacher/Teacher"));
// const Lessons = React.lazy(() => import("./pages/Lessons/Lessons"));
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
const NewMessenger = React.lazy(() => import("./pages/newChat/NewMessenger"));
const NewTeacher = React.lazy(() => import("./pages/newTeacher/NewTeacher"));
const NewCourse = React.lazy(() => import("./pages/newCourse/NewCourse"));
const NewLesson = React.lazy(() => import("./pages/newLesson/NewLesson"));
const NewReview = React.lazy(() => import("./pages/newReviewteacher/NewReview"));
const NewChatBox = React.lazy(() => import("./pages/newChat/NewChatBox"));
const OnePractice = React.lazy(() => import("./pages/TeacherPractices/OnePractice"));
const Subscription = React.lazy(() => import("./pages/subscription/Subscription"));
const NewProfile = React.lazy(() => import("./pages/Profile/NewProfile"));
const ChooseTeacher = React.lazy(() => import("./pages/subscription/ChooseTeacher"));
const ChosenTeacher = React.lazy(() => import("./pages/subscription/ChosenTeacher"));
const MyStudents = React.lazy(() => import("./pages/myStudents/MyStudents"));


export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);
  const [listId, setListId] = useState("");
  const [course, setCourse] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [updateComponent, setUpdateComponent] = useState(null);
  const [userProp, setUserProp] = useState(null);
  const [chatNotification, setChatNotification] = useState(null);


  console.log(user);
  useEffect(() => {
    if (!user) return;
    if(user.user){
      // setUser(user.user);
      localStorage.removeItem("profile");
      localStorage.removeItem("token");
    window.location.reload();
        } else if(user.teacher){
      // setUser(user.teacher);
      localStorage.removeItem("profile");
      localStorage.removeItem("token");
      window.location.reload();
      }
    setUserId(user?._id)
  }, [user]);

  useEffect(() => {
    
  }, []);
  
  // useEffect(() => {
  //   if (!userId) return;
  //   setSocket(
  //     io(
  //       // "https://dawrafun1.herokuapp.com/" ||
  //       "https://bisharaserver.herokuapp.com/"
  //     )
  //   );
  //   console.log(socket);
  // }, [userId]);
  // console.log(socket);
  // useEffect(() => {
  //   if (!userId) return;
  //   socket?.emit("addUser", userId);
  // }, [socket, userId]);
  let socketInstances = [];

  useEffect(() => {
    const socketInstance = io("https://bisharaserver.herokuapp.com/");
    socketInstances.push(socketInstance);
  
    setSocket(socketInstance);
    console.log(socketInstance);
  
    return () => {
      socketInstance.disconnect();
      socketInstances = socketInstances.filter((socket) => socket !== socketInstance);
    };
  }, []);
  
  useEffect(() => {
    if (!userId || !socket) return;
  
    socket.emit("addUser", userId);
  
    return () => {
      socket.off("addUser");
    };
  }, [userId, socket]);
  
  console.log(socket);
  return (
    <div>
      <Suspense fallback={<></>}>
        <BrowserRouter>
          <Header
            user={user}
            setUser={setUser}
            socket={socket}
            updateComponent={updateComponent}
            setUpdateComponent={setUpdateComponent}
            chatNotification={chatNotification}
            setChatNotification={setChatNotification}
          />
          <Routes>

          <Route path="/" exact element={<Home
              user={user}
              setUser={setUser}
            />}/>
          <Route path="/auth" exact element={ <Auth user={user} setUser={setUser} setUserProp={setUserProp} />}/>
          <Route path="/forgetpassword" exact element={ <ForgetPassword />}/>
          <Route path="/lessonReview" exact element={ <YoutubeForPractice />}/>
          <Route path="/NewTeacher/:id" exact element={ <NewTeacher user={user} setUser={setUser}/>}/>
          <Route path="/NewCourse/:id" exact element={ <NewCourse />}/>
          <Route path="/GeneralButton" exact element={ <GeneralButton user={user} />}/>
          <Route path="/qa" element={ <QA user={user}/>}/>
          <Route path="/PracticeReplies" exact element={<PracticeReplies user={user} setUser={setUser} socket={socket}/>}/>
          <Route path="/SpecificPractice/:id" exact element={ <SpecificPractice user={user} setUser={setUser} socket={socket}/>}/>
          <Route path="/StudentMyPractice/:id" exact element={<StudentMyPractice user={user} setUser={setUser}/>}/>
          <Route path="/NewLesson/:id" exact element={<NewLesson user={user} setUser={setUser} />}/>
          {/* <Route path="/NewLesson/:id" exact element={<NewLesson user={user} setUser={setUser}/>}/> */}
          <Route path="/NewMessenger/:id" exact element={<NewMessenger socket={socket}/>}/>
          <Route path="/chatting" exact element={<NewChatBox socket={socket}/>}/>
          <Route path="/OnePractice/:id" exact element={<OnePractice socket={socket}/>}/>
          <Route path="/subscription" exact element={<Subscription user={user} setUser={setUser}/>}/>
          <Route path="/NewProfile" exact element={<NewProfile user={user} seUser={setUser}/>}/>
          <Route path="/chooseTeacher" exact element={<ChooseTeacher user={user}/>}/>
          <Route path="/chooseTeacher/:id" exact element={<ChosenTeacher user={user} setUser={setUser}/>}/>
          <Route path="/myStudents/:id" exact element={<MyStudents user={user}/>}/>
          <Route path="/editReplies/:id" exact element={<EditReplies user={user}/>}/>

          
          <Route path="/NewReview" exact element={<NewReview socket={socket}/>}/>
          <Route path="/addStudent" exact element={<PaidStudent user={user} setUser={setUser}/>}/>
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
            <Route path="/zoom" exact element={ <Zoom/>}/>
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
             <Route path="/newmessenger" exact element={ user ? (
              <NewMessenger
                user={user}
                setUser={setUser}
              />
            ) : (
              <Auth />
            )}/>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}
