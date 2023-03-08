import React , {useState}from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom"
export default function Footer() {
  const [showContactUs, setShowContactUs]=useState(false)
  function sendEmail() 
{
    window.location.assign("mailto:bisharaweb@gmail.com");
}
  return (
    <div
      style={{
        // background: "rgba(27,26,31,255)",
        height: "15vh",
        marginTop: "30px",
        borderTop: "1.5px solid #e1e1e1",
      }}
    >
      <div
        style={{
          width: "70%",
          margin: "auto",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          // marginTop: "30px",
        }}
      >
        <Link to="/qa" style={{textDecoration:"none", color:"black"}}>
        <div>أسئلة متكرره</div>
        </Link>
        <div>
        <div onClick={()=>setShowContactUs(!showContactUs)} style={{cursor:"pointer"}}>تواصل معنا</div> 
        {showContactUs ? (
          <div onClick={()=>setShowContactUs(!showContactUs)} style={{position:"fixed",height:"100vh", width:"100vw", background:"rgba(98, 98, 100, 0.3)", top:"0", left:"0", display:"flex", justifyContent:"center",alignItems:"center"}}>
          <div style={{position:"fixed",height:"40vh", width:"40vw",maxWidth:"300px",border: "1px solid black", backgroundColor:"white", zIndex:"15", display:"flex",flexDirection:"column", justifyContent:"space-around",alignItems:"center"}}>
          {/* <div><a href="tel:0587230238"  style={{textDecoration:"none", color:"black"}}><FontAwesomeIcon icon={faPhone}/>  هاتف</a></div> */}
          <div onClick={()=>sendEmail()} style={{cursor:"pointer"}}><FontAwesomeIcon icon={faEnvelope}/>  بريد الكتروني</div>
          </div> 
          </div> 
        ):(null)}
        </div>
        <div>انضم الينا</div>
      </div>
      <div style={{ textAlign: "center" }}>all rights reserved &copy;</div>
    </div>
  );
}
