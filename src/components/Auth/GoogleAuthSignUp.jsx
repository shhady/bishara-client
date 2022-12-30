import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
const GoogleAuthSignUp = () => {
  console.log(data.email);
  console.log(data.given_name);
  console.log(data.family_name);
  const onSuccess = async () => {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
        },
      }
    );
    console.log(response.data.email);
    console.log(response.data.given_name);
    console.log(response.data.family_name);
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
