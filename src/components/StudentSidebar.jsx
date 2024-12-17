// Sidebar Component
import React from "react";
import { FaAssistiveListeningSystems, FaBook, FaCalendarCheck, FaChartBar, FaMedal, FaRegUserCircle, FaRobot, FaTasks, FaTrophy } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const StudentSidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-indigo-900 text-white w-64 max-h-screen flex flex-col">
      <div className="flex items-center justify-center py-4 border-b border-indigo-600">
        <h1 onClick={()=>navigate('/')} className="text-2xl font-bold">Eduverse</h1>
      </div>
      <nav className="flex-1 mt-6">
        <ul className="space-y-4 px-4">
          <li>
            <Link
             to ="/quiz"
              className="flex items-center gap-4 px-4 py-2 hover:bg-indigo-500 rounded-md transition-colors"
            >
              <FaTasks size={20} />
              <span>AI Quiz</span>
            </Link>
          </li>
          <li>
            <Link
             to ="/studyhub"
              className="flex items-center gap-4 px-4 py-2 hover:bg-indigo-500 rounded-md transition-colors"
            >
              <FaBook size={20} />
              <span>StudyHub</span>
            </Link>
          </li>
          <li>
            <Link
              to ="/student/leaderboard"
              className="flex items-center gap-4 px-4 py-2 hover:bg-indigo-500 rounded-md transition-colors"
            >
              <FaMedal size={20} />
              <span>Leaderboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/student/achievement"
              className="flex items-center gap-4 px-4 py-2 hover:bg-indigo-500 rounded-md transition-colors"
            >
              <FaTrophy size={20} />
              <span>Achievements</span>
            </Link>
          </li>
          <li>
            <Link
              to="/student/assignment"
              className="flex items-center gap-4 px-4 py-2 hover:bg-indigo-500 rounded-md transition-colors"
            >
              <FaCalendarCheck size={20} />
              <span>Assignments</span>
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-4 px-4 py-2 hover:bg-indigo-500 rounded-md transition-colors"
            >
              <FaAssistiveListeningSystems size={20} />
              <span>MCQ Test</span>
            </a>
          </li>
          <li>
            <Link
              to ="/edubot"
              className="flex items-center gap-4 px-4 py-2 hover:bg-indigo-500 rounded-md transition-colors"
            >
              <FaRobot size={20} />
              <span>Edubot</span>
            </Link>
          </li>
         
          <li>
            <Link
              to ="/student/performance"
              className="flex items-center gap-4 px-4 py-2 hover:bg-indigo-500 rounded-md transition-colors"
            >
              <FaChartBar size={20} />
              <span>Performance Analysis</span>
            </Link>
          </li>
          <li>
            <Link
              to ="/student/goalmaker"
              className="flex items-center gap-4 px-4 py-2 hover:bg-indigo-500 rounded-md transition-colors"
            >
              <GoGoal size={20} />
              <span>Goal Maker</span>
            </Link>
          </li>
          <li>
            <Link
              to ="/student/profile"
              className="flex items-center gap-4 px-4 py-2 hover:bg-indigo-500 rounded-md transition-colors"
            >
              <FaRegUserCircle size={20} />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
      <footer className="px-4 py-4 border-t border-indigo-600">
        <p className="text-sm text-indigo-300">&copy; 2024 Eduverse</p>
      </footer>
    </div>
  );
};

export default StudentSidebar;
