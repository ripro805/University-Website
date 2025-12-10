import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaBus, FaCalendarAlt, FaBullhorn, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import Chatbot from '../../components/Chatbot';

export default function TransportLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('userRole') === 'transport-admin';

  function handleLogout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('transportAdminEmail');
    navigate('/transport/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-700 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-orange-600 rounded">
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <h1 className="text-lg font-bold">University Transport System</h1>
        </div>
        {isAdmin && (
          <button onClick={handleLogout} className="px-3 py-1 hover:bg-orange-600 rounded flex items-center gap-2">
            <FaSignOutAlt /> Logout
          </button>
        )}
      </div>

      <div className="flex">
        <aside className={`${isOpen ? 'w-64' : 'w-0'} bg-white shadow-lg transition-all overflow-hidden`}>
          <nav className="p-4 flex flex-col gap-2">
            <Link to="/transport" className="flex items-center gap-2 p-3 hover:bg-orange-50 rounded">
              <FaBus /> Bus Routes
            </Link>
            <Link to="/transport/schedule" className="flex items-center gap-2 p-3 hover:bg-orange-50 rounded">
              <FaCalendarAlt /> Bus Schedule
            </Link>
            <Link to="/transport/notices" className="flex items-center gap-2 p-3 hover:bg-orange-50 rounded">
              <FaBullhorn /> Notices
            </Link>
            {!isAdmin && (
              <Link to="/transport/login" className="flex items-center gap-2 p-3 hover:bg-orange-50 rounded text-blue-600 font-medium">
                Admin Login
              </Link>
            )}
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
