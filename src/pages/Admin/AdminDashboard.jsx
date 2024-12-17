import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import Calendar from "react-calendar";  // Importing react-calendar
import 'react-calendar/dist/Calendar.css';  // Importing calendar styles
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const navigate = useNavigate();
  const InstitutionId = sessionStorage.getItem('InstitutionId');
  if(!InstitutionId || InstitutionId == undefined)
  {
    navigate('/admin/auth');
  }
  return (
    <div className="flex max-w">
        
      <AdminSidebar />
     

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-6 max-h-screen overflow-y-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
            Welcome, Admin
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage all operations efficiently from a single platform.
          </p>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card: Register Students */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
              Register Students
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Add new students to the system and manage their profiles.
            </p>
            <button onClick={()=>navigate('/student/registration')} className="mt-4 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-400 transition">
              Add Students
            </button>
          </div>

          {/* Card: Register Teachers */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
              Register Teachers
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Create teacher profiles and assign roles.
            </p>
            <button onClick={()=>navigate('/teacher/registration')} className="mt-4 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-400 transition">
              Add Teachers
            </button>
          </div>

          {/* Card: Create Classes */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
              Create Classes
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Organize students and teachers into classes.
            </p>
            <button onClick={()=>navigate('/classmaker')} className="mt-4 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-400 transition">
              Create Now
            </button>
          </div>

          {/* Card: Inventory Management */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
              Inventory Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Track and manage classroom resources and inventory.
            </p>
            <button onClick={()=>navigate('/admin/inventory')} className="mt-4 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-400 transition">
              Manage Inventory
            </button>
          </div>

          {/* Card: Enroll Students */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
              Enroll Students
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Assign students to specific classes for better management.
            </p>
            <button className="mt-4 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-400 transition">
              Enroll Now
            </button>
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="mt-8 flex items-center justify-between space-x-8">
          {/* Calendar */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full flex  gap-x-24">
            
            <Calendar className="rounded-lg shadow-md" tileClassName="text-lg" />\

            <div className="flex flex-row  items-center gap-x-20">
              <div className="text-4xl font-bold text-indigo-100">
                500+ <br/>  Students
              </div>
              <div className="text-4xl font-bold text-indigo-100">
                50+ <br/> Teachers
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
