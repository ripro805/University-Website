import { useState } from "react";
import { noticesDatabase, addNotice, updateNotice, deleteNotice } from "./libraryAdminData";

export default function NoticeManagement() {
  const [notices, setNotices] = useState(noticesDatabase);
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    content: "",
    important: false
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  const noticeTypes = ["announcement", "holiday", "event", "reminder"];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.type || !formData.content) {
      setMessage({ type: "error", text: "Please fill all required fields!" });
      return;
    }

    if (editingNotice) {
      updateNotice(editingNotice.id, formData);
      setMessage({ type: "success", text: "Notice updated successfully!" });
    } else {
      addNotice(formData);
      setMessage({ type: "success", text: "Notice added successfully!" });
    }

    setNotices([...noticesDatabase]);
    resetForm();
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      type: notice.type,
      content: notice.content,
      important: notice.important
    });
    setShowForm(true);
    setMessage({ type: "", text: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      deleteNotice(id);
      setNotices([...noticesDatabase]);
      setMessage({ type: "success", text: "Notice deleted successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", type: "", content: "", important: false });
    setEditingNotice(null);
    setShowForm(false);
  };

  const getTypeColor = (type) => {
    const colors = {
      announcement: "blue",
      holiday: "green",
      event: "purple",
      reminder: "yellow"
    };
    return colors[type] || "gray";
  };

  const getTypeIcon = (type) => {
    const icons = {
      announcement: "📢",
      holiday: "🎉",
      event: "📅",
      reminder: "⏰"
    };
    return icons[type] || "📋";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">Notice Management</h1>
          <p className="text-blue-100">Create, update, and manage library notices</p>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl ${message.type === "success" ? "bg-green-100 text-green-800 border border-green-300" : "bg-red-100 text-red-800 border border-red-300"}`}>
            {message.text}
          </div>
        )}

        {/* Add Notice Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-md"
          >
            {showForm ? "Cancel" : "Add New Notice"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingNotice ? "Edit Notice" : "Add New Notice"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter notice title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select type</option>
                  {noticeTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32"
                  placeholder="Enter notice content"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="important"
                  checked={formData.important}
                  onChange={(e) => setFormData({ ...formData, important: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="important" className="ml-2 text-sm font-medium text-gray-700">
                  Mark as Important
                </label>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {editingNotice ? "Update Notice" : "Add Notice"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Notices List */}
        <div className="space-y-6">
          {notices.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-200">
              <p className="text-gray-500">No notices found. Add your first notice!</p>
            </div>
          ) : (
            notices
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((notice) => {
                const color = getTypeColor(notice.type);
                const icon = getTypeIcon(notice.type);
                return (
                  <div
                    key={notice.id}
                    className={`bg-white rounded-xl shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow ${notice.important ? "border-red-500" : `border-${color}-500`}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="text-4xl">{icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-800">{notice.title}</h3>
                            {notice.important && (
                              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                                IMPORTANT
                              </span>
                            )}
                            <span className={`px-3 py-1 bg-${color}-100 text-${color}-700 rounded-full text-xs font-medium`}>
                              {notice.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">
                            {new Date(notice.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            })}
                          </p>
                          <p className="text-gray-700 leading-relaxed">{notice.content}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleEdit(notice)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(notice.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
}
