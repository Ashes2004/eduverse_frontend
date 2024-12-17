import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Start from "./pages/Start";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import StudentDashboard from "./pages/Student/StudentDashboard";
import StudentLoginForm from "./pages/Student/StudentLoginForm";
import StudentRegistration from "./pages/Student/studentRegistration";
import AdminAuth from "./pages/Admin/AdminAuth";
import TeacherRegistration from "./pages/Teacher/TeacherRegistration";
import TeacherLoginForm from "./pages/Teacher/TeacherLoginForm";
import Edubot from "./pages/features/Edubot";
import StudentProfile from "./pages/Student/studentProfile";
import ClassMaker from "./pages/features/ClassMaker";
import SubjectPage from "./pages/features/SubjectPage";
import Quiz from "./pages/features/Quiz";
import StudentEnrollmentRequest from "./pages/Student/StudentEnrollmeentRequest";
import StudentEnrollment from "./pages/Student/StudentEnrollment";
import LeaderBoard from "./pages/features/LeaderBorad";
import GoalMaker from "./pages/features/GoalMaker";
import AssignmentDashboard from "./pages/Teacher/AssignmentDashboard";
import AssignmentGrading from "./pages/Teacher/AssignmentGrading";
import StudentAssignmentDashboard from "./pages/Student/StudentAssignmentDashboard";
import SubmitAssignment from "./pages/Student/SubmitAssignment";
import StudyHub from "./pages/features/StudyHub";
import Achievements from "./pages/Student/Achievements";
import PerformanceAnalysis from "./pages/Student/PerformanceAnalysis";
import InventoryManagement from "./pages/Admin/InventoryManagement";
import MyClass from "./pages/Teacher/MyClass";
import NotesMaker from "./pages/Teacher/AiNotesMaker";


const App = () => {
  return (
    <Router>
    
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start" element={<Start />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/auth" element={<StudentLoginForm />} />
            <Route path="/student/registration" element={<StudentRegistration />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/enrollement-request" element={<StudentEnrollmentRequest />} />
            <Route path="/student/leaderboard" element={<LeaderBoard />} />
            <Route path="/student/goalmaker" element={<GoalMaker />} />
            <Route path="/student/achievement" element={<Achievements />} />
            <Route path="/student/performance" element={<PerformanceAnalysis />} />
            <Route path="/student/assignment" element={<StudentAssignmentDashboard />} />
            <Route path="/student/submitassignment/:assignmentId" element={<SubmitAssignment />} />





            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/registration" element={<TeacherRegistration />} />
            <Route path="/teacher/auth" element={<TeacherLoginForm />} />
            <Route path="/teacher/myclass" element={<MyClass />} />
            <Route path="/teacher/assignment" element={<AssignmentDashboard />} />
            <Route path="/teacher/notesmaker" element={<NotesMaker />} />
            <Route path="/teacher/assignment/:assignmentId" element={<AssignmentGrading />} />








            <Route path="/admin/dashboard" element={<AdminDashboard />} /> 
            <Route path="/admin/auth" element={<AdminAuth />} /> 
            <Route path="/admin/student-enrollment" element={<StudentEnrollment />} />
            <Route path="/admin/inventory" element={<InventoryManagement />} />


            
           
            <Route path="/edubot" element={<Edubot />} />  
            <Route path="/classmaker" element={<ClassMaker />} />  
            <Route path="/subject" element={<SubjectPage />} />  
            <Route path="/quiz" element={<Quiz />} /> 
            <Route path="/studyhub" element={<StudyHub />} /> 
            
            
          </Routes>
       

      
    </Router>
  );
};

export default App;
