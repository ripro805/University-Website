import { useState, useEffect } from 'react';

export default function ClassSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ session: '', semester: '', routine: '' });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('office_class_schedule') || '[]');
    setSchedules(saved);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function save(e) {
    e.preventDefault();
    if (!form.session || !form.semester) return alert('Session and Semester required');
    const schedule = { id: Date.now(), ...form };
    const next = [schedule, ...schedules];
    setSchedules(next);
    localStorage.setItem('office_class_schedule', JSON.stringify(next));
    setForm({ session: '', semester: '', routine: '' });
    setShowForm(false);
  }

  function remove(id) {
    if (!confirm('Delete schedule?')) return;
    const next = schedules.filter(s => s.id !== id);
    setSchedules(next);
    localStorage.setItem('office_class_schedule', JSON.stringify(next));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Class Schedule</h2>
        <button onClick={() => setShowForm(true)} className="bg-purple-600 text-white px-3 py-1 rounded">Add Schedule</button>
      </div>

      {showForm && (
        <form onSubmit={save} className="bg-white p-4 rounded shadow mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input name="session" value={form.session} onChange={handleChange} placeholder="Session (e.g., 2024-25)" className="border p-2 rounded" />
            <input name="semester" value={form.semester} onChange={handleChange} placeholder="Semester" type="number" className="border p-2 rounded" />
            <input name="routine" value={form.routine} onChange={handleChange} placeholder="Routine/Link" className="border p-2 rounded" />
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
            <th className="border p-2">Session</th>
            <th className="border p-2">Semester</th>
            <th className="border p-2">Routine</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(s => (
            <tr key={s.id}>
              <td className="border p-2">{s.session}</td>
              <td className="border p-2">{s.semester}</td>
              <td className="border p-2">{s.routine}</td>
              <td className="border p-2"><button onClick={() => remove(s.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
