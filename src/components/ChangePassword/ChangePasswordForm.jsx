// import React, { useState } from "react";
// import { useMutation } from "@apollo/client";

// import gql from "graphql-tag";

// const CHANGE_PASSWORD = gql`
//   mutation ChangePassword($newPassword: String!, $confirmPassword: String!) {
//     changePassword(
//       newPassword: $newPassword
//       confirmPassword: $confirmPassword
//     ) {
//       id
//     }
//   }
// `;

// function ChangePasswordForm() {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [changePassword, { data }] = useMutation(CHANGE_PASSWORD);

//   const handleChangeNewPassword = (event) => {
//     setNewPassword(event.target.value);
//   };

//   const handleChangeConfirmPassword = (event) => {
//     setConfirmPassword(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (newPassword !== confirmPassword) {
//       alert("New password and confirm password do not match");
//       return;
//     }

//     changePassword({
//       variables: {
//         newPassword,
//         confirmPassword,
//       },
//     });
//   };

//   return (
//     <form>
//       <label>
//         New password:
//         <input
//           type="password"
//           value={newPassword}
//           onChange={handleChangeNewPassword}
//           onKeyDown={handleKeyDown}
//         />
//       </label>
//       <br />
//       <label>
//         Confirm password:
//         <input
//           type="password"
//           value={confirmPassword}
//           onChange={handleChangeConfirmPassword}
//           onKeyDown={handleKeyDown}
//         />
//       </label>
//       <br />
//       <button type="submit">Change password</button>
//     </form>
//   );
// }
