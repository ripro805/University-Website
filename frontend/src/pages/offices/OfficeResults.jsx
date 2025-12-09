import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function OfficeResults(){
  const { dept } = useParams();
  const key = `office_${dept}_results`;
  const [results, setResults] = useState([]);

  useEffect(()=>{
    const s = JSON.parse(localStorage.getItem(key) || '[]');
    setResults(s);
  },[key]);

  function add(){
    const id = Date.now();
    const name = prompt('Result name')||''; const session = prompt('Session')||''; const semester = prompt('Semester')||''; const publish = prompt('Publish date')||''; const data = prompt('Result (text)')||'';
    const next = [{ id, name, session, semester, publish, data }, ...results]; setResults(next); localStorage.setItem(key, JSON.stringify(next));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Results - {dept}</h2>
        <button onClick={add} className="bg-blue-600 text-white px-3 py-1 rounded">Add Result</button>
      </div>

      <table className="w-full bg-white">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Session</th>
            <th className="border p-2">Semester</th>
            <th className="border p-2">Publish Date</th>
            <th className="border p-2">Result</th>
          </tr>
        </thead>
        <tbody>
          {results.map(r=> (
            <tr key={r.id}>
              <td className="border p-2">{r.id}</td>
              <td className="border p-2">{r.name}</td>
              <td className="border p-2">{r.session}</td>
              <td className="border p-2">{r.semester}</td>
              <td className="border p-2">{r.publish}</td>
              <td className="border p-2"><pre className="whitespace-pre-wrap">{r.data}</pre></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
