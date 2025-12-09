import { useState } from 'react';
import { FaUserPlus, FaUserMinus, FaSearch, FaFilter } from 'react-icons/fa';
import { hallsData, roomsData, studentsData } from './adminData';

const SeatAllocation = () => {
  const [students, setStudents] = useState(studentsData);
  const [rooms, setRooms] = useState(roomsData);
  const [selectedHall, setSelectedHall] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [allocationData, setAllocationData] = useState({
    hallId: '',
    roomId: ''
  });

  const unallocatedStudents = students.filter(s => !s.roomId);
  const allocatedStudents = students.filter(s => s.roomId);

  const filteredAllocated = allocatedStudents.filter(student => {
    const matchesHall = selectedHall === 'all' || student.hallId === parseInt(selectedHall);
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesHall && matchesSearch;
  });

  const getHallName = (hallId) => {
    const hall = hallsData.find(h => h.id === hallId);
    return hall ? hall.name : 'N/A';
  };

  const getRoomNumber = (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    return room ? room.roomNumber : 'N/A';
  };

  const getAvailableRooms = (hallId) => {
    return rooms.filter(r => r.hallId === parseInt(hallId) && r.occupiedSeats < r.totalSeats);
  };

  const handleAllocateSeat = () => {
    if (!allocationData.hallId || !allocationData.roomId) {
      alert('Please select both hall and room');
      return;
    }

    // Update student
    setStudents(students.map(s => 
      s.id === selectedStudent.id 
        ? { ...s, hallId: parseInt(allocationData.hallId), roomId: parseInt(allocationData.roomId) }
        : s
    ));

    // Update room occupancy
    setRooms(rooms.map(r => 
      r.id === parseInt(allocationData.roomId)
        ? { ...r, occupiedSeats: r.occupiedSeats + 1, availableSeats: r.availableSeats - 1, roomStatus: r.occupiedSeats + 1 >= r.totalSeats ? 'Occupied' : 'Partially Occupied' }
        : r
    ));

    setShowAllocateModal(false);
    setSelectedStudent(null);
    setAllocationData({ hallId: '', roomId: '' });
    alert('Seat allocated successfully!');
  };

  const handleDeallocateSeat = (student) => {
    if (window.confirm(`Are you sure you want to deallocate seat for ${student.name}?`)) {
      // Update room occupancy
      setRooms(rooms.map(r => {
        if (r.id === student.roomId) {
          const newOccupied = r.occupiedSeats - 1;
          return {
            ...r,
            occupiedSeats: newOccupied,
            availableSeats: r.availableSeats + 1,
            roomStatus: newOccupied === 0 ? 'Available' : 'Partially Occupied'
          };
        }
        return r;
      }));

      // Update student
      setStudents(students.map(s => 
        s.id === student.id 
          ? { ...s, hallId: null, roomId: null }
          : s
      ));

      alert('Seat deallocated successfully!');
    }
  };

  const openAllocateModal = (student) => {
    setSelectedStudent(student);
    setShowAllocateModal(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Seat Allocation Management</h2>
      </div>

      {/* Unallocated Students */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Unallocated Students ({unallocatedStudents.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {unallocatedStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold">{student.studentId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => openAllocateModal(student)}
                      className="flex items-center space-x-1 bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800 transition text-sm"
                    >
                      <FaUserPlus />
                      <span>Allocate</span>
                    </button>
                  </td>
                </tr>
              ))}
              {unallocatedStudents.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No unallocated students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Allocated Students */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            Allocated Students ({allocatedStudents.length})
          </h3>
        </div>

        {/* Filters */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or student ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-3 text-gray-400" />
            <select
              value={selectedHall}
              onChange={(e) => setSelectedHall(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Halls</option>
              {hallsData.map(hall => (
                <option key={hall.id} value={hall.id}>{hall.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hall</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAllocated.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold">{student.studentId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getHallName(student.hallId)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getRoomNumber(student.roomId)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDeallocateSeat(student)}
                      className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                    >
                      <FaUserMinus />
                      <span>Deallocate</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAllocated.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No allocated students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Allocate Seat Modal */}
      {showAllocateModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Allocate Seat</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-700"><span className="font-semibold">Student:</span> {selectedStudent.name}</p>
                <p className="text-gray-700"><span className="font-semibold">ID:</span> {selectedStudent.studentId}</p>
                <p className="text-gray-700"><span className="font-semibold">Department:</span> {selectedStudent.department}</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Select Hall</label>
                <select
                  value={allocationData.hallId}
                  onChange={(e) => setAllocationData({...allocationData, hallId: e.target.value, roomId: ''})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose a hall</option>
                  {hallsData.map(hall => (
                    <option key={hall.id} value={hall.id}>{hall.name}</option>
                  ))}
                </select>
              </div>

              {allocationData.hallId && (
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Select Room</label>
                  <select
                    value={allocationData.roomId}
                    onChange={(e) => setAllocationData({...allocationData, roomId: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Choose a room</option>
                    {getAvailableRooms(allocationData.hallId).map(room => (
                      <option key={room.id} value={room.id}>
                        Room {room.roomNumber} - {room.roomType} ({room.availableSeats} seats available)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex space-x-2">
                <button
                  onClick={handleAllocateSeat}
                  className="flex-1 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
                >
                  Allocate
                </button>
                <button
                  onClick={() => {
                    setShowAllocateModal(false);
                    setSelectedStudent(null);
                    setAllocationData({ hallId: '', roomId: '' });
                  }}
                  className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatAllocation;






