import { useState, useEffect } from 'react';

export default function OfficeEvents() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', roomNo: '', chiefGuest: '', startTime: '', endTime: '' });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('office_events') || '[]');
    setEvents(saved);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function save(e) {
    e.preventDefault();
    if (!form.name) return alert('Event name required');
    const event = { id: Date.now(), ...form };
    const next = [event, ...events];
    setEvents(next);
    localStorage.setItem('office_events', JSON.stringify(next));
    setForm({ name: '', roomNo: '', chiefGuest: '', startTime: '', endTime: '' });
    setShowForm(false);
  }

  function remove(id) {
    if (!confirm('Delete event?')) return;
    const next = events.filter(e => e.id !== id);
    setEvents(next);
    localStorage.setItem('office_events', JSON.stringify(next));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Events</h2>
        <button onClick={() => setShowForm(true)} className="bg-purple-600 text-white px-3 py-1 rounded">Add Event</button>
      </div>

      {showForm && (
        <form onSubmit={save} className="bg-white p-4 rounded shadow mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Event name" className="border p-2 rounded" />
            <input name="roomNo" value={form.roomNo} onChange={handleChange} placeholder="Room No." className="border p-2 rounded" />
            <input name="chiefGuest" value={form.chiefGuest} onChange={handleChange} placeholder="Chief guest" className="border p-2 rounded" />
            <input name="startTime" value={form.startTime} onChange={handleChange} placeholder="Start time" type="time" className="border p-2 rounded" />
            <input name="endTime" value={form.endTime} onChange={handleChange} placeholder="End time" type="time" className="border p-2 rounded" />
          </div>
          <div className="mt-3 flex gap-2">
            <button className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-3 py-1 border rounded">Cancel</button>
          </div>
        </form>
      )}

      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="text-left">
            <th className="border p-2">Event</th>
            <th className="border p-2">Room No.</th>
            <th className="border p-2">Chief Guest</th>
            <th className="border p-2">Start Time</th>
            <th className="border p-2">End Time</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(e => (
            <tr key={e.id}>
              <td className="border p-2">{e.name}</td>
              <td className="border p-2">{e.roomNo}</td>
              <td className="border p-2">{e.chiefGuest}</td>
              <td className="border p-2">{e.startTime}</td>
              <td className="border p-2">{e.endTime}</td>
              <td className="border p-2"><button onClick={() => remove(e.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
