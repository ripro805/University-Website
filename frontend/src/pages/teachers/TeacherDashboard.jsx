import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, BookOpen, Users, ClipboardList, FileText, Bell, BarChart3, LogOut } from "lucide-react";

export default function TeacherDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { id: "profile", label: "Profile", icon: User, path: "/teacher/profile" },
    { id: "courses", label: "Courses", icon: BookOpen, path: "/teacher/courses" },
    { id: "students", label: "Students", icon: Users, path: "/teacher/students" },
    { id: "attendance", label: "Attendance", icon: ClipboardList, path: "/teacher/attendance" },
    { id: "assignments", label: "Assignments", icon: FileText, path: "/teacher/assignments" },
    { id: "notices", label: "Notices", icon: Bell, path: "/teacher/notices" },
    { id: "reports", label: "Reports", icon: BarChart3, path: "/teacher/reports" }
  ];

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-blue-700 rounded"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-bold">Teacher Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:block">Welcome, Teacher</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-900 px-4 py-2 rounded transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex gap-6 p-6">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-0 left-0 h-screen lg:h-auto
            w-64 bg-white shadow-lg rounded-lg overflow-y-auto
            transition-transform duration-300 z-40
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
              Navigation
            </h2>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded transition-colors ${
                      isActive(item.path)
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          />
        )}

        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
