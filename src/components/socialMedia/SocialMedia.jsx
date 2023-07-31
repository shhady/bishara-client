import React from 'react';
import "./socialmedia.css";
import { FaInstagram, FaFacebook, FaYoutubeSquare } from 'react-icons/fa';

export default function SocialMedia() {
  return (
    <div>
      <div className="social-icons">
        <a href="https://www.instagram.com/funanmusic/" target="_blank" ><FaInstagram className="iconInstagram"/></a>
        <a href="https://www.youtube.com/watch?v=DzsU1aXGoGg" target="_blank"><FaYoutubeSquare className="iconYoutube" /></a>
        <a href="https://www.facebook.com/Funan.org" target="_blank"><FaFacebook className="iconFacebook" /></a>
        
      </div>
    </div>
  );
}