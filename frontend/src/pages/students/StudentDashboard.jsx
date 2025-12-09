import React from 'react';

export default function StudentDashboard(){
  const id = localStorage.getItem('student_id');
  const dept = localStorage.getItem('student_dept');
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome, Student {id || ''}</h2>
      <p className="mb-2">Department: <strong>{dept || 'N/A'}</strong></p>
      <p className="text-gray-600">Use the menu to access your profile, courses, routine, CGPA and payments.</p>
    </div>
  );
}
