import React from 'react';

export default function LibraryHome() {
  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-2">Central Library</h2>
      <p className="text-gray-700 mb-4">Welcome to the Gopalgoanj STU Central Library. Use the sidebar to browse books, view your reservations, or access library services.</p>
      <div className="space-y-2">
        <p className="font-semibold">Quick links:</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Books list</li>
          <li>Reservations</li>
          <li>Issue & return</li>
          <li>Fines & payments</li>
        </ul>
      </div>
    </div>
  );
}
