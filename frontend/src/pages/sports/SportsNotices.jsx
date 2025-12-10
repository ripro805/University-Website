import { useState, useEffect } from 'react';

export default function SportsNotices(){
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(()=>{
    const stored = JSON.parse(localStorage.getItem('sportsNotices') || 'null');
    if(stored) setNotices(stored);
    else {
      const sample = [
        { id: 1, title: 'Training Session', content: 'All football players training at 6pm on field A.', date: '2025-12-10', admin: 'Sports Admin' },
        { id: 2, title: 'Gym Closure', content: 'Gym closed for maintenance on Friday.', date: '2025-12-08', admin: 'Sports Admin' }
      ];
      localStorage.setItem('sportsNotices', JSON.stringify(sample));
      setNotices(sample);
    }
  },[]);

  function postNotice(){
    if(!form.title || !form.content) return alert('Title and content required');
    const entry = { id: Date.now(), ...form, date: new Date().toISOString().split('T')[0], admin: localStorage.getItem('sportsAdminEmail') || 'Sports Admin' };
    const next = [entry, ...notices];
    setNotices(next);
    localStorage.setItem('sportsNotices', JSON.stringify(next));
    setForm({ title: '', content: '' });
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sports Notices</h2>

      {localStorage.getItem('userRole') === 'sports-admin' && (
        <div className="mb-6 bg-yellow-50 p-4 rounded border-l-4 border-yellow-600">
          <h3 className="font-bold mb-2">Post Notice</h3>
          <input className="w-full border p-2 mb-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
          <textarea className="w-full border p-2 mb-2" placeholder="Content" value={form.content} onChange={e=>setForm({...form, content: e.target.value})} />
          <button onClick={postNotice} className="bg-yellow-600 text-white px-3 py-2 rounded">Post</button>
        </div>
      )}

      <div className="space-y-4">
        {notices.map(n=> (
          <div key={n.id} className="border p-3 rounded bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-lg">{n.title}</h4>
                <p className="text-gray-700 mt-1">{n.content}</p>
              </div>
              <div className="text-sm text-gray-500 text-right">
                <p>{n.date}</p>
                <p className="text-xs">By: {n.admin}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
