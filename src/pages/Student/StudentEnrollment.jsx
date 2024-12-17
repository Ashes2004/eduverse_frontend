// Page Component: StudentEnrollment.jsx

import React, { useState, useEffect } from "react";

const StudentEnrollment = () => {
  const [classes, setClasses] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [studentsInClass, setStudentsInClass] = useState([]);

  const institutionId = sessionStorage.getItem("InstitutionId");

  useEffect(() => {
    // Fetch all classes associated with the institution
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

  useEffect(() => {
    // Fetch enrollment requests filtered by institution
    const fetchRequests = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/student-enrollment`);
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }
        const data = await response.json();
        console.log("request data: " , data);
        
        const filteredRequests = data.filter((req) => req.InstituteId === institutionId);
        setRequests(filteredRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, [institutionId]);

  useEffect(() => {
    // Fetch students in the selected class
    const fetchStudentsInClass = async () => {
      if (!selectedClass) return;
      try {
        const response = await fetch(`http://localhost:5000/api/class/${selectedClass}`);
        if (!response.ok) {
          throw new Error("Failed to fetch students in class");
        }
        const data = await response.json();
        setStudentsInClass(data.classes.students || []);
      } catch (error) {
        console.error("Error fetching students in class:", error);
      }
    };

    fetchStudentsInClass();
  }, [selectedClass]);

  const addStudentToClass = async (studentId, requestId) => {
    try {
      const updatedStudents = [...studentsInClass, studentId];
      const response = await fetch(`http://localhost:5000/api/class/update/${selectedClass}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ students: updatedStudents }),
      });

      if (!response.ok) {
        throw new Error("Failed to add student to class");
      }

      // Remove the enrollment request
      const deleteResponse = await fetch(`http://localhost:5000/api/student-enrollment/${requestId}`, {
        method: "DELETE",
      });

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete enrollment request");
      }

      alert("Student added to class successfully!");
      setStudentsInClass(updatedStudents);
      setRequests((prevRequests) => prevRequests.filter((req) => req._id !== requestId));
    } catch (error) {
      console.error("Error adding student to class:", error);
    }
  };

  const removeStudentFromClass = async (studentId) => {
    try {
      const updatedStudents = studentsInClass.filter((id) => id !== studentId);
      const response = await fetch(`http://localhost:5000/api/class/update/${selectedClass}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ students: updatedStudents }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove student from class");
      }

      alert("Student removed from class successfully!");
      setStudentsInClass(updatedStudents);
    } catch (error) {
      console.error("Error removing student from class:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Manage Enrollment Requests</h2>

        <label htmlFor="classDropdown" className="block text-gray-700 font-medium mb-2">
          Select Class
        </label>
        <select
          id="classDropdown"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
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

        <h3 className="text-lg font-semibold mb-2">Enrollment Requests</h3>
        <ul>
          {requests
            .filter((req) => req.classId._id === selectedClass)
            .map((req) => (
              <li key={req._id} className="flex justify-between items-center mb-2">
                <span>{req.studentId.name}</span>
                <button
                  onClick={() => addStudentToClass(req.studentId._id, req._id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-3 rounded-lg"
                >
                  Add Student
                </button>
              </li>
            ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Students in Class</h2>
        <ul>
          {studentsInClass.map((studentId) => (
            <li key={studentId} className="flex justify-between items-center mb-2">
              <span>{studentId}</span>
              <button
                onClick={() => removeStudentFromClass(studentId)}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-lg"
              >
                Remove Student
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentEnrollment;
