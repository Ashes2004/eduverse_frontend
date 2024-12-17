// Import necessary packages and components
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const AdminAuth = () => {
  const navigate = useNavigate();  
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    InstituteName: '',
    InstituteId: '',
    Address: '',
    Phone: '',
    Email: '',
    Password: '',
  });


  const InstitutionId = sessionStorage.getItem('InstitutionId');
  if(InstitutionId != undefined)
  {
    navigate('/admin/dashboard');
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignUp
      ? 'http://localhost:5000/api/admin/signup'
      : 'http://localhost:5000/api/admin/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire('Success', data.message, 'success');
        sessionStorage.setItem('InstitutionId' , data.admin._id);
        navigate('/admin/dashboard')
        if (!isSignUp) {
          // Handle successful sign-in (e.g., saving token to storage)
        }
      } else {
        Swal.fire('Error', data.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong!', 'error');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isSignUp ? 'Admin Sign Up' : 'Admin Sign In'}
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium">Institute Name</label>
              <input
                type="text"
                name="InstituteName"
                value={formData.InstituteName}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          )}
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium">Institute ID</label>
              <input
                type="text"
                name="InstituteId"
                value={formData.InstituteId}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          )}
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium">Address</label>
              <input
                type="text"
                name="Address"
                value={formData.Address}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          )}
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="text"
                name="Phone"
                value={formData.Phone}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-500 hover:underline"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AdminAuth;
