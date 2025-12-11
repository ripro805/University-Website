import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Overview from "./pages/about/Overview.jsx";
import VisionMission from "./pages/about/VisionMission.jsx";
import Departments from "./pages/academics/Departments.jsx";
import DepartmentDashboard from "./pages/departments/DepartmentDashboard.jsx";
import CentralLibrary from "./pages/academics/CentralLibrary.jsx";
import AllOffices from "./pages/offices/AllOffices.jsx";
import RegistrarOffice from "./pages/offices/RegistrarOffice.jsx";
import ControllerExaminations from "./pages/offices/ControllerExaminations.jsx";
import TreasurerOffice from "./pages/offices/TreasurerOffice.jsx";
import ProctorOffice from "./pages/offices/ProctorOffice.jsx";
import PublicRelationsOffice from "./pages/offices/PublicRelationsOffice.jsx";
import EstateOffice from "./pages/offices/EstateOffice.jsx";
import PlanningDevelopmentOffice from "./pages/offices/PlanningDevelopmentOffice.jsx";
import ViceChancellorOffice from "./pages/offices/ViceChancellorOffice.jsx";
import ProViceChancellorOffice from "./pages/offices/ProViceChancellorOffice.jsx";
import AdmissionOffice from "./pages/offices/AdmissionOffice.jsx";
import HallList from "./pages/hall/HallList.jsx";
import HallDetails from "./pages/hall/HallDetails.jsx";

// Hall Admin Imports
import AdminLayout from "./pages/hall-admin/AdminLayout.jsx";
import AdminHallList from "./pages/hall-admin/HallList.jsx";
import HallCreate from "./pages/hall-admin/HallCreate.jsx";
import HallEdit from "./pages/hall-admin/HallEdit.jsx";
import RoomManagement from "./pages/hall-admin/RoomManagement.jsx";
import SeatAllocation from "./pages/hall-admin/SeatAllocation.jsx";
import Applications from "./pages/hall-admin/Applications.jsx";
import Notices from "./pages/hall-admin/Notices.jsx";
import Complaints from "./pages/hall-admin/Complaints.jsx";
import Reports from "./pages/hall-admin/Reports.jsx";
// Teacher Module Imports
import TeacherDashboard from "./pages/teachers/TeacherDashboard.jsx";
import Profile from "./pages/teachers/Profile.jsx";
import Courses from "./pages/teachers/Courses.jsx";
import Students from "./pages/teachers/Students.jsx";
import Attendance from "./pages/teachers/Attendance.jsx";
import Assignments from "./pages/teachers/Assignments.jsx";
import TeacherNotices from "./pages/teachers/Notices.jsx";
import TeacherReports from "./pages/teachers/Reports.jsx";
// Public Library Pages
import { LibraryOverview, BookCatalog, DigitalResources, LibraryRules, LibraryNotices } from "./pages/library/index.js";

// Library Admin Imports
import { LibraryAdminLayout, AdminDashboard, ManageBooks, IssueReturnSystem, ManageUsers, NoticeManagement } from "./pages/library-admin/index.js";

// Office Admin Imports (department-scoped)
import OfficeAdminLayout from "./pages/offices/OfficeAdminLayout.jsx";
import OfficeStaffs from "./pages/offices/OfficeStaffs.jsx";
import OfficeEvents from "./pages/offices/OfficeEvents.jsx";
import ClassSchedule from "./pages/offices/OfficeClassSchedule.jsx";
import Exams from "./pages/offices/OfficeExams.jsx";
import Results from "./pages/offices/OfficeResults.jsx";

import Home from "./pages/Home.jsx";
import StudentLayout from "./pages/students/StudentLayout.jsx";
import StudentDashboard from "./pages/students/StudentDashboard.jsx";
import StudentProfile from "./pages/students/StudentProfile.jsx";
import StudentDocuments from "./pages/students/StudentDocuments.jsx";
import StudentCourses from "./pages/students/StudentCourses.jsx";
import StudentRoutine from "./pages/students/StudentRoutine.jsx";
import StudentCGPA from "./pages/students/StudentCGPA.jsx";
import StudentPayments from "./pages/students/StudentPayments.jsx";

// Transport Imports
import TransportLayout from "./pages/transport/TransportLayout.jsx";
import BusRoutes from "./pages/transport/BusRoutes.jsx";
import BusSchedule from "./pages/transport/BusSchedule.jsx";
import TransportNotices from "./pages/transport/TransportNotices.jsx";
import TransportLogin from "./pages/transport/TransportLogin.jsx";

// Sports Imports
import SportsLayout from "./pages/sports/SportsLayout.jsx";
import SportsSchedule from "./pages/sports/SportsSchedule.jsx";
import SportsNotices from "./pages/sports/SportsNotices.jsx";
import SportsLogin from "./pages/sports/SportsLogin.jsx";

