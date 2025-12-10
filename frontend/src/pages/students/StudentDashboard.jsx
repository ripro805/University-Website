import React, { useEffect, useState } from 'react';

export default function StudentDashboard(){
  const id = localStorage.getItem('student_id') || 'unknown';
  const dept = localStorage.getItem('student_dept') || 'N/A';
  const key = `student_${id}_profile`;
  const [profile, setProfile] = useState(null);

  useEffect(()=>{
    const p = JSON.parse(localStorage.getItem(key) || 'null');
    if(p) setProfile(p);
  },[key]);

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded shadow flex items-center gap-6">
        <div className="w-20 h-20 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
          {profile && profile.photo ? (
            <img src={profile.photo} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-400">{id}</div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold">{(profile && profile.name) || `Student ${id}`}</h2>
          <p className="text-sm text-gray-600">Department: <strong className="text-gray-800">{dept}</strong></p>
          {profile && (
            <p className="text-sm text-gray-600 mt-1">{profile.email || ''} {profile.phone && `• ${profile.phone}`}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Academic</h3>
          <p className="text-sm text-gray-600 mt-2">Session: <span className="text-gray-800">{(profile && profile.session) || 'N/A'}</span></p>
          <p className="text-sm text-gray-600">Year: <span className="text-gray-800">{(profile && profile.year) || 'N/A'}</span></p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Contact</h3>
          <p className="text-sm text-gray-600 mt-2">Email: <span className="text-gray-800">{(profile && profile.email) || 'Not set'}</span></p>
          <p className="text-sm text-gray-600">Phone: <span className="text-gray-800">{(profile && profile.phone) || 'Not set'}</span></p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Actions</h3>
          <p className="text-sm text-gray-600 mt-2">Use the left menu to edit your profile, upload documents, view routine and fees.</p>
        </div>
      </div>
    </div>
  );
}
