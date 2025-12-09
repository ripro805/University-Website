import { useState, useEffect } from "react";

export default function Roles() {
  const [staff, setStaff] = useState([]);
  const [roleOptions, setRoleOptions] = useState(["Admin", "Staff", "Student", "Teacher"]);
  const [loading, setLoading] = useState(false);

  // Fetch staff list
  useEffect(() => {
    async function fetchStaff() {
      try {
        const res = await fetch(`/api/admin/staff`);
        const data = await res.json();
        setStaff(data.staff || []);
      } catch (err) {
        console.error("Failed to fetch staff", err);
      }
    }

    fetchStaff();
  }, []);

  // Update role handler
  const handleRoleChange = async (userId, newRole) => {
    setLoading(true);
    try {
      await fetch(`/api/admin/staff/${userId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      setStaff((prev) => prev.map((s) => (s._id === userId ? { ...s, role: newRole } : s)));
    } catch (err) {
      console.error("Failed to update role", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Manage Roles</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {staff.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No staff found
                </td>
              </tr>
            ) : (
              staff.map((s) => (
                <tr key={s._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">
                    <select
                      value={s.role}
                      onChange={(e) => handleRoleChange(s._id, e.target.value)}
                      className="border p-1 rounded"
                    >
                      {roleOptions.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3">
                    {/* Optional actions like reset password or delete can be added here */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
