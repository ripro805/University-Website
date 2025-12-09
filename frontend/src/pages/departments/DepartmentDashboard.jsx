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

  useEffect(() => {
    const deptData = departmentsFullData[slug];
    setDept(deptData);
    
    // Auto-expand the faculty that contains this department
    Object.keys(facultiesData).forEach(facultyKey => {
      const faculty = facultiesData[facultyKey];
      const hasDept = faculty.departments.some(d => d.slug === slug);
      if (hasDept) {
        setExpandedFaculties(prev => ({ ...prev, [facultyKey]: true }));
      }
    });
  }, [slug]);

  const toggleFaculty = (facultyKey) => {
    setExpandedFaculties(prev => ({
      ...prev,
      [facultyKey]: !prev[facultyKey]
    }));
  };

  const handleSectionClick = (sectionId, hasSubmenu) => {
    if (hasSubmenu) {
      setActiveSubmenu(activeSubmenu === sectionId ? null : sectionId);
    } else {
      setActiveSection(sectionId);
      setActiveSubmenu(null);
      setIsSidebarOpen(false);
    }
  };

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{dept.name}</h1>
              <p className="text-blue-100">
                {dept.faculty} • Established: {dept.established}
              </p>
            </div>
            <div className="text-6xl font-bold opacity-20">{dept.shortName}</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Sidebar */}
          <aside
            className={`
              fixed lg:sticky top-0 left-0 h-screen lg:h-auto
              w-80 bg-white shadow-lg rounded-lg overflow-y-auto
              transition-transform duration-300 z-40
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                Department Navigation
              </h2>

              {/* Faculty-wise Department Navigation */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">
                  All Departments
                </h3>
                {Object.keys(facultiesData).map(facultyKey => {
                  const faculty = facultiesData[facultyKey];
                  const isExpanded = expandedFaculties[facultyKey];
                  
                  return (
                    <div key={facultyKey} className="mb-2">
                      <button
                        onClick={() => toggleFaculty(facultyKey)}
                        className="flex items-center justify-between w-full text-left p-2 hover:bg-gray-100 rounded transition-colors"
                      >
                        <span className="font-medium text-gray-700 text-sm">
                          {faculty.name}
                        </span>
                        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </button>
                      
                      {isExpanded && (
                        <div className="ml-4 mt-1 space-y-1">
                          {faculty.departments.map(d => (
                            <Link
                              key={d.slug}
                              to={`/departments/${d.slug}`}
                              className={`block p-2 text-sm rounded transition-colors ${
                                d.slug === slug
                                  ? 'bg-blue-100 text-blue-700 font-medium'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              {d.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <hr className="my-4" />

              {/* Department Menu Items */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">
                  Department Sections
                </h3>
                <nav className="space-y-1">
                  {departmentMenuItems.map(item => (
                    <div key={item.id}>
                      <button
                        onClick={() => handleSectionClick(item.id, !!item.submenu)}
                        className={`flex items-center justify-between w-full text-left p-3 rounded transition-colors ${
                          activeSection === item.id && !item.submenu
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {item.submenu && (
                          activeSubmenu === item.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />
                        )}
                      </button>

                      {/* Submenu */}
                      {item.submenu && activeSubmenu === item.id && (
                        <div className="ml-8 mt-1 space-y-1">
                          {item.submenu.map(subitem => (
                            <button
                              key={subitem.id}
                              onClick={() => {
                                setActiveSection(subitem.id);
                                setIsSidebarOpen(false);
                              }}
                              className={`block w-full text-left p-2 text-sm rounded transition-colors ${
                                activeSection === subitem.id
                                  ? 'bg-blue-100 text-blue-700 font-medium'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              {subitem.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          {/* Overlay for mobile */}
          {isSidebarOpen && (
            <div
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            />
          )}

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white shadow rounded-lg p-8">
              {/* About Department */}
              {activeSection === "about" && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">About Department</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 text-lg mb-6">{dept.about.overview}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                      <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Vision</h3>
                        <p className="text-gray-700">{dept.about.vision}</p>
                      </div>
                      <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Mission</h3>
                        <p className="text-gray-700">{dept.about.mission}</p>
                      </div>
                    </div>

                    {dept.about.objectives && (
                      <div className="mt-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Objectives</h3>
                        <ul className="space-y-2">
                          {dept.about.objectives.map((obj, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-blue-600 mr-3 mt-1">✓</span>
                              <span className="text-gray-700">{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Head of Department */}
                  <div className="mt-10 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg border border-blue-200">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <span className="text-3xl">👤</span>
                      Head of Department
                    </h3>
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        {dept.head.image ? (
                          <img 
                            src={dept.head.image} 
                            alt={dept.head.name}
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg" style={{display: dept.head.image ? 'none' : 'flex'}}>
                          {dept.head.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-2xl text-gray-800 mb-1">{dept.head.name}</h4>
                        <p className="text-blue-600 font-semibold text-lg mb-3">{dept.head.designation}</p>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <p className="text-gray-600 mb-2">
                            <strong className="text-gray-800">📧 Email:</strong> {dept.head.email}
                          </p>
                          <p className="text-gray-600">
                            <strong className="text-gray-800">📱 Phone:</strong> {dept.head.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Faculty Members */}
                  {dept.about.faculty && dept.about.faculty.length > 0 && (
                    <div className="mt-10">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <span className="text-3xl">👨‍🏫</span>
                        Our Faculty Members
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {dept.about.faculty.map((faculty, idx) => (
                          <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                {faculty.image ? (
                                  <img 
                                    src={faculty.image} 
                                    alt={faculty.name}
                                    className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200 shadow-md"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      e.target.nextSibling.style.display = 'flex';
                                    }}
                                  />
                                ) : null}
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-md" style={{display: faculty.image ? 'none' : 'flex'}}>
                                  {faculty.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-lg text-gray-800 mb-1">{faculty.name}</h4>
                                <p className="text-blue-600 font-semibold text-sm mb-1">{faculty.designation}</p>
                                {faculty.role && (
                                  <p className="text-green-600 text-xs font-medium mb-2">
                                    {faculty.role === "Head of Department" ? "🏆 " + faculty.role : faculty.role}
                                  </p>
                                )}
                                
                                <div className="mt-3 space-y-2 text-sm">
                                  <div className="flex items-start gap-2">
                                    <span className="font-semibold text-gray-700 min-w-[90px]">Education:</span>
                                    <span className="text-gray-600">{faculty.education}</span>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <span className="font-semibold text-gray-700 min-w-[90px]">Specialization:</span>
                                    <span className="text-gray-600">{faculty.specialization}</span>
                                  </div>
                                  {faculty.experience && (
                                    <div className="flex items-start gap-2">
                                      <span className="font-semibold text-gray-700 min-w-[90px]">Experience:</span>
                                      <span className="text-gray-600">{faculty.experience}</span>
                                    </div>
                                  )}
                                  {faculty.publications && (
                                    <div className="flex items-start gap-2">
                                      <span className="font-semibold text-gray-700 min-w-[90px]">Publications:</span>
                                      <span className="text-gray-600">{faculty.publications}+ papers</span>
                                    </div>
                                  )}
                                  <div className="flex items-start gap-2">
                                    <span className="font-semibold text-gray-700 min-w-[90px]">Email:</span>
                                    <span className="text-gray-600 text-xs">{faculty.email}</span>
                                  </div>
                                  {faculty.phone && (
                                    <div className="flex items-start gap-2">
                                      <span className="font-semibold text-gray-700 min-w-[90px]">Phone:</span>
                                      <span className="text-gray-600">{faculty.phone}</span>
                                    </div>
                                  )}
                                </div>

                                {faculty.researchInterests && faculty.researchInterests.length > 0 && (
                                  <div className="mt-3">
                                    <p className="font-semibold text-gray-700 text-xs mb-2">Research Interests:</p>
                                    <div className="flex flex-wrap gap-1">
                                      {faculty.researchInterests.map((interest, i) => (
                                        <span key={i} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                                          {interest}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Programs */}
              {activeSection === "programs" && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Academic Programs</h2>
                  
                  {dept.programs.undergraduate.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-700 mb-4">Undergraduate Programs</h3>
                      <div className="space-y-4">
                        {dept.programs.undergraduate.map((program, idx) => (
                          <div key={idx} className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                            <h4 className="text-xl font-bold text-gray-800 mb-3">{program.degree}</h4>
                            <div className="grid md:grid-cols-3 gap-4 text-gray-700">
                              <div><strong>Duration:</strong> {program.duration}</div>
                              <div><strong>Credits:</strong> {program.credits}</div>
                              <div><strong>Intake:</strong> {program.intake}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {dept.programs.graduate.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-700 mb-4">Graduate Programs</h3>
                      <div className="space-y-4">
                        {dept.programs.graduate.map((program, idx) => (
                          <div key={idx} className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                            <h4 className="text-xl font-bold text-gray-800 mb-3">{program.degree}</h4>
                            <div className="grid md:grid-cols-3 gap-4 text-gray-700">
                              <div><strong>Duration:</strong> {program.duration}</div>
                              <div><strong>Credits:</strong> {program.credits}</div>
                              <div><strong>Intake:</strong> {program.intake}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Syllabus */}
              {activeSection === "syllabus" && dept.syllabus && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Course Syllabus</h2>
                  
                  {dept.syllabus.undergraduate && (
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-700 mb-4">Undergraduate Syllabus</h3>
                      <div className="space-y-4">
                        {dept.syllabus.undergraduate.map((sem, idx) => (
                          <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-bold text-gray-800 mb-2">Semester {sem.semester}</h4>
                            <ul className="grid md:grid-cols-2 gap-2">
                              {sem.courses.map((course, cidx) => (
                                <li key={cidx} className="text-gray-700">• {course}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {dept.syllabus.graduate && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-700 mb-4">Graduate Syllabus</h3>
                      <div className="space-y-4">
                        {dept.syllabus.graduate.map((sem, idx) => (
                          <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-bold text-gray-800 mb-2">Semester {sem.semester}</h4>
                            <ul className="grid md:grid-cols-2 gap-2">
                              {sem.courses.map((course, cidx) => (
                                <li key={cidx} className="text-gray-700">• {course}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Academic Committee */}
              {activeSection === "academic-committee" && dept.academicCommittee && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Academic Committee</h2>
                  <div className="space-y-4">
                    {dept.academicCommittee.map((member, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-gray-800">{member.name}</h4>
                          <p className="text-blue-600">{member.designation}</p>
                        </div>
                        <span className="text-gray-600 font-medium">{member.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Course Distribution */}
              {activeSection === "course-distribution" && dept.courseDistribution && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Course Distribution</h2>
                  <div className="space-y-4">
                    {dept.courseDistribution.map((item, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-800 mb-2">{item.teacher}</h4>
                        <ul className="space-y-1">
                          {item.courses.map((course, cidx) => (
                            <li key={cidx} className="text-gray-700">• {course}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Active Faculty */}
              {activeSection === "active-faculty" && dept.facultyStaff?.activeFaculty && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Active Faculty</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {dept.facultyStaff.activeFaculty.map((faculty, idx) => (
                      <div key={idx} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-lg text-gray-800">{faculty.name}</h4>
                        <p className="text-blue-600 mb-2">{faculty.designation}</p>
                        <p className="text-gray-600 text-sm mb-2">
                          <strong>Specialization:</strong> {faculty.specialization}
                        </p>
                        <p className="text-gray-600 text-sm mb-2">
                          <strong>Education:</strong> {faculty.education}
                        </p>
                        <p className="text-gray-600 text-sm">
                          <strong>Email:</strong> {faculty.email}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Faculty on Leave */}
              {activeSection === "faculty-on-leave" && dept.facultyStaff?.facultyOnLeave && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Faculty on Leave</h2>
                  {dept.facultyStaff.facultyOnLeave.length === 0 ? (
                    <div className="bg-gray-50 p-8 rounded-lg text-center">
                      <p className="text-gray-600 text-lg">No faculty members are currently on leave.</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      {dept.facultyStaff.facultyOnLeave.map((faculty, idx) => (
                        <div key={idx} className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6 hover:shadow-xl transition-all duration-300">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              {faculty.image ? (
                                <img 
                                  src={faculty.image} 
                                  alt={faculty.name}
                                  className="w-24 h-24 rounded-lg object-cover border-2 border-yellow-300 shadow-md"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                              ) : null}
                              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-md" style={{display: faculty.image ? 'none' : 'flex'}}>
                                {faculty.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-lg text-gray-800 mb-1">{faculty.name}</h4>
                              <p className="text-orange-600 font-semibold text-sm mb-1">{faculty.designation}</p>
                              
                              <div className="mt-3 space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                  <span className="font-semibold text-gray-700 min-w-[90px]">Education:</span>
                                  <span className="text-gray-600">{faculty.education}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <span className="font-semibold text-gray-700 min-w-[90px]">Specialization:</span>
                                  <span className="text-gray-600">{faculty.specialization}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <span className="font-semibold text-gray-700 min-w-[90px]">Email:</span>
                                  <span className="text-gray-600 text-xs">{faculty.email}</span>
                                </div>
                                {faculty.phone && (
                                  <div className="flex items-start gap-2">
                                    <span className="font-semibold text-gray-700 min-w-[90px]">Phone:</span>
                                    <span className="text-gray-600">{faculty.phone}</span>
                                  </div>
                                )}
                              </div>

                              {faculty.researchInterests && faculty.researchInterests.length > 0 && (
                                <div className="mt-3">
                                  <p className="font-semibold text-gray-700 text-xs mb-2">Research Interests:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {faculty.researchInterests.map((interest, i) => (
                                      <span key={i} className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                                        {interest}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Leave Information */}
                              <div className="mt-4 pt-4 border-t border-yellow-300">
                                <div className="bg-white/60 p-3 rounded-lg space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-yellow-600 font-bold text-xs">📅 Leave Type:</span>
                                    <span className="text-gray-800 font-semibold text-sm">{faculty.leaveType}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-yellow-600 font-bold text-xs">⏰ Period:</span>
                                    <span className="text-gray-700 text-sm">{faculty.leavePeriod}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-yellow-600 font-bold text-xs">📝 Reason:</span>
                                    <span className="text-gray-700 text-sm">{faculty.leaveReason}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Former Faculty */}
              {activeSection === "former-faculty" && dept.facultyStaff?.formerFaculty && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Former Faculty</h2>
                  <div className="space-y-4">
                    {dept.facultyStaff.formerFaculty.map((faculty, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-800">{faculty.name}</h4>
                        <p className="text-gray-600">{faculty.designation}</p>
                        <p className="text-sm text-gray-600 mt-2">
                          <strong>Period:</strong> {faculty.period}<br />
                          <strong>Current Position:</strong> {faculty.currentPosition}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Office Staff */}
              {activeSection === "office-staff" && dept.facultyStaff?.officeStaff && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Office Staff</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {dept.facultyStaff.officeStaff.map((staff, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-800">{staff.name}</h4>
                        <p className="text-gray-600 text-sm">{staff.designation}</p>
                        <p className="text-gray-600 text-sm mt-2">{staff.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Research Areas */}
              {activeSection === "research-areas" && dept.research?.areas && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Research Areas</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {dept.research.areas.map((area, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-600">
                        <p className="text-gray-800 font-medium">{area}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Publications */}
              {activeSection === "publications" && dept.research?.publications && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Publications</h2>
                  <div className="space-y-6">
                    {dept.research.publications.map((pub, idx) => (
                      <div key={idx} className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-600">
                        <h4 className="font-bold text-lg text-gray-800 mb-2">{pub.title}</h4>
                        <p className="text-gray-600 mb-2">
                          <strong>Authors:</strong> {pub.authors}
                        </p>
                        <p className="text-gray-600">
                          <strong>{pub.journal ? 'Journal' : 'Conference'}:</strong>{' '}
                          {pub.journal || pub.conference} ({pub.year})
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Undergraduate Admission */}
              {activeSection === "undergraduate" && dept.admission?.undergraduate && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Undergraduate Admission</h2>
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Eligibility</h3>
                      <p className="text-gray-700">{dept.admission.undergraduate.eligibility}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Available Seats</h3>
                      <p className="text-gray-700">{dept.admission.undergraduate.seats} students per year</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Admission Process</h3>
                      <ol className="space-y-2">
                        {dept.admission.undergraduate.process.map((step, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-blue-600 font-bold mr-3">{idx + 1}.</span>
                            <span className="text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Tuition Fees</h3>
                      <p className="text-gray-700">{dept.admission.undergraduate.fees}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Graduate Admission */}
              {activeSection === "graduate" && dept.admission?.graduate && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Graduate Admission</h2>
                  <div className="space-y-6">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Eligibility</h3>
                      <p className="text-gray-700">{dept.admission.graduate.eligibility}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Available Seats</h3>
                      <p className="text-gray-700">{dept.admission.graduate.seats} students per year</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Admission Process</h3>
                      <ol className="space-y-2">
                        {dept.admission.graduate.process.map((step, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-600 font-bold mr-3">{idx + 1}.</span>
                            <span className="text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Tuition Fees</h3>
                      <p className="text-gray-700">{dept.admission.graduate.fees}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Notices */}
              {activeSection === "notices" && dept.notices && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Notices</h2>
                  <div className="space-y-4">
                    {dept.notices.map((notice, idx) => (
                      <div key={idx} className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-lg text-gray-800">{notice.title}</h4>
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
                            {notice.category}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{notice.date}</p>
                        <p className="text-gray-700">{notice.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Alumni */}
              {activeSection === "alumni" && dept.alumni && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Notable Alumni</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {dept.alumni.map((alum, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-l-4 border-purple-600">
                        <h4 className="font-bold text-lg text-gray-800">{alum.name}</h4>
                        <p className="text-purple-600 mb-2">Batch of {alum.batch}</p>
                        <p className="text-gray-700 mb-2">
                          <strong>Current Position:</strong> {alum.currentPosition}
                        </p>
                        <p className="text-gray-600 text-sm">
                          <strong>Achievement:</strong> {alum.achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact */}
              {activeSection === "contact" && dept.contact && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Information</h2>
                  <div className="bg-gray-50 p-8 rounded-lg">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-800 mb-3">Department Office</h4>
                        <p className="text-gray-700 mb-2">
                          <strong>Email:</strong> {dept.contact.email}
                        </p>
                        <p className="text-gray-700 mb-2">
                          <strong>Phone:</strong> {dept.contact.phone}
                        </p>
                        <p className="text-gray-700">
                          <strong>Office Hours:</strong><br />
                          {dept.contact.officeHours}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-3">Address</h4>
                        <p className="text-gray-700">
                          {dept.contact.office}<br />
                          Gopalganj Science and Technology University<br />
                          {dept.contact.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
