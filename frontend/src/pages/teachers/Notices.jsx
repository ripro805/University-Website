import { useState } from "react";
import { Plus, Edit2, Trash2, Bell } from "lucide-react";

export default function Notices() {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Class Postponed - CSE-101",
      content: "Tomorrow's class (Dec 12) is postponed to Dec 15 due to department meeting.",
      course: "CSE-101",
      date: "2024-12-10",
      priority: "high"
    },
    {
      id: 2,
      title: "Assignment Deadline Extended",
      content: "The deadline for Arrays assignment has been extended to Dec 25.",
      course: "CSE-101",
      date: "2024-12-08",
      priority: "medium"
    },
    {
      id: 3,
      title: "Extra Class Scheduled",
      content: "An extra class on Linked Lists will be held on Saturday at 10 AM.",
      course: "CSE-201",
      date: "2024-12-07",
      priority: "low"
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
    course: "CSE-101",
    priority: "medium"
  });

  const createNotice = () => {
    if (!newNotice.title || !newNotice.content) {
      alert("Please fill all fields");
      return;
    }

    const notice = {
      id: notices.length + 1,
      ...newNotice,
      date: new Date().toISOString().split('T')[0]
    };

    setNotices([notice, ...notices]);
    setShowCreateModal(false);
    setNewNotice({ title: "", content: "", course: "CSE-101", priority: "medium" });
    alert("Notice published successfully!");
  };

  const deleteNotice = (id) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      setNotices(notices.filter(n => n.id !== id));
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 border-red-500 text-red-700";
      case "medium": return "bg-yellow-100 border-yellow-500 text-yellow-700";
      case "low": return "bg-blue-100 border-blue-500 text-blue-700";
      default: return "bg-gray-100 border-gray-500 text-gray-700";
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high": return "bg-red-600 text-white";
      case "medium": return "bg-yellow-600 text-white";
      case "low": return "bg-blue-600 text-white";
      default: return "bg-gray-600 text-white";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Class Notices</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            Create Notice
          </button>
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className={`bg-white border-l-4 shadow rounded-lg p-6 ${getPriorityColor(notice.priority)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Bell className="text-blue-600" size={20} />
                  <h3 className="text-xl font-bold text-gray-800">{notice.title}</h3>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold">
                    {notice.course}
                  </span>
                  <span className={`px-3 py-1 rounded text-xs font-semibold uppercase ${getPriorityBadge(notice.priority)}`}>
                    {notice.priority} Priority
                  </span>
                  <span className="text-sm text-gray-500">{notice.date}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{notice.content}</p>
              </div>

              <div className="flex gap-2 ml-4">
                <button
                  className="p-2 text-green-600 hover:bg-green-100 rounded transition-colors"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => deleteNotice(notice.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Notice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Create New Notice</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Course *</label>
                <select
                  value={newNotice.course}
                  onChange={(e) => setNewNotice({ ...newNotice, course: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="CSE-101">CSE-101</option>
                  <option value="CSE-201">CSE-201</option>
                  <option value="CSE-301">CSE-301</option>
                  <option value="All">All Courses</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Priority *</label>
                <select
                  value={newNotice.priority}
                  onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Notice Title *</label>
                <input
                  type="text"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  placeholder="e.g., Class Postponed"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Notice Content *</label>
                <textarea
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                  placeholder="Write your notice here..."
                  rows="6"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={createNotice}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors font-semibold"
              >
                <Bell size={18} />
                Publish Notice
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded hover:bg-gray-400 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
