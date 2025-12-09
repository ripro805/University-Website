import { useState } from 'react';
import { FaCheck, FaTimes, FaSearch, FaFilter, FaEye } from 'react-icons/fa';
import { applicationsData, hallsData } from './adminData';

const Applications = () => {
  const [applications, setApplications] = useState(applicationsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id) => {
    if (window.confirm('Are you sure you want to approve this application?')) {
      setApplications(applications.map(app =>
        app.id === id ? { ...app, status: 'Approved' } : app
      ));
      alert('Application approved successfully!');
    }
  };

  const handleReject = (id) => {
    if (window.confirm('Are you sure you want to reject this application?')) {
      setApplications(applications.map(app =>
        app.id === id ? { ...app, status: 'Rejected' } : app
      ));
      alert('Application rejected!');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const statusCounts = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'Pending').length,
    approved: applications.filter(a => a.status === 'Approved').length,
    rejected: applications.filter(a => a.status === 'Rejected').length
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Hall Applications</h2>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Applications</p>
            <p className="text-2xl font-bold text-blue-600">{statusCounts.total}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Approved</p>
            <p className="text-2xl font-bold text-green-600">{statusCounts.approved}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Rejected</p>
            <p className="text-2xl font-bold text-red-600">{statusCounts.rejected}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or student ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-3 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hall Preference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold">{app.studentId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{app.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{app.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{app.hallPreference}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{app.appliedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => { setSelectedApplication(app); setShowDetailModal(true); }}
                        className="text-blue-600 hover:text-blue-800"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      {app.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(app.id)}
                            className="text-green-600 hover:text-green-800"
                            title="Approve"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => handleReject(app.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Reject"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredApplications.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No applications found matching your criteria.
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Application Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Student ID</p>
                <p className="font-semibold">{selectedApplication.studentId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold">{selectedApplication.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Department</p>
                <p className="font-semibold">{selectedApplication.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{selectedApplication.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold">{selectedApplication.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Hall Preference</p>
                <p className="font-semibold">{selectedApplication.hallPreference}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Applied Date</p>
                <p className="font-semibold">{selectedApplication.appliedDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedApplication.status)}`}>
                  {selectedApplication.status}
                </span>
              </div>
            </div>

            <div className="mt-6 flex space-x-2">
              {selectedApplication.status === 'Pending' && (
                <>
                  <button
                    onClick={() => {
                      handleApprove(selectedApplication.id);
                      setShowDetailModal(false);
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                  >
                    <FaCheck />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => {
                      handleReject(selectedApplication.id);
                      setShowDetailModal(false);
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    <FaTimes />
                    <span>Reject</span>
                  </button>
                </>
              )}
              <button
                onClick={() => setShowDetailModal(false)}
                className={`${selectedApplication.status === 'Pending' ? 'flex-1' : 'w-full'} bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
