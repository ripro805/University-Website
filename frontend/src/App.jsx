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

import LibraryLayout from "./pages/library/LibraryLayout.jsx";
import LibraryHome from "./pages/library/LibraryHome.jsx";
import LibraryLogin from "./pages/library/auth/login.jsx";
import LibraryUserDashboard from "./pages/library/users/UserDashboard.jsx";
import BooksList from "./pages/library/books/bookslist.jsx";
import AddBook from "./pages/library/books/addbook.jsx";
import EditBook from "./pages/library/books/editBook.jsx";
import IssueBook from "./pages/library/transactions/issueBook.jsx";
import ReturnBook from "./pages/library/transactions/returnBook.jsx";
import IssuedBooksList from "./pages/library/transactions/issuedBooksList.jsx";
import ReservationList from "./pages/library/reservations/reservationList.jsx";
import AddFine from "./pages/library/fines/AddFine.jsx";
import FinesList from "./pages/library/fines/FinesList.jsx";
import PaymentHistory from "./pages/library/fines/PaymentHistory.jsx";
import UsersList from "./pages/library/users/usersList.jsx";
import AdminDashboard from "./pages/library/admin/adminDashboard.jsx";
import Roles from "./pages/library/admin/Roles.jsx";
import StaffManagement from "./pages/library/admin/StaffManagement.jsx";

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
// import About from "./pages/About";
// import Departments from "./pages/Departments";
// import Admission from "./pages/Admission";
// import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/contact" element={<Contact />} /> */}
                {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
        
        <Route path="/library" element={<LibraryLayout />}>
          <Route index element={<LibraryHome />} />
          <Route path="login" element={<LibraryLogin />} />
          <Route path="user/dashboard" element={<LibraryUserDashboard />} />
          <Route path="books" element={<BooksList />} />
          <Route path="books/add" element={<AddBook />} />
          <Route path="books/edit/:id" element={<EditBook />} />
          <Route path="books/manage" element={<BooksList />} />
          <Route path="transactions/issue" element={<IssueBook />} />
          <Route path="transactions/return" element={<ReturnBook />} />
          <Route path="transactions/issued-list" element={<IssuedBooksList />} />
          <Route path="reservations" element={<ReservationList />} />
          <Route path="fines" element={<FinesList />} />
          <Route path="fines/add" element={<AddFine />} />
          <Route path="fines/payment-history" element={<PaymentHistory />} />
          <Route path="users" element={<UsersList />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/roles" element={<Roles />} />
          <Route path="admin/staff" element={<StaffManagement />} />
        </Route>

        {/* Hall Route */}
        <Route path="/hall" element={<HallList />} />
        <Route path="/hall/:slug" element={<HallDetails />} />

       
        
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

        {/* Office Admin Routes - Protected and department-scoped */}
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
          {/* compatibility: old 'classes' path redirected to 'class-schedule' */}
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
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
