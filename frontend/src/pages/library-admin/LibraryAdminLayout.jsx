import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function LibraryAdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const menuItems = [
    { path: "/library-admin", label: "Dashboard", icon: "📊" },
    { path: "/library-admin/books", label: "Manage Books", icon: "📚" },
    { path: "/library-admin/issue-return", label: "Issue & Return", icon: "🔄" },
    { path: "/library-admin/users", label: "Manage Users", icon: "👥" },
    { path: "/library-admin/notices", label: "Notices", icon: "📢" }
  ];

  const isActive = (path) => {
    if (path === "/library-admin") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white shadow-xl fixed h-full overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Library Admin</h1>
            <p className="text-blue-200 text-sm">GSTU Central Library</p>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(item.path)
                    ? "bg-white text-blue-800 shadow-md font-semibold"
                    : "text-blue-100 hover:bg-blue-700 hover:text-white"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="my-6 border-t border-blue-700"></div>

          {/* Quick Stats */}
          <div className="bg-blue-700 bg-opacity-50 rounded-lg p-4 mb-4">
            <p className="text-xs text-blue-200 mb-1">Logged in as</p>
            <p className="font-semibold text-sm">Library Manager</p>
            <p className="text-xs text-blue-200 mt-2">
              ID: {localStorage.getItem('userId') || 'N/A'}
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <Outlet />
      </main>
    </div>
  );
}
