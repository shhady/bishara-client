
import React,{useState, useEffect} from 'react'
import { useLocation , Link, useParams} from 'react-router-dom';
import './newLesson.css'
import axios from 'axios';
import NewUploadPractice from './NewUploadPractice';
import PDF from './PDF';
const youtubeurl = "https://www.googleapis.com/youtube/v3/playlistItems";
export default function NewLesson() {
    const [theUser, setTheUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const [lessons,setLessons]  = useState([])
    const [videoName, setVideoName] = useState()
    const [course, setCourse] = useState()
    const [user, setUser] = useState('') 
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name');
    const playlistId = searchParams.get('playlist');
    const {id} = useParams()
    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await axios.get(
                process.env.REACT_APP_BACKEND_URL + `/courses/${id}`
              );
              setCourse(res.data)
        }
        fetchData()
    },[id])
    
    useEffect(()=>{
        theUser?.user ? setUser(theUser.user):(setUser(theUser.teacher)) 
    },[theUser])
    
    console.log(user)
    console.log(lessons); // Output: intw32jmN9s
    console.log(course); 
    useEffect(()=>{
        const theVideo = lessons.filter((v)=>v.snippet.resourceId.videoId === name)
        setVideoName(theVideo[0]?.snippet.title)
    },[lessons])
    useEffect(() => {
        const fetch = async () => {
          const result = await axios.get(
            `${youtubeurl}?part=snippet&playlistId=${playlistId}&maxResults=50&key=${process.env.REACT_APP_YOUTUBE_KEY}`
          );
          setLessons(result.data.items);
        };
        fetch();
      }, []);
      
      const drawSuggestions = ()=>{
        return lessons?.map((lesson)=>{
            return <>
            {name === lesson.snippet.resourceId.videoId ? (
              <div className='suggestion' style={{backgroundImage: `url(${lesson?.snippet.thumbnails.high.url})`}} >
             <div className='playingVideo'>playing</div>
            </div>
            ):(
                <Link to={`/NewLesson/${id}?name=${lesson.snippet.resourceId.videoId}&playlist=${course?.playlistId}`}>
                <div className='suggestion' style={{backgroundImage: `url(${lesson?.snippet.thumbnails.high.url})`}} >
            </div></Link>)}
            </>
            })
      }

  return (
    <div>
    <div className='youtubeFrame'>
        <iframe
          width="100%"
          height="95%"
          src={`https://www.youtube.com/embed/${name}?modestbranding=1&autoplay=1&rel=0&showinfo=0&fs=1`}
          title="Fadi a"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        
    </div>
    <div className='suggestionsVideos'>
        {drawSuggestions()}
        </div>
        <div className='UploadPDownloadF'>
            {user?._id === course?.owner || user?.role === "admin" ? (<PDF course={course} name={name}/>
            ):( <><PDF course={course} name={name}/><NewUploadPractice course={course} uniqueLink={name} videoName={videoName}/></>)}
       
        </div>
    </div>
  )
}