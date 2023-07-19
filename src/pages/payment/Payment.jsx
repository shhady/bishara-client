import React from 'react';
import { useNavigate } from 'react-router-dom';

const PopupIframeButton = ({user,handleSubscriptionSubmit, period,setIsPopupOpen,selectedTeacher}) => {
const navigate =useNavigate()
  const handleIframeMessage = (event) => {
    // Check if the event is from the expected iframe source
    if (event.source === iframeRef?.current?.contentWindow) {
      // Extract the URL from the value property
      const url = new URL(event.data.value);
  
      // Get the value of ResponseCode query parameter
      const responseCode = url.searchParams.get('ResponseCode');
  
      // Log the ResponseCode
      console.log('Received ResponseCode from iframe:', responseCode);
      if(responseCode == 0){
        handleSubscriptionSubmit(period)
       
        setTimeout(function(){
          navigate(`/newTeacher/${selectedTeacher.value}`)
        }, 3000);
      } else{
        setTimeout(function(){
          setIsPopupOpen(false)
        }, 3000);
      }
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
    <div style={{margin:"0px auto"}}>
        <div className="popup-overlay">
          <div className="popup-container">
            <iframe
            style={{height:"100vh",width:"100vw"}}
              ref={iframeRef}
              className="popup-iframe"
              src={`${process.env.REACT_PAYMENT}&SumToBill=${period === "year" ? 1500:1194}
              &CoinID=1&Language=ar&ProductName=item1&APILevel=10&SuccessRedirectUrl=https://secure.cardcom.solutions/SuccessAndFailDealPage/Success.aspx&ErrorRedirectUrl=https://secure.cardcom.solutions/SuccessAndFailDealPage/Fail.aspx&IndicatorUrl=www.google.com&ReturnValue=1234&&AutoRedirect=true&InvoiceHead.CustName=${user.firstName}&InvoiceHead.SendByEmail=true&InvoiceHead.Email=${user.email}&InvoiceHead.Language=ar&InvoiceHead.CoinID=1&CardOwnerEmail=${user.email}&MaxNumOfPayments=${period === "year" ? 12:6}&InvoiceLines1.Description=${period}&InvoiceLines1.Price=${period === "year" ? 1500:1194}&InvoiceLines1.Quantity=1`}
              title="Cardcom Popup"
            />
          </div>
        </div>
    </div>
  );
};

export default PopupIframeButton;
