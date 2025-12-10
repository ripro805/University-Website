import { useState, useEffect } from 'react';

export default function SportsSchedule(){
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ name: '', sport: '', date: '', time: '', venue: '' });

  useEffect(()=>{
    const stored = JSON.parse(localStorage.getItem('sportsEvents') || 'null');
    if(stored) setEvents(stored);
    else {
      const sample = [
        { id: 1, name: 'Inter-University Football', sport: 'Football', date: '2026-01-15', time: '10:00', venue: 'Main Stadium' },
        { id: 2, name: 'Men\'s Basketball Friendly', sport: 'Basketball', date: '2026-01-20', time: '14:00', venue: 'Gym Hall' },
        { id: 3, name: 'Women\'s Volleyball Tournament', sport: 'Volleyball', date: '2026-02-05', time: '09:30', venue: 'Indoor Arena' }
      ];
      localStorage.setItem('sportsEvents', JSON.stringify(sample));
      setEvents(sample);
    }
  },[]);

  function addEvent(){
    if(!form.name || !form.sport || !form.date) return alert('Name, sport and date required');
    const entry = { id: Date.now(), ...form };
    const next = [entry, ...events];
    setEvents(next);
    localStorage.setItem('sportsEvents', JSON.stringify(next));
    setForm({ name: '', sport: '', date: '', time: '', venue: '' });
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sports Schedule</h2>

      {localStorage.getItem('userRole') === 'sports-admin' && (
        <div className="mb-6 bg-gray-50 p-4 rounded border-l-4 border-green-600">
          <h3 className="font-bold mb-2">Add Event</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input className="border p-2" placeholder="Event name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
            <input className="border p-2" placeholder="Sport" value={form.sport} onChange={e=>setForm({...form, sport: e.target.value})} />
            <input className="border p-2" type="date" value={form.date} onChange={e=>setForm({...form, date: e.target.value})} />
            <input className="border p-2" placeholder="Time" value={form.time} onChange={e=>setForm({...form, time: e.target.value})} />
            <input className="border p-2" placeholder="Venue" value={form.venue} onChange={e=>setForm({...form, venue: e.target.value})} />
            <div className="flex items-center">
              <button onClick={addEvent} className="bg-green-600 text-white px-4 py-2 rounded">Post Event</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {events.map(ev=> (
          <div key={ev.id} className="border p-4 rounded bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-lg">{ev.name}</h4>
                <p className="text-sm text-gray-700">{ev.sport} — {ev.date} {ev.time && `• ${ev.time}`}</p>
                <p className="text-sm text-gray-600">Venue: {ev.venue || 'TBD'}</p>
              </div>
              <div className="text-sm text-gray-500">ID: {ev.id}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
