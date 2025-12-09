import { useState, useEffect } from 'react';

const sampleRoutine = [
  { id: 'R1', day: 'Monday', time: '09:00-10:30', course: 'CSE101', room: 'A1' },
  { id: 'R2', day: 'Tuesday', time: '10:45-12:15', course: 'CSE102', room: 'B2' },
];

export default function StudentRoutine(){
  const dept = localStorage.getItem('student_dept') || 'GEN';
  const key = `routine_${dept}`;
  const [items, setItems] = useState([]);

  useEffect(()=>{
    const s = JSON.parse(localStorage.getItem(key) || 'null');
    if (s) setItems(s); else setItems(sampleRoutine);
  },[key]);

  function add(){
    const course = prompt('Course code')||''; if(!course) return;
    const day = prompt('Day')||''; const time = prompt('Time')||''; const room = prompt('Room')||'';
    const entry = { id: Date.now().toString(), day, time, course, room };
    const next = [entry, ...items]; setItems(next); localStorage.setItem(key, JSON.stringify(next));
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Class Routine ({dept})</h2>
      <button onClick={add} className="bg-blue-600 text-white px-3 py-1 rounded mb-4">Add</button>
      <table className="w-full">
        <thead><tr><th className="border p-2">Day</th><th className="border p-2">Time</th><th className="border p-2">Course</th><th className="border p-2">Room</th></tr></thead>
        <tbody>
          {items.map(it=> <tr key={it.id}><td className="border p-2">{it.day}</td><td className="border p-2">{it.time}</td><td className="border p-2">{it.course}</td><td className="border p-2">{it.room}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}
