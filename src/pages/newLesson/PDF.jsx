import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function PDF({course,name,user}) {
  // const [theUser, setTheUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const plan  =   JSON.parse(localStorage.getItem("plan"))
    const [fileUrl, setFileUrl] = useState('')
    const [uploadFile, setUploadFile] = useState('')
    const [fileId, setFileId] = useState('')
    const navigate = useNavigate()
    const [showNotification, setShowNotification] = useState(false);

    const openNotification = () => {
      setShowNotification(!showNotification);
    };
    
    const closeNotification = () => {
      setShowNotification(!showNotification);
    };
    
    const redirectToSubscription = () => {
      navigate("/subscription");
    };

    useEffect(() => {
        const fetch = async () => {
          const response = await axios.get(
            process.env.REACT_APP_BACKEND_URL +
              `/files/${name}`
          );
          setFileUrl(response.data[0].fileUrl);
          setFileId(response.data[0]._id)
          
        };
        fetch();
      }, [name]);
     
      const addLink = async (e) => {
        e.preventDefault()
        
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

      // const openAlert =()=>{
      //   alert("لتحميل الملفات يجب الاشتراك");
      //   navigate("/subscription"); // Replace with the URL of the desired page

      // }
  return (
    <div className='divOfUploadBtn'>
        {fileUrl ? (<>
        {plan?.teacherId === course?.owner && plan?.status === 'active'  || user?._id ===  course?.owner? ( <div className='uploadPracticeBtnDiv'>
        <a
    href={fileUrl}
    target="_blank"
    rel="noreferrer"   style={{
        textDecoration: "none",
        color: "black"}}>ملف النوته</a></div>):(<div>  <button className='uploadPracticeBtn' onClick={openNotification}>ملف النوته</button> </div>)}
        
        {user?._id === course?.owner || user?.role === "admin" ? (<button className='uploadPracticeBtn' onClick={deleteTheFile} style={{ background:"red"}}>delete</button>):(null)}
        </>
        ):(
            <>
             {user?._id === course?.owner || user?.role === "admin" ? (<form onSubmit={addLink} style={{display:'flex', flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <input type='text' placeholder='اضف الرابط' onChange={(e)=>setUploadFile(e.target.value)} style={{height:"40px", width:"150px", marginTop:"20px"}}/>
            <input type="submit" className='uploadPracticeBtn' style={{height:"40px", width:"150px"}}/>
            </form>):(<> {user?.trialTeacher === course?.owner ? (<button className='uploadPracticeBtn'>لا يوجد ملف</button>):(<div><button className='uploadPracticeBtn' onClick={openNotification}>ملف النوته</button></div>)}</>)}
        </>
        )}
         {showNotification && (
          <div className="notification">
            <p>اهلاً, {user?.firstName} {user?.lastName} <br/>لتحميل الملفات يجب الاشتراك</p>
            <span className="notification_progress"></span>
            <div style={{padding:"3px 10px", display:"flex", justifyContent:"space-between", alignItems:'center'}}>
            <button  style={{padding:"10px 15px"}} onClick={redirectToSubscription}>اشتراك</button>
            <button style={{padding:"10px 15px"}} onClick={closeNotification}>اغلاق</button>
            </div>
          </div>
        )}
       </div>
  )
}
