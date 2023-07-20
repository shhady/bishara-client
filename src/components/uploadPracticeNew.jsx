import React,{useState} from 'react'

export default function UploadPracticeNew() {
    const [formData, setFormData] = useState({})
    const [video, setVideo] = useState('')

    function handleOpenWidget (){
      let myWidget = window.cloudinary.createUploadWidget({
        cloudName: 'djvbchw2x', 
        uploadPreset: 'bisharaHaroni'}, (error, result) => { 
          if (!error && result && result.event === "success") { 
            console.log('Done! Here is the image info: ', result.info); 
            setFormData({...formData, image:result.info.secure_url})
            setVideo(result.info.secure_url)
          }
        }
      )
      myWidget.open()
    }
  
  
  return (
    <div>
        <button onClick={handleOpenWidget}>open</button>
    </div>
  )
}
