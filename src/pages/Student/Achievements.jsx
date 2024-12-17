import React, { useEffect, useState } from "react";
import StudentSidebar from "../../components/StudentSidebar";

const Achievements = () => {
  // Dummy data
  const [student , setStudent] = useState({});
  const achievements = [
    { date: "2024-12-01", coins: 50 },
    { date: "2024-12-02", coins: 30 },
    { date: "2024-12-03", coins: 20 },
    { date: "2024-12-04", coins: 40 },
    { date: "2024-12-05", coins: 25 },
    { date: "2024-12-06", coins: 35 },
    { date: "2024-12-07", coins: 15 },
    { date: "2024-12-08", coins: 45 },
    { date: "2024-12-09", coins: 10 },
    { date: "2024-12-10", coins: 60 },
    { date: "2024-12-11", coins: 50 },
    { date: "2024-12-12", coins: 30 },
  ];

  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentId = sessionStorage.getItem("studentId");
        const response = await fetch(
          `http://localhost:5000/api/student/${studentId}`
        );
        const data = await response.json();
        console.log(data);
        setStudent(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudents();
  }, []);

  const totalCoins = achievements.reduce(
    (acc, achievement) => acc + achievement.coins,
    0
  );
  const totalAssignmentsSubmitted = 12;
  const totalQuizzesTaken = 8;

  return (
    <div className="flex bg-gray-100">
      <StudentSidebar />

      <div className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow-2xl w-full h-screen overflow-y-auto p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Achievement Dashboard
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-yellow-100 text-yellow-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Total Points</h3>
              <p className="text-2xl font-bold mt-2">{student?.points}</p>
            </div>

            {/* Assignments Submitted */}
            <div className="bg-blue-100 text-blue-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Assignments Submitted</h3>
              <p className="text-2xl font-bold mt-2">
                {totalAssignmentsSubmitted}
              </p>
            </div>

            {/* Quizzes Taken */}
            <div className="bg-green-100 text-green-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Quizzes Given</h3>
              <p className="text-2xl font-bold mt-2">{student?.quizAttended?.length}</p>
            </div>
          </div>

          {/* Earned Coins List */}
          <div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              Earned Points
            </h3>
            <ul className="divide-y divide-gray-300">
              {student?.pointHistry?.length > 0 && student?.pointHistry?.map((point, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-3 px-4 bg-gray-100 rounded-lg shadow-sm mb-2"
                >
                  <span className="text-lg font-medium text-gray-600">
                    {point.date}
                  </span>
                  <span className="text-lg font-bold text-gray-800">
                    {" "}
                    💰 {point.points} Points
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
