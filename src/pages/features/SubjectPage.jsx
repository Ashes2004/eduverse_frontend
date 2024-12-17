import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const SubjectPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState({ name: '', code: '' });
  const [editing, setEditing] = useState(false);
  const [currentSubjectId, setCurrentSubjectId] = useState(null);
  const InstituteId = sessionStorage.getItem('InstitutionId');

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/subject');
      const data = await response.json();
      setSubjects(data.subjects);
    } catch (error) {
      console.error('Error fetching subjects', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubject({ ...subject, [name]: value });
  };

  const handleCreate = async () => {
    if (!InstituteId) {
      alert('Institute ID is missing. Please log in again.');
      return;
    }

    try {
      const newSubject = { ...subject, InstituteId }; // Include InstituteId
      const response = await fetch('http://localhost:5000/api/subject/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSubject),
      });
      if (response.ok) {
        fetchSubjects();
        setSubject({ name: '', code: '' }); // Clear form fields
      } else {
        console.error('Error creating subject');
      }
    } catch (error) {
      console.error('Error creating subject', error);
    }
  };

  const handleUpdate = async () => {
    if (!InstituteId) {
      alert('Institute ID is missing. Please log in again.');
      return;
    }

    try {
      const updatedSubject = { ...subject, InstituteId }; // Include InstituteId
      const response = await fetch(`http://localhost:5000/api/subject/update/${currentSubjectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSubject),
      });
      if (response.ok) {
        fetchSubjects(); // Refresh subjects list
        setEditing(false); // Exit editing mode
        setSubject({ name: '', code: '' }); // Clear form fields
        setCurrentSubjectId(null); // Reset currentSubjectId
      } else {
        console.error('Error updating subject');
      }
    } catch (error) {
      console.error('Error updating subject', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/subject/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchSubjects();
      } else {
        console.error('Error deleting subject');
      }
    } catch (error) {
      console.error('Error deleting subject', error);
    }
  };

  const startEditing = (subjectToEdit) => {
    setEditing(true);
    setSubject({ name: subjectToEdit.name, code: subjectToEdit.code });
    setCurrentSubjectId(subjectToEdit._id);
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="container mx-auto p-5 max-h-screen overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center">Subjects</h1>
        </div>

        <div className="max-w-md mx-auto bg-white p-5 rounded-lg shadow-lg">
          <input
            type="text"
            name="name"
            placeholder="Subject Name"
            value={subject.name}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="code"
            placeholder="Subject Code"
            value={subject.code}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded"
          />
          {editing ? (
            <button
              onClick={handleUpdate}
              className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Update Subject
            </button>
          ) : (
            <button
              onClick={handleCreate}
              className="w-full p-3 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Create Subject
            </button>
          )}
        </div>

        <div className="mt-10">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 pr-12 border-b">Name</th>
                <th className="px-4 py-2 pr-12 border-b">Code</th>
                <th className="px-4 py-2 pr-12 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject._id}>
                  <td className="px-4 py-2 pl-36 border-b">{subject.name}</td>
                  <td className="px-4 py-2 pl-36 border-b">{subject.code}</td>
                  <td className="px-4 py-2 pl-36 border-b">
                    <button
                      onClick={() => startEditing(subject)}
                      className="text-yellow-500 hover:text-yellow-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(subject._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
