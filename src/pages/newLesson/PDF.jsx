import React, {useEffect, useState} from 'react'
import axios from 'axios';
export default function PDF({course,name}) {
  const [theUser, setTheUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [user, setUser] = useState('') 
    const [fileUrl, setFileUrl] = useState('')
    const [uploadFile, setUploadFile] = useState('')
    const [fileId, setFileId] = useState('')
    // console.log(user.teacher?._id)
    useEffect(()=>{
      theUser?.user ? setUser(theUser.user):(setUser(theUser.teacher)) 
  },[theUser])
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
  return (
    <div className='divOfUploadBtn'>
        {fileUrl ? (<>
        {user.paid === course?.owner || user._id ===  course?.owner? ( <button className='uploadPracticeBtn'>
        <a
    href={fileUrl}
    target="_blank"
    rel="noreferrer"   style={{
        textDecoration: "none",
        color: "black"}}>الملف</a></button>):(<div style={{textAlign:"center", color:"red", border:"1px solid black", padding:"4px"}}>لتحميل ملفات النوته يجب الاشتراك</div>)}
        
        {user?._id === course?.owner || user.role === "admin" ? (<button className='uploadPracticeBtn' onClick={deleteTheFile} style={{ background:"red"}}>delete</button>):(null)}
        </>
        ):(
            <>
             {user?._id === course?.owner || user?.role === "admin" ? (<form onSubmit={addLink} style={{display:'flex', flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <input type='text' placeholder='اضف الرابط' onChange={(e)=>setUploadFile(e.target.value)} style={{height:"40px", width:"150px", marginTop:"20px"}}/>
            <input type="submit" className='uploadPracticeBtn' style={{height:"40px", width:"150px"}}/>
            </form>):(<> {user?.paid === course?.owner ? (<button className='uploadPracticeBtn'>لا يوجد ملف</button>):(<div style={{textAlign:"center", color:"red", border:"1px solid black", padding:"4px"}}>لتحميل ملفات النوته يجب الاشتراك</div>)}</>)}
        </>
        )}
       </div>
  )
}
