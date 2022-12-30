import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useHistory } from "react-router-dom";
const GoogleAuthSignUp = ({ setUser }) => {
  const [userInformation, setUserInformation] = useState(null);
  const history = useHistory();
  const onSuccess = async (response) => {
    console.log(response.credential);
    let userInfo = jwt_decode(response.credential);
    setUserInformation(userInfo);

    try {
      const result = await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/users`,
        {
          firstName: userInfo.given_name,
          lastName: userInfo.family_name,
          email: userInfo.email,
          password: `${userInfo.sub}${process.env.REACT_APP_GOOGLE_ADD_TO_PASSWORD}`,
          confirmPassword: `${userInfo.sub}${process.env.REACT_APP_GOOGLE_ADD_TO_PASSWORD}`,
          avatar: userInfo.picture,
        }
      );
      window.localStorage.setItem("profile", JSON.stringify(result.data));
      window.localStorage.setItem("token", result.data.token);
      history.push("/profile");
      setUser(result.data);
    } catch (error) {
      console.log("passwords don't match");
    }
  };
  const onFailure = (error) => {
    console.log(error);
  };
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        scope="https://www.googleapis.com/auth/userinfo.email"
        onSuccess={onSuccess}
        onFailure={onFailure}
      >
        Sign Up with Google
      </GoogleLogin>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthSignUp;
