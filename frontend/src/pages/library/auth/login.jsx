// File: frontend/src/pages/library/auth/Login.jsx
// Login component for Gopalgoanj Science and Technology University – Library Management System
// Uses: React + Hooks, TailwindCSS for styling

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Login.jsx
 * Role-based login: Student | Teacher | Admin/Staff
 * - Validates email + password + role
 * - Calls placeholder API endpoint: POST /api/auth/login
 * - On success redirects based on role:
 *    Admin/Staff -> /library/admin/dashboard
 *    Student/Teacher -> /library/user/dashboard
 *
 * Notes:
 * - Replace fetch placeholders with your real API client (axios, fetch wrapper, etc.)
 * - Integrate with your global auth context or state management when available
 */

const roleOptions = [
  { value: 'student', label: 'Student' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'staff', label: 'Admin / Staff' },
];

export default function Login() {
  const navigate = useNavigate();

  // form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [remember, setRemember] = useState(false);

  // ui state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // basic client-side validation
  const validate = () => {
    const errs = {};
    if (!email) errs.email = 'Email is required.';
    // simple email regex — replace with more robust on server
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Enter a valid email address.';
    if (!password) errs.password = 'Password is required.';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters.';
    if (!role) errs.role = 'Please select a role.';
    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setLoading(true);
    try {
      // Placeholder API call
      // Replace with your auth client or axios and proper error handling
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      // Simulate network / dev behaviour: check status
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || 'Login failed.');
      }

      const data = await res.json().catch(() => ({}));

      // Example response shape: { token, user: { id, name, role } }
      // Persist token if provided (remember toggle controls persistence)
      if (data.token) {
        try {
          if (remember) localStorage.setItem('library_auth_token', data.token);
          else sessionStorage.setItem('library_auth_token', data.token);
        } catch (storageErr) {
          // storage might fail in abnormal environments; ignore safely
          console.warn('Unable to persist auth token:', storageErr);
        }
      }

      // TODO: Integrate with global auth context here

      // Redirect based on role
      const userRole = data.user?.role || role; // prefer server-provided role when present
      if (userRole === 'staff' || userRole === 'admin') {
        navigate('/library/admin/dashboard');
      } else {
        // student or teacher
        navigate('/library/user/dashboard');
      }
    } catch (err) {
      console.error('Login error', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-green-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <header className="mb-4 text-center">
          <h1 className="text-2xl font-semibold text-green-800">Gopalgoanj STU — Library Login</h1>
          <p className="text-sm text-green-600/80 mt-1">Sign in with your university credentials</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Role</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {roleOptions.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-green-300
                    ${role === r.value ? 'bg-green-100 border-green-300 text-green-800' : 'bg-white border-gray-200 text-gray-700'}`}
                  aria-pressed={role === r.value}
                >
                  {r.label}
                </button>
              ))}
            </div>
            {validationErrors.role && (
              <p className="mt-1 text-xs text-red-600">{validationErrors.role}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200
                ${validationErrors.email ? 'border-red-300' : 'border-gray-200'}`}
              placeholder="you@university.edu"
              autoComplete="email"
            />
            {validationErrors.email && (
              <p className="mt-1 text-xs text-red-600">{validationErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200
                ${validationErrors.password ? 'border-red-300' : 'border-gray-200'}`}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {validationErrors.password && (
              <p className="mt-1 text-xs text-red-600">{validationErrors.password}</p>
            )}
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700">Remember me</span>
            </label>

            <button
              type="button"
              onClick={() => navigate('/library/auth/forgot')}
              className="text-sm text-green-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="rounded-md bg-red-50 border border-red-100 p-2 text-sm text-red-700">{error}</div>
          )}

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition
                ${loading ? 'bg-green-200 text-green-700 cursor-wait' : 'bg-green-600 text-white hover:bg-green-700'}`}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        {/* Footer: quick sign in hints for dev/testing (remove in production) */}
        <div className="mt-4 text-xs text-gray-500">
          <p>Tip: Use your university email. For development the API endpoint <code className="rounded bg-gray-100 px-1">/api/auth/login</code> is a placeholder — replace with your backend.</p>
        </div>
      </div>
    </div>
  );
}
