

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import StudentSidebar from "../../components/StudentSidebar";
const StudentEnrollmentRequest = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const studentId = sessionStorage.getItem("studentId");
  const institutionId = sessionStorage.getItem("InstitutionId");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/class/institute/${institutionId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }
        const data = await response.json();
        setClasses(data.classes);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, [institutionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const enrollmentData = {
        studentId,
        classId: selectedClass,
        InstituteId: institutionId,
      };
      const response = await fetch("http://localhost:5000/api/student-enrollment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enrollmentData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit enrollment request");
      }
        Swal.fire({
               title: "Sent Successfully",
               text: "Enrollment request submitted successfully!",
               icon: "success",
             });
   
    } catch (error) {
      console.error("Error submitting enrollment request:", error.message);
      alert("Failed to submit enrollment request.");
    }
  };

  return (
    <div className="flex">
        <StudentSidebar/>
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Student Enrollment Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="class" className="block text-gray-700 font-medium mb-2">
              Select Class
            </label>
            <select
              id="class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            >
              <option value="" disabled>
                -- Select a Class --
              </option>
              {classes.map((classItem) => (
                <option key={classItem._id} value={classItem._id}>
                  {classItem.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          >
            Send Request
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default StudentEnrollmentRequest;
