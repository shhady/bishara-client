import React from 'react';
import { useNavigate } from 'react-router-dom';

const PopupIframeButton = ({ user, handleSubscriptionSubmit, period, setIsPopupOpen, selectedTeacher }) => {
  const navigate = useNavigate();
  const iframeRef = React.useRef(null);

  const handleIframeMessage = React.useCallback((event) => {
    if (event.source === iframeRef?.current?.contentWindow) {
      const url = new URL(event.data.value);
      const responseCode = url.searchParams.get('ResponseCode');

      if (responseCode === '0') {
        handleSubscriptionSubmit(period);
        setTimeout(function () {
          navigate(`/newTeacher/${selectedTeacher?.value}`);
        }, 3000);
      } else {
        setTimeout(function () {
          setIsPopupOpen(false);
        }, 3000);
      }
    }
  }, [handleSubscriptionSubmit, period, selectedTeacher?.value, setIsPopupOpen, navigate]);

  React.useEffect(() => {
    window.addEventListener('message', handleIframeMessage);

    return () => {
      window.removeEventListener('message', handleIframeMessage);
    };
  }, [handleIframeMessage]);

  return (
    <div style={{ margin: "0px auto" }}>
      <div className="popup-overlay">
        <div className="popup-container">
          <iframe
            style={{ height: "100vh", width: "100vw" }}
            ref={iframeRef}
            className="popup-iframe"
            src={`${process.env.REACT_APP_PAYMENT_URL}?codepage=${process.env.REACT_APP_CODE_PAGE}&Operation=1&TerminalNumber=${process.env.REACT_APP_TERMINAL}&UserName=${process.env.REACT_APP_USER_NAME}&SumToBill=${period === "year" ? 1548 : period === "6 months" ? 882 : 616}
              &CoinID=1&Language=ar&ProductName=item1&APILevel=10&SuccessRedirectUrl=https://secure.cardcom.solutions/SuccessAndFailDealPage/Success.aspx&ErrorRedirectUrl=https://secure.cardcom.solutions/SuccessAndFailDealPage/Fail.aspx&IndicatorUrl=www.google.com&ReturnValue=1234&&AutoRedirect=true&InvoiceHead.CustName=${user.firstName}&InvoiceHead.SendByEmail=true&InvoiceHead.Email=${user.email}&InvoiceHead.Language=ar&InvoiceHead.CoinID=1&CardOwnerEmail=${user.email}&MaxNumOfPayments=${period === "year" ? 12 : period === "6 months" ? 6 : 3}&InvoiceLines1.Description=${period === 'year' ? "سنة" : period === "6 months" ? "6 اشهر":"3 اشهر"}&InvoiceLines1.Price=${period === "year" ? 1548 : period === "6 months" ? 882 : 616}&InvoiceLines1.Quantity=1`}
            title="Cardcom Popup"
          />
        </div>
      </div>
    </div>
  );
};

export default PopupIframeButton;
