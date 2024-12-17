import React, { useEffect, useState } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TeacherSidebar from "../../components/TeacherSidebar";
import { useNavigate } from "react-router-dom";
const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [teacherData , setTeacherData] = useState({});
  const teacherId = sessionStorage.getItem("teacherId");
  if (!teacherId || teacherId == undefined) {
    navigate("/teacher/auth");
  }

  useEffect(() => {
    const fetchTeacher = async () => {
      const teacherId = sessionStorage.getItem("teacherId");
      try {
        const response = await fetch(
          `http://localhost:5000/api/teacher/${teacherId}`
        );
        const data = await response.json();
        setTeacherData(data);
        console.log(data);
        
      } catch (error) {
        console.log(error);
      }

     
    };
    fetchTeacher();
  }, []);

  return (
    <div className="flex max-w">
      <TeacherSidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-6 max-h-screen overflow-y-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
            Welcome, {teacherData?.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your classroom efficiently from this dashboard.
          </p>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card: Upload Materials */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
              Upload Materials
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Share lecture notes and study resources with students.
            </p>
            <button className="mt-4 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-400 transition">
              Upload Now
            </button>
          </div>

          {/* Card: Assignments */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
              Assignments
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Create and assign homework or projects.
            </p>
            <button
              onClick={() => navigate("/teacher/assignment")}
              className="mt-4 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-400 transition"
            >
              Create Now
            </button>
          </div>

          {/* Card: Quizzes */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
              Quizzes
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Design quizzes to evaluate student performance.
            </p>
            <button className="mt-4 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-400 transition">
              Create Quiz
            </button>
          </div>

          {/* Card: AI Notes Maker */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
              AI Notes Maker
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Generate AI-powered notes for your lectures.
            </p>
            <button onClick={()=> navigate('/teacher/notesmaker')} className="mt-4 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-400 transition">
              Generate Notes
            </button>
          </div>

          {/* Card: Student Progress */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
              Student Progress
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Track and analyze student performance.
            </p>
            <button className="mt-4 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-400 transition">
              View Progress
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
              Subject
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Create and manage subjects for Institute.
            </p>
            <button onClick={()=>navigate('/subject')} className="mt-4 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-400 transition">
              Create Now
            </button>
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="mt-8 flex items-center justify-between space-x-8">
          {/* Calendar */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full flex gap-x-24">
            <Calendar
              className="rounded-lg shadow-md"
              tileClassName="text-lg"
            />

            <div className="flex flex-row items-center gap-x-20">
              <div className="text-4xl font-bold text-indigo-100">
                300+ <br /> Students
              </div>
              <div className="text-4xl font-bold text-indigo-100">
                20+ <br /> Classes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
