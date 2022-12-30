import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GoogleAuthSignUp = () => {
  const onSuccess = (response) => {
    console.log(response.email);
    console.log(response.given_name);
    console.log(response.family_name);
  };

  const onFailure = (error) => {
    console.log(error);
  };
  return (
    <GoogleOAuthProvider clientId="623673237970-h7oi3db0ime9917tl4gu24on8j6c5vvf.apps.googleusercontent.com">
      <GoogleLogin
        scope="https://www.googleapis.com/auth/userinfo.email"
        redirectUri="https://bishara.netlify.app"
        onSuccess={onSuccess}
        onFailure={onFailure}
      >
        Sign in with Google
      </GoogleLogin>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthSignUp;
