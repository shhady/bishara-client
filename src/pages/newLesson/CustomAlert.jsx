import React, { useState } from "react";
import "./CustomAlert.css";

const CustomAlert = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <button onClick={handleShowAlert}>Show Custom Alert</button>

      {showAlert && (
        <div className="custom-alert">
          <p>This is a custom alert!</p>
          <button onClick={handleCloseAlert}>Close</button>
        </div>
      )}
    </div>
  );
};

export default CustomAlert;
