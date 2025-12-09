import { useState, useEffect } from 'react';

export default function StudentProfile(){
  const id = localStorage.getItem('student_id') || 'unknown';
  const key = `student_${id}_profile`;
  const [profile, setProfile] = useState({
    photo: '', name: '', email: '', address: '', linkedin: '', session: '', phone: '', currentSession: '', year: ''
  });

  useEffect(()=>{
    const p = JSON.parse(localStorage.getItem(key) || 'null');
    if (p) setProfile(p);
  },[key]);

  function save(){
    localStorage.setItem(key, JSON.stringify(profile));
    alert('Profile saved');
  }

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Student Profile</h2>
      <label className="block mb-2">Photo URL</label>
      <input className="w-full mb-3 p-2 border" value={profile.photo} onChange={e=>setProfile({...profile, photo: e.target.value})} />
      <label className="block mb-2">Name</label>
      <input className="w-full mb-3 p-2 border" value={profile.name} onChange={e=>setProfile({...profile, name: e.target.value})} />
      <label className="block mb-2">Email</label>
      <input className="w-full mb-3 p-2 border" value={profile.email} onChange={e=>setProfile({...profile, email: e.target.value})} />
      <label className="block mb-2">Address</label>
      <input className="w-full mb-3 p-2 border" value={profile.address} onChange={e=>setProfile({...profile, address: e.target.value})} />
      <label className="block mb-2">LinkedIn</label>
      <input className="w-full mb-3 p-2 border" value={profile.linkedin} onChange={e=>setProfile({...profile, linkedin: e.target.value})} />
      <label className="block mb-2">Session</label>
      <input className="w-full mb-3 p-2 border" value={profile.session} onChange={e=>setProfile({...profile, session: e.target.value})} />
      <label className="block mb-2">Phone</label>
      <input className="w-full mb-3 p-2 border" value={profile.phone} onChange={e=>setProfile({...profile, phone: e.target.value})} />
      <label className="block mb-2">Current Session</label>
      <input className="w-full mb-3 p-2 border" value={profile.currentSession} onChange={e=>setProfile({...profile, currentSession: e.target.value})} />
      <label className="block mb-2">Year</label>
      <input className="w-full mb-3 p-2 border" value={profile.year} onChange={e=>setProfile({...profile, year: e.target.value})} />
      <div className="flex gap-2">
        <button onClick={save} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </div>
    </div>
  );
}
