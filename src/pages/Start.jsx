import React from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();
  sessionStorage.setItem("isStartSeen", true);

  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen font-sans">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-8 py-20 text-center">
          <h1 className="text-5xl font-bold leading-tight">
            Revolutionize Your Learning with AI
          </h1>
          <p className="text-lg mt-4 text-gray-400">
            An intelligent platform to aggregate learning resources, create personalized study plans, and streamline workflows.
          </p>
          <div className="mt-8">
            <button
              className="bg-indigo-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-indigo-500"
              onClick={() => navigate("/")}
            >
              Get Started for Free
            </button>
            <button className="ml-4 px-8 py-3 border border-white text-white rounded-full font-medium hover:bg-gray-700 hover:text-white transition">
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* How It Works Section */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-100 mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800 shadow-lg rounded-lg">
              <div className="text-indigo-400 text-4xl mb-4">
                <i className="fas fa-book-open"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                1. Aggregate Resources
              </h3>
              <p className="text-gray-400">
                Our platform unifies content from diverse sources into a centralized, searchable hub.
              </p>
            </div>
            <div className="p-6 bg-gray-800 shadow-lg rounded-lg">
              <div className="text-indigo-400 text-4xl mb-4">
                <i className="fas fa-user-cog"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                2. Personalize Plans
              </h3>
              <p className="text-gray-400">
                AI algorithms craft study schedules tailored to individual learning styles and goals.
              </p>
            </div>
            <div className="p-6 bg-gray-800 shadow-lg rounded-lg">
              <div className="text-indigo-400 text-4xl mb-4">
                <i className="fas fa-tools"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                3. Simplify Administration
              </h3>
              <p className="text-gray-400">
                Manage resources, assignments, and workflows with ease for educators and institutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-800 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Our Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-indigo-400">
                AI Recommendations
              </h3>
              <p className="text-gray-400 mt-2">
                Let AI suggest the best resources based on your performance and preferences.
              </p>
            </div>
            <div className="bg-gray-700 shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-indigo-400">
                Interactive Dashboards
              </h3>
              <p className="text-gray-400 mt-2">
                Visualize your progress and learning patterns with detailed analytics.
              </p>
            </div>
            <div className="bg-gray-700 shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-indigo-400">
                Seamless Collaboration
              </h3>
              <p className="text-gray-400 mt-2">
                Work with peers and educators on projects, assignments, and discussions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            What People Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 shadow-lg rounded-lg p-6">
              <p className="text-gray-400 italic">
                "This platform transformed my learning experience. I feel more
                organized and motivated."
              </p>
              <p className="mt-4 font-semibold text-white">- Sarah T., Student</p>
            </div>
            <div className="bg-gray-800 shadow-lg rounded-lg p-6">
              <p className="text-gray-400 italic">
                "Managing class resources has never been this easy. It's a game-changer for educators."
              </p>
              <p className="mt-4 font-semibold text-white">- John M., Educator</p>
            </div>
            <div className="bg-gray-800 shadow-lg rounded-lg p-6">
              <p className="text-gray-400 italic">
                "The personalized study plans helped me achieve my goals faster
                than ever."
              </p>
              <p className="mt-4 font-semibold text-white">- Alex P., Learner</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-8 bg-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-indigo-400">Basic</h3>
              <p className="text-gray-400 mt-4">Free forever</p>
              <ul className="text-gray-400 mt-4 space-y-2">
                <li>Access to free content</li>
                <li>Basic analytics</li>
              </ul>
              <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
                Get Started
              </button>
            </div>
            <div className="bg-gray-700 shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-indigo-400">Pro</h3>
              <p className="text-gray-400 mt-4">$9.99/month</p>
              <ul className="text-gray-400 mt-4 space-y-2">
                <li>Personalized plans</li>
                <li>Advanced analytics</li>
                <li>Collaborative tools</li>
              </ul>
              <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
                Upgrade
              </button>
            </div>
            <div className="bg-gray-700 shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-indigo-400">Enterprise</h3>
              <p className="text-gray-400 mt-4">Contact Us</p>
              <ul className="text-gray-400 mt-4 space-y-2">
                <li>Custom solutions</li>
                <li>Dedicated support</li>
                <li>Admin tools</li>
              </ul>
              <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-500 py-6 text-center">
        <p className="text-sm">
          &copy; 2024 AI-Driven Smart Learning Ecosystem. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Start;
