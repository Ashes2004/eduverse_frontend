import React, { useEffect, useState } from 'react';
import TeacherSidebar from '../../components/TeacherSidebar';

const MyClass = () => {
  const [teacher, setTeacher] = useState(null);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const teacherid = sessionStorage.getItem('teacherId');
        const teacherResponse = await fetch(`http://localhost:5000/api/teacher/${teacherid}`); 
        const teacherData = await teacherResponse.json();
        setTeacher(teacherData);
           console.log(teacherData);
           
        
        ;
        setClasses(teacherData.AssignedClasses);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  if (!teacher || classes.length === 0) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className='flex'>
        <TeacherSidebar/>
    
    <div className="w-full h-screen overflow-y-auto mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Classes</h1>
      <div className="space-y-4 grid grid-cols-4 ">
        {classes.map((classInfo, index) => (
          <div key={index} className="bg-white border border-t-4  border-indigo-700 rounded-lg  p-10 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">{classInfo.name}</h2>
            <h2 className="text-large font-semibold text-gray-800">{classInfo.classId}</h2>
            <p className="text-gray-600">Students: {classInfo?.students?.length}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default MyClass;
