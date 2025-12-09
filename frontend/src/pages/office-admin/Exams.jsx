import { useState, useEffect } from 'react';

export default function Exams() {
  const [exams, setExams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', session: '', semester: '', startDate: '', endDate: '', examRoutine: '' });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('office_exams') || '[]');
    setExams(saved);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function save(e) {
    e.preventDefault();
    if (!form.name || !form.session) return alert('Name and Session required');
    const exam = { id: Date.now(), ...form };
    const next = [exam, ...exams];
    setExams(next);
    localStorage.setItem('office_exams', JSON.stringify(next));
    setForm({ name: '', session: '', semester: '', startDate: '', endDate: '', examRoutine: '' });
    setShowForm(false);
  }

  function remove(id) {
    if (!confirm('Delete exam?')) return;
    const next = exams.filter(e => e.id !== id);
    setExams(next);
    localStorage.setItem('office_exams', JSON.stringify(next));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Exams</h2>
        <button onClick={() => setShowForm(true)} className="bg-purple-600 text-white px-3 py-1 rounded">Add Exam</button>
      </div>

      {showForm && (
        <form onSubmit={save} className="bg-white p-4 rounded shadow mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Exam name" className="border p-2 rounded" />
            <input name="session" value={form.session} onChange={handleChange} placeholder="Session" className="border p-2 rounded" />
            <input name="semester" value={form.semester} onChange={handleChange} placeholder="Semester" type="number" className="border p-2 rounded" />
            <input name="startDate" value={form.startDate} onChange={handleChange} placeholder="Start date" type="date" className="border p-2 rounded" />
            <input name="endDate" value={form.endDate} onChange={handleChange} placeholder="End date" type="date" className="border p-2 rounded" />
            <input name="examRoutine" value={form.examRoutine} onChange={handleChange} placeholder="Exam routine/Link" className="border p-2 rounded" />
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
            <th className="border p-2">Exam</th>
            <th className="border p-2">Session</th>
            <th className="border p-2">Semester</th>
            <th className="border p-2">Start Date</th>
            <th className="border p-2">End Date</th>
            <th className="border p-2">Routine</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map(e => (
            <tr key={e.id}>
              <td className="border p-2">{e.name}</td>
              <td className="border p-2">{e.session}</td>
              <td className="border p-2">{e.semester}</td>
              <td className="border p-2">{e.startDate}</td>
              <td className="border p-2">{e.endDate}</td>
              <td className="border p-2">{e.examRoutine}</td>
              <td className="border p-2"><button onClick={() => remove(e.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
