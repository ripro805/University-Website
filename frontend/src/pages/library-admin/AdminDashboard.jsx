import { Link } from "react-router-dom";
import { getDashboardStats } from "./libraryAdminData";

export default function AdminDashboard() {
  const stats = getDashboardStats();

  const statCards = [
    { label: "Total Books", value: stats.totalBooks, color: "blue", icon: "📚" },
    { label: "Available Books", value: stats.availableBooks, color: "green", icon: "✅" },
    { label: "Issued Books", value: stats.issuedBooks, color: "yellow", icon: "📤" },
    { label: "Overdue Books", value: stats.overdueBooks, color: "red", icon: "⚠️" },
    { label: "Total Fines", value: `৳${stats.totalFines}`, color: "purple", icon: "💰" },
    { label: "Total Users", value: stats.totalUsers, color: "indigo", icon: "👥" },
    { label: "Blocked Users", value: stats.blockedUsers, color: "gray", icon: "🚫" }
  ];

  const quickActions = [
    { title: "Manage Books", description: "Add, update, or remove books", link: "/library-admin/books", icon: "📖" },
    { title: "Issue/Return Books", description: "Issue books to students or process returns", link: "/library-admin/issue-return", icon: "🔄" },
    { title: "Manage Users", description: "View users, block/unblock, manage fines", link: "/library-admin/users", icon: "👤" },
    { title: "Manage Notices", description: "Create and manage library notices", link: "/library-admin/notices", icon: "📢" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">Library Admin Dashboard</h1>
          <p className="text-blue-100">Welcome to the Central Library Management System</p>
        </div>

        {/* Statistics Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Library Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow"
                style={{ borderLeftColor: getColorClass(stat.color) }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className="text-4xl">{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-5xl">{action.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{action.title}</h3>
                    <p className="text-gray-600">{action.description}</p>
                  </div>
                  <div className="text-blue-600 text-2xl">→</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getColorClass(color) {
  const colors = {
    blue: "#2563eb",
    green: "#16a34a",
    yellow: "#ca8a04",
    red: "#dc2626",
    purple: "#9333ea",
    indigo: "#4f46e5",
    gray: "#6b7280"
  };
  return colors[color] || colors.blue;
}
