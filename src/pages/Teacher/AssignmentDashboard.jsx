import React, { useState, useEffect } from "react";
import TeacherSidebar from "../../components/TeacherSidebar";
import { useNavigate } from "react-router-dom";
const AssignmentDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [teacherData, setTeacherData] = useState(null);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    classId: "",
    dueDate: "",
  });
  const [editAssignment, setEditAssignment] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const teacherId = sessionStorage.getItem("teacherId");
  const instituteId = sessionStorage.getItem("InstitutionId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherResponse = await fetch(`http://localhost:5000/api/teacher/${teacherId}`);
        const teacherData = await teacherResponse.json();
        console.log(teacherData);
        
        setTeacherData(teacherData);

        const assignmentsResponse = await fetch(`http://localhost:5000/api/assignment`);
        const allAssignments = await assignmentsResponse.json();

        const filteredAssignments = allAssignments.filter(
          (assignment) => assignment.teacher === teacherId
        );
        setAssignments(filteredAssignments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [teacherId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  const handleCreateAssignment = async () => {
    if (!newAssignment.title || !newAssignment.description || !newAssignment.classId || !newAssignment.dueDate) {
      setMessage("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/assignment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newAssignment, teacherId, instituteId }),
      });
      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setAssignments((prev) => [...prev, result.assignment]);
        setNewAssignment({ title: "", description: "", classId: "", dueDate: "" });
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      setMessage("Error creating assignment");
    }
  };

  const handleEditAssignment = (assignment) => {
    setEditAssignment(assignment);
    setNewAssignment({
      title: assignment.title,
      description: assignment.description,
      classId: assignment.class,
      dueDate: new Date(assignment.dueDate).toISOString().split("T")[0],
    });
  };

  const handleUpdateAssignment = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/assignment/${editAssignment._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAssignment),
      });
      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setAssignments((prev) =>
          prev.map((assignment) =>
            assignment._id === editAssignment._id ? { ...assignment, ...newAssignment } : assignment
          )
        );
        setEditAssignment(null);
        setNewAssignment({ title: "", description: "", classId: "", dueDate: "" });
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      setMessage("Error updating assignment");
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/assignment/${assignmentId}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setAssignments((prev) => prev.filter((assignment) => assignment._id !== assignmentId));
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      setMessage("Error deleting assignment");
    }
  };

  return (
    <div className="flex">
        <TeacherSidebar/>
    <div className="h-screen bg-gray-900 p-8 w-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">Assignment Dashboard</h1>

        {message && (
          <div
            className={`p-4 mb-4 rounded-lg ${
              message.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">
            {editAssignment ? "Edit Assignment" : "Create New Assignment"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={newAssignment.title}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-300"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={newAssignment.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-300"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Class</label>
              <select
                name="classId"
                value={newAssignment.classId}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-300"
              >
                <option value="">Select Class</option>
                {teacherData?.AssignedClasses?.map((classId , index) => (
                  <option key={index} value={classId._id}>
                    {classId.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={newAssignment.dueDate}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-300"
              />
            </div>
          </div>
          <button
            onClick={editAssignment ? handleUpdateAssignment : handleCreateAssignment}
            className="mt-4 bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
          >
            {editAssignment ? "Update Assignment" : "Create Assignment"}
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Past Assignments</h2>
          {assignments.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b py-2 px-4">Title</th>
                  <th className="border-b py-2 px-4">Description</th>
                  <th className="border-b py-2 px-4">Class</th>
                  <th className="border-b py-2 px-4">Due Date</th>
                  <th className="border-b py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment._id}>
                    <td className="border-b py-2 px-4">{assignment.title}</td>
                    <td className="border-b py-2 px-4">{assignment.description}</td>
                    <td className="border-b py-2 px-4">{assignment.class}</td>
                    <td className="border-b py-2 px-4">{new Date(assignment.dueDate).toLocaleDateString()}</td>
                    <td className="border-b py-2 px-4">
                      <button
                        onClick={() => navigate(`/teacher/assignment/${assignment._id}`)}
                        className="bg-green-600 text-white font-medium py-1 px-3 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300 mr-2"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEditAssignment(assignment)}
                        className="bg-blue-600 text-white font-medium py-1 px-3 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAssignment(assignment._id)}
                        className="bg-red-600 text-white font-medium py-1 px-3 rounded-lg hover:bg-red-700 focus:ring focus:ring-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No assignments found.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AssignmentDashboard;
