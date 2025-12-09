import { useState, useEffect } from 'react';

function calcGPA(semesters){
  const totals = semesters.reduce((acc,s)=>{
    const credits = Number(s.credits||0); const gp = Number(s.gp||0);
    acc.creditSum += credits; acc.weighted += credits * gp; return acc;
  }, { creditSum:0, weighted:0 });
  const gpa = totals.creditSum? (totals.weighted / totals.creditSum) : 0;
  return { gpa: Number(gpa.toFixed(2)), credits: totals.creditSum };
}

export default function StudentCGPA(){
  const id = localStorage.getItem('student_id') || 'unknown';
  const key = `student_${id}_semesters`;
  const [semesters, setSemesters] = useState([]);
  const [session, setSession] = useState('');
  const [semesterName, setSemesterName] = useState('');
  const [credits, setCredits] = useState('');
  const [gp, setGp] = useState('');

  useEffect(()=>{
    const s = JSON.parse(localStorage.getItem(key) || '[]'); setSemesters(s);
  },[key]);

  function add(){
    if(!session||!semesterName) return alert('Provide session and semester');
    const entry = { id: Date.now(), session, semesterName, credits: Number(credits)||0, gp: Number(gp)||0 };
    const next = [entry, ...semesters]; setSemesters(next); localStorage.setItem(key, JSON.stringify(next));
    setSession(''); setSemesterName(''); setCredits(''); setGp('');
  }

  const semStats = semesters.map(s=> ({ ...s, gpa: s.credits? Number((s.gp).toFixed(2)) : 0 }));
  const total = calcGPA(semesters);
  const programTotalCredits = 160;
  const remaining = Math.max(0, programTotalCredits - total.credits);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">CGPA Calculator</h2>
      <div className="flex gap-2 mb-4">
        <input className="border p-2" placeholder="Session" value={session} onChange={e=>setSession(e.target.value)} />
        <input className="border p-2" placeholder="Semester" value={semesterName} onChange={e=>setSemesterName(e.target.value)} />
        <input className="border p-2" placeholder="Credits" value={credits} onChange={e=>setCredits(e.target.value)} />
        <input className="border p-2" placeholder="Avg GP" value={gp} onChange={e=>setGp(e.target.value)} />
        <button onClick={add} className="bg-blue-600 text-white px-3 py-1 rounded">Add</button>
      </div>

      <div className="mb-4">
        <strong>Semester List</strong>
        <ul className="mt-2">
          {semesters.map(s=> <li key={s.id} className="border p-2 mb-1">{s.session} - {s.semesterName} — Credits: {s.credits} — AvgGP: {s.gp}</li>)}
        </ul>
      </div>

      <div className="p-4 bg-gray-50 rounded">
        <p><strong>Total Credits Completed:</strong> {total.credits}</p>
        <p><strong>Current CGPA (weighted):</strong> {total.gpa}</p>
        <p><strong>Credits Remaining (est):</strong> {remaining}</p>
      </div>
    </div>
  );
}