// Campus Imports
import Gallery from "./pages/campus/Gallery.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Academics */}
        <Route path="/academics/central-library" element={<CentralLibrary />} />
        <Route path="/about/overview" element={<Overview />} />
        <Route path="/about/vision-and-mission" element={<VisionMission/>}/>
        <Route path="/academics/departments" element={<Departments/>}/>
        <Route path="/departments/:slug" element={<DepartmentDashboard />} />
        
        {/* Office Routes */}
        <Route path="/offices/all-other-offices" element={<AllOffices />} />
        <Route path="/offices/registrar-office" element={<RegistrarOffice />} />
        <Route path="/offices/controller-of-examinations" element={<ControllerExaminations />} />
        <Route path="/offices/treasurer-office" element={<TreasurerOffice />} />
        <Route path="/offices/proctor-office" element={<ProctorOffice />} />
        <Route path="/offices/public-relations-office" element={<PublicRelationsOffice />} />
        <Route path="/offices/estate-office" element={<EstateOffice />} />
        <Route path="/offices/planning-and-development-office" element={<PlanningDevelopmentOffice />} />
        <Route path="/offices/office-of-the-vice-chancellor" element={<ViceChancellorOffice />} />
        <Route path="/offices/office-of-the-pro-vice-chancellor" element={<ProViceChancellorOffice />} />
        <Route path="/offices/admission-office" element={<AdmissionOffice />} />
        
        {/* Public Library Routes */}
        <Route path="/library" element={<LibraryOverview />} />
        <Route path="/library/catalog" element={<BookCatalog />} />
        <Route path="/library/digital-resources" element={<DigitalResources />} />
        <Route path="/library/rules" element={<LibraryRules />} />
        <Route path="/library/notices" element={<LibraryNotices />} />

        {/* Library Admin Routes - Protected */}
        <Route 
          path="/library-admin" 
          element={
            <ProtectedRoute allowedRole="library">
              <LibraryAdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="books" element={<ManageBooks />} />
          <Route path="issue-return" element={<IssueReturnSystem />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="notices" element={<NoticeManagement />} />
        </Route>

        {/* Hall Routes */}
        <Route path="/hall" element={<HallList />} />
        <Route path="/hall/:slug" element={<HallDetails />} />

        {/* Campus Routes */}
        <Route path="/campus/gallery" element={<Gallery />} />

        {/* Hall Admin Routes - Protected */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRole="hall-admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="halls" element={<AdminHallList />} />
          <Route path="halls/create" element={<HallCreate />} />
          <Route path="halls/edit/:id" element={<HallEdit />} />
          <Route path="rooms" element={<RoomManagement />} />
          <Route path="seat-allocation" element={<SeatAllocation />} />
          <Route path="applications" element={<Applications />} />
          <Route path="notices" element={<Notices />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Teacher Routes - Protected */}
        <Route 
          path="/teacher" 
          element={
            <ProtectedRoute allowedRole="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="courses" element={<Courses />} />
          <Route path="students" element={<Students />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="notices" element={<TeacherNotices />} />
          <Route path="reports" element={<TeacherReports />} />
        </Route>

        {/* Office Admin Routes - Protected */}
        <Route
          path="/office/:dept"
          element={
            <ProtectedRoute allowedRole="employee">
              <OfficeAdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="staffs" element={<OfficeStaffs />} />
          <Route path="events" element={<OfficeEvents />} />
          <Route path="class-schedule" element={<ClassSchedule />} />
          <Route path="classes" element={<Navigate to="class-schedule" replace />} />
          <Route path="exams" element={<Exams />} />
          <Route path="results" element={<Results />} />
        </Route>

        {/* Student Routes - Protected */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="documents" element={<StudentDocuments />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="routine" element={<StudentRoutine />} />
          <Route path="cgpa" element={<StudentCGPA />} />
          <Route path="payments" element={<StudentPayments />} />
          <Route index element={<StudentDashboard />} />
        </Route>

        {/* Transport Routes */}
        <Route path="/transport" element={<TransportLayout />}>
          <Route index element={<BusRoutes />} />
          <Route path="schedule" element={<BusSchedule />} />
          <Route path="notices" element={<TransportNotices />} />
          <Route path="login" element={<TransportLogin />} />
        </Route>

        {/* Sports Routes */}
        <Route path="/sports" element={<SportsLayout />}>
          <Route index element={<SportsSchedule />} />
          <Route path="schedule" element={<SportsSchedule />} />
          <Route path="notices" element={<SportsNotices />} />
          <Route path="login" element={<SportsLogin />} />
        </Route>
      </Routes>
      

      <Footer />
    </BrowserRouter>
  );
}
