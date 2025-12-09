import { useState } from "react";
import { Search, Mail, Phone, Eye } from "lucide-react";

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  
  const courses = ["all", "CSE-101", "CSE-201", "CSE-301"];
  
  const [students] = useState([
    {
      id: 1,
      studentId: "2021-01-001",
      name: "Mahmud Rahman",
      email: "mahmud@student.gstu.ac.bd",
      phone: "+880-1XXX-111111",
      course: "CSE-101",
      section: "A",
      cgpa: "3.75"
    },
    {
      id: 2,
      studentId: "2021-01-002",
      name: "Fatima Akter",
      email: "fatima@student.gstu.ac.bd",
      phone: "+880-1XXX-222222",
      course: "CSE-101",
      section: "A",
      cgpa: "3.92"
    },
    {
      id: 3,
      studentId: "2021-01-003",
      name: "Kamal Hossain",
      email: "kamal@student.gstu.ac.bd",
      phone: "+880-1XXX-333333",
      course: "CSE-201",
      section: "B",
      cgpa: "3.65"
    },
    {
      id: 4,
      studentId: "2021-01-004",
      name: "Nusrat Jahan",
      email: "nusrat@student.gstu.ac.bd",
      phone: "+880-1XXX-444444",
      course: "CSE-201",
      section: "B",
      cgpa: "3.88"
    },
    {
      id: 5,
      studentId: "2021-01-005",
      name: "Rahim Ahmed",
      email: "rahim@student.gstu.ac.bd",
      phone: "+880-1XXX-555555",
      course: "CSE-301",
      section: "A",
      cgpa: "3.54"
    }
  ]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === "all" || student.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Students</h2>

      {/* Filters */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Courses</option>
            {courses.filter(c => c !== "all").map((course) => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-600">
          <p className="text-sm text-gray-600 mb-1">Total Students</p>
          <p className="text-3xl font-bold text-blue-700">{filteredStudents.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-600">
          <p className="text-sm text-gray-600 mb-1">Active Courses</p>
          <p className="text-3xl font-bold text-green-700">3</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border-l-4 border-purple-600">
          <p className="text-sm text-gray-600 mb-1">Average CGPA</p>
          <p className="text-3xl font-bold text-purple-700">3.75</p>
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="text-left p-3 font-semibold text-gray-700">Student ID</th>
              <th className="text-left p-3 font-semibold text-gray-700">Name</th>
              <th className="text-left p-3 font-semibold text-gray-700">Course</th>
              <th className="text-left p-3 font-semibold text-gray-700">Section</th>
              <th className="text-left p-3 font-semibold text-gray-700">CGPA</th>
              <th className="text-left p-3 font-semibold text-gray-700">Contact</th>
              <th className="text-left p-3 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-medium text-gray-800">{student.studentId}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {student.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                      <span className="font-medium text-gray-800">{student.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-gray-700">{student.course}</td>
                  <td className="p-3">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-medium">
                      {student.section}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`font-semibold ${
                      parseFloat(student.cgpa) >= 3.75 ? 'text-green-600' :
                      parseFloat(student.cgpa) >= 3.5 ? 'text-blue-600' :
                      'text-gray-600'
                    }`}>
                      {student.cgpa}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <a
                        href={`mailto:${student.email}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title={student.email}
                      >
                        <Mail size={18} />
                      </a>
                      <a
                        href={`tel:${student.phone}`}
                        className="text-green-600 hover:text-green-800 transition-colors"
                        title={student.phone}
                      >
                        <Phone size={18} />
                      </a>
                    </div>
                  </td>
                  <td className="p-3">
                    <button className="text-gray-600 hover:text-blue-600 transition-colors">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-8 text-gray-500">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
