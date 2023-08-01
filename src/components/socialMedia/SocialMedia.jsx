import React from 'react';
import "./socialmedia.css";
import { FaInstagram, FaFacebook, FaYoutubeSquare } from 'react-icons/fa';

export default function SocialMedia() {
  return (
    <div>
      <div className="social-icons">
        <a href="https://www.instagram.com/funanmusic/" target="_blank" rel="noreferrer" style={{height:'40px'}} ><FaInstagram className="iconInstagram"/></a>
        <a href="https://www.youtube.com/watch?v=DzsU1aXGoGg" target="_blank" rel="noreferrer" style={{height:'40px'}}><FaYoutubeSquare className="iconYoutube" /></a>
        <a href="https://www.facebook.com/Funan.org" target="_blank" rel="noreferrer" style={{height:'40px'}}><FaFacebook className="iconFacebook" /></a>
        
      </div>
    </div>
  );
}