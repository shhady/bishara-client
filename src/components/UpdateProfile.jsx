import React from "react";

export default function UpdateProfile() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <input type="text" placeholder="firstName" />
        <button>submit</button>
      </div>
      <div>
        <input type="text" placeholder="lastName" />
        <button>submit</button>
      </div>
    </div>
  );
}
