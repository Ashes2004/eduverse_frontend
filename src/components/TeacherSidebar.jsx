import React, { useState } from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaClipboardList,
  FaTasks,
  FaUpload,
  FaBars,
  FaArrowRight,
} from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom';
const TeacherSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const toggleTeacherSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`bg-indigo-800 text-white ${isCollapsed ? "w-20" : "w-64"} max-h-screen flex flex-col transition-all duration-300`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-purple-600">
        <h1 onClick={()=>navigate('/')}
          className={`text-2xl font-bold transition-opacity duration-300 ${isCollapsed ? "opacity-0" : "opacity-100"}`}
        >
          Eduverse
        </h1>
        <button
          onClick={toggleTeacherSidebar}
          className="text-purple-300 hover:text-white focus:outline-none"
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Collapsed Expand Button */}
      {isCollapsed && (
        <button
          onClick={toggleTeacherSidebar}
          className="w-full py-2 text-center text-purple-300 hover:text-white transition-all bg-purple-600 rounded-md mt-4"
        >
          <FaArrowRight size={24} className="inline-block" />
        </button>
      )}

      {/* Sidebar Navigation */}
      <nav className="flex-1 mt-6">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center gap-4 px-4 py-3 hover:bg-purple-500 rounded-md transition-colors"
            >
              <FaBook size={20} />
              <span className={`${isCollapsed ? "hidden" : "block"}`}>Upload Materials</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-4 px-4 py-3 hover:bg-purple-500 rounded-md transition-colors"
            >
              <FaTasks size={20} />
              <span className={`${isCollapsed ? "hidden" : "block"}`}>Assign Tasks</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-4 px-4 py-3 hover:bg-purple-500 rounded-md transition-colors"
            >
              <FaClipboardList size={20} />
              <span className={`${isCollapsed ? "hidden" : "block"}`}>Create Quizzes</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-4 px-4 py-3 hover:bg-purple-500 rounded-md transition-colors"
            >
              <FaUpload size={20} />
              <span className={`${isCollapsed ? "hidden" : "block"}`}>Upload Results</span>
            </a>
          </li>
          <li>
            <Link
              to="/teacher/myclass"
              className="flex items-center gap-4 px-4 py-3 hover:bg-purple-500 rounded-md transition-colors"
            >
              <FaChalkboardTeacher size={20} />
              <span className={`${isCollapsed ? "hidden" : "block"}`}>My Classes</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <footer className="px-4 py-4 border-t border-purple-600">
        <p
          className={`text-sm text-purple-300 transition-opacity duration-300 ${
            isCollapsed ? "opacity-0" : "opacity-100"
          }`}
        >
          &copy; 2024 Eduverse
        </p>
      </footer>
    </div>
  );
};

export default TeacherSidebar;
