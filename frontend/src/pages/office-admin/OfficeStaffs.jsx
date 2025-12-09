import { useState, useEffect } from 'react';

export default function OfficeStaffs() {
  const [staffs, setStaffs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '',
    designation: '',
    contact: '',
    email: '',
    photo: null
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('office_staffs') || '[]');
    setStaffs(saved);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm(f => ({ ...f, photo: reader.result }));
    reader.readAsDataURL(file);
  }

  function save(e) {
    e.preventDefault();
    if (!form.name || !form.email) return alert('Name and email required');
    if (editing) {
      const next = staffs.map(s => s.id === editing ? { ...s, ...form } : s);
      setStaffs(next);
      localStorage.setItem('office_staffs', JSON.stringify(next));
    } else {
      const s = { id: Date.now(), ...form };
      const next = [s, ...staffs];
      setStaffs(next);
      localStorage.setItem('office_staffs', JSON.stringify(next));
    }
    setShowForm(false);
  }

  function remove(id) {
    if (!confirm('Delete staff?')) return;
    const next = staffs.filter(s => s.id !== id);
    setStaffs(next);
    localStorage.setItem('office_staffs', JSON.stringify(next));
  }

  function openEdit(s) {
    setEditing(s.id);
    setForm({ ...s });
    setShowForm(true);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Office Staffs</h2>
        <button onClick={() => { setEditing(null); setForm({ name: '', designation: '', contact: '', email: '', photo: null }); setShowForm(true); }} className="bg-purple-600 text-white px-3 py-1 rounded">Add Staff</button>
      </div>

      {showForm && (
        <form onSubmit={save} className="bg-white p-4 rounded shadow mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" />
            <input name="designation" value={form.designation} onChange={handleChange} placeholder="Designation" className="border p-2 rounded" />
            <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact" className="border p-2 rounded" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
          </div>

          <div className="mt-3">
            <label className="block text-sm">Upload Photo</label>
            <input type="file" accept="image/*" onChange={handlePhoto} />
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
            <th className="border p-2">Photo</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Designation</th>
            <th className="border p-2">Contact</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffs.map(s => (
            <tr key={s.id}>
              <td className="border p-2 w-20">
                {s.photo ? <img src={s.photo} alt="p" className="w-12 h-12 object-cover rounded" /> : <div className="w-12 h-12 bg-gray-100" />}
              </td>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.designation}</td>
              <td className="border p-2">{s.contact}</td>
              <td className="border p-2">{s.email}</td>
              <td className="border p-2">
                <div className="flex gap-2">
                  <button onClick={() => openEdit(s)} className="px-2 py-1 bg-yellow-400 rounded">Edit</button>
                  <button onClick={() => remove(s.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
