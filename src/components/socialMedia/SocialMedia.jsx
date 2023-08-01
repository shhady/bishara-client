import React from 'react';
import "./socialmedia.css";
import { FaInstagram, FaFacebook, FaYoutubeSquare,FaTiktok } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';


export default function SocialMedia() {
    function sendEmail() 
    {
        window.location.assign("mailto:funanmusic@gmail.com");
    }
  return (
    <div>
      <div className="social-icons">
        <div style={{height:'40px'}}><MdEmail className="iconEmail"  onClick={()=>sendEmail()}/></div>
        <a href="https://www.instagram.com/funanmusic/" target="_blank" rel="noreferrer" style={{height:'40px'}} ><FaInstagram className="iconInstagram"/></a>
        <a href="https://www.youtube.com/watch?v=DzsU1aXGoGg" target="_blank" rel="noreferrer" style={{height:'40px'}}><FaYoutubeSquare className="iconYoutube" /></a>
        <a href="https://www.facebook.com/Funan.org" target="_blank" rel="noreferrer" style={{height:'40px'}}><FaFacebook className="iconFacebook" /></a>
        <a href="https://www.tiktok.com/@funanmusic?_t=8eTUH98SnUv&_r=1" target="_blank" rel="noreferrer" style={{height:'40px'}}><FaTiktok className="iconTiktok" /></a>
      </div>
    </div>
  );
}