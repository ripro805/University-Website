import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TransportLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin() {
    if (!email || !password) return alert('Email and password required');
    // Mock login for transport admin
    localStorage.setItem('userRole', 'transport-admin');
    localStorage.setItem('transportAdminEmail', email);
    alert('Login successful');
    navigate('/transport/schedule');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 shadow-lg rounded">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Transport Admin Login</h2>
        
        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@transport.edu"
        />

        <label className="block mb-2 font-medium">Password</label>
        <input
          type="password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 font-medium"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Demo: Use any email/password to login
        </p>
      </div>
    </div>
  );
}
