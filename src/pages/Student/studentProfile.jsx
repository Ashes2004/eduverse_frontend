import React, { useEffect, useState } from 'react';
import StudentSidebar from '../../components/StudentSidebar';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const studentId = sessionStorage.getItem('studentId');
    if (studentId) {
      fetch(`http://localhost:5000/api/student/${studentId}`)
        .then((response) => response.json())
        .then((data) => {
          setStudent(data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to fetch data');
          setLoading(false);
        });
    } else {
      setError('No student ID found');
      setLoading(false);
    }
  }, []);

  const handlePasswordChange = () => {
    if (!newPassword) {
      alert('Please enter a new password');
      return;
    }

    const studentId = sessionStorage.getItem('studentId');
    fetch(`http://localhost:5000/api/student/${studentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Password updated successfully');
        setStudent((prevState) => ({
          ...prevState,
          password: newPassword,
        }));
        setNewPassword('');
      })
      .catch((err) => {
        alert('Failed to update password');
        console.log(err);
        
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <StudentSidebar/>

      {/* Profile Section */}
      <div className="flex-1 p-8 bg-white shadow-lg rounded-l-lg">
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold text-gray-800">Student Profile</h1>

          {/* Profile Info */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <img
                src={student.profilePhoto}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{student.name}</h2>
                <p className="text-gray-500">{student.email}</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <p className="font-medium text-gray-600">Date of Birth: {new Date(student.dateOfBirth).toLocaleDateString()}</p>
              <p className="font-medium text-gray-600">Parent Name: {student.parentName}</p>
              <p className="font-medium text-gray-600"> Class Name: {student?.classId?.name}</p>
              <p className="font-medium text-gray-600">Parent Contact: {student.parentContact}</p>
              <p className="font-medium text-gray-600">Points: {student.points}</p>
            </div>
          </div>

          {/* Password Update */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium text-gray-700">Update Password</h3>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-4 w-full p-3 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter new password"
            />
            <button
              onClick={handlePasswordChange}
              className="mt-4 w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
