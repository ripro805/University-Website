import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function OfficeExams(){
  const { dept } = useParams();
  const key = `office_${dept}_exams`;
  const [exams, setExams] = useState([]);

  useEffect(()=>{
    const s = JSON.parse(localStorage.getItem(key) || '[]');
    setExams(s);
  },[key]);

  function add(){
    const id = Date.now();
    const name = prompt('Exam name')||''; const session = prompt('Session')||''; const semester = prompt('Semester')||'';
    const start = prompt('Start date')||''; const end = prompt('End date')||''; const routine = prompt('Exam routine text')||'';
    const next = [{ id, name, session, semester, start, end, routine }, ...exams]; setExams(next); localStorage.setItem(key, JSON.stringify(next));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Exams - {dept}</h2>
        <button onClick={add} className="bg-blue-600 text-white px-3 py-1 rounded">Add Exam</button>
      </div>

      <table className="w-full bg-white">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Session</th>
            <th className="border p-2">Semester</th>
            <th className="border p-2">Start</th>
            <th className="border p-2">End</th>
            <th className="border p-2">Routine</th>
          </tr>
        </thead>
        <tbody>
          {exams.map(e=> (
            <tr key={e.id}>
              <td className="border p-2">{e.id}</td>
              <td className="border p-2">{e.name}</td>
              <td className="border p-2">{e.session}</td>
              <td className="border p-2">{e.semester}</td>
              <td className="border p-2">{e.start}</td>
              <td className="border p-2">{e.end}</td>
              <td className="border p-2"><pre className="whitespace-pre-wrap">{e.routine}</pre></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
