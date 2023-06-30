import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const GoogleAuthSignIn = ({ setUser, setShowLoginFailMessage }) => {
  const [userInformation, setUserInformation] = useState(null);
  const navigate = useNavigate();
  const onSuccess = async (response) => {
   
    let userInfo = jwt_decode(response.credential);
    setUserInformation(userInfo);
    try {
      const result = await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/users/login`,
        {
          email: userInfo.email,
          password: `${userInfo.sub}${process.env.REACT_APP_GOOGLE_ADD_TO_PASSWORD}`,
        }
      );
      window.localStorage.setItem("profile", JSON.stringify(result.data.user));
      window.localStorage.setItem("token", result.data.token);
      window.localStorage.setItem("firstName", result.data.user.firstName);
      window.localStorage.setItem("lastName", result.data.user.lastName);
      window.localStorage.setItem("profilePic", result.data.user.avatar);

      navigate("/profile");
      setUser(result.data.user);
    } catch (error) {
      setShowLoginFailMessage(true);
    }
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
      window.localStorage.setItem("profile", JSON.stringify(result.data.user));
      window.localStorage.setItem("token", result.data.token);
      window.localStorage.setItem("firstName", userInfo.given_name);
      window.localStorage.setItem("lastName", userInfo.family_name);
      // window.localStorage.setItem("coverPic", userInfo.picture);

      navigate("/profile");
      setUser(result.data.user);
    } catch (error) {
      console.log("Error creating user, trying to log in instead");
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
        Sign in with Google
      </GoogleLogin>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthSignIn;
