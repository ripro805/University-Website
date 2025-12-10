import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaBullhorn, FaSignInAlt, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import Chatbot from '../../components/Chatbot';

export default function SportsLayout(){
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('userRole') === 'sports-admin';

  function handleLogout(){
    localStorage.removeItem('userRole');
    localStorage.removeItem('sportsAdminEmail');
    navigate('/sports/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-700 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={()=>setOpen(!open)} className="p-2 hover:bg-indigo-600 rounded">{open? <FaTimes/> : <FaBars/>}</button>
          <h1 className="text-lg font-bold">University Sports</h1>
        </div>
        <div>
          {isAdmin ? (
            <button onClick={handleLogout} className="px-3 py-1 rounded hover:bg-indigo-600 flex items-center gap-2"><FaSignOutAlt/> Logout</button>
          ) : (
            <Link to="/sports/login" className="px-3 py-1 rounded hover:bg-indigo-600 flex items-center gap-2"><FaSignInAlt/> Admin Login</Link>
          )}
        </div>
      </div>

      <div className="flex">
        <aside className={`${open? 'w-64':'w-0'} bg-white shadow transition-all overflow-hidden`}>
          <nav className="p-4 flex flex-col gap-2">
            <Link to="/sports" className="p-3 hover:bg-indigo-50 rounded flex items-center gap-2"><FaCalendarAlt/> All Sports</Link>
            <Link to="/sports/schedule" className="p-3 hover:bg-indigo-50 rounded flex items-center gap-2">Schedule</Link>
            <Link to="/sports/notices" className="p-3 hover:bg-indigo-50 rounded flex items-center gap-2"><FaBullhorn/> Notices</Link>
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
