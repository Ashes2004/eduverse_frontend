import React, { useState } from "react";
import StudentSidebar from "../../components/StudentSidebar";

const LeaderBoard = () => {
  const [isInstituteRank, setIsInstituteRank] = useState(true);

  const instituteRank = [
    { rank: 1, name: "Lee Chen", points: 120 },
    { rank: 2, name: "Roger Bin", points: 110 },
    { rank: 3, name: "Linda Chu", points: 100 },
    { rank: 4, name: "Carl Pei", points: 95 },
    { rank: 5, name: "Anna Mung", points: 80 },
    { rank: 6, name: "Lindsey", points: 75 },
  ];

  const classRank = [
    { rank: 1, name: "Lee Chen", points: 50 },
    { rank: 2, name: "Carl Pei", points: 45 },
    { rank: 3, name: "Linda Chu", points: 40 },
    { rank: 4, name: "Roger Bin", points: 35 },
    { rank: 5, name: "Anna Mung", points: 25 },
    { rank: 6, name: "Lindsey", points: 20 },
  ];

  const activeRank = isInstituteRank ? instituteRank : classRank;

  return (
    <div className="flex">
        <StudentSidebar/>
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-200 to-blue-300 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-4">
          Leader Board
        </h2>

        {/* Toggler */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded-l-lg ${
              isInstituteRank
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setIsInstituteRank(true)}
          >
            Institute Rank
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${
              !isInstituteRank
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setIsInstituteRank(false)}
          >
            Class Rank
          </button>
        </div>

        {/* Top 3 Podium */}
        <div className="flex justify-center h-64 items-end mb-10">
          {/* 2nd Place */}
          <div className="flex flex-col  items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold">
              <svg className="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-4.97 0-9 4.03-9 9h2c0-3.87 3.13-7 7-7s7 3.13 7 7h2c0-4.97-4.03-9-9-9z" />
              </svg>
            </div>
            <div className="bg-gray-300 w-24 h-24 text-center text-lg font-bold text-gray-700 p-2 rounded-t-lg">
              2
            </div>
            <div className="text-gray-700 font-medium">{activeRank[1].name}</div>
            <div className="text-yellow-500 font-semibold">⭐ {activeRank[1].points}</div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center text-3xl font-bold">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-4.97 0-9 4.03-9 9h2c0-3.87 3.13-7 7-7s7 3.13 7 7h2c0-4.97-4.03-9-9-9z" />
              </svg>
            </div>
            <div className="bg-yellow-400 w-28 h-36 text-center text-lg font-bold text-gray-700 p-2 rounded-t-lg">
              1
            </div>
            <div className="text-gray-700 font-medium">{activeRank[0].name}</div>
            <div className="text-yellow-500 font-semibold">⭐ {activeRank[0].points}</div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold">
              <svg className="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-4.97 0-9 4.03-9 9h2c0-3.87 3.13-7 7-7s7 3.13 7 7h2c0-4.97-4.03-9-9-9z" />
              </svg>
            </div>
            <div className="bg-orange-300 w-24 h-16 text-center text-lg font-bold text-gray-700 p-2 rounded-t-lg">
              3
            </div>
            <div className="text-gray-700 font-medium">{activeRank[2].name}</div>
            <div className="text-yellow-500 font-semibold">⭐ {activeRank[2].points}</div>
          </div>
        </div>

        {/* Rest of the Leaderboard */}
        <div>
          {activeRank.slice(3).map((student) => (
            <div
              key={student.rank}
              className="flex items-center justify-between bg-gray-100 p-3 mb-2 rounded-lg shadow-sm"
            >
              <span className="text-lg font-bold text-gray-700">{student.rank}</span>
              <span className="font-medium text-gray-700">{student.name}</span>
              <span className="text-yellow-500 font-semibold text-lg">
                ⭐ {student.points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default LeaderBoard;
