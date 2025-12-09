import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import { hallsData } from './adminData';

const HallList = () => {
  const [halls, setHalls] = useState(hallsData);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHalls = halls.filter(hall =>
    hall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hall.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this hall?')) {
      setHalls(halls.filter(hall => hall.id !== id));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <h2 className="text-2xl font-bold text-gray-800">Manage Halls</h2>
          <Link
            to="/admin/halls/create"
            className="flex items-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          >
            <FaPlus />
            <span>Add New Hall</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search halls by name or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Halls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHalls.map((hall) => (
          <div key={hall.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <img
              src={hall.image}
              alt={hall.name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=Hall+Image';
              }}
            />
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{hall.name}</h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p><span className="font-semibold">Type:</span> {hall.type}</p>
                <p><span className="font-semibold">Capacity:</span> {hall.capacity}</p>
                <p><span className="font-semibold">Occupied:</span> {hall.occupied}</p>
                <p><span className="font-semibold">Available:</span> {hall.capacity - hall.occupied}</p>
                <p><span className="font-semibold">Established:</span> {hall.established}</p>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Occupancy</span>
                  <span>{Math.round((hall.occupied / hall.capacity) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-700 h-2 rounded-full"
                    style={{ width: `${(hall.occupied / hall.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{hall.description}</p>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Link
                  to={`/admin/halls/edit/${hall.id}`}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  <FaEdit />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={() => handleDelete(hall.id)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  <FaTrash />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredHalls.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">No halls found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default HallList;






