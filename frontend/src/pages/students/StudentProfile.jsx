import { useState, useEffect } from 'react';

export default function StudentProfile(){
  const id = localStorage.getItem('student_id') || 'unknown';
  const key = `student_${id}_profile`;
  const [profile, setProfile] = useState({
    photo: '', name: '', email: '', address: '', linkedin: '', session: '', phone: '', currentSession: '', year: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(()=>{
    const p = JSON.parse(localStorage.getItem(key) || 'null');
    if (p) setProfile(p);
  },[key]);

  function handlePhotoChange(e){
    const file = e.target.files && e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = function(ev){
      setProfile(prev=> ({...prev, photo: ev.target.result}));
    };
    reader.readAsDataURL(file);
  }

  function save(){
    try{
      setSaving(true);
      localStorage.setItem(key, JSON.stringify(profile));
      setTimeout(()=>{ setSaving(false); alert('Profile saved'); }, 250);
    }catch(err){
      setSaving(false);
      alert('Failed to save profile');
    }
  }

  return (
    <div className="bg-gray-50 p-6 rounded shadow max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Student Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="col-span-1 flex flex-col items-center gap-4">
          <div className="w-40 h-40 bg-white rounded overflow-hidden shadow flex items-center justify-center">
            {profile.photo ? (
              <img src={profile.photo} alt="Profile" className="object-cover w-full h-full" />
            ) : (
              <div className="text-gray-400">No Photo</div>
            )}
          </div>
          <label className="w-full inline-block">
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            <span className="inline-block mt-2 bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700">Choose Photo</span>
          </label>
        </div>

        <div className="col-span-2 bg-white p-4 rounded shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input className="w-full p-2 border rounded" value={profile.name} onChange={e=>setProfile({...profile, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input className="w-full p-2 border rounded" value={profile.email} onChange={e=>setProfile({...profile, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input className="w-full p-2 border rounded" value={profile.phone} onChange={e=>setProfile({...profile, phone: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Year / Session</label>
              <input className="w-full p-2 border rounded" value={profile.year} onChange={e=>setProfile({...profile, year: e.target.value})} placeholder="e.g., 3rd Year / 2024-25" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input className="w-full p-2 border rounded" value={profile.address} onChange={e=>setProfile({...profile, address: e.target.value})} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">LinkedIn / Profile URL</label>
              <input className="w-full p-2 border rounded" value={profile.linkedin} onChange={e=>setProfile({...profile, linkedin: e.target.value})} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Session</label>
              <input className="w-full p-2 border rounded" value={profile.session} onChange={e=>setProfile({...profile, session: e.target.value})} />
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button onClick={save} className="bg-blue-600 text-white px-4 py-2 rounded">{saving? 'Saving...':'Save Profile'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
