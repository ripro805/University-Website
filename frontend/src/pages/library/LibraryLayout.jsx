import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export default function LibraryLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-green-800 text-white transition-all duration-300 overflow-y-auto`}>
        <div className="p-4 flex items-center justify-between">
          <h2 className={`font-bold text-lg ${!sidebarOpen && 'hidden'}`}>Library</h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-green-700 rounded"
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>

        <nav className="space-y-2 p-4">
          {/* User Menu */}
          <div>
            <p className={`text-xs font-semibold text-green-200 mb-2 ${!sidebarOpen && 'hidden'}`}>USER</p>
            <Link
              to="/library/login"
              className={`block px-4 py-2 rounded transition ${
                isActive('/library/login') ? 'bg-green-700' : 'hover:bg-green-700'
              }`}
            >
              <span className={sidebarOpen ? '' : 'text-2xl'}>🔐</span>
              {sidebarOpen && <span className="ml-2">Login</span>}
            </Link>
            <Link
              to="/library/user/dashboard"
              className={`block px-4 py-2 rounded transition ${
                isActive('/library/user/dashboard') ? 'bg-green-700' : 'hover:bg-green-700'
              }`}
            >
              <span className={sidebarOpen ? '' : 'text-2xl'}>📚</span>
              {sidebarOpen && <span className="ml-2">My Dashboard</span>}
            </Link>
            <Link
              to="/library/books"
              className={`block px-4 py-2 rounded transition ${
                isActive('/library/books') ? 'bg-green-700' : 'hover:bg-green-700'
              }`}
            >
              <span className={sidebarOpen ? '' : 'text-2xl'}>📖</span>
              {sidebarOpen && <span className="ml-2">Books List</span>}
            </Link>
            <Link
              to="/library/reservations"
              className={`block px-4 py-2 rounded transition ${
                isActive('/library/reservations') ? 'bg-green-700' : 'hover:bg-green-700'
              }`}
            >
              <span className={sidebarOpen ? '' : 'text-2xl'}>✓</span>
              {sidebarOpen && <span className="ml-2">Reservations</span>}
            </Link>
          </div>

          {/* Admin Menu */}
          <div className="pt-4 border-t border-green-600">
            <p className={`text-xs font-semibold text-green-200 mb-2 ${!sidebarOpen && 'hidden'}`}>ADMIN</p>
            <Link
              to="/library/admin/dashboard"
              className={`block px-4 py-2 rounded transition ${
                isActive('/library/admin/dashboard') ? 'bg-green-700' : 'hover:bg-green-700'
              }`}
            >
              <span className={sidebarOpen ? '' : 'text-2xl'}>📊</span>
              {sidebarOpen && <span className="ml-2">Admin Dashboard</span>}
            </Link>
            <Link
              to="/library/books/add"
              className={`block px-4 py-2 rounded transition ${
                isActive('/library/books/add') ? 'bg-green-700' : 'hover:bg-green-700'
              }`}
            >
              <span className={sidebarOpen ? '' : 'text-2xl'}>➕</span>
              {sidebarOpen && <span className="ml-2">Add Book</span>}
            </Link>
            <Link
              to="/library/books/manage"
              className={`block px-4 py-2 rounded transition ${
                isActive('/library/books/manage') ? 'bg-green-700' : 'hover:bg-green-700'
              }`}
            >
              <span className={sidebarOpen ? '' : 'text-2xl'}>✏️</span>
              {sidebarOpen && <span className="ml-2">Manage Books</span>}
            </Link>
            <Link
              to="/library/transactions/issue"
              className={`block px-4 py-2 rounded transition ${
                isActive('/library/transactions/issue') ? 'bg-green-700' : 'hover:bg-green-700'
              }`}
            >
              <span className={sidebarOpen ? '' : 'text-2xl'}>📤</span>
              {sidebarOpen && <span className="ml-2">Issue Book</span>}
            </Link>
            <Link
              to="/library/transactions/return"
              className={`block px-4 py-2 rounded transition ${
                isActive('/library/transactions/return') ? 'bg-green-700' : 'hover:bg-green-700'
              }`}
            >
              <span className={sidebarOpen ? '' : 'text-2xl'}>📥</span>
              {sidebarOpen && <span className="ml-2">Return Book</span>}
            </Link>
            <Link
              to="/library/fines"
              className={`block px-4 py-2 rounded transition ${
                isActive('/library/fines') ? 'bg-green-700' : 'hover:bg-green-700'
              }`}
            >
              <span className={sidebarOpen ? '' : 'text-2xl'}>💰</span>
              {sidebarOpen && <span className="ml-2">Fines</span>}
            </Link>
            <Link
              to="/library/users"
              className={`block px-4 py-2 rounded transition ${
                isActive('/library/users') ? 'bg-green-700' : 'hover:bg-green-700'
              }`}
            >
              <span className={sidebarOpen ? '' : 'text-2xl'}>👥</span>
              {sidebarOpen && <span className="ml-2">Users</span>}
            </Link>
            <Link
              to="/library/admin/roles"
              className={`block px-4 py-2 rounded transition ${
                isActive('/library/admin/roles') ? 'bg-green-700' : 'hover:bg-green-700'
              }`}
            >
              <span className={sidebarOpen ? '' : 'text-2xl'}>🔑</span>
              {sidebarOpen && <span className="ml-2">Roles</span>}
            </Link>
            <Link
              to="/library/admin/staff"
              className={`block px-4 py-2 rounded transition ${
                isActive('/library/admin/staff') ? 'bg-green-700' : 'hover:bg-green-700'
              }`}
            >
              <span className={sidebarOpen ? '' : 'text-2xl'}>👔</span>
              {sidebarOpen && <span className="ml-2">Staff</span>}
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-green-800">Gopalgoanj STU Library</h1>
            <div className="flex gap-4">
              <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Profile</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Logout</button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
