import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isStartSeen = sessionStorage.getItem("isStartSeen");
    if (!isStartSeen || isStartSeen == undefined) {
      navigate("/start");
    }
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow">
        <header className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
            Welcome to Eduverse Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Manage your role and explore features based on your profile.
          </p>
        </header>

        <main className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300 mb-4">
              Student
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Access your courses, track progress, and manage study plans.
            </p>
            <button
              className="bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-400 transition"
              onClick={() => navigate("/student/dashboard")}
            >
              Go to Student Dashboard
            </button>
          </div>

          {/* Teacher Section */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300 mb-4">
              Teacher
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Manage class resources, assignments, and student progress.
            </p>
            <button
              className="bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-400 transition"
              onClick={() => navigate("/teacher/dashboard")}
            >
              Go to Teacher Dashboard
            </button>
          </div>

          {/* Admin Section */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300 mb-4">
              Admin
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Oversee platform operations and manage user roles.
            </p>
            <button
              className="bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-400 transition"
              onClick={() => navigate("/admin/dashboard")}
            >
              Go to Admin Dashboard
            </button>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-100 dark:bg-gray-800">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          &copy; 2024 Eduverse. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
