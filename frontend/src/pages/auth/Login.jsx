import { useState } from "react";
import InputField from "../../components/InputField";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Login() {
  const [role, setRole] = useState("student");
  const [userId, setUserId] = useState("");
  const [dept, setDept] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!userId) return alert("ID is required!");
    if (!password) return alert("Password is required!");

    setLoading(true);

    try {
      // Call backend login API
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          password,
          role
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.success) {
        // Store user info and token in localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userData', JSON.stringify(data.data.user));
        
        // also set role-specific id keys as requested
        if (role === 'student') {
          localStorage.setItem('student_id', userId);
          if (data.data.user.department) {
            localStorage.setItem('student_dept', data.data.user.department);
          }
        } else if (role === 'teacher') {
          localStorage.setItem('teacher_id', userId);
        }

        // Redirect based on role
        if (role === "student") return navigate("/student/dashboard");
        if (role === "teacher") return navigate("/teacher/profile");
        if (role === "library") return navigate("/library-admin");
        if (role === "hall-admin") return navigate("/admin/halls");

        // Employee: determine department
        if (role === "employee") {
          const deptToUse = data.data.user.department || dept;
          if (!deptToUse) return alert('Department is required for employee login!');
          localStorage.setItem('employee_dept', deptToUse);
          return navigate(`/office/${deptToUse}/staffs`);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="bg-white w-full max-w-md p-6 sm:p-8 shadow-lg rounded">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-blue-700">
          Login
        </h2>

        <label className="font-medium">Select Role</label>
        <select
          className="w-full p-2 mb-4 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="library">Library Manager</option>
          <option value="employee">Office Employee</option>
          <option value="hall-admin">Hall Admin</option>
        </select>

        <InputField
          label="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <div className="mb-4">
          <label className="block font-medium mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded pr-10"
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {role === 'employee' && (
          <InputField
            label="Department"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
          />
        )}

        <button
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 disabled:bg-gray-400"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}





