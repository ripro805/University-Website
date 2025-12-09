import { useState } from "react";
import { Download, TrendingUp, TrendingDown, Users, BookOpen } from "lucide-react";

export default function Reports() {
  const [selectedCourse, setSelectedCourse] = useState("CSE-101");
  
  const courses = ["CSE-101", "CSE-201", "CSE-301"];

  const courseStats = {
    "CSE-101": {
      totalStudents: 45,
      averageAttendance: 87.5,
      averageMarks: 75.3,
      passRate: 92.5,
      assignmentsSubmitted: 85,
      trend: "up"
    },
    "CSE-201": {
      totalStudents: 38,
      averageAttendance: 82.0,
      averageMarks: 72.8,
      passRate: 88.0,
      assignmentsSubmitted: 78,
      trend: "down"
    },
    "CSE-301": {
      totalStudents: 42,
      averageAttendance: 90.5,
      averageMarks: 78.5,
      passRate: 95.0,
      assignmentsSubmitted: 92,
      trend: "up"
    }
  };

  const attendanceData = [
    { date: "2024-12-01", present: 40, absent: 5 },
    { date: "2024-12-03", present: 42, absent: 3 },
    { date: "2024-12-05", present: 38, absent: 7 },
    { date: "2024-12-08", present: 41, absent: 4 },
    { date: "2024-12-10", present: 39, absent: 6 }
  ];

  const performanceData = [
    { range: "90-100", students: 8, color: "bg-green-600" },
    { range: "80-89", students: 15, color: "bg-blue-600" },
    { range: "70-79", students: 12, color: "bg-yellow-600" },
    { range: "60-69", students: 7, color: "bg-orange-600" },
    { range: "Below 60", students: 3, color: "bg-red-600" }
  ];

  const currentStats = courseStats[selectedCourse];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Performance Reports</h2>
          <div className="flex gap-3">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {courses.map((course) => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              <Download size={18} />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-600 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="text-blue-600" size={32} />
            {currentStats.trend === "up" ? (
              <TrendingUp className="text-green-600" size={24} />
            ) : (
              <TrendingDown className="text-red-600" size={24} />
            )}
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Students</p>
          <p className="text-3xl font-bold text-blue-700">{currentStats.totalStudents}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-600 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="text-green-600" size={32} />
          </div>
          <p className="text-sm text-gray-600 mb-1">Avg Attendance</p>
          <p className="text-3xl font-bold text-green-700">{currentStats.averageAttendance}%</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-600 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Average Marks</p>
          <p className="text-3xl font-bold text-purple-700">{currentStats.averageMarks}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-orange-600 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-orange-600 text-2xl font-bold">✓</div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Pass Rate</p>
          <p className="text-3xl font-bold text-orange-700">{currentStats.passRate}%</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Attendance Trend */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Attendance Trend</h3>
          <div className="space-y-4">
            {attendanceData.map((data, index) => {
              const total = data.present + data.absent;
              const percentage = ((data.present / total) * 100).toFixed(1);
              
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="font-semibold text-gray-700">{data.date}</span>
                    <div className="flex gap-4">
                      <span className="text-green-600">Present: {data.present}</span>
                      <span className="text-red-600">Absent: {data.absent}</span>
                      <span className="text-blue-600 font-bold">{percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-green-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Distribution */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Performance Distribution</h3>
          <div className="space-y-4">
            {performanceData.map((data, index) => {
              const maxStudents = Math.max(...performanceData.map(d => d.students));
              const percentage = (data.students / maxStudents) * 100;
              
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-700">{data.range}</span>
                    <span className="text-gray-600">{data.students} students</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className={`${data.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Assignment Submission Rate */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Assignment Submission Overview</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Total Assignments</p>
            <p className="text-4xl font-bold text-blue-700">12</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Submitted</p>
            <p className="text-4xl font-bold text-green-700">{currentStats.assignmentsSubmitted}%</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Pending</p>
            <p className="text-4xl font-bold text-red-700">{100 - currentStats.assignmentsSubmitted}%</p>
          </div>
        </div>
      </div>

      {/* Summary Report */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-4">Course Summary - {selectedCourse}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Key Metrics:</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Total Enrolled Students: {currentStats.totalStudents}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Average Class Attendance: {currentStats.averageAttendance}%
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Assignment Completion Rate: {currentStats.assignmentsSubmitted}%
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Performance Insights:</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Class Average: {currentStats.averageMarks}/100
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Pass Rate: {currentStats.passRate}%
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Overall Trend: {currentStats.trend === "up" ? "Improving ↑" : "Declining ↓"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
