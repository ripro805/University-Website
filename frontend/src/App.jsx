import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Overview from "./pages/about/Overview.jsx";
import VisionMission from "./pages/about/VisionMission.jsx";
import Departments from "./pages/academics/Departments.jsx";
import DepartmentDashboard from "./pages/departments/DepartmentDashboard.jsx";

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
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
