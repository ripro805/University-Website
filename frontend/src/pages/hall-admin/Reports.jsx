import { FaBuilding, FaDoorOpen, FaUsers, FaChartLine, FaDownload } from 'react-icons/fa';
import { hallsData, roomsData, studentsData } from './adminData';

const Reports = () => {
  // Calculate statistics
  const totalHalls = hallsData.length;
  const totalCapacity = hallsData.reduce((sum, hall) => sum + hall.capacity, 0);
  const totalOccupied = hallsData.reduce((sum, hall) => sum + hall.occupied, 0);
  const occupancyRate = ((totalOccupied / totalCapacity) * 100).toFixed(1);

  const totalRooms = roomsData.length;
  const availableRooms = roomsData.filter(r => r.roomStatus === 'Available').length;
  const occupiedRooms = roomsData.filter(r => r.roomStatus === 'Occupied').length;
  const partiallyOccupied = roomsData.filter(r => r.roomStatus === 'Partially Occupied').length;

  const totalStudents = studentsData.length;
  const allocatedStudents = studentsData.filter(s => s.roomId).length;
  const unallocatedStudents = studentsData.filter(s => !s.roomId).length;

  // Hall-wise breakdown
  const hallBreakdown = hallsData.map(hall => {
    const hallRooms = roomsData.filter(r => r.hallId === hall.id);
    const hallStudents = studentsData.filter(s => s.hallId === hall.id);
    return {
      name: hall.name,
      capacity: hall.capacity,
      occupied: hall.occupied,
      available: hall.capacity - hall.occupied,
      occupancyRate: ((hall.occupied / hall.capacity) * 100).toFixed(1),
      rooms: hallRooms.length,
      students: hallStudents.length
    };
  });

  // Room type breakdown
  const roomTypes = {
    Single: roomsData.filter(r => r.roomType === 'Single').length,
    'Five-Seat': roomsData.filter(r => r.roomType === 'Five-Seat').length,
    General: roomsData.filter(r => r.roomType === 'General').length
  };

  const handleDownloadReport = () => {
    alert('Report download functionality will be implemented with backend integration');
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Hall & Room Reports</h2>
          <button
            onClick={handleDownloadReport}
            className="flex items-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          >
            <FaDownload />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Halls</p>
              <p className="text-3xl font-bold text-blue-700">{totalHalls}</p>
            </div>
            <FaBuilding className="text-4xl text-blue-700 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Rooms</p>
              <p className="text-3xl font-bold text-blue-600">{totalRooms}</p>
            </div>
            <FaDoorOpen className="text-4xl text-blue-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Students</p>
              <p className="text-3xl font-bold text-purple-600">{totalStudents}</p>
            </div>
            <FaUsers className="text-4xl text-purple-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Occupancy Rate</p>
              <p className="text-3xl font-bold text-orange-600">{occupancyRate}%</p>
            </div>
            <FaChartLine className="text-4xl text-orange-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Capacity Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Capacity Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded p-4">
            <p className="text-gray-600 text-sm mb-1">Total Capacity</p>
            <p className="text-2xl font-bold text-gray-800">{totalCapacity}</p>
          </div>
          <div className="border border-gray-200 rounded p-4">
            <p className="text-gray-600 text-sm mb-1">Occupied Seats</p>
            <p className="text-2xl font-bold text-blue-600">{totalOccupied}</p>
          </div>
          <div className="border border-gray-200 rounded p-4">
            <p className="text-gray-600 text-sm mb-1">Available Seats</p>
            <p className="text-2xl font-bold text-blue-600">{totalCapacity - totalOccupied}</p>
          </div>
        </div>
      </div>

      {/* Room Status Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Room Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded p-4">
            <p className="text-gray-600 text-sm mb-1">Available Rooms</p>
            <p className="text-2xl font-bold text-blue-600">{availableRooms}</p>
          </div>
          <div className="border border-gray-200 rounded p-4">
            <p className="text-gray-600 text-sm mb-1">Partially Occupied</p>
            <p className="text-2xl font-bold text-yellow-600">{partiallyOccupied}</p>
          </div>
          <div className="border border-gray-200 rounded p-4">
            <p className="text-gray-600 text-sm mb-1">Fully Occupied</p>
            <p className="text-2xl font-bold text-red-600">{occupiedRooms}</p>
          </div>
        </div>
      </div>

      {/* Room Type Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Room Type Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded p-4 text-center">
            <p className="text-gray-600 text-sm mb-1">Single Rooms</p>
            <p className="text-3xl font-bold text-blue-600">{roomTypes.Single}</p>
          </div>
          <div className="border border-gray-200 rounded p-4 text-center">
            <p className="text-gray-600 text-sm mb-1">Five-Seat Rooms</p>
            <p className="text-3xl font-bold text-blue-600">{roomTypes['Five-Seat']}</p>
          </div>
          <div className="border border-gray-200 rounded p-4 text-center">
            <p className="text-gray-600 text-sm mb-1">General Rooms (15 seats)</p>
            <p className="text-3xl font-bold text-purple-600">{roomTypes.General}</p>
          </div>
        </div>
      </div>

      {/* Student Allocation Status */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Student Allocation Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded p-4">
            <p className="text-gray-600 text-sm mb-1">Allocated Students</p>
            <p className="text-2xl font-bold text-blue-600">{allocatedStudents}</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(allocatedStudents / totalStudents) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="border border-gray-200 rounded p-4">
            <p className="text-gray-600 text-sm mb-1">Unallocated Students</p>
            <p className="text-2xl font-bold text-orange-600">{unallocatedStudents}</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full"
                style={{ width: `${(unallocatedStudents / totalStudents) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Hall-wise Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Hall-wise Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hall Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Occupied</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Available</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rooms</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Occupancy Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {hallBreakdown.map((hall, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{hall.name}</td>
                  <td className="px-6 py-4">{hall.capacity}</td>
                  <td className="px-6 py-4 text-blue-600 font-semibold">{hall.occupied}</td>
                  <td className="px-6 py-4 text-blue-600 font-semibold">{hall.available}</td>
                  <td className="px-6 py-4">{hall.rooms}</td>
                  <td className="px-6 py-4">{hall.students}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{hall.occupancyRate}%</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            parseFloat(hall.occupancyRate) > 90 ? 'bg-red-600' :
                            parseFloat(hall.occupancyRate) > 70 ? 'bg-yellow-600' :
                            'bg-blue-600'
                          }`}
                          style={{ width: `${hall.occupancyRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;






