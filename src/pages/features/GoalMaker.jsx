import React, { useState, useEffect } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const GoalMaker = () => {
  const [data, setData] = useState(null); // State to store the fetched data
  const [error, setError] = useState(null); // State to store errors
  const [loading, setLoading] = useState(true); // State to indicate loading status
  const [loadingText, setLoadingText] = useState("Creating your goal...");
  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/goal/aigoal", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "Class: Information Technology 5th semester \nWeak Subjects: OS : - deadlock , Compiler Design:- parsing , Software Engineering : designing \nInstitute Rank: 15 out of 65",
          }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGoalData();
  }, []);

  const handleDownloadPDF = () => {
    const content = document.getElementById("goal-content");
  
    html2canvas(content).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
  
      const imgWidth = 190; // PDF width
      const pageHeight = 297; // A4 page height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Scaled height
      let heightLeft = imgHeight;
  
      let position = 0; // Initial position for the first page
  
      // Add the first page
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      // Add more pages if content is left
      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      pdf.save("personalized-study-plan.pdf");
    });
  };
  
  
  useEffect(() => {
    if (loading) {
      const texts = [
        "Creating your goal...",
        "Analyzing your performance...",
        "Preparing your study plan...",
      ];
      let index = 0;
      const interval = setInterval(() => {
        setLoadingText(texts[index]);
        index = (index + 1) % texts.length;
      }, 1500); // Change text every 1.5 seconds
      return () => clearInterval(interval);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="flex h-screen">
        <StudentSidebar />
        <div className="flex flex-1 justify-center items-center bg-gray-100">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-700 animate-pulse">
              {loadingText}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen">
        <StudentSidebar />
        <div className="flex flex-1 justify-center items-center bg-gray-100">
          <div className="text-center text-red-600">
            <p className="text-xl font-bold">Error:</p>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex">
      <StudentSidebar />
      <div className="p-6 bg-gray-100 h-screen overflow-y-auto w-full">
        <div id="goal-content" className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Your Personalized Study Plan
          </h1>

          {/* Priority Topics Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Priority Topics</h2>
            <div className="space-y-6">
              {Object.entries(data.priorityTopics).map(([subject, topics]) => (
                <div key={subject} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{subject}</h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    {topics.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Routine Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Routine</h2>
            <div className="space-y-4">
              {Object.entries(data.routine).map(([time, tasks]) => (
                <div key={time} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 capitalize">{time}</h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    {tasks.map((task, index) => (
                      <li key={index}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Study Strategies Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Study Strategies</h2>
            <div className="space-y-4">
              {Object.entries(data.studyStrategies).map(([subject, strategy]) => (
                <div key={subject} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{subject}</h3>
                  <p className="text-gray-600">{strategy}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Resources Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Resources</h2>
            <ul className="list-disc pl-5 text-gray-600">
              {data.resources.map((resource, index) => (
                <li key={index}>{resource}</li>
              ))}
            </ul>
          </section>

          {/* Health Tips Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Health Tips</h2>
            <ul className="list-disc pl-5 text-gray-600">
              {data.healthTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </section>

          {/* Motivation Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Motivational Message</h2>
            <p className="text-gray-600 text-lg italic">"{data.motivation}"</p>
          </section>
        </div>

        {/* Download PDF Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalMaker;
