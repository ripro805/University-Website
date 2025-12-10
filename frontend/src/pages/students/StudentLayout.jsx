import { NavLink, Outlet } from 'react-router-dom';
import { FaUser, FaFileAlt, FaBook, FaCalendarAlt, FaTable, FaChartBar, FaMoneyBillWave } from 'react-icons/fa';
import seedStudentData from './seedStudentData';
import Chatbot from '../../components/Chatbot';

export default function StudentLayout(){
  function handleSeedData(){
    const studentId = localStorage.getItem('student_id');
    const dept = localStorage.getItem('student_dept');
    if (!studentId || !dept) return alert('Student ID or department not found');
    const confirm = window.confirm('Seed dummy data? This will overwrite existing student data.');
    if (!confirm) return;
    const res = seedStudentData(studentId, dept, { force: true });
    alert(res.message || 'Seed complete');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Student Dashboard</h1>
        <button onClick={handleSeedData} className="px-3 py-1 hover:bg-blue-700 rounded">Seed Dummy Data</button>
      </div>

      <div className="flex">
        <aside className="w-64 bg-white p-4 border-r">
          <nav className="flex flex-col gap-2 text-sm">
            <NavLink to="/student/dashboard" className={({isActive}) => `flex items-center gap-3 p-3 rounded ${isActive? 'bg-blue-50 text-blue-700 font-semibold':'text-gray-700 hover:bg-gray-100'}`}>
              <FaUser /> <span>Overview</span>
            </NavLink>
            <NavLink to="/student/profile" className={({isActive}) => `flex items-center gap-3 p-3 rounded ${isActive? 'bg-blue-50 text-blue-700 font-semibold':'text-gray-700 hover:bg-gray-100'}`}>
              <FaUser /> <span>Profile</span>
            </NavLink>
            <NavLink to="/student/documents" className={({isActive}) => `flex items-center gap-3 p-3 rounded ${isActive? 'bg-blue-50 text-blue-700 font-semibold':'text-gray-700 hover:bg-gray-100'}`}>
              <FaFileAlt /> <span>Documents</span>
            </NavLink>
            <NavLink to="/student/courses" className={({isActive}) => `flex items-center gap-3 p-3 rounded ${isActive? 'bg-blue-50 text-blue-700 font-semibold':'text-gray-700 hover:bg-gray-100'}`}>
              <FaBook /> <span>Courses</span>
            </NavLink>
            <NavLink to="/student/routine" className={({isActive}) => `flex items-center gap-3 p-3 rounded ${isActive? 'bg-blue-50 text-blue-700 font-semibold':'text-gray-700 hover:bg-gray-100'}`}>
              <FaCalendarAlt /> <span>Class Routine</span>
            </NavLink>
            <NavLink to="/student/cgpa" className={({isActive}) => `flex items-center gap-3 p-3 rounded ${isActive? 'bg-blue-50 text-blue-700 font-semibold':'text-gray-700 hover:bg-gray-100'}`}>
              <FaChartBar /> <span>CGPA</span>
            </NavLink>
            <NavLink to="/student/payments" className={({isActive}) => `flex items-center gap-3 p-3 rounded ${isActive? 'bg-blue-50 text-blue-700 font-semibold':'text-gray-700 hover:bg-gray-100'}`}>
              <FaMoneyBillWave /> <span>Payments</span>
            </NavLink>
          </nav>
        </aside>

        <main className="flex-1 p-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <Chatbot />
    </div>
  );
}
