import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { departmentsFullData, departmentMenuItems, facultiesData } from "./departmentsData";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";

export default function DepartmentDashboard() {
  const { slug } = useParams();
  const [dept, setDept] = useState(null);
  const [activeSection, setActiveSection] = useState("about");
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedFaculties, setExpandedFaculties] = useState({});

  // Department data
  const dummyDepartments = {
    "computer-science-engineering": {
      name: "Computer Science & Engineering",
      shortName: "CSE",
      established: "2015",
      head: {
        name: "Dr. Mahmud Hasan",
        designation: "Professor",
        email: "mahmud.hasan@gstu.ac.bd",
        phone: "+880-XXX-XXXXXX",
        image: "/placeholder-professor.jpg"
      },
      overview: "The Department of Computer Science & Engineering at GSTU offers comprehensive education in computing, software development, artificial intelligence, and emerging technologies. Our mission is to produce skilled graduates who can contribute to the technological advancement of Bangladesh.",
      vision: "To be a center of excellence in computer science education and research, producing world-class computer professionals.",
      mission: "To provide quality education in computer science and engineering, foster innovation, and contribute to the technological development of the nation.",
      programs: [
        { degree: "B.Sc. in Computer Science & Engineering", duration: "4 Years", credits: "160" },
        { degree: "M.Sc. in Computer Science & Engineering", duration: "1-2 Years", credits: "30" }
      ],
      faculty: [
        { name: "Dr. Mahmud Hasan", designation: "Professor", specialization: "Artificial Intelligence" },
        { name: "Dr. Fatema Ahmed", designation: "Associate Professor", specialization: "Machine Learning" },
        { name: "Dr. Kamal Uddin", designation: "Assistant Professor", specialization: "Data Science" },
        { name: "Md. Rahman Ali", designation: "Lecturer", specialization: "Software Engineering" },
        { name: "Sharmin Akter", designation: "Lecturer", specialization: "Web Development" }
      ],
      facilities: [
        "Computer Lab with 60+ workstations",
        "High-speed internet connectivity",
        "Software Development Lab",
        "AI & Machine Learning Lab",
        "Digital library access",
        "Project work area"
      ],
      research: [
        "Artificial Intelligence and Machine Learning",
        "Data Science and Big Data Analytics",
        "Cybersecurity and Network Security",
        "Software Engineering and Development",
        "Internet of Things (IoT)",
        "Cloud Computing"
      ]
    },
    "electrical-electronic-engineering": {
      name: "Electrical & Electronic Engineering",
      shortName: "EEE",
      established: "2016",
      head: {
        name: "Dr. Saiful Islam",
        designation: "Professor",
        email: "saiful.islam@gstu.ac.bd",
        phone: "+880-XXX-XXXXXX",
        image: "/placeholder-professor.jpg"
      },
      overview: "The Department of Electrical & Electronic Engineering offers cutting-edge education in electrical power systems, electronics, telecommunications, and control systems.",
      vision: "To be a leading department in electrical and electronic engineering education and research.",
      mission: "To produce competent electrical and electronic engineers who can meet industrial demands.",
      programs: [
        { degree: "B.Sc. in Electrical & Electronic Engineering", duration: "4 Years", credits: "160" }
      ],
      faculty: [
        { name: "Dr. Saiful Islam", designation: "Professor", specialization: "Power Systems" },
        { name: "Dr. Nasrin Sultana", designation: "Associate Professor", specialization: "Electronics" }
      ],
      facilities: [
        "Electrical Machines Lab",
        "Power Systems Lab",
        "Electronics Lab",
        "Communication Lab"
      ],
      research: [
        "Renewable Energy Systems",
        "Power Electronics",
        "Communication Systems",
        "Control Systems"
      ]
    },
    physics: {
      name: "Physics",
      shortName: "PHY",
      established: "2014",
      head: {
        name: "Dr. Karim Mia",
        designation: "Professor",
        email: "karim.mia@gstu.ac.bd",
        phone: "+880-XXX-XXXXXX",
        image: "/placeholder-professor.jpg"
      },
      overview: "The Department of Physics provides comprehensive education in theoretical and experimental physics, preparing students for careers in research, education, and industry.",
      vision: "To be a center of excellence in physics education and research.",
      mission: "To provide quality education in physics and contribute to scientific knowledge.",
      programs: [
        { degree: "B.Sc. in Physics", duration: "4 Years", credits: "140" },
        { degree: "M.Sc. in Physics", duration: "1-2 Years", credits: "30" }
      ],
      faculty: [
        { name: "Dr. Karim Mia", designation: "Professor", specialization: "Theoretical Physics" },
        { name: "Dr. Rahima Begum", designation: "Associate Professor", specialization: "Quantum Mechanics" }
      ],
      facilities: [
        "Physics Laboratory",
        "Research Lab",
        "Digital Library"
      ],
      research: [
        "Quantum Physics",
        "Condensed Matter Physics",
        "Nuclear Physics"
      ]
    }
  };

  useEffect(() => {
    setDept(dummyDepartments[slug]);
  }, [slug]);

  if (!dept) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Department Not Found</h1>
          <Link to="/academics/departments" className="text-blue-600 hover:underline">
            Back to Departments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{dept.name}</h1>
              <p className="text-blue-100">Established: {dept.established}</p>
            </div>
            <div className="text-6xl font-bold opacity-20">{dept.shortName}</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="flex flex-wrap border-b">
            {["overview", "programs", "faculty", "facilities", "research", "contact"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "border-b-4 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white shadow rounded-lg p-6">
              
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
                  <p className="text-gray-700 mb-6">{dept.overview}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Vision</h3>
                      <p className="text-gray-700">{dept.vision}</p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Mission</h3>
                      <p className="text-gray-700">{dept.mission}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Programs Tab */}
              {activeTab === "programs" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Academic Programs</h2>
                  <div className="space-y-4">
                    {dept.programs.map((program, index) => (
                      <div key={index} className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">{program.degree}</h3>
                        <div className="grid grid-cols-2 gap-4 text-gray-700">
                          <div>
                            <span className="font-semibold">Duration:</span> {program.duration}
                          </div>
                          <div>
                            <span className="font-semibold">Credits:</span> {program.credits}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Faculty Tab */}
              {activeTab === "faculty" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Faculty Members</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {dept.faculty.map((member, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-gray-800">{member.name}</h3>
                        <p className="text-blue-600 text-sm">{member.designation}</p>
                        <p className="text-gray-600 text-sm mt-2">
                          <span className="font-semibold">Specialization:</span> {member.specialization}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Facilities Tab */}
              {activeTab === "facilities" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Facilities</h2>
                  <ul className="space-y-3">
                    {dept.facilities.map((facility, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-3 mt-1">✓</span>
                        <span className="text-gray-700">{facility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Research Tab */}
              {activeTab === "research" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Research Areas</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {dept.research.map((area, index) => (
                      <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-600">
                        <p className="text-gray-800 font-medium">{area}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Tab */}
              {activeTab === "contact" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-2">Department Office</h3>
                    <p className="text-gray-700 mb-4">
                      <strong>Email:</strong> {dept.head.email}<br />
                      <strong>Phone:</strong> {dept.head.phone}
                    </p>
                    <p className="text-gray-700">
                      <strong>Address:</strong><br />
                      Department of {dept.name}<br />
                      GSTU<br />
                      Gopalganj-8100, Bangladesh
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            
            {/* Head of Department */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Head of Department</h3>
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h4 className="font-bold text-gray-800">{dept.head.name}</h4>
                <p className="text-blue-600 text-sm mb-3">{dept.head.designation}</p>
                <div className="text-left text-sm text-gray-600">
                  <p className="mb-1"><strong>Email:</strong> {dept.head.email}</p>
                  <p><strong>Phone:</strong> {dept.head.phone}</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-blue-600 hover:underline">Admission Information</Link>
                </li>
                <li>
                  <Link to="#" className="text-blue-600 hover:underline">Course Curriculum</Link>
                </li>
                <li>
                  <Link to="#" className="text-blue-600 hover:underline">Faculty Research</Link>
                </li>
                <li>
                  <Link to="#" className="text-blue-600 hover:underline">Student Resources</Link>
                </li>
                <li>
                  <Link to="#" className="text-blue-600 hover:underline">Alumni Network</Link>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
