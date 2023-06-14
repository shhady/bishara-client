import React, { useEffect } from 'react'
import "./newProfile.css"
import coverProfileImage from './coverProfile.jpg';
export default function NewProfile({user, setTheUser}) {
    
    const update = ()=>{
        setTheUser({...user, firstName: 'updated'});
    }


    console.log(user);
  return (
    <div className='profilePage'>
        <div style={{background: user.role === "admin" || user.role === "teacher " ? `url(${user.cover})` : `url(${coverProfileImage})`, backgroundPosition:"center", backgroundRepeat:"no-repeat", backgroundSize:"cover", width:'100%', height:"40vh"}}>

        </div>
    </div>
  )
}
