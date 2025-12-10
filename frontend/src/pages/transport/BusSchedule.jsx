import { useState, useEffect } from 'react';

export default function BusSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({ busId: '', day: '', time: '' });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('busSchedules') || 'null');
    if (stored) {
      setSchedules(stored);
    } else {
      const sampleSchedules = [
        { id: 1, busId: 'B1', day: 'Monday', time: '07:00 AM', route: 'Downtown → Campus' },
        { id: 2, busId: 'B1', day: 'Tuesday', time: '07:00 AM', route: 'Downtown → Campus' },
        { id: 3, busId: 'B2', day: 'Monday', time: '07:30 AM', route: 'West Side → Campus' },
        { id: 4, busId: 'B4', day: 'Monday', time: '08:15 AM', route: 'Faculty Housing → Campus' },
      ];
      localStorage.setItem('busSchedules', JSON.stringify(sampleSchedules));
      setSchedules(sampleSchedules);
    }
  }, []);

  function addSchedule() {
    if (!newSchedule.busId || !newSchedule.day || !newSchedule.time) {
      return alert('All fields required');
    }
    const entry = { id: Date.now(), ...newSchedule, route: 'Sample Route' };
    const updated = [entry, ...schedules];
    setSchedules(updated);
    localStorage.setItem('busSchedules', JSON.stringify(updated));
    setNewSchedule({ busId: '', day: '', time: '' });
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Bus Schedule</h2>
      
      {localStorage.getItem('userRole') === 'transport-admin' && (
        <div className="bg-gray-50 p-4 rounded mb-6 border-l-4 border-blue-600">
          <h3 className="font-bold mb-3">Add New Schedule</h3>
          <div className="flex gap-2 flex-wrap">
            <input
              className="border p-2 rounded"
              placeholder="Bus ID (e.g., B1)"
              value={newSchedule.busId}
              onChange={(e) => setNewSchedule({...newSchedule, busId: e.target.value})}
            />
            <input
              className="border p-2 rounded"
              placeholder="Day"
              value={newSchedule.day}
              onChange={(e) => setNewSchedule({...newSchedule, day: e.target.value})}
            />
            <input
              className="border p-2 rounded"
              placeholder="Time"
              value={newSchedule.time}
              onChange={(e) => setNewSchedule({...newSchedule, time: e.target.value})}
            />
            <button
              onClick={addSchedule}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3 text-left">Bus ID</th>
            <th className="border p-3 text-left">Day</th>
            <th className="border p-3 text-left">Time</th>
            <th className="border p-3 text-left">Route</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(s => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="border p-3">{s.busId}</td>
              <td className="border p-3">{s.day}</td>
              <td className="border p-3 font-medium text-blue-600">{s.time}</td>
              <td className="border p-3">{s.route}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
