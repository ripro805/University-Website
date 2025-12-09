import { useState } from "react";
import { Upload, FileText, Video, FileSpreadsheet, Plus, Trash2, Calendar } from "lucide-react";

export default function Courses() {
  const [courses] = useState([
    {
      id: 1,
      code: "CSE-101",
      name: "Programming Fundamentals",
      semester: "Fall 2024",
      section: "A",
      students: 45,
      schedule: "Sun, Tue, Thu - 10:00 AM"
    },
    {
      id: 2,
      code: "CSE-201",
      name: "Data Structures",
      semester: "Fall 2024",
      section: "B",
      students: 38,
      schedule: "Mon, Wed - 2:00 PM"
    },
    {
      id: 3,
      code: "CSE-301",
      name: "Algorithms",
      semester: "Fall 2024",
      section: "A",
      students: 42,
      schedule: "Sat, Mon - 11:00 AM"
    }
  ]);

  const [materials, setMaterials] = useState([
    { id: 1, courseCode: "CSE-101", title: "Lecture 1 - Introduction", type: "PDF", uploadDate: "2024-12-01" },
    { id: 2, courseCode: "CSE-101", title: "Variables and Data Types", type: "Video", uploadDate: "2024-12-03" },
    { id: 3, courseCode: "CSE-201", title: "Arrays and Linked Lists", type: "PPT", uploadDate: "2024-12-05" }
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialType, setMaterialType] = useState("PDF");

  const handleUpload = () => {
    if (!selectedCourse || !materialTitle) {
      alert("Please fill all fields");
      return;
    }

    const newMaterial = {
      id: materials.length + 1,
      courseCode: selectedCourse,
      title: materialTitle,
      type: materialType,
      uploadDate: new Date().toISOString().split('T')[0]
    };

    setMaterials([...materials, newMaterial]);
    setShowUploadModal(false);
    setSelectedCourse("");
    setMaterialTitle("");
    setMaterialType("PDF");
    alert("Material uploaded successfully!");
  };

  const deleteMaterial = (id) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      setMaterials(materials.filter(m => m.id !== id));
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "PDF": return <FileText className="text-red-600" size={20} />;
      case "PPT": return <FileSpreadsheet className="text-orange-600" size={20} />;
      case "Video": return <Video className="text-blue-600" size={20} />;
      default: return <FileText className="text-gray-600" size={20} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* My Courses */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Courses</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{course.code}</h3>
                  <p className="text-gray-600 font-medium">{course.name}</p>
                </div>
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  Sec {course.section}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-blue-600" />
                  <span>{course.semester}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Students:</span>
                  <span>{course.students}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Schedule:</span>
                  <span className="text-xs">{course.schedule}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Study Materials */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Study Materials</h2>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            Upload Material
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-700">Course</th>
                <th className="text-left p-3 font-semibold text-gray-700">Title</th>
                <th className="text-left p-3 font-semibold text-gray-700">Type</th>
                <th className="text-left p-3 font-semibold text-gray-700">Upload Date</th>
                <th className="text-left p-3 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr key={material.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">{material.courseCode}</td>
                  <td className="p-3 text-gray-700">{material.title}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(material.type)}
                      <span className="text-sm">{material.type}</span>
                    </div>
                  </td>
                  <td className="p-3 text-gray-600 text-sm">{material.uploadDate}</td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteMaterial(material.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Upload Study Material</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Select Course --</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.code}>
                      {course.code} - {course.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Material Title</label>
                <input
                  type="text"
                  value={materialTitle}
                  onChange={(e) => setMaterialTitle(e.target.value)}
                  placeholder="e.g., Lecture 5 - Loops"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Material Type</label>
                <select
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="PDF">PDF</option>
                  <option value="PPT">PowerPoint</option>
                  <option value="Video">Video</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload File</label>
                <div className="border-2 border-dashed border-gray-300 rounded p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-gray-600 text-sm">Click to upload or drag and drop</p>
                  <input type="file" className="hidden" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleUpload}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Upload
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
