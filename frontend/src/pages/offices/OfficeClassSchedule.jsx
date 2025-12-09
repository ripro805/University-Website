import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function OfficeClassSchedule(){
  const { dept } = useParams();
  const key = `office_${dept}_classes`;
  const [items, setItems] = useState([]);

  useEffect(()=>{
    const s = JSON.parse(localStorage.getItem(key) || '[]');
    setItems(s);
  },[key]);

  function add(){
    const id = Date.now();
    const session = prompt('Session')||''; const semester = prompt('Semester')||''; const routine = prompt('Routine (text)')||'';
    const next = [{ id, session, semester, routine }, ...items]; setItems(next); localStorage.setItem(key, JSON.stringify(next));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Class Schedule - {dept}</h2>
        <button onClick={add} className="bg-blue-600 text-white px-3 py-1 rounded">Add Schedule</button>
      </div>

      <table className="w-full bg-white">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Session</th>
            <th className="border p-2">Semester</th>
            <th className="border p-2">Routine</th>
          </tr>
        </thead>
        <tbody>
          {items.map(it=> (
            <tr key={it.id}>
              <td className="border p-2">{it.id}</td>
              <td className="border p-2">{it.session}</td>
              <td className="border p-2">{it.semester}</td>
              <td className="border p-2"><pre className="whitespace-pre-wrap">{it.routine}</pre></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
