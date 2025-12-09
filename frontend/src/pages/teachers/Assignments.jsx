import { useState } from "react";
import { Plus, Upload, Eye, Edit2, Trash2, CheckCircle } from "lucide-react";

export default function Assignments() {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      course: "CSE-101",
      title: "Arrays and Loops",
      description: "Write programs on arrays and loops",
      dueDate: "2024-12-20",
      totalMarks: 20,
      submissions: 12,
      totalStudents: 15
    },
    {
      id: 2,
      course: "CSE-201",
      title: "Linked List Implementation",
      description: "Implement singly and doubly linked lists",
      dueDate: "2024-12-25",
      totalMarks: 30,
      submissions: 8,
      totalStudents: 12
    }
  ]);

  const [submissions] = useState([
    { id: 1, assignmentId: 1, studentId: "2021-01-001", studentName: "Mahmud Rahman", submittedDate: "2024-12-10", marks: null },
    { id: 2, assignmentId: 1, studentId: "2021-01-002", studentName: "Fatima Akter", submittedDate: "2024-12-11", marks: 18 },
    { id: 3, assignmentId: 2, studentId: "2021-01-003", studentName: "Kamal Hossain", submittedDate: "2024-12-12", marks: null }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSubmissionsModal, setShowSubmissionsModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  
  const [newAssignment, setNewAssignment] = useState({
    course: "CSE-101",
    title: "",
    description: "",
    dueDate: "",
    totalMarks: ""
  });

  const createAssignment = () => {
    if (!newAssignment.title || !newAssignment.dueDate || !newAssignment.totalMarks) {
      alert("Please fill all required fields");
      return;
    }

    const assignment = {
      id: assignments.length + 1,
      ...newAssignment,
      submissions: 0,
      totalStudents: 15
    };

    setAssignments([...assignments, assignment]);
    setShowCreateModal(false);
    setNewAssignment({ course: "CSE-101", title: "", description: "", dueDate: "", totalMarks: "" });
    alert("Assignment created successfully!");
  };

  const deleteAssignment = (id) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  const viewSubmissions = (assignment) => {
    setSelectedAssignment(assignment);
    setShowSubmissionsModal(true);
  };

  const getSubmissionRate = (assignment) => {
    return ((assignment.submissions / assignment.totalStudents) * 100).toFixed(0);
  };

  const assignmentSubmissions = selectedAssignment 
    ? submissions.filter(s => s.assignmentId === selectedAssignment.id)
    : [];

  return (
    <div className="space-y-6">
      {/* Assignments List */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Assignments</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            Create Assignment
          </button>
        </div>

        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold">
                      {assignment.course}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800">{assignment.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-3">{assignment.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Due Date:</span>
                      <p className="font-semibold text-gray-800">{assignment.dueDate}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Marks:</span>
                      <p className="font-semibold text-gray-800">{assignment.totalMarks}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Submissions:</span>
                      <p className="font-semibold text-gray-800">
                        {assignment.submissions}/{assignment.totalStudents}
                        <span className="text-blue-600 ml-2">({getSubmissionRate(assignment)}%)</span>
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${getSubmissionRate(assignment)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => viewSubmissions(assignment)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                    title="View Submissions"
                  >
                    <Eye size={20} />
                  </button>
                  <button
                    className="p-2 text-green-600 hover:bg-green-100 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => deleteAssignment(assignment.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Create New Assignment</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Course *</label>
                <select
                  value={newAssignment.course}
                  onChange={(e) => setNewAssignment({ ...newAssignment, course: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="CSE-101">CSE-101</option>
                  <option value="CSE-201">CSE-201</option>
                  <option value="CSE-301">CSE-301</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Assignment Title *</label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  placeholder="e.g., Arrays and Loops"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  placeholder="Describe the assignment..."
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date *</label>
                  <input
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Marks *</label>
                  <input
                    type="number"
                    value={newAssignment.totalMarks}
                    onChange={(e) => setNewAssignment({ ...newAssignment, totalMarks: e.target.value })}
                    placeholder="e.g., 20"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Attach Document (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-gray-600 text-sm">Click to upload assignment file</p>
                  <input type="file" className="hidden" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={createAssignment}
                className="flex-1 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors font-semibold"
              >
                Create Assignment
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded hover:bg-gray-400 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submissions Modal */}
      {showSubmissionsModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Submissions: {selectedAssignment.title}
              </h3>
              <button
                onClick={() => setShowSubmissionsModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <Plus size={24} className="rotate-45" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-700">Student ID</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Name</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Submitted Date</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Marks</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignmentSubmissions.map((sub) => (
                    <tr key={sub.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-800">{sub.studentId}</td>
                      <td className="p-3 text-gray-700">{sub.studentName}</td>
                      <td className="p-3 text-gray-600">{sub.submittedDate}</td>
                      <td className="p-3">
                        {sub.marks !== null ? (
                          <span className="flex items-center gap-2 text-green-600 font-semibold">
                            <CheckCircle size={16} />
                            {sub.marks}/{selectedAssignment.totalMarks}
                          </span>
                        ) : (
                          <input
                            type="number"
                            placeholder="Grade"
                            className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                      </td>
                      <td className="p-3">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors">
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
