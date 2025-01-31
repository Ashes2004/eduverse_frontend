// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { storage } from "../../firebase"; // Import storage from firebase-config.js
// import StudentSidebar from "../../components/StudentSidebar";

// const SubmitAssignment = () => {
//   const { assignmentId } = useParams();
//   const [assignmentDetails, setAssignmentDetails] = useState(null);
//   const [file, setFile] = useState(null);
  
//   const [uploading, setUploading] = useState(false);
//   const studentId = sessionStorage.getItem('studentId');
//   useEffect(() => {
//     // Fetch assignment details
//     const fetchAssignmentDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/assignment/id/${assignmentId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch assignment details");
//         }
//         const data = await response.json();
//         setAssignmentDetails(data.assignments);
//       } catch (error) {
//         console.error("Error fetching assignment details:", error);
//       }
//     };

//     fetchAssignmentDetails();
//   }, [assignmentId]);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!file) {
//       alert("Please select a file to upload.");
//       return;
//     }

//     setUploading(true);

//     try {
//       // Create a storage reference and upload the file to Firebase Storage
//       const storageRef = ref(storage, `assignments/${assignmentId}/${file.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           // Optional: monitor the upload progress
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log("Upload is " + progress + "% done");
//         },
//         (error) => {
//           console.error("Error uploading file:", error);
//           alert("An error occurred while uploading the file.");
//         },
//         async () => {
//           // Get the file's download URL after the upload completes
//           const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

//           // Submit the assignment with the download URL
//           await submitAssignment(downloadURL);
//         }
//       );
//     } catch (error) {
//       console.error("Error submitting assignment:", error);
//       alert("An error occurred while submitting the assignment.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const submitAssignment = async (fileUrl) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/assignment/submit", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           assignmentId,
//           studentId: studentId, 
//           fileUrl,
//         }),
//       });

//       if (response.ok) {
//         alert("Assignment submitted successfully.");
//       } else {
//         const errorData = await response.json();
//         alert(`Error: ${errorData.error}`);
//       }
//     } catch (error) {
//       console.error("Error submitting assignment:", error);
//       alert("An error occurred while submitting the assignment.");
//     }
//   };

//   return (
//     <div className="flex">
//       <StudentSidebar />
//       <div className="h-screen bg-gray-100 p-8 w-full overflow-y-auto">
//         <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
//           <h1 className="text-2xl font-bold text-gray-800 mb-4">Submit Assignment</h1>
//           {assignmentDetails ? (
//             <div className="mb-6">
//               <h2 className="text-lg font-semibold text-gray-700">Assignment Title:</h2>
//               <p className="text-gray-600">{assignmentDetails.title}</p>
//               <h2 className="text-lg font-semibold text-gray-700 mt-4">Description:</h2>
//               <p className="text-gray-600">{assignmentDetails.description}</p>
//               <h2 className="text-lg font-semibold text-gray-700 mt-4">Due Date:</h2>
//               <p className="text-gray-600">{new Date(assignmentDetails.dueDate).toLocaleDateString()}</p>
//             </div>
//           ) : (
//             <p>Loading assignment details...</p>
//           )}
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2" htmlFor="file">
//                 Upload your assignment (PDF only):
//               </label>
//               <input
//                 type="file"
//                 id="file"
//                 accept="application/pdf"
//                 onChange={handleFileChange}
//                 className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={uploading}
//               className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-300 disabled:opacity-50"
//             >
//               {uploading ? "Submitting..." : "Submit Assignment"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubmitAssignment;


import React from 'react'

function SubmitAssignment() {
  return (
    <div>SubmitAssignment</div>
  )
}

export default SubmitAssignment