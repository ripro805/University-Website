import { useState, useEffect } from 'react';

const sampleCourses = [
  { code: 'CSE101', name: 'Intro to Programming', program: 'CSE', year: 1, semester: 'Fall', faculty: 'Dr. Alice' },
  { code: 'CSE102', name: 'Data Structures', program: 'CSE', year: 1, semester: 'Spring', faculty: 'Dr. Bob' },
  { code: 'EEE101', name: 'Circuit Analysis', program: 'EEE', year: 1, semester: 'Fall', faculty: 'Dr. Carol' },
];

export default function StudentCourses(){
  const [courses, setCourses] = useState([]);
  const [q, setQ] = useState('');
  const [program, setProgram] = useState('');
  const [year, setYear] = useState('');

  useEffect(()=>{
    const stored = JSON.parse(localStorage.getItem('courses') || 'null');
    if (stored) setCourses(stored);
    else setCourses(sampleCourses);
  },[]);

  const filtered = courses.filter(c=>{
    if (q && !(c.name.toLowerCase().includes(q.toLowerCase())||c.code.toLowerCase().includes(q.toLowerCase()))) return false;
    if (program && c.program !== program) return false;
    if (year && String(c.year) !== String(year)) return false;
    return true;
  });

  function assignFaculty(code){
    const name = prompt('Faculty name'); if (!name) return;
    const next = courses.map(c=> c.code===code? {...c, faculty: name} : c);
    setCourses(next); localStorage.setItem('courses', JSON.stringify(next));
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Courses</h2>
      <div className="flex gap-2 mb-4">
        <input className="border p-2" placeholder="Search by name or code" value={q} onChange={e=>setQ(e.target.value)} />
        <input className="border p-2" placeholder="Program" value={program} onChange={e=>setProgram(e.target.value)} />
        <input className="border p-2" placeholder="Year" value={year} onChange={e=>setYear(e.target.value)} />
      </div>
      <table className="w-full">
        <thead>
          <tr><th className="border p-2">Code</th><th className="border p-2">Name</th><th className="border p-2">Program</th><th className="border p-2">Year</th><th className="border p-2">Semester</th><th className="border p-2">Faculty</th><th className="border p-2">Action</th></tr>
        </thead>
        <tbody>
          {filtered.map(c=> (
            <tr key={c.code}><td className="border p-2">{c.code}</td><td className="border p-2">{c.name}</td><td className="border p-2">{c.program}</td><td className="border p-2">{c.year}</td><td className="border p-2">{c.semester}</td><td className="border p-2">{c.faculty||'-'}</td><td className="border p-2"><button onClick={()=>assignFaculty(c.code)} className="px-2 py-1 bg-blue-600 text-white rounded">Assign</button></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
