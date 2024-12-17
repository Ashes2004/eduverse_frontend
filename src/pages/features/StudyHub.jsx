import React, { useState, useEffect } from 'react';
import StudentSidebar from '../../components/StudentSidebar';

const StudyHub = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Creating your goal...");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const message = {
          message: "class 10 , intermediate , weak subjects: math : algebra and physical science: heat"
        };

        const response = await fetch('http://localhost:5000/api/study/studyhub', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
        
        const result = await response.json();
        console.log(result);
        
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loading) {
      const texts = [
        "Creating Best Content for you...",
        "Analyzing your performance...",
        "Preparing your study contents...",
        "please wait a while....."
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

  if (!data) 
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center p-4">
          <p className="text-lg font-semibold mb-4">Oops! Something Went Wrong.</p>
          <p className="text-sm text-gray-600">We couldn't fetch the content at this time. Please try again later.</p>
        </div>
      </div>
    );

  return (
    <div className="flex h-screen">
      <StudentSidebar />

      <div className="w-full p-6 bg-gray-50 overflow-y-auto">
        <h1 className="text-4xl font-semibold text-gray-800 mb-8 text-center">Study Hub</h1>
        
        {/* Recommended Videos Row */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Recommended Videos</h2>
          <div className="flex overflow-x-auto gap-6">
            {data?.recommendedVideos?.length > 0 ? (
              data?.recommendedVideos?.map((video, index) => (
                <div key={index} className="bg-white p-6 rounded-xl   shadow-lg hover:shadow-xl transition-all w-80 border   border-t-4 border-blue-500">
                  <h3 className="text-xl font-medium text-gray-700 mb-3">{video.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{video.description}</p>
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                    Watch Video
                  </a>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No video recommendations available.</p>
            )}
          </div>
        </div>

        {/* Recommended Books Row */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Recommended Books</h2>
          <div className="flex overflow-x-auto gap-6">
            {data?.recommendedBooks?.length > 0 ? (
              data?.recommendedBooks?.map((book, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all w-80 border border-t-4 border-green-500">
                  <h3 className="text-xl font-medium text-gray-700 mb-3">{book.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{book.description}</p>
                  <a href={book.googleSearchUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                    Search for Book
                  </a>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No book recommendations available.</p>
            )}
          </div>
        </div>

        {/* Topic Explanation Row */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 ">Topic Explanation</h2>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-t-4 border-pink-500">
            <h3 className="text-2xl font-medium text-gray-700 mb-3">{data?.explanation?.topic}</h3>
            <p className="text-sm text-gray-500">{data?.explanation?.explanationText}</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>&copy; 2024 Your Learning Hub. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default StudyHub;
