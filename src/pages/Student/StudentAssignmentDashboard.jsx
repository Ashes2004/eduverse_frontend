import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../../components/StudentSidebar";

const StudentAssignmentDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const classId = sessionStorage.getItem("classId");
  const instituteId = sessionStorage.getItem("InstitutionId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/assignment");
        const data = await response.json();

        // Filter assignments by classId and instituteId
        const filteredAssignments = data.filter(
          (assignment) =>
            assignment.class === classId && assignment.InstituteId === instituteId
        );

        setAssignments(filteredAssignments);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, [classId, instituteId]);

  const handleViewMore = (assignmentId) => {
    navigate(`/student/submitassignment/${assignmentId}`);
  };

  return (
    <div className="flex">
        <StudentSidebar/>
  
    <div className="h-screen bg-gray-100 p-8 w-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Assignments</h1>
        {assignments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((assignment) => (
              <div
                key={assignment._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-bold text-gray-700 mb-2">
                  {assignment.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {assignment.description.length > 100
                    ? assignment.description.slice(0, 100) + "..."
                    : assignment.description}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
                </p>
                <button
                  onClick={() => handleViewMore(assignment._id)}
                  className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
                >
                  View More
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700">No assignments available.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default StudentAssignmentDashboard;
