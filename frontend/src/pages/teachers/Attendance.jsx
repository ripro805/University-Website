import { useState } from "react";
import { Calendar, Save, Download } from "lucide-react";

export default function Attendance() {
  const [selectedCourse, setSelectedCourse] = useState("CSE-101");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const courses = ["CSE-101", "CSE-201", "CSE-301"];
  
  const [attendance, setAttendance] = useState({
    "CSE-101": [
      { id: 1, studentId: "2021-01-001", name: "Mahmud Rahman", present: true },
      { id: 2, studentId: "2021-01-002", name: "Fatima Akter", present: true },
      { id: 3, studentId: "2021-01-006", name: "Sharif Islam", present: false }
    ],
    "CSE-201": [
      { id: 4, studentId: "2021-01-003", name: "Kamal Hossain", present: true },
      { id: 5, studentId: "2021-01-004", name: "Nusrat Jahan", present: true }
    ],
    "CSE-301": [
      { id: 6, studentId: "2021-01-005", name: "Rahim Ahmed", present: true }
    ]
  });

  const toggleAttendance = (studentId) => {
    setAttendance(prev => ({
      ...prev,
      [selectedCourse]: prev[selectedCourse].map(student =>
        student.id === studentId
          ? { ...student, present: !student.present }
          : student
      )
    }));
  };

  const markAllPresent = () => {
    setAttendance(prev => ({
      ...prev,
      [selectedCourse]: prev[selectedCourse].map(student => ({ ...student, present: true }))
    }));
  };

  const markAllAbsent = () => {
    setAttendance(prev => ({
      ...prev,
      [selectedCourse]: prev[selectedCourse].map(student => ({ ...student, present: false }))
    }));
  };

  const saveAttendance = () => {
    alert(`Attendance saved for ${selectedCourse} on ${selectedDate}`);
  };

  const currentStudents = attendance[selectedCourse] || [];
  const presentCount = currentStudents.filter(s => s.present).length;
  const absentCount = currentStudents.length - presentCount;
  const attendancePercentage = currentStudents.length > 0 
    ? ((presentCount / currentStudents.length) * 100).toFixed(1) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Attendance Marking */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Mark Attendance</h2>

        {/* Course and Date Selection */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {courses.map((course) => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={markAllPresent}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Mark All Present
          </button>
          <button
            onClick={markAllAbsent}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Mark All Absent
          </button>
        </div>

        {/* Students List */}
        <div className="space-y-3 mb-6">
          {currentStudents.map((student) => (
            <div
              key={student.id}
              className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                student.present
                  ? 'bg-green-50 border-green-300'
                  : 'bg-red-50 border-red-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                  student.present ? 'bg-green-600' : 'bg-red-600'
                }`}>
                  {student.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{student.name}</p>
                  <p className="text-sm text-gray-600">{student.studentId}</p>
                </div>
              </div>

              <button
                onClick={() => toggleAttendance(student.id)}
                className={`px-6 py-2 rounded font-semibold transition-colors ${
                  student.present
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {student.present ? 'Present' : 'Absent'}
              </button>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <button
          onClick={saveAttendance}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors w-full justify-center font-semibold"
        >
          <Save size={20} />
          Save Attendance
        </button>
      </div>

      {/* Attendance Summary */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Attendance Summary</h2>
          <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
            <Download size={18} />
            Export Report
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-l-4 border-blue-600">
            <p className="text-sm text-gray-600 mb-2">Total Students</p>
            <p className="text-4xl font-bold text-blue-700">{currentStudents.length}</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-l-4 border-green-600">
            <p className="text-sm text-gray-600 mb-2">Present Today</p>
            <p className="text-4xl font-bold text-green-700">{presentCount}</p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border-l-4 border-red-600">
            <p className="text-sm text-gray-600 mb-2">Absent Today</p>
            <p className="text-4xl font-bold text-red-700">{absentCount}</p>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-700">Attendance Rate</span>
            <span className="text-2xl font-bold text-blue-700">{attendancePercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${attendancePercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
