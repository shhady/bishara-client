import React, { useEffect, useState } from 'react'
import "./newProfile.css"
import coverProfileImage from './coverProfile.jpg';
export default function NewProfile({user, setTheUser}) {
    const [open, setOpen] = useState('')
    const update = ()=>{
        setTheUser({...user, firstName: 'updated'});
    }


    console.log(user);
  return (
    <div className='profilePage'>
        <div style={{background: user.role === "admin" || user.role === "teacher" ? `url(${user.cover})` : `url(${coverProfileImage})`, backgroundPosition:"center", backgroundRepeat:"no-repeat", backgroundSize:"cover", width:'100%', height:"40vh"}}>
           <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"column", justifyContent:'center', alignItems:"center", background:"rgba(116, 114, 114, 0.3)"}}>
            <div style={{width:"120px", height:"120px", borderRadius:"50%", border:"2px solid white", background:"white"}}>
                <img src={user.avatar ? user.avatar : "https://img.icons8.com/material-rounded/24/null/user.png" } alt={user.name} width='100%' height='100%' style={{borderRadius:"50%"}}/>
            </div>
            <div style={{color:"white", fontSize:"30px", fontWeight:"bold"}}>
                {user.firstName} {user.lastName}
            </div>
            </div>
        </div>
        <div>
            <div></div>
        </div>
    </div>
  )
}
