import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useHistory } from "react-router-dom";
const GoogleAuthSignIn = ({ setUser, setShowLoginFailMessage }) => {
  const [userInformation, setUserInformation] = useState(null);
  const history = useHistory();
  const onSuccess = async (response) => {
    console.log(response.credential);
    let userInfo = jwt_decode(response.credential);
    setUserInformation(userInfo);
    console.log(
      `${userInfo.sub}${process.env.REACT_APP_GOOGLE_ADD_TO_PASSWORD}`
    );
    try {
      const result = await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/users`,
        {
          email: userInfo.email,
          password: `${userInfo.sub}${process.env.REACT_APP_GOOGLE_ADD_TO_PASSWORD}`,
        }
      );
      window.localStorage.setItem("profile", JSON.stringify(result.data));
      window.localStorage.setItem("token", result.data.token);
      history.push("/profile");
      setUser(result.data);
    } catch (error) {
      console.log("Error creating user, trying to log in instead");
    }
    try {
      const result = await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/users/login`,
        {
          email: userInfo.email,
          password: `${userInfo.sub}${process.env.REACT_APP_GOOGLE_ADD_TO_PASSWORD}`,
        }
      );
      window.localStorage.setItem("profile", JSON.stringify(result.data));
      window.localStorage.setItem("token", result.data.token);
      history.push("/profile");
      setUser(result.data);
    } catch (error) {
      setShowLoginFailMessage(true);
    }
  };
  console.log(userInformation);
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
        Sign in with Google
      </GoogleLogin>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthSignIn;
