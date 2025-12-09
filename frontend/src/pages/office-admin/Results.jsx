import { useState, useEffect } from 'react';

export default function Results() {
  const [results, setResults] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', session: '', semester: '', publishDate: '', resultLink: '' });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('office_results') || '[]');
    setResults(saved);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function save(e) {
    e.preventDefault();
    if (!form.name || !form.session) return alert('Name and Session required');
    const result = { id: Date.now(), ...form };
    const next = [result, ...results];
    setResults(next);
    localStorage.setItem('office_results', JSON.stringify(next));
    setForm({ name: '', session: '', semester: '', publishDate: '', resultLink: '' });
    setShowForm(false);
  }

  function remove(id) {
    if (!confirm('Delete result?')) return;
    const next = results.filter(r => r.id !== id);
    setResults(next);
    localStorage.setItem('office_results', JSON.stringify(next));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Results</h2>
        <button onClick={() => setShowForm(true)} className="bg-purple-600 text-white px-3 py-1 rounded">Add Result</button>
      </div>

      {showForm && (
        <form onSubmit={save} className="bg-white p-4 rounded shadow mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Result name/course" className="border p-2 rounded" />
            <input name="session" value={form.session} onChange={handleChange} placeholder="Session" className="border p-2 rounded" />
            <input name="semester" value={form.semester} onChange={handleChange} placeholder="Semester" type="number" className="border p-2 rounded" />
            <input name="publishDate" value={form.publishDate} onChange={handleChange} placeholder="Publish date" type="date" className="border p-2 rounded" />
            <input name="resultLink" value={form.resultLink} onChange={handleChange} placeholder="Result link/URL" className="border p-2 rounded" />
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
            <th className="border p-2">Result</th>
            <th className="border p-2">Session</th>
            <th className="border p-2">Semester</th>
            <th className="border p-2">Published</th>
            <th className="border p-2">Link</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map(r => (
            <tr key={r.id}>
              <td className="border p-2">{r.name}</td>
              <td className="border p-2">{r.session}</td>
              <td className="border p-2">{r.semester}</td>
              <td className="border p-2">{r.publishDate}</td>
              <td className="border p-2"><a href={r.resultLink} target="_blank" rel="noreferrer" className="text-blue-600">View</a></td>
              <td className="border p-2"><button onClick={() => remove(r.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
