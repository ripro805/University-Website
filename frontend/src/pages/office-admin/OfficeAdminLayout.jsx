import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaClipboardList, FaExclamationCircle, FaFileAlt, FaBars, FaTimes, FaHome, FaSignOutAlt } from 'react-icons/fa';

const OfficeAdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const office = localStorage.getItem('office_name') || 'Office';

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('office_name');
    navigate('/login');
  };

  const menuItems = [
    { path: '/office-admin/staffs', label: 'Office Staffs', icon: FaUsers },
    { path: '/office-admin/events', label: 'Events', icon: FaCalendarAlt },
    { path: '/office-admin/class-schedule', label: 'Class Schedule', icon: FaClipboardList },
    { path: '/office-admin/exams', label: 'Exams', icon: FaExclamationCircle },
    { path: '/office-admin/results', label: 'Results', icon: FaFileAlt },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-purple-700 text-white py-4 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white hover:bg-purple-600 p-2 rounded"
          >
            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <h1 className="text-xl font-bold">{office} Dashboard</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2 hover:bg-purple-600 px-3 py-2 rounded">
            <FaHome />
            <span>Home</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 hover:bg-purple-600 px-3 py-2 rounded"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex">
        <aside
          className={`${
            isSidebarOpen ? 'w-64' : 'w-0'
          } bg-white shadow-lg transition-all duration-300 overflow-hidden`}
        >
          <nav className="py-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-6 py-3 hover:bg-purple-50 transition ${
                    isActive ? 'bg-purple-100 border-r-4 border-purple-700 text-purple-700' : 'text-gray-700'
                  }`}
                >
                  <Icon className={isActive ? 'text-purple-700' : 'text-gray-500'} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OfficeAdminLayout;
