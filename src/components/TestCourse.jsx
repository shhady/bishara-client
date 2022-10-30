// import axios from "axios";
// import React from "react";
// import Person from "./testPerson";
// //* CRUD

// //? API to work with

// //* HTTP requests
// //? GET - Read - get data from server
// //? POST - Create - Send something to server
// //? DELETE - Delete something from server
// //? PUT - Update - update some data on server

// export default class App1 extends React.Component {
//   state = {
//     questions: [],
//     newQuestion: "",
//     isSpinning: true,
//     posterID: "",
//     courseId: localStorage.getItem("courseId"),
//   };

//   //? GET
//   async componentDidMount() {
//     try {
//       const { data } = await axios.get(
//         process.env.REACT_APP_BACKEND_URL + `/courses/${this.state.courseId}`
//       );
//       console.log(data);
//       this.setState(
//         {
//           questions: data,
//           isSpinning: false,
//         },
//         () => {
//           console.log(this.state.posterID);
//         }
//       );
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   //? POST
//   handleCreate = async () => {
//     this.setState({ isSpinning: true });
//     const newPerson = {
//       Questions: this.state.newQuestion,
//       name: this.props.currentUser.email.split("@")[0],
//     };
//     console.log(newPerson.id);
//     try {
//       const postedData = await axios.post(
//         "https://629de115c6ef9335c0a8f53f.mockapi.io/questions",
//         newPerson
//       );
//       this.setState((prev) => {
//         return {
//           questions: [...prev.questions, postedData.data],
//           newQuestion: "",
//           isSpinning: false,
//         };
//       });
//     } catch (e) {
//       console.log(e.message);
//     }
//   };

//   //? DELETE
//   handleDelete = async (id) => {
//     this.setState({ isSpinning: true });
//     try {
//       await axios.delete(
//         `https://629de115c6ef9335c0a8f53f.mockapi.io/questions/${id}`
//       );
//       this.setState((prev) => {
//         const newQuestionsArr = prev.questions.filter((p) => p.id !== id);
//         return { questions: newQuestionsArr, isSpinning: false };
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   //   //? PUT
//   handleUpdate = async (id, newAnswer) => {
//     this.setState({ isSpinning: true });
//     const replyToUpdate = this.state.questions.find((q) => q.id === id);
//     const newAnswers = [newAnswer, ...replyToUpdate.answers];
//     const updatedReply = {
//       ...replyToUpdate,
//       answers: newAnswers,
//     };
//     const { data } = await axios.put(
//       `https://629de115c6ef9335c0a8f53f.mockapi.io/questions/${id}`,
//       updatedReply
//     );
//     this.setState((prev) => {
//       return {
//         questions: prev.questions.map((person) => {
//           if (person.id === id) {
//             return data;
//           }
//           return person;
//         }),
//         isSpinning: false,
//       };
//     });
//   };

//   paintAnswers = () => {
//     this.state.newAnswers.map((answer) => {
//       return console.log(answer);
//     });
//   };

//   //?UI
//   //   paintPeople = () => {
//   //     return this.state.questions.map(({ name, img, id, Questions, answers }) => {
//   //       return (
//   //         <Person
//   //           key={id}
//   //           name={name}
//   //           img={img}
//   //           id={id}
//   //           Questions={Questions}
//   //           answers={answers}
//   //           handleDelete={this.handleDelete}
//   //           handleUpdate={this.handleUpdate}
//   //         />
//   //       );
//   //     });
//   //   };
//   handleInputChange = ({ target }) => {
//     this.setState({ [target.id]: target.value, isSpinning: false });
//   };

//   render() {
//     return (
//       <div className="wrapper" style={{ marginTop: "50px" }}>
//         {this.state.isSpinning ? (
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               flexDirection: "column",
//             }}
//           >
//             <div className="spinner">
//               <div className="loader">
//                 <div className="balls_container">
//                   <div className="ball"></div>
//                   <div className="ball"></div>
//                   <div className="ball"></div>
//                 </div>
//                 <span>Loading...</span>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               {this.props.currentUser && (
//                 <>
//                   {" "}
//                   <input
//                     id="newQuestion"
//                     onChange={this.handleInputChange}
//                     value={this.state.newQuestion}
//                     placeholder="ask question"
//                     style={{ width: "40%", height: "30px", marginTop: "1rem" }}
//                   />
//                   <button
//                     style={{ height: "35px", marginTop: "1rem" }}
//                     onClick={this.handleCreate}
//                   >
//                     POST IT
//                   </button>
//                 </>
//               )}
//               {!this.props.currentUser && (
//                 <div>
//                   <h1>Sign in to post your question</h1>
//                 </div>
//               )}
//             </div>
//             {/* {this.props.currentUser ? (
//               <div style={{ width: "80%", margin: "auto" }}>
//                 {this.paintPeople()}
//               </div>
//             ) : (
//               <div style={{ width: "80%", margin: "auto" }}>
//                 {this.paintPeople()}
//               </div> */}
//             )}
//           </>
//         )}
//       </div>
//     );
//   }
// }
