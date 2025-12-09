import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function OfficeEvents(){
  const { dept } = useParams();
  const key = `office_${dept}_events`;
  const [events, setEvents] = useState([]);

  useEffect(()=>{
    const s = JSON.parse(localStorage.getItem(key) || '[]');
    setEvents(s);
  },[key]);

  function add(){
    const id = Date.now();
    const name = prompt('Event name'); if (!name) return;
    const room = prompt('Room no')||''; const chief = prompt('Chief guest')||''; const start = prompt('Start time')||''; const end = prompt('End time')||'';
    const next = [{ id, name, room, chief, start, end }, ...events];
    setEvents(next); localStorage.setItem(key, JSON.stringify(next));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Events - {dept}</h2>
        <button onClick={add} className="bg-blue-600 text-white px-3 py-1 rounded">Add Event</button>
      </div>

      <table className="w-full bg-white">
        <thead>
          <tr>
            <th className="border p-2">Event ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Room No</th>
            <th className="border p-2">Chief Guest</th>
            <th className="border p-2">Start</th>
            <th className="border p-2">End</th>
          </tr>
        </thead>
        <tbody>
          {events.map(e=> (
            <tr key={e.id}>
              <td className="border p-2">{e.id}</td>
              <td className="border p-2">{e.name}</td>
              <td className="border p-2">{e.room}</td>
              <td className="border p-2">{e.chief}</td>
              <td className="border p-2">{e.start}</td>
              <td className="border p-2">{e.end}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
