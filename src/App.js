import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Route , Routes} from "react-router-dom";
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
const StudentMyPractice = React.lazy(() => import("./pages/StudentMyPractice"));
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
      <Suspense fallback={<div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          //   marginTop: "100px",
        }}
      >
        <div className="loader"></div>
      </div>}>
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
            
         
          {/* <Route path="/Oud" exact component={Oud} />
          <Route path="/Piano" exact component={Piano} /> */}
          <Route path="/auth" exact element={ <Auth user={user} setUser={setUser} setUserProp={setUserProp} />}/>

          <Route path="/forgetpassword" exact element={ <ForgetPassword />}/>
           
        
          
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
          
          

          <Route path="/TeacherData" exact element={ <TeacherData
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
          {/* <Route path="/courses" exact element={}/ component={Courses} /> */}
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
            
          
          <Route path="/course/:id" exact element={<Course user={user} setUser={setUser} socket={socket} />}/>
            
          
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
