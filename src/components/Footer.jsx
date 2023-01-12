import React , {useState}from "react";

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
        height: "30vh",
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
        <div>أسئلة متكرره</div>
        <div>
        <div onClick={()=>setShowContactUs(!showContactUs)}>تواصل معنا</div> 
        {showContactUs ? (
          <div onClick={()=>setShowContactUs(!showContactUs)} style={{position:"fixed",height:"100vh", width:"100vw", background:"black", top:"0", left:"0", display:"flex", justifyContent:"center",alignItems:"center"}}>
          <div style={{position:"fixed",height:"22vh", width:"40vw",maxWidth:"300px",border: "1px solid black", backgroundColor:"white", zIndex:"15", display:"flex",flexDirection:"column", justifyContent:"space-around",alignItems:"center"}}>
          <div><a href="tel:0505774285"  style={{textDecoration:"none", color:"black"}}>phone</a></div>
          <div onClick={()=>sendEmail()}>E-Mail</div>
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
