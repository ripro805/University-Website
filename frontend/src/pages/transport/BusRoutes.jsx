import { useState, useEffect } from 'react';

export default function BusRoutes() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('buses') || 'null');
    if (stored) {
      setBuses(stored);
    } else {
      const sampleBuses = [
        { id: 'B1', name: 'Student Bus 1', type: 'Student', route: 'Downtown → Campus', departure: '07:00 AM', capacity: 50, stops: 4 },
        { id: 'B2', name: 'Student Bus 2', type: 'Student', route: 'West Side → Campus', departure: '07:30 AM', capacity: 45, stops: 5 },
        { id: 'B3', name: 'Student Bus 3', type: 'Student', route: 'East Side → Campus', departure: '08:00 AM', capacity: 48, stops: 3 },
        { id: 'B4', name: 'Teacher Bus 1', type: 'Teacher', route: 'Faculty Housing → Campus', departure: '08:15 AM', capacity: 30, stops: 2 },
        { id: 'B5', name: 'Teacher Bus 2', type: 'Teacher', route: 'City Center → Campus', departure: '08:30 AM', capacity: 28, stops: 3 },
      ];
      localStorage.setItem('buses', JSON.stringify(sampleBuses));
      setBuses(sampleBuses);
    }
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">University Bus Routes</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Buses */}
        <div>
          <h3 className="text-xl font-bold text-blue-700 mb-4 pb-2 border-b">Student Buses</h3>
          {buses.filter(b => b.type === 'Student').map(bus => (
            <div key={bus.id} className="bg-blue-50 p-4 mb-3 rounded border-l-4 border-blue-600">
              <p className="font-bold text-lg">{bus.name}</p>
              <p className="text-sm text-gray-600 mt-1"><strong>Route:</strong> {bus.route}</p>
              <p className="text-sm text-gray-600"><strong>Departure:</strong> {bus.departure}</p>
              <p className="text-sm text-gray-600"><strong>Capacity:</strong> {bus.capacity} seats</p>
              <p className="text-sm text-gray-600"><strong>Stops:</strong> {bus.stops}</p>
            </div>
          ))}
        </div>

        {/* Teacher Buses */}
        <div>
          <h3 className="text-xl font-bold text-green-700 mb-4 pb-2 border-b">Teacher Buses</h3>
          {buses.filter(b => b.type === 'Teacher').map(bus => (
            <div key={bus.id} className="bg-green-50 p-4 mb-3 rounded border-l-4 border-green-600">
              <p className="font-bold text-lg">{bus.name}</p>
              <p className="text-sm text-gray-600 mt-1"><strong>Route:</strong> {bus.route}</p>
              <p className="text-sm text-gray-600"><strong>Departure:</strong> {bus.departure}</p>
              <p className="text-sm text-gray-600"><strong>Capacity:</strong> {bus.capacity} seats</p>
              <p className="text-sm text-gray-600"><strong>Stops:</strong> {bus.stops}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
