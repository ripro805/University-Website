import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UsersList() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch users list
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(`/api/users?page=${page}&search=${search}&role=${roleFilter}`);
        const data = await res.json();

        setUsers(data.users || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    }

    fetchUsers();
  }, [page, search, roleFilter]);

  // Delete or deactivate a user
  const handleDeactivate = async (id) => {
    if (!window.confirm("Are you sure you want to deactivate this user?")) return;

    try {
      await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: false }),
      });

      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Failed to deactivate", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Users Management</h2>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="p-2 border rounded w-full md:w-1/4"
        >
          <option value="All">All Roles</option>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Staff">Staff</option>
          <option value="Admin">Admin</option>
        </select>

        <button
          onClick={() => navigate("/library/admin/users/add")}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
        >
          + Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    {user.active ? (
                      <span className="text-green-600 font-medium">Active</span>
                    ) : (
                      <span className="text-red-600 font-medium">Inactive</span>
                    )}
                  </td>

                  <td className="p-3 text-right space-x-3">
                    <button
                      onClick={() => navigate(`/library/admin/users/edit/${user._id}`)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    {user.active && (
                      <button
                        onClick={() => handleDeactivate(user._id)}
                        className="text-red-600 hover:underline"
                      >
                        Deactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-4 py-2 font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
