import React, { useState } from 'react';

const PopupIframeButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleIframeMessage = (event) => {
    // Check if the event is from the expected iframe source
    if (event.source === iframeRef.current.contentWindow) {
      // Log the received message from the iframe
      console.log('Received message from iframe:', event.data);
    }
  };

  // Create a ref to access the iframe element
  const iframeRef = React.useRef(null);

  React.useEffect(() => {
    // Add event listener for messages from the iframe
    window.addEventListener('message', handleIframeMessage);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('message', handleIframeMessage);
    };
  }, []);

  return (
    <div style={{margin:"100px"}}>
      <button onClick={handleClick}>Open Popup</button>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button className="close-button" onClick={handleClosePopup}>
              Close
            </button>
            <iframe
            style={{height:"100vh",width:"100vw"}}
              ref={iframeRef}
              className="popup-iframe"
              src="https://secure.cardcom.solutions/e/Pbj4vpEMNkqidoUNzmgSg"
              title="Cardcom Popup"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupIframeButton;
