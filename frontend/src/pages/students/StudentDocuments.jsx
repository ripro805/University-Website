import { useState, useEffect } from 'react';

export default function StudentDocuments(){
  const id = localStorage.getItem('student_id') || 'unknown';
  const key = `student_${id}_docs`;
  const [docs, setDocs] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(()=>{
    const d = JSON.parse(localStorage.getItem(key) || '[]');
    setDocs(d);
  },[key]);

  function handleFile(e){
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = function(ev){
      const entry = { id: Date.now(), name: file.name, size: file.size, uploadedAt: new Date().toISOString(), data: ev.target.result };
      const next = [entry, ...docs];
      setDocs(next);
      localStorage.setItem(key, JSON.stringify(next));
      setUploading(false);
    };
    reader.readAsDataURL(file);
    e.target.value = null;
  }

  function downloadDoc(d){
    if(!d.data) return;
    const a = document.createElement('a');
    a.href = d.data;
    a.download = d.name;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  return (
    <div className="bg-gray-50 p-6 rounded shadow max-w-4xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-blue-700">Documents</h2>
        <div className="text-sm text-gray-600">Upload your certificates, ID or other documents</div>
      </div>

      <div className="bg-white p-4 rounded shadow-sm">
        <div className="flex gap-3 items-center">
          <label className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700">
            <input type="file" onChange={handleFile} className="hidden" />
            <span>Choose File</span>
          </label>
          {uploading && <div className="text-sm text-gray-500">Processing...</div>}
        </div>

        <ul className="mt-4 space-y-3">
          {docs.length === 0 && <li className="text-gray-500">No documents uploaded yet.</li>}
          {docs.map(d=> (
            <li key={d.id} className="border p-3 rounded flex items-center justify-between">
              <div>
                <div className="font-medium">{d.name}</div>
                <div className="text-sm text-gray-500">{Math.round(d.size/1024)} KB — {new Date(d.uploadedAt).toLocaleString()}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>downloadDoc(d)} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Download</button>
                <a href={d.data} target="_blank" rel="noreferrer" className="px-3 py-1 bg-gray-100 rounded text-sm">View</a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
