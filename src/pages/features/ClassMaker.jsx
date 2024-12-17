import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const ClassMaker = () => {
    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [newClass, setNewClass] = useState({ name: '', classId: '', teachers: [], subjects: [], instituteId: '' });
    const [isCreating, setIsCreating] = useState(false);

    const API_BASE_URL = 'http://localhost:5000/api';
    const instituteId = sessionStorage.getItem('InstitutionId');

    // Fetch existing classes
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/class/institute/${instituteId}`);
                const data = await response.json();
                setClasses(data.classes || []);
            } catch (err) {
                console.error('Error fetching classes:', err);
            }
        };

        const fetchTeachers = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/teacher`);
                const data = await response.json();
                setTeachers(data || []);
            } catch (err) {
                console.error('Error fetching teachers:', err);
            }
        };

        const fetchSubjects = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/subject`);
                const data = await response.json();
                setSubjects(data.subjects || []);
            } catch (err) {
                console.error('Error fetching subjects:', err);
            }
        };

        fetchClasses();
        fetchTeachers();
        fetchSubjects();
    }, [instituteId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClass({ ...newClass, [name]: value });
    };

    const handleSelectionChange = (e, field) => {
        const options = Array.from(e.target.selectedOptions).map(option => option.value);
        setNewClass({ ...newClass, [field]: options });
    };

    const handleCreateClass = async () => {
        const newClassWithInstituteId = { ...newClass, instituteId }; // Add instituteId to the new class

        try {
            const response = await fetch(`${API_BASE_URL}/class/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newClassWithInstituteId),
            });
            const data = await response.json();
            setClasses([...classes, data]);
            setNewClass({ name: '', classId: '', teachers: [], subjects: [], instituteId: '' });
            setIsCreating(false);


        } catch (err) {
            console.error('Error creating class:', err);
        }
    };

    const handleDeleteClass = async (id) => {
        try {
            await fetch(`${API_BASE_URL}/class/delete/${id}`, { method: 'DELETE' });
            setClasses(classes.filter((cls) => cls._id !== id));
        } catch (err) {
            console.error('Error deleting class:', err);
        }
    };

    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <div className="p-4 w-full">
                <h1 className="text-2xl font-bold mb-4">Class Manager</h1>

                {isCreating ? (
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Create New Class</h2>

                        <input
                            type="text"
                            name="classId"
                            placeholder="Class ID"
                            value={newClass.classId}
                            onChange={handleInputChange}
                            className="block w-full mb-2 p-2 border border-gray-300 rounded"
                        />

                        <input
                            type="text"
                            name="name"
                            placeholder="Class Name"
                            value={newClass.name}
                            onChange={handleInputChange}
                            className="block w-full mb-2 p-2 border border-gray-300 rounded"
                        />

                        <label className="block mb-1">Assign Teachers:</label>
                        <select
                            multiple
                            onChange={(e) => handleSelectionChange(e, 'teachers')}
                            className="block w-full mb-2 p-2 border border-gray-300 rounded"
                        >
                            {teachers.map((teacher) => (
                                <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                            ))}
                        </select>

                        <label className="block mb-1">Assign Subjects:</label>
                        <select
                            multiple
                            onChange={(e) => handleSelectionChange(e, 'subjects')}
                            className="block w-full mb-2 p-2 border border-gray-300 rounded"
                        >
                            {subjects.map((subject) => (
                                <option key={subject._id} value={subject._id}>{subject.name}</option>
                            ))}
                        </select>

                        <button
                            onClick={handleCreateClass}
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Create
                        </button>
                        <button
                            onClick={() => setIsCreating(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsCreating(true)}
                        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                    >
                        Create New Class
                    </button>
                )}

                <h2 className="text-xl font-semibold mb-2">Existing Classes</h2>
                <ul className="space-y-2">
                    {classes.length > 0 ? (
                        classes.map((cls) => (
                            <li key={cls._id} className="p-4 border border-gray-300 rounded flex justify-between">
                                <span>{cls.name}</span>
                                <span>{cls.classId}</span>
                                
                                <button
                                    onClick={() => handleDeleteClass(cls._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>
                            </li>
                        ))
                    ) : (
                        <p>No classes found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ClassMaker;
