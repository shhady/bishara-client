import React from "react";

export default function Footer() {
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
          marginTop: "30px",
        }}
      >
        <div>FAQ</div>
        <div>Contacts Us</div>
        <div>Join us</div>
      </div>
      <div style={{ textAlign: "center" }}>all rights reserved</div>
    </div>
  );
}
