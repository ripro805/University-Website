import { useEffect, useState } from "react";

export default function StaffManagement() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this staff member?")) return;
    setLoading(true);
    try {
      await fetch(`/api/admin/staff/${userId}`, { method: "DELETE" });
      setStaff((prev) => prev.filter((s) => s._id !== userId));
    } catch (err) {
      console.error("Failed to delete staff", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (userId) => {
    setLoading(true);
    try {
      await fetch(`/api/admin/staff/${userId}/reset-password`, { method: "POST" });
      alert("Password reset successfully");
    } catch (err) {
      console.error("Failed to reset password", err);
      alert("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Staff Management</h2>

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
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No staff found
                </td>
              </tr>
            ) : (
              staff.map((s) => (
                <tr key={s._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">{s.role}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleResetPassword(s._id)}
                      disabled={loading}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      Reset Password
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      disabled={loading}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                    >
                      Delete
                    </button>
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
