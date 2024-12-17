import React from "react";
import { Line, Bar, Doughnut, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import StudentSidebar from "../../components/StudentSidebar";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const PerformanceAnalysis = () => {
  // Dummy data
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const lineChartData = {
    labels,
    datasets: [
      {
        label: "Quiz Scores",
        data: [85, 90, 78, 88, 92, 80],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.5)",
      },
    ],
  };

  const barChartData = {
    labels,
    datasets: [
      {
        label: "Assignments Completed",
        data: [4, 5, 3, 6, 7, 5],
        backgroundColor: "#10b981",
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Math", "Science", "English", "History"],
    datasets: [
      {
        label: "Subjects",
        data: [25, 30, 20, 25],
        backgroundColor: ["#f43f5e", "#3b82f6", "#f59e0b", "#10b981"],
      },
    ],
  };

  const radarChartData = {
    labels: ["Math", "Science", "English", "History", "Arts"],
    datasets: [
      {
        label: "Performance by Subject",
        data: [80, 85, 75, 70, 90],
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "#3b82f6",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="flex">
        <StudentSidebar/>
       
    <div className="h-screen w-full overflow-y-auto bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Performance Analysis Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Quiz Scores Over Time
          </h3>
          <Line data={lineChartData} />
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Assignments Completed
          </h3>
          <Bar data={barChartData} />
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Subject-wise Distribution
          </h3>
          <Doughnut data={doughnutChartData} />
        </div>

        {/* Radar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Performance by Subject
          </h3>
          <Radar data={radarChartData} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default PerformanceAnalysis;
