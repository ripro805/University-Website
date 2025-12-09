import { useState, useEffect } from 'react';

export default function StudentDocuments(){
  const id = localStorage.getItem('student_id') || 'unknown';
  const key = `student_${id}_docs`;
  const [docs, setDocs] = useState([]);

  useEffect(()=>{
    const d = JSON.parse(localStorage.getItem(key) || '[]');
    setDocs(d);
  },[key]);

  function handleFile(e){
    const file = e.target.files[0];
    if (!file) return;
    const entry = { id: Date.now(), name: file.name, size: file.size, uploadedAt: new Date().toISOString() };
    const next = [entry, ...docs];
    setDocs(next);
    localStorage.setItem(key, JSON.stringify(next));
    e.target.value = null;
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Documents</h2>
      <input type="file" onChange={handleFile} />
      <ul className="mt-4">
        {docs.map(d=> (
          <li key={d.id} className="border p-2 mb-2">{d.name} — {Math.round(d.size/1024)} KB — {new Date(d.uploadedAt).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}
