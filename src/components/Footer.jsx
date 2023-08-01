import React , {useState}from "react";

import "./footer.css";
import {Link} from "react-router-dom"
import SocialMedia from "./socialMedia/SocialMedia";
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Footer() {
  const [showContactUs, setShowContactUs]=useState(false)
  function sendEmail() 
{
    window.location.assign("mailto:funanmusic@gmail.com");
}
  return (
    <div
      style={{
        // background: "rgba(27,26,31,255)",
        height: "20vh",
        marginTop: "30px",
        borderTop: "1.5px solid #e1e1e1",
        marginBottom:"50px"
      }}
    >
      <div
       className="footer"
      >
        <Link to="/qa" style={{textDecoration:"none", color:"black"}}>
        <div>أسئلة متكرره</div>
        </Link>
        <div>
        <div onClick={()=>setShowContactUs(!showContactUs)} style={{cursor:"pointer"}}>تواصل معنا</div> 
        {showContactUs ? (
          <div onClick={()=>setShowContactUs(!showContactUs)} style={{position:"fixed",height:"100vh", width:"100vw", background:"rgba(98, 98, 100, 0.3)", top:"0", left:"0", display:"flex", justifyContent:"center",alignItems:"center"}}>
          <div style={{position:"fixed",height:"40vh", width:"40vw",maxWidth:"300px",border: "1px solid black", backgroundColor:"white", zIndex:"15", display:"flex",flexDirection:"column", justifyContent:"space-around",alignItems:"flex-start"}}>
          {/* <div><a href="tel:0587230238"  style={{textDecoration:"none", color:"black"}}><FontAwesomeIcon icon={faPhone}/>  هاتف</a></div> */}
          <div onClick={()=>sendEmail()} style={{display:'flex', justifyContent:'center', alignItems:"center", gap:"5px", textDecoration:"none",color:"black"}}><MdEmail className="iconEmail"/> Email</div>
         <div > <a href="https://www.instagram.com/funanmusic/" target="_blank" rel="noreferrer" style={{display:'flex', justifyContent:'center', alignItems:"center", gap:"5px", textDecoration:"none",color:"black"}}><FaInstagram className="iconInstagram"/>Instagram</a> </div>
        {/* <a href="https://www.youtube.com/watch?v=DzsU1aXGoGg" target="_blank" rel="noreferrer" style={{height:'40px'}}><FaYoutubeSquare className="iconYoutube" /></a> */}
        <div> <a href="https://www.facebook.com/Funan.org" target="_blank" rel="noreferrer" style={{display:'flex', justifyContent:'center', alignItems:"center", gap:"5px", textDecoration:"none",color:"black"}} ><FaFacebook className="iconFacebook" />Facebook</a></div>
          </div> 
          </div> 
        ):(null)}
        </div>
        <Link to= "/terms_and_conditions" style={{textDecoration:"none", color:"black"}}>
        <div>الشروط والاحكام</div></Link>
        <Link to="/privacy_policy" style={{textDecoration:"none", color:"black"}}>
        <div>سياسة الخصوصية</div></Link>
      </div>
      <div><SocialMedia /></div>
      <div style={{ textAlign: "center"}}>all rights reserved &copy;</div>
    </div>
  );
}
