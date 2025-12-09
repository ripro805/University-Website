import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function OfficeStaffs(){
  const { dept } = useParams();
  const key = `office_${dept}_staffs`;
  const [staffs, setStaffs] = useState([]);

  useEffect(()=>{
    const s = JSON.parse(localStorage.getItem(key) || '[]');
    setStaffs(s);
  },[key]);

  function add(){
    const name = prompt('Name'); if (!name) return;
    const id = Date.now();
    const photo = ''; const destination = prompt('Designation')||''; const contact = prompt('Contact')||''; const email = prompt('Email')||'';
    const next = [{ id, name, destination, contact, email, photo }, ...staffs];
    setStaffs(next); localStorage.setItem(key, JSON.stringify(next));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Office Staffs - {dept}</h2>
        <button onClick={add} className="bg-blue-600 text-white px-3 py-1 rounded">Add Staff</button>
      </div>

      <table className="w-full bg-white">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Photo</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Designation</th>
            <th className="border p-2">Contact</th>
            <th className="border p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {staffs.map(s=> (
            <tr key={s.id}>
              <td className="border p-2">{s.id}</td>
              <td className="border p-2">{s.photo? <img src={s.photo} className="w-12 h-12 object-cover"/> : <div className="w-12 h-12 bg-gray-100"/>}</td>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.destination}</td>
              <td className="border p-2">{s.contact}</td>
              <td className="border p-2">{s.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
