import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function PDF({course,name}) {
  // const [theUser, setTheUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const plan  =   JSON.parse(localStorage.getItem("plan"))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const [fileUrl, setFileUrl] = useState('')
    const [uploadFile, setUploadFile] = useState('')
    const [fileId, setFileId] = useState('')
    const navigate = useNavigate()
    // console.log(user.teacher?._id)
  //   useEffect(()=>{
  //     theUser?.user ? setUser(theUser.user):(setUser(theUser.teacher)) 
  // },[theUser])
  console.log(course);
    useEffect(() => {
        const fetch = async () => {
          const response = await axios.get(
            process.env.REACT_APP_BACKEND_URL +
              `/files/${name}`
          );
          setFileUrl(response.data[0].fileUrl);
          setFileId(response.data[0]._id)
          console.log(response.data[0])
        };
        fetch();
      }, [name]);
     
      const addLink = async (e) => {
        e.preventDefault()
        console.log("done")
       await axios
      .post(process.env.REACT_APP_BACKEND_URL + "/files", {
        fileUrl: uploadFile,
        videoId: name,
        teacherId: course.owner,
        playListId: course.playlistId,
      })
      setFileUrl(uploadFile)
      }
      const deleteTheFile = async() => {
       await axios.delete(process.env.REACT_APP_BACKEND_URL + `/files/${fileId}`)
            setFileUrl(null)
          };
      console.log(user);

      const openAlert =()=>{
        alert("لتحميل الملفات يجب الاشتراك");
        navigate("/subscription"); // Replace with the URL of the desired page

      }
  return (
    <div className='divOfUploadBtn'>
        {fileUrl ? (<>
        {plan?.teacherId === course?.owner && plan?.status === 'active'  || user._id ===  course?.owner? ( <div className='uploadPracticeBtnDiv'>
        <a
    href={fileUrl}
    target="_blank"
    rel="noreferrer"   style={{
        textDecoration: "none",
        color: "black"}}>ملف النوته</a></div>):(<div>  <button className='uploadPracticeBtn' onClick={openAlert}>ملف النوته</button> </div>)}
        
        {user?._id === course?.owner || user.role === "admin" ? (<button className='uploadPracticeBtn' onClick={deleteTheFile} style={{ background:"red"}}>delete</button>):(null)}
        </>
        ):(
            <>
             {user?._id === course?.owner || user?.role === "admin" ? (<form onSubmit={addLink} style={{display:'flex', flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <input type='text' placeholder='اضف الرابط' onChange={(e)=>setUploadFile(e.target.value)} style={{height:"40px", width:"150px", marginTop:"20px"}}/>
            <input type="submit" className='uploadPracticeBtn' style={{height:"40px", width:"150px"}}/>
            </form>):(<> {user?.trialTeacher === course?.owner ? (<button className='uploadPracticeBtn'>لا يوجد ملف</button>):(<div><button className='uploadPracticeBtn' onClick={openAlert}>ملف النوته</button></div>)}</>)}
        </>
        )}
       </div>
  )
}
