import { useState } from "react";
import { usersDatabase, blockUser, unblockUser, updateUserFine } from "./libraryAdminData";

export default function ManageUsers() {
  const [users, setUsers] = useState(usersDatabase);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [editingFine, setEditingFine] = useState(null);
  const [fineAmount, setFineAmount] = useState("");

  const handleBlockUser = (studentId) => {
    if (window.confirm("Are you sure you want to block this user?")) {
      blockUser(studentId);
      setUsers([...usersDatabase]);
      setMessage({ type: "success", text: "User blocked successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const handleUnblockUser = (studentId) => {
    if (window.confirm("Are you sure you want to unblock this user?")) {
      unblockUser(studentId);
      setUsers([...usersDatabase]);
      setMessage({ type: "success", text: "User unblocked successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const handleUpdateFine = (studentId) => {
    const amount = parseFloat(fineAmount);
    if (isNaN(amount) || amount < 0) {
      setMessage({ type: "error", text: "Please enter a valid fine amount!" });
      return;
    }

    updateUserFine(studentId, amount);
    setUsers([...usersDatabase]);
    setEditingFine(null);
    setFineAmount("");
    setMessage({ type: "success", text: "Fine updated successfully!" });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.studentId.includes(searchQuery) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalFines = users.reduce((sum, user) => sum + user.fineAmount, 0);
  const blockedCount = users.filter(u => u.status === "blocked").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">Manage Users</h1>
          <p className="text-blue-100">View user details, manage fines, and control access</p>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl ${message.type === "success" ? "bg-green-100 text-green-800 border border-green-300" : "bg-red-100 text-red-800 border border-red-300"}`}>
            {message.text}
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-medium mb-1">Total Users</p>
            <p className="text-3xl font-bold text-gray-800">{users.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <p className="text-gray-600 text-sm font-medium mb-1">Blocked Users</p>
            <p className="text-3xl font-bold text-gray-800">{blockedCount}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <p className="text-gray-600 text-sm font-medium mb-1">Total Fines</p>
            <p className="text-3xl font-bold text-gray-800">৳{totalFines}</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, student ID, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Student ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Phone</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Fine</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-800 font-medium">{user.studentId}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.phone}</td>
                      <td className="px-6 py-4 text-sm text-center">
                        {editingFine === user.studentId ? (
                          <div className="flex items-center justify-center space-x-2">
                            <input
                              type="number"
                              min="0"
                              value={fineAmount}
                              onChange={(e) => setFineAmount(e.target.value)}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="0"
                            />
                            <button
                              onClick={() => handleUpdateFine(user.studentId)}
                              className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => {
                                setEditingFine(null);
                                setFineAmount("");
                              }}
                              className="px-2 py-1 bg-gray-400 text-white rounded text-xs hover:bg-gray-500"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingFine(user.studentId);
                              setFineAmount(user.fineAmount.toString());
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${user.fineAmount > 0 ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
                          >
                            ৳{user.fineAmount}
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-center">
                        {user.status === "active" ? (
                          <button
                            onClick={() => handleBlockUser(user.studentId)}
                            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs font-medium"
                          >
                            Block
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUnblockUser(user.studentId)}
                            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs font-medium"
                          >
                            Unblock
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
