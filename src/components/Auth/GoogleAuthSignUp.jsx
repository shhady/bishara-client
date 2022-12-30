// import React from "react";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// const GoogleAuthSignUp = () => {
//   const onSuccess = (response) => {
//     console.log(response);
//   };

//   const onFailure = (error) => {
//     console.log(error);
//   };
//   return (
//     <GoogleOAuthProvider clientId="623673237970-h7oi3db0ime9917tl4gu24on8j6c5vvf.apps.googleusercontent.com">
//       <GoogleLogin
//         scope="https://www.googleapis.com/auth/userinfo.email"
//         redirectUri="https://bishara.netlify.app/"
//         onSuccess={onSuccess}
//         onFailure={onFailure}
//       >
//         Sign in with Google
//       </GoogleLogin>
//     </GoogleOAuthProvider>
//   );
// };

// export default GoogleAuthSignUp;
import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleAuthSignUp = () => {
  const [user, setUser] = useState({});
  console.log(user);
  const onSuccess = async (response) => {
    try {
      // Make a request to the Google OAuth API to retrieve the user's email and name
      const { data } = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
            Accept: application / json,
          },
        }
      );

      setUser({
        email: data.email,
        firstName: data.given_name,
        lastName: data.family_name,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onFailure = (error) => {
    console.error(error);
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
