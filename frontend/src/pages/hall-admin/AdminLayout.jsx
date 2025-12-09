import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaBuilding, 
  FaDoorOpen, 
  FaUserCheck, 
  FaFileAlt, 
  FaBullhorn, 
  FaExclamationCircle, 
  FaChartBar,
  FaBars,
  FaTimes,
  FaHome,
  FaSignOutAlt
} from 'react-icons/fa';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin/halls', label: 'Manage Halls', icon: FaBuilding },
    { path: '/admin/rooms', label: 'Room Management', icon: FaDoorOpen },
    { path: '/admin/seat-allocation', label: 'Seat Allocation', icon: FaUserCheck },
    { path: '/admin/applications', label: 'Applications', icon: FaFileAlt },
    { path: '/admin/notices', label: 'Notices', icon: FaBullhorn },
    { path: '/admin/complaints', label: 'Complaints', icon: FaExclamationCircle },
    { path: '/admin/reports', label: 'Reports', icon: FaChartBar },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header */}
      <div className="bg-blue-700 text-white py-4 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white hover:bg-blue-600 p-2 rounded"
          >
            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <h1 className="text-xl font-bold">Hall Admin Dashboard</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2 hover:bg-blue-600 px-3 py-2 rounded">
            <FaHome />
            <span>Home</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 hover:bg-blue-600 px-3 py-2 rounded"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? 'w-64' : 'w-0'
          } bg-white shadow-lg transition-all duration-300 overflow-hidden flex-shrink-0`}
        >
          <nav className="py-6 w-64">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-6 py-3 hover:bg-blue-50 transition ${
                    isActive ? 'bg-blue-100 border-r-4 border-blue-700 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <Icon className={isActive ? 'text-blue-700' : 'text-gray-500'} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 min-w-0 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;





