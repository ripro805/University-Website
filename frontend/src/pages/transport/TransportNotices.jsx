import { useState, useEffect } from 'react';

export default function TransportNotices() {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({ title: '', content: '' });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('transportNotices') || 'null');
    if (stored) {
      setNotices(stored);
    } else {
      const sampleNotices = [
        { id: 1, title: 'Bus Service Update', content: 'All buses will resume normal service from Monday. Please arrive 5 minutes early at bus stops.', date: '2025-12-10', admin: 'Admin' },
        { id: 2, title: 'Route Changes', content: 'Student Bus 2 route has been changed to avoid construction. New route: West Side → City Center → Campus', date: '2025-12-09', admin: 'Admin' },
        { id: 3, title: 'Holiday Schedule', content: 'During the upcoming holidays, buses will operate on a reduced schedule. Check the bus schedule section for details.', date: '2025-12-08', admin: 'Admin' },
      ];
      localStorage.setItem('transportNotices', JSON.stringify(sampleNotices));
      setNotices(sampleNotices);
    }
  }, []);

  function postNotice() {
    if (!newNotice.title || !newNotice.content) {
      return alert('Title and content required');
    }
    const entry = {
      id: Date.now(),
      title: newNotice.title,
      content: newNotice.content,
      date: new Date().toISOString().split('T')[0],
      admin: localStorage.getItem('transportAdminEmail') || 'Admin'
    };
    const updated = [entry, ...notices];
    setNotices(updated);
    localStorage.setItem('transportNotices', JSON.stringify(updated));
    setNewNotice({ title: '', content: '' });
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Transport Notices</h2>

      {localStorage.getItem('userRole') === 'transport-admin' && (
        <div className="bg-blue-50 p-4 rounded mb-6 border-l-4 border-blue-600">
          <h3 className="font-bold mb-3">Post New Notice</h3>
          <input
            className="w-full border p-2 rounded mb-2"
            placeholder="Notice Title"
            value={newNotice.title}
            onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
          />
          <textarea
            className="w-full border p-2 rounded mb-2 h-20"
            placeholder="Notice Content"
            value={newNotice.content}
            onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
          />
          <button
            onClick={postNotice}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post Notice
          </button>
        </div>
      )}

      <div className="space-y-4">
        {notices.map(notice => (
          <div key={notice.id} className="border-l-4 border-blue-600 bg-gray-50 p-4 rounded">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-blue-700">{notice.title}</h3>
                <p className="text-gray-700 mt-2">{notice.content}</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>{notice.date}</p>
                <p className="text-xs">By: {notice.admin}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
