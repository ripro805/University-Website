import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaBullhorn } from 'react-icons/fa';
import { noticesData, hallsData } from './adminData';

const Notices = () => {
  const [notices, setNotices] = useState(noticesData);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNotice, setCurrentNotice] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    hallId: '',
    priority: 'Medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setNotices(notices.map(notice =>
        notice.id === currentNotice.id
          ? { ...notice, ...formData, hallId: formData.hallId ? parseInt(formData.hallId) : null }
          : notice
      ));
      alert('Notice updated successfully!');
    } else {
      const newNotice = {
        id: notices.length + 1,
        ...formData,
        hallId: formData.hallId ? parseInt(formData.hallId) : null,
        date: new Date().toISOString().split('T')[0]
      };
      setNotices([newNotice, ...notices]);
      alert('Notice created successfully!');
    }
    closeModal();
  };

  const handleEdit = (notice) => {
    setCurrentNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content,
      hallId: notice.hallId || '',
      priority: notice.priority
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      setNotices(notices.filter(notice => notice.id !== id));
      alert('Notice deleted successfully!');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentNotice(null);
    setFormData({
      title: '',
      content: '',
      hallId: '',
      priority: 'Medium'
    });
  };

  const getHallName = (hallId) => {
    if (!hallId) return 'All Halls';
    const hall = hallsData.find(h => h.id === hallId);
    return hall ? hall.name : 'Unknown';
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Hall Notices</h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          >
            <FaPlus />
            <span>Create Notice</span>
          </button>
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {notices.map((notice) => (
          <div key={notice.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <FaBullhorn className="text-blue-700 text-2xl" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{notice.title}</h3>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-sm text-gray-600">{notice.date}</span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-600">{getHallName(notice.hallId)}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getPriorityColor(notice.priority)}`}>
                      {notice.priority}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(notice)}
                  className="text-blue-600 hover:text-blue-800 p-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(notice.id)}
                  className="text-red-600 hover:text-red-800 p-2"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <p className="text-gray-700">{notice.content}</p>
          </div>
        ))}

        {notices.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No notices found. Create your first notice!</p>
          </div>
        )}
      </div>

      {/* Create/Edit Notice Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{isEditing ? 'Edit Notice' : 'Create New Notice'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  placeholder="Enter notice title"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  required
                  rows="5"
                  placeholder="Enter notice content"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Target Hall</label>
                <select
                  value={formData.hallId}
                  onChange={(e) => setFormData({...formData, hallId: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Halls</option>
                  {hallsData.map(hall => (
                    <option key={hall.id} value={hall.id}>{hall.name}</option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">Leave blank to send to all halls</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
                >
                  {isEditing ? 'Update Notice' : 'Create Notice'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notices;






