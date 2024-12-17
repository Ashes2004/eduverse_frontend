import React, { useState } from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaClipboardList, FaBox, FaBars, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate(); 
  const toggleAdminSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`bg-indigo-800 text-white ${isCollapsed ? "w-20" : "w-64"} max-h-screen flex flex-col transition-all duration-300`}
    >
      {/* AdminSidebar Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-indigo-600">
        <h1 onClick={()=>navigate('/')} className={`text-2xl font-bold transition-opacity duration-300 ${isCollapsed ? "opacity-0" : "opacity-100"}`}>
          Eduverse
        </h1>
        <button
          onClick={toggleAdminSidebar}
          className="text-indigo-300 hover:text-white focus:outline-none"
        >
          <FaBars size={24} />
        </button>
        
      </div>

      {/* AdminSidebar Navigation */}
      {isCollapsed && (
        <button
          onClick={toggleAdminSidebar}
          className="w-full py-2 text-center text-indigo-300 hover:text-white transition-all bg-indigo-600 rounded-md mt-4"
        >
          <FaArrowRight size={24} className="inline-block mr-2" />
         
        </button>
      )}
      <nav className="flex-1 mt-6">
      
        <ul className="space-y-2">
          <li>
            <Link
              to="/student/registration"
              className="flex items-center gap-4 px-4 py-3 hover:bg-indigo-500 rounded-md transition-colors"
            >
              <FaUserGraduate size={20} />
              <span className={`${isCollapsed ? "hidden" : "block"}`}>Register Students</span>
            </Link>
          </li>
          <li>
            <Link
              to="/teacher/registration"
              className="flex items-center gap-4 px-4 py-3 hover:bg-indigo-500 rounded-md transition-colors"
            >
              <FaChalkboardTeacher size={20} />
              <span className={`${isCollapsed ? "hidden" : "block"}`}>Register Teachers</span>
            </Link>
          </li>
          <li>
            <Link
              to="/classmaker"
              className="flex items-center gap-4 px-4 py-3 hover:bg-indigo-500 rounded-md transition-colors"
            >
              <FaClipboardList size={20} />
              <span className={`${isCollapsed ? "hidden" : "block"}`}>Create Classes</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/inventory"
              className="flex items-center gap-4 px-4 py-3 hover:bg-indigo-500 rounded-md transition-colors"
            >
              <FaBox size={20} />
              <span className={`${isCollapsed ? "hidden" : "block"}`}>Inventory Management</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/student-enrollment"
              className="flex items-center gap-4 px-4 py-3 hover:bg-indigo-500 rounded-md transition-colors"
            >
              <FaBook size={20} />
              <span className={`${isCollapsed ? "hidden" : "block"}`}>Enroll Students</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* "Back from Collapse" Button */}
      

      {/* AdminSidebar Footer */}
      <footer className="px-4 py-4 border-t border-indigo-600">
        <p
          className={`text-sm text-indigo-300 transition-opacity duration-300 ${
            isCollapsed ? "opacity-0" : "opacity-100"
          }`}
        >
          &copy; 2024 Eduverse
        </p>
      </footer>
    </div>
  );
};

export default AdminSidebar;
