import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaChalkboardTeacher, FaFileAlt, FaBars, FaTimes, FaHome, FaSignOutAlt } from 'react-icons/fa';
import seedOfficeData from './seedOfficeData';
import Chatbot from '../../components/Chatbot';

export default function OfficeAdminLayout(){
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { dept } = useParams();

  const menu = [
    { path: 'staffs', label: 'Office Staffs', icon: FaUsers },
    { path: 'events', label: 'Events', icon: FaCalendarAlt },
    { path: 'class-schedule', label: 'Class Schedule', icon: FaChalkboardTeacher },
    { path: 'exams', label: 'Exams', icon: FaFileAlt },
    { path: 'results', label: 'Results', icon: FaFileAlt }
  ];

  const handleLogout = ()=>{
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('employee_dept');
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={()=>setIsOpen(!isOpen)} className="p-2">{isOpen? <FaTimes/>:<FaBars/>}</button>
          <h1 className="text-lg font-bold">{(dept||'Office').toUpperCase()} Office Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
            <Link to="/" className="px-3 py-1 hover:bg-blue-700 rounded">Home</Link>
            <button
              onClick={() => {
                const confirmSeed = window.confirm('Seed dummy data for this department? This will overwrite existing data for the department. Continue?');
                if (!confirmSeed) return;
                const res = seedOfficeData(dept, { force: true });
                alert(res.message || 'Seed complete');
              }}
              className="px-3 py-1 hover:bg-blue-700 rounded"
            >
              Seed Dummy Data
            </button>
            <button onClick={handleLogout} className="px-3 py-1 hover:bg-blue-700 rounded">Logout</button>
        </div>
      </div>

      <div className="flex">
        <aside className={`${isOpen? 'w-64':'w-0'} bg-white transition-all overflow-hidden`}> 
          <nav className="p-4">
            {menu.map(m=>{
              const Icon = m.icon;
              const full = `/office/${dept}/${m.path}`;
              const active = location.pathname === full;
              return (
                <Link key={m.path} to={full} className={`flex items-center gap-3 p-2 rounded mb-1 hover:bg-gray-100 ${active? 'bg-gray-100 border-r-4 border-blue-700':''}`}>
                  <Icon /> <span>{m.label}</span>
                </Link>
              );
            })}
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
