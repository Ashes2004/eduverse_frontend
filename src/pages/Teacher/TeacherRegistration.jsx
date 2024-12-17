// Import necessary packages and components
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import AdminSidebar from '../../components/AdminSidebar';

const TeacherRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    qualification: '',
    subjects: '',
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

    // Fetch Institute ID from session storage
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
        const response = await fetch('http://localhost:5000/api/teacher', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            profilePhoto: profilePhotoLink,
            password: formData.dateOfBirth,
            subjects: formData.subjects.split(',').map(subject => subject.trim()),
            instituteId,
          }),
        });

        if (response.ok) {
          Swal.fire('Success', 'Teacher registered successfully!', 'success');
          setFormData({
            name: '',
            email: '',
            dateOfBirth: '',
            qualification: '',
            subjects: '',
            profilePhoto: null,
            profilePhotoPreview: null,
          });
        } else {
          Swal.fire('Error', 'Failed to register teacher!', 'error');
        }
      } else {
        Swal.fire('Error', 'Failed to upload profile photo!', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong!', 'error');
      console.log(error);
      
    }
  };

  return (
    <div className="flex bg-gray-800">
      <AdminSidebar />
      <div className="w-full p-6 px-36 max-h-screen overflow-y-auto">
        <div className="border-4 p-24 rounded-md bg-slate-100">
          <h1 className="text-2xl font-bold mb-6">Teacher Registration</h1>
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
              <label className="block text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Qualification</label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Subjects (comma-separated)</label>
              <input
                type="text"
                name="subjects"
                value={formData.subjects}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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

export default TeacherRegistration;
