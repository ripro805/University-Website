import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Overview from "./pages/about/Overview.jsx";
import VisionMission from "./pages/about/VisionMission.jsx";
import Departments from "./pages/academics/Departments.jsx";
import DepartmentDashboard from "./pages/departments/DepartmentDashboard.jsx";
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

import Home from "./pages/Home.jsx";
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
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}





