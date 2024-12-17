import React, { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaCalendarCheck,
  FaTasks,
  FaClipboardList,
  FaUserCircle,
} from "react-icons/fa";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import StudentSidebar from "../../components/StudentSidebar";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const studentId = sessionStorage.getItem("studentId");
  if (!studentId) {
    navigate("/student/auth");
  }

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/student/${studentId}`
        );
        const data = await response.json();
        console.log(data);
        sessionStorage.setItem('classId' , data?.classId?._id);
        sessionStorage.setItem('InstitutionId' , data?.instituteId)
        setStudent(data);
        if (!response.ok) {
          navigate("/student/auth");
        }
      } catch (error) {
        console.error(error);
        navigate("/student/auth");
      }
    };
    fetchStudent();
  }, []);

  // Example Data for Charts
  const ScoreData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "score (%)",
        data: [90, 85, 92, 87, 95, 88],
        borderColor: "#5E72E4",
        backgroundColor: "rgba(94, 114, 228, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const gradesData = {
    labels: ["Math", "Science", "English", "History", "CS"],
    datasets: [
      {
        label: "Grades (%)",
        data: [85, 92, 78, 88, 95],
        backgroundColor: [
          "#5E72E4",
          "#2DCE89",
          "#FB6340",
          "#F4F5F7",
          "#11CDEF",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}

      <StudentSidebar />

      <main className="flex-1 p-6 overflow-auto w-full">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-700">
            {" "}
            Welcome{" "}
            <span className="text-3xl text-indigo-700">{student.name}</span>
          </h1>
          <input
            type="text"
            placeholder="Search here"
            className="p-2 rounded-lg border focus:outline-none"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <p className="text-gray-500">📊 Class Rank</p>
            <h2 className="text-2xl font-bold">Top 10%</h2>
            <p className="text-green-500 text-xs">Great Job!</p>
          </div>

          <div className="bg-white p-4 shadow-lg rounded-lg">
            <p className="text-gray-500">📝 Quiz Taken</p>
            <h2 className="text-2xl font-bold">15</h2>
            <p className="text-green-500 text-xs">Keep It Up!</p>
          </div>

          <div className="bg-white p-4 shadow-lg rounded-lg">
            <p className="text-gray-500">Assignments Completed</p>
            <h2 className="text-2xl font-bold">{student?.assignments?.length}</h2>
            <p className="text-blue-500 text-xs">+3 this week</p>
          </div>

          <div className="bg-white p-4 shadow-lg rounded-lg">
            <p className="text-gray-500">💰 Points Earned</p>
            <h2 className="text-2xl font-bold">{student.points}</h2>
            <p className="text-green-500 text-xs">Keep Going!</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-gray-700 font-semibold mb-4">Weekly Scores</h2>
            <Line data={ScoreData} />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-gray-700 font-semibold mb-4">Grades</h2>
            <Bar data={gradesData} />
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-gray-700 font-semibold mb-4">
            Upcoming Assignments
          </h2>
          <ul className="list-disc ml-4 text-gray-600">
            <li>Math Homework - Due Tomorrow</li>
            <li>Science Project - Due Friday</li>
            <li>English Essay - Due Next Week</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
