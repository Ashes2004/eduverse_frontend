// Import necessary packages and components
import React, { useState } from 'react';

import Swal from 'sweetalert2';
import AdminSidebar from '../../components/AdminSidebar';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    
    parentName: '',
    parentContact: '',
    dateOfBirth: '',
    profilePhoto: null,
    profilePhotoPreview: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ 
      ...formData, 
      profilePhoto: file, 
      profilePhotoPreview: URL.createObjectURL(file),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const instituteId = sessionStorage.getItem('InstitutionId');
    if (!instituteId) {
      Swal.fire('Error', 'Institute ID not found in session storage!', 'error');
      return;
    }

    // Upload the profile photo to Cloudinary
    if (!formData.profilePhoto) {
      Swal.fire('Error', 'Please upload a profile photo!', 'error');
      return;
    }

    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/djceunmkp/image/upload';
    const cloudinaryPreset = 'profilePhotos';

    const formDataForCloudinary = new FormData();
    formDataForCloudinary.append('file', formData.profilePhoto);
    formDataForCloudinary.append('upload_preset', cloudinaryPreset);

    try {
      const cloudinaryResponse = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formDataForCloudinary,
      });
      const cloudinaryData = await cloudinaryResponse.json();

      if (cloudinaryResponse.ok) {
        const profilePhotoLink = cloudinaryData.secure_url;

        // Submit the form data to your API
        const response = await fetch('http://localhost:5000/api/student', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            profilePhoto: profilePhotoLink,
            instituteId,
          }),
        });

        if (response.ok) {
          Swal.fire('Success', 'Student registered successfully!', 'success');
          setFormData({
            name: '',
            email: '',
            parentName: '',
            parentContact: '',
            dateOfBirth: '',
            profilePhoto: null,
            profilePhotoPreview: null,
          });
        } else {
          Swal.fire('Error', 'Failed to register student!', 'error');
        }
      } else {
        Swal.fire('Error', 'Failed to upload profile photo!', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong!', 'error');
    }
  };

  return (
    <div className="flex bg-gray-800">
      <AdminSidebar/>
      <div className="w-full  p-6 px-36 max-h-screen overflow-y-auto   ">
        <div className='border-4 p-24 rounded-md bg-slate-100'>
        <h1 className="text-2xl font-bold mb-6">Student Registration</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        
          <div>
            <label className="block text-sm font-medium">Parent Name</label>
            <input
              type="text"
              name="parentName"
              value={formData.parentName}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Parent Contact</label>
            <input
              type="text"
              name="parentContact"
              value={formData.parentContact}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth }
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Profile Photo</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full"
              accept="image/*"
              required
            />
            {formData.profilePhotoPreview && (
              <img
                src={formData.profilePhotoPreview}
                alt="Profile Preview"
                className="mt-4 w-32 h-32 object-cover rounded-full"
              />
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default StudentRegistration;
