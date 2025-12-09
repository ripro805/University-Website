import { Link, Outlet } from 'react-router-dom';
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
        <aside className="w-64 bg-white p-4">
          <nav className="flex flex-col gap-2 text-sm">
            <Link to="/student/dashboard" className="hover:text-blue-700">Overview</Link>
            <Link to="/student/profile" className="hover:text-blue-700">Profile</Link>
            <Link to="/student/documents" className="hover:text-blue-700">Documents</Link>
            <Link to="/student/courses" className="hover:text-blue-700">Courses</Link>
            <Link to="/student/routine" className="hover:text-blue-700">Class Routine</Link>
            <Link to="/student/cgpa" className="hover:text-blue-700">CGPA</Link>
            <Link to="/student/payments" className="hover:text-blue-700">Payments</Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <Chatbot />
    </div>
  );
}
