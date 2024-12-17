import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TeacherSidebar from "../../components/TeacherSidebar";


const AssignmentGrading = () => {
  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [grades, setGrades] = useState({});
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { assignmentId } = useParams();

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/assignment/id/${assignmentId}`);
        const data = await response.json();
        setAssignment(data.assignments);
        setSubmissions(data.assignments.submissions);
        // Populate grades state
        const initialGrades = {};
        data.assignments.submissions.forEach(submission => {
          initialGrades[submission.student._id] = submission.grade;
        });
        setGrades(initialGrades);
      } catch (error) {
        console.error("Error fetching assignment:", error);
        setMessage("Error fetching assignment data.");
      }
    };

    fetchAssignment();
  }, [assignmentId]);

  const handleGradeChange = (studentId, value) => {
    setGrades({ ...grades, [studentId]: value });
  };

  const handleSubmitGrades = async () => {
    setIsSubmitting(true);
    try {
      const updatedSubmissions = submissions.map((submission) => ({
        ...submission,
        grade: grades[submission.student._id] || submission.grade,
      }));

      const response = await fetch(`http://localhost:5000/api/assignment/${assignmentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ submissions: updatedSubmissions }),
      });

      const data = await response.json();
      setMessage(data.message || "Grades updated successfully");
      setSubmissions(data.assignment.submissions);
    } catch (error) {
      setMessage(error.message || "Error submitting grades");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = (url) => {
    setIsLoadingPdf(true);
    setPdfUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setPdfUrl("");
    setIsModalOpen(false);
  };

  const handlePdfLoad = () => {
    setIsLoadingPdf(false);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <TeacherSidebar />

      <div className=" mx-auto w-full h-screen overflow-y-auto bg-gray-100 p-8 ">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Grade Assignment</h1>

        {message && (
          <div
            className={`p-4 mb-4 rounded-lg ${
              message.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {assignment ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">{assignment.title}</h2>
            <p className="mb-4 text-gray-700">{assignment.description}</p>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Submissions</h3>

              {submissions.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b py-2 px-4">Student Name</th>
                      <th className="border-b py-2 px-4">Email</th>
                      <th className="border-b py-2 px-4">Submission</th>
                      <th className="border-b py-2 px-4">Grade</th>
                      <th className="border-b py-2 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission) => (
                      <tr key={submission.student._id}>
                        <td className="border-b py-2 px-4">{submission.student.name}</td>
                        <td className="border-b py-2 px-4">{submission.student.email}</td>
                        <td className="border-b py-2 px-4">
                          <button
                            onClick={() => openModal(submission.fileUrl)}
                            className="text-blue-600 hover:underline"
                          >
                            View Submission
                          </button>
                        </td>
                        <td className="border-b py-2 px-4">
                          {grades[submission.student._id] ? (
                            <span>{grades[submission.student._id]}</span>
                          ) : (
                            <select
                              value={grades[submission.student._id] || ""}
                              onChange={(e) => handleGradeChange(submission.student._id, e.target.value)}
                              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-300"
                            >
                              <option value="">Select Grade</option>
                              <option value="A">A</option>
                              <option value="B">B</option>
                              <option value="C">C</option>
                              <option value="D">D</option>
                              <option value="F">F</option>
                            </select>
                          )}
                        </td>
                        <td className="border-b py-2 px-4">
                          {grades[submission.student._id] && (
                            <button
                              onClick={() => handleGradeChange(submission.student._id, "")}
                              className="text-yellow-600 hover:underline"
                            >
                              Modify
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No submissions found.</p>
              )}

              <button
                onClick={handleSubmitGrades}
                disabled={isSubmitting}
                className={`mt-4 ${isSubmitting ? "bg-gray-400" : "bg-indigo-600"} text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-300`}
              >
                {isSubmitting ? "Submitting..." : "Submit Grades"}
              </button>
            </div>
          </div>
        ) : (
          <p>Loading assignment details...</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-3/4 h-3/4 p-4 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
            >
              ✕
            </button>
            {isLoadingPdf && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">Loading...</div>}
            <iframe
              src={pdfUrl}
              type="application/pdf"
              className="w-full h-full"
              onLoad={handlePdfLoad}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentGrading;
