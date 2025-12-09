import { useState } from "react";
import InputField from "../../components/InputField";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("student");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!userId) return alert("ID is required!");
    if (!password) return alert("Password is required!");

    // Store user info in localStorage
    localStorage.setItem('userRole', role);
    localStorage.setItem('userId', userId);

    // Redirect based on role
    if (role === "student") navigate("/dashboard/student");
    if (role === "teacher") navigate("/dashboard/teacher");
    if (role === "library") navigate("/dashboard/library");
    if (role === "employee") navigate("/dashboard/employee");
    if (role === "hall-admin") navigate("/admin/halls");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 shadow-lg rounded">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
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

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
          onClick={handleLogin}
        >
          Login
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





