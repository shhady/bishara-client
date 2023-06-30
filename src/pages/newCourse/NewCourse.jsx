import React,{useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import CourseDetails from './CourseDetails'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faPenToSquare,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
const youtubeurl = "https://www.googleapis.com/youtube/v3/playlistItems";
export default function NewCourse() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  // const [user, setUser] = useState('') 
    const [course, setCourse] = useState('')
    const [lessons,setLessons]  = useState([])
    const [open, setOpen] = useState("")
    const {id} = useParams()
    const navigate = useNavigate()
    console.log(id)
    // useEffect(()=>{
    //   if(!theUser) return ;
    //     theUser?.user ? setUser(theUser.user):(setUser(theUser.teacher)) 
    // },[theUser])
    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await axios.get(
                process.env.REACT_APP_BACKEND_URL + `/courses/${id}`
              );
              setCourse(res.data)
        }
        fetchData()
    },[id])
    console.log(course)
    useEffect(() => {
        const fetch = async () => {
          const result = await axios.get(
            `${youtubeurl}?part=snippet&playlistId=${course.playlistId}&maxResults=50&key=${process.env.REACT_APP_YOUTUBE_KEY}`
          );
          setLessons(result.data.items);
            console.log(result.data.items)
        };
        fetch();
      }, [course]);

      const handleLessonClick = (lesson) => {
        if(user){

          navigate(`/NewLesson/${course._id}?name=${lesson.snippet.resourceId.videoId}&playlist=${course.playlistId}`);
        } else{
          alert("لرؤية الدروس يجب فتح حساب");
          navigate('/auth')
        }
      };
      const drawLessons = ()=>{
        return lessons.map((lesson,i)=>{
            return <div onClick={()=>handleLessonClick(lesson)} key={i} style={{cursor:"pointer"}}>
            <div className='lessonOfLessons' style={{backgroundImage: `url(${lesson.snippet.thumbnails.high.url})`}}>
                  <div
                style={{
                  color: "white",
                  background: "rgba(0,0,0,0.2)",
                  // width: "fit-content",
                  height: "100%",
                  // borderRadius: "50%",
                  display:"flex",
                  justifyContent: "center",
                  alignItems:"center"
                }}
              >
                <FontAwesomeIcon icon={faCirclePlay} size="3x" />
              </div>
              </div>
              <div>
              {lesson.snippet.title}</div>
                </div>
                
        })
      }
  return (
    <div>

      
        <CourseDetails course={course}/>
        <div className='lessonsAndDescB'>
          {open !== 'description' ? (          <div  onClick={()=> setOpen('lessons')} style={{background:"#fee4b9",textAlign:'center', borderBottom:"1px solid black", fontWeight:"bold",cursor:"pointer"}}>الدروس</div>
):(          <div  onClick={()=> setOpen('lessons')} style={{textAlign:'center', borderBottom:"1px solid black", fontWeight:"bold", cursor:"pointer"}}>الدروس</div>
)}
          {open === "description" ? (          <div onClick={()=> setOpen('description')} style={{background:"#fee4b9",textAlign:'center', borderBottom:"1px solid black", fontWeight:"bold",cursor:"pointer"}}>وصف الدورة</div>
):(          <div onClick={()=> setOpen('description')} style={{textAlign:'center', borderBottom:"1px solid black", fontWeight:"bold", cursor:"pointer"}}>وصف الدورة</div>
)}
        </div>
        {open === "description" ? (<div style={{width:"80%", margin:"auto"}}>
          {course.description}
        </div>):(<div className='lessons'>
            {drawLessons()}
        </div>)}
        
    </div>
  )
}
