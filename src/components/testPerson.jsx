// import React, { Component } from "react";

// export default class Person extends Component {
//   state = { value: "" };
//   handleOnChange = ({ target }) => {
//     this.setState({ value: target.value });
//   };
//   handleUpdateClick = () => {
//     this.props.handleUpdate(this.props.id, this.state.value);
//     this.setState({ value: "" });
//     // console.log(this.props.answers);
//   };

//   render() {
//     return (
//       <div
//         className="item"
//         style={{
//           marginTop: "2rem",
//           border: "2px solid #333",
//           padding: "0.5rem",
//           backgroundColor: "#ddd9d9",
//           boxShadow: "5px 10px 18px #888888",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <img
//               alt="#"
//               src={this.props.img}
//               style={{ height: "60px", width: "60px", borderRadius: "50%" }}
//             />
//             <h2>{this.props.name}</h2>
//           </div>
//           <div>
//             <button onClick={() => this.props.handleDelete(this.props.id)}>
//               Delete
//             </button>
//           </div>
//         </div>
//         <div style={{ fontWeight: "bold" }}>{this.props.Questions}</div>
//         <div>
//           {this.props.answers.map((answer) => {
//             return (
//               <div
//                 key={answer}
//                 style={{
//                   border: "1px solid black",
//                   display: "flex",
//                   flexWrap: "wrap",
//                   wordWrap: "break-word",
//                   whiteSpace: "initial",
//                   padding: "0.5rem",
//                 }}
//               >
//                 Replied: {answer}
//               </div>
//             );
//           })}
//         </div>
//         {/* <div>{this.props.paintAnswers}</div> */}
//         <div>
//           <input
//             placeholder="Reply"
//             onChange={this.handleOnChange}
//             value={this.state.value}
//             maxLength="200"
//             style={{
//               width: "50%",
//               height: "30px",
//               marginTop: "1rem",
//               backgroundColor: "#eeeeee",
//             }}
//           />
//         </div>
//         <div>
//           <button onClick={this.handleUpdateClick}>Reply</button>
//         </div>
//       </div>
//     );
//   }
// }
