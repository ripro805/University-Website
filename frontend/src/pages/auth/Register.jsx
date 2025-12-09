import { useState } from "react";
import InputField from "../../components/InputField";
import { Link } from "react-router-dom";

export default function Register() {
  const [role, setRole] = useState("student");
  const [id, setId] = useState("");
  const [dept, setDept] = useState("");

  const handleRegister = () => {
    if (!id || !dept) {
      alert("All fields required!");
      return;
    }

    alert("Registration Successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 shadow-lg rounded">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Register
        </h2>

        {/* Role Select */}
        <label className="font-medium">Register As</label>
        <select
          className="w-full p-2 mb-4 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="library">Library Manager</option>
          <option value="employee">Office Employee</option>
        </select>

        <InputField
          label={`${role.charAt(0).toUpperCase() + role.slice(1)} ID`}
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <InputField
          label="Department"
          value={dept}
          onChange={(e) => setDept(e.target.value)}
        />

        <button
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 mt-2"
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
