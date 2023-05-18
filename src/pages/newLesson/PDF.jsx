import React, {useEffect, useState} from 'react'
import axios from 'axios';
export default function PDF({course,name}) {
    const user=JSON.parse(localStorage.getItem("profile"));
    const [fileUrl, setFileUrl] = useState('')
    const [uploadFile, setUploadFile] = useState('')
    const [fileId, setFileId] = useState('')
    console.log(user.teacher?._id)
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
      
  return (
    <div className='divOfUploadBtn'>
        {fileUrl ? (<> <button className='uploadPracticeBtn'>
        <a
    href={fileUrl}
    target="_blank"
    rel="noreferrer"   style={{
        textDecoration: "none",
        color: "black"}}>الملف</a></button>
        {user.teacher?._id === course?.owner || user.teacher?.role === "admin" ? (<button className='uploadPracticeBtn' onClick={deleteTheFile} style={{ background:"red"}}>delete</button>):(null)}
        </>
        ):(
            <>
             {user.teacher?._id === course?.owner || user.teacher?.role === "admin" ? (<form onSubmit={addLink} style={{display:'flex', flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <input type='text' placeholder='اضف الرابط' onChange={(e)=>setUploadFile(e.target.value)} style={{height:"40px", width:"150px", marginTop:"20px"}}/>
            <input type="submit" className='uploadPracticeBtn' style={{height:"40px", width:"150px"}}/>
            </form>):(<button className='uploadPracticeBtn'>لا يوجد ملف</button>)}
        </>
        )}
       </div>
  )
}
