// File: frontend/src/pages/library/admin/AdminDashboard.jsx
// Admin/Staff Dashboard for GSTU Library Management System
// Features:
// - Summary cards: Total Books, Total Users, Books Issued Today, Pending Reservations, Late Returns
// - Quick actions: Add Book, Add User, Issue Book, Return Book
// - API placeholders included

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    issuedToday: 0,
    pendingReservations: 0,
    lateReturns: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard stats
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/dashboard/stats'); // Placeholder API
        if (!res.ok) {
          // Use mock data if API is not available
          setStats({
            totalBooks: 150,
            totalUsers: 245,
            issuedToday: 23,
            pendingReservations: 12,
            lateReturns: 5,
          });
          setLoading(false);
          return;
        }
        const data = await res.json();

        setStats({
          totalBooks: data.totalBooks || 0,
          totalUsers: data.totalUsers || 0,
          issuedToday: data.issuedToday || 0,
          pendingReservations: data.pendingReservations || 0,
          lateReturns: data.lateReturns || 0,
        });
      } catch (err) {
        // Use mock data on error
        setStats({
          totalBooks: 150,
          totalUsers: 245,
          issuedToday: 23,
          pendingReservations: 12,
          lateReturns: 5,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const cardItems = [
    { label: 'Total Books', value: stats.totalBooks },
    { label: 'Total Users', value: stats.totalUsers },
    { label: 'Books Issued Today', value: stats.issuedToday },
    { label: 'Pending Reservations', value: stats.pendingReservations },
    { label: 'Late Returns', value: stats.lateReturns },
  ];

  const actions = [
    { label: 'Add Book', path: '/library/books/add' },
    { label: 'Add User', path: '/library/users' },
    { label: 'Issue Book', path: '/library/transactions/issue' },
    { label: 'Return Book', path: '/library/transactions/return' },
  ];

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-green-800">Library Admin Dashboard</h1>
          <p className="text-green-700/70 mt-1">Manage all library activities and resources</p>
        </header>

        {loading && <p className="text-gray-600">Loading dashboard...</p>}
        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-md border border-red-200 mb-4">{error}</p>
        )}

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {cardItems.map((c) => (
            <div
              key={c.label}
              className="bg-white rounded-xl shadow p-5 border border-green-100"
            >
              <p className="text-sm text-gray-600">{c.label}</p>
              <p className="text-3xl font-semibold text-green-700 mt-1">{c.value}</p>
            </div>
          ))}
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-semibold text-green-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {actions.map((a) => (
              <button
                key={a.label}
                onClick={() => navigate(a.path)}
                className="bg-green-600 text-white rounded-xl py-3 text-sm font-medium shadow hover:bg-green-700 transition"
              >
                {a.label}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
