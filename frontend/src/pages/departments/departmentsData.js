// Faculty-wise Department Organization
export const facultiesData = {
  "faculty-of-science": {
    name: "Faculty of Science",
    departments: [
      { slug: "physics", name: "Physics", shortName: "PHY" },
      { slug: "mathematics", name: "Mathematics", shortName: "MATH" },
      { slug: "chemistry", name: "Chemistry", shortName: "CHEM" },
      { slug: "statistics", name: "Statistics", shortName: "STAT" }
    ]
  },
  "faculty-of-engineering": {
    name: "Faculty of Engineering",
    departments: [
      { slug: "computer-science-engineering", name: "Computer Science & Engineering", shortName: "CSE" },
      { slug: "electrical-electronic-engineering", name: "Electrical & Electronic Engineering", shortName: "EEE" },
      { slug: "civil-engineering", name: "Civil Engineering", shortName: "CE" },
      { slug: "chemical-engineering", name: "Chemical Engineering", shortName: "ChE" }
    ]
  },
  "faculty-of-business-studies": {
    name: "Faculty of Business Studies",
    departments: [
      { slug: "accounting-information-systems", name: "Accounting & Information Systems", shortName: "AIS" },
      { slug: "management", name: "Management", shortName: "MGT" },
      { slug: "marketing", name: "Marketing", shortName: "MKT" },
      { slug: "finance-banking", name: "Finance & Banking", shortName: "FIN" }
    ]
  },
  "faculty-of-social-science": {
    name: "Faculty of Social Science",
    departments: [
      { slug: "economics", name: "Economics", shortName: "ECO" },
      { slug: "sociology", name: "Sociology", shortName: "SOC" },
      { slug: "political-science", name: "Political Science", shortName: "POL" },
      { slug: "development-studies", name: "Development Studies", shortName: "DS" }
    ]
  },
  "faculty-of-arts": {
    name: "Faculty of Arts",
    departments: [
      { slug: "bangla", name: "Bangla", shortName: "BAN" },
      { slug: "english", name: "English", shortName: "ENG" },
      { slug: "history", name: "History", shortName: "HIS" },
      { slug: "islamic-studies", name: "Islamic Studies", shortName: "IS" }
    ]
  },
  "faculty-of-life-sciences": {
    name: "Faculty of Life Sciences",
    departments: [
      { slug: "agriculture", name: "Agriculture", shortName: "AG" },
      { slug: "fisheries", name: "Fisheries", shortName: "FISH" },
      { slug: "environmental-science", name: "Environmental Science", shortName: "ES" },
      { slug: "biotechnology", name: "Biotechnology", shortName: "BT" }
    ]
  }
};

// Sidebar Menu Items for Each Department
export const departmentMenuItems = [
  { id: "about", label: "About Department", icon: "ℹ️" },
  { id: "programs", label: "Programs", icon: "📚" },
  { id: "syllabus", label: "Syllabus", icon: "📋" },
  { id: "academic-committee", label: "Academic Committee", icon: "👥" },
  { id: "course-distribution", label: "Course Distribution", icon: "📊" },
  {
    id: "faculty-staff",
    label: "Faculty & Staff",
    icon: "👨‍🏫",
    submenu: [
      { id: "active-faculty", label: "Active Faculty" },
      { id: "faculty-on-leave", label: "Faculty on Leave" },
      { id: "former-faculty", label: "Former Faculty" },
      { id: "office-staff", label: "Office Staff" }
    ]
  },
  {
    id: "research",
    label: "Research",
    icon: "🔬",
    submenu: [
      { id: "research-areas", label: "Research Areas" },
      { id: "publications", label: "Publications" }
    ]
  },
  {
    id: "admission",
    label: "Admission",
    icon: "🎓",
    submenu: [
      { id: "undergraduate", label: "Undergraduate" },
      { id: "graduate", label: "MSc / Graduate" }
    ]
  },
  { id: "notices", label: "Notices", icon: "📢" },
  { id: "alumni", label: "Alumni", icon: "🎖️" },
  { id: "contact", label: "Contact", icon: "📞" }
];

// Complete Department Data
export const departmentsFullData = {
  "computer-science-engineering": {
    name: "Computer Science & Engineering",
    shortName: "CSE",
    faculty: "Faculty of Engineering",
    established: "2015",
    head: {
      name: "Dr. Mrinal Kanti Baowaly",
      designation: "Associate Professor",
      email: "mrinal.baowaly@gstu.ac.bd",
      phone: "+880-1XXX-XXXXXX",
      image: "/src/pages/departments/teacherImages/MrinalKantiBaowaly.jpg"
    },
    about: {
      overview: "The Department of Computer Science & Engineering at GSTU offers comprehensive education in computing, software development, artificial intelligence, and emerging technologies. Our faculty members are dedicated to providing quality education and conducting cutting-edge research in various fields of computer science.",
      vision: "To be a center of excellence in computer science education and research, producing skilled professionals who can contribute to technological advancement and innovation.",
      mission: "To provide quality education in computer science and engineering, foster innovation, and contribute to technological development through research and industry collaboration.",
      objectives: [
        "Provide high-quality education in computer science and engineering",
        "Foster research and innovation in emerging technologies",
        "Develop industry-ready professionals with strong theoretical and practical knowledge",
        "Promote collaboration with industry and research institutions"
      ],
      faculty: [
        {
          name: "Dr. Mrinal Kanti Baowaly",
          designation: "Associate Professor",
          role: "Head of Department",
          image: "/src/pages/departments/teacherImages/MrinalKantiBaowaly.jpg",
          education: "PhD in Computer Science",
          specialization: "Machine Learning, Data Mining, Bioinformatics",
          email: "mrinal.baowaly@gstu.ac.bd",
          phone: "+880-1XXX-XXXXXX",
          researchInterests: ["Machine Learning", "Data Mining", "Bioinformatics", "Healthcare Analytics"],
          publications: 15,
          experience: "10+ years"
        },
        {
          name: "Dr. Saleh Ahmed",
          designation: "Associate Professor",
          role: "Faculty Member",
          image: "/src/pages/departments/teacherImages/saleh Ahmed Pic.jpg",
          education: "PhD in Computer Science",
          specialization: "Artificial Intelligence, Deep Learning, Computer Vision",
          email: "saleh.ahmed@gstu.ac.bd",
          phone: "+880-1XXX-XXXXXX",
          researchInterests: ["Artificial Intelligence", "Deep Learning", "Computer Vision", "Natural Language Processing"],
          publications: 12,
          experience: "8+ years"
        },
        {
          name: "Abu Bakar Muhammad Abdullah",
          designation: "Assistant Professor",
          role: "Faculty Member",
          image: "/src/pages/departments/teacherImages/abubakar-abdullah.jpg",
          education: "MSc in Computer Science",
          specialization: "Software Engineering, Database Systems, Web Technologies",
          email: "abubakar.abdullah@gstu.ac.bd",
          phone: "+880-1XXX-XXXXXX",
          researchInterests: ["Software Engineering", "Database Systems", "Web Technologies", "Cloud Computing"],
          publications: 8,
          experience: "6+ years"
        },
        {
          name: "Faruk Hossen",
          designation: "Assistant Professor",
          role: "Faculty Member",
          image: "/src/pages/departments/teacherImages/Faruk Hossen.jpg",
          education: "MSc in Computer Science",
          specialization: "Network Security, Cryptography, IoT",
          email: "faruk.hossen@gstu.ac.bd",
          phone: "+880-1XXX-XXXXXX",
          researchInterests: ["Network Security", "Cryptography", "Internet of Things", "Blockchain"],
          publications: 6,
          experience: "5+ years"
        },
        {
          name: "Md. Ferdous",
          designation: "Lecturer",
          role: "Faculty Member",
          image: "/src/pages/departments/teacherImages/Ferdus-2023-27108.jpg",
          education: "MSc in Computer Science",
          specialization: "Programming, Algorithms, Data Structures",
          email: "md.ferdous@gstu.ac.bd",
          phone: "+880-1XXX-XXXXXX",
          researchInterests: ["Programming Languages", "Algorithms", "Data Structures", "Competitive Programming"],
          publications: 4,
          experience: "3+ years"
        }
      ]
    },
    programs: {
      undergraduate: [
        { degree: "B.Sc. in Computer Science & Engineering", duration: "4 Years", credits: "160", intake: "120" }
      ],
      graduate: [
        { degree: "M.Sc. in Computer Science & Engineering", duration: "1-2 Years", credits: "30", intake: "30" }
      ]
    },
    syllabus: {
      undergraduate: [
        { semester: 1, courses: ["Programming", "Calculus", "Physics", "English"] },
        { semester: 2, courses: ["OOP", "Discrete Math", "Digital Logic", "English II"] }
      ]
    },
    academicCommittee: [
      { name: "Dr. Mahmud Hasan", role: "Chairman", designation: "Professor" }
    ],
    courseDistribution: [
      { teacher: "Md. Ferdous", courses: ["Programming Fundamentals", "Object Oriented Programming", "Data Structures", "Algorithms"] },
      { teacher: "Dr. Saleh Ahmed", courses: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Computer Vision"] }
    ],
    facultyStaff: {
      activeFaculty: [
        { 
          name: "Dr. Mrinal Kanti Baowaly",
          designation: "Associate Professor",
          role: "Head of Department",
          specialization: "Machine Learning, Data Mining, Bioinformatics",
          email: "mrinal.baowaly@gstu.ac.bd",
          phone: "+880-1XXX-XXXXXX",
          image: "/src/pages/departments/teacherImages/MrinalKantiBaowaly.jpg",
          education: "PhD in Computer Science",
          researchInterests: ["Machine Learning", "Data Mining", "Bioinformatics"],
          officeHours: "Sun-Thu: 10AM-12PM"
        },
        { 
          name: "Dr. Saleh Ahmed",
          designation: "Associate Professor",
          role: "Faculty Member",
          specialization: "Artificial Intelligence, Deep Learning, Computer Vision",
          email: "saleh.ahmed@gstu.ac.bd",
          phone: "+880-1XXX-XXXXXX",
          image: "/src/pages/departments/teacherImages/saleh Ahmed Pic.jpg",
          education: "PhD in Computer Science",
          researchInterests: ["Artificial Intelligence", "Deep Learning", "Computer Vision"],
          officeHours: "Sun-Thu: 2PM-4PM"
        },
        { 
          name: "Abu Bakar Muhammad Abdullah",
          designation: "Assistant Professor",
          role: "Faculty Member",
          specialization: "Software Engineering, Database Systems, Web Technologies",
          email: "abubakar.abdullah@gstu.ac.bd",
          phone: "+880-1XXX-XXXXXX",
          image: "/src/pages/departments/teacherImages/abubakar-abdullah.jpg",
          education: "MSc in Computer Science",
          researchInterests: ["Software Engineering", "Database Systems", "Web Technologies"],
          officeHours: "Sun-Thu: 11AM-1PM"
        },
        { 
          name: "Faruk Hossen",
          designation: "Assistant Professor",
          role: "Faculty Member",
          specialization: "Network Security, Cryptography, IoT",
          email: "faruk.hossen@gstu.ac.bd",
          phone: "+880-1XXX-XXXXXX",
          image: "/src/pages/departments/teacherImages/Faruk Hossen.jpg",
          education: "MSc in Computer Science",
          researchInterests: ["Network Security", "Cryptography", "Internet of Things"],
          officeHours: "Sun-Thu: 3PM-5PM"
        },
        { 
          name: "Md. Ferdous",
          designation: "Lecturer",
          role: "Faculty Member",
          specialization: "Programming, Algorithms, Data Structures",
          email: "md.ferdous@gstu.ac.bd",
          phone: "+880-1XXX-XXXXXX",
          image: "/src/pages/departments/teacherImages/Ferdus-2023-27108.jpg",
          education: "MSc in Computer Science",
          researchInterests: ["Programming Languages", "Algorithms", "Data Structures"],
          officeHours: "Sun-Thu: 9AM-11AM"
        }
      ],
      facultyOnLeave: [
        { 
          name: "Md. Monowar Hossain",
          designation: "Assistant Professor",
          role: "Faculty Member",
          specialization: "Software Engineering, Mobile Application Development",
          email: "monowar.hossain@gstu.ac.bd",
          phone: "+880-1XXX-XXXXXX",
          image: "/src/pages/departments/teacherImages/Md. monowar.jpg",
          education: "MSc in Computer Science",
          researchInterests: ["Software Engineering", "Mobile App Development", "Agile Methodologies"],
          leaveType: "Study Leave",
          leavePeriod: "January 2025 - December 2025",
          leaveReason: "Pursuing PhD"
        },
        { 
          name: "Sakifa Aktar",
          designation: "Assistant Professor",
          role: "Faculty Member",
          specialization: "Data Science, Machine Learning, Natural Language Processing",
          email: "sakifa.aktar@gstu.ac.bd",
          phone: "+880-1XXX-XXXXXX",
          image: "/src/pages/departments/teacherImages/sakifa.jpg",
          education: "MSc in Computer Science",
          researchInterests: ["Data Science", "Machine Learning", "Natural Language Processing", "Text Mining"],
          leaveType: "Maternity Leave",
          leavePeriod: "October 2024 - March 2025",
          leaveReason: "Maternity Leave"
        }
      ],
      formerFaculty: [],
      officeStaff: [
        { name: "Kamal", designation: "Assistant", phone: "+880-1XXX" }
      ]
    },
    research: {
      areas: ["AI", "ML", "Data Science", "IoT"],
      publications: [
        { title: "Deep Learning", authors: "Dr. Mahmud", journal: "IEEE", year: "2024" }
      ]
    },
    admission: {
      undergraduate: { eligibility: "HSC GPA 5.00", seats: "120", process: ["Apply", "Test"], fees: "BDT 10,000" },
      graduate: { eligibility: "B.Sc. CGPA 3.00", seats: "30", process: ["Apply", "Interview"], fees: "BDT 15,000" }
    },
    notices: [
      { title: "Spring 2025 Schedule", date: "2024-12-01", category: "Academic", content: "Schedule published" }
    ],
    alumni: [
      { name: "Tariqul", batch: "2019", position: "Google", achievement: "Scalable systems" }
    ],
    contact: {
      email: "cse@gstu.ac.bd",
      phone: "+880-XXX",
      office: "Building 3, 2nd Floor",
      address: "Gopalganj-8100",
      officeHours: "Sun-Thu: 9AM-5PM"
    }
  },
  
  "physics": {
    name: "Physics",
    shortName: "PHY",
    faculty: "Faculty of Science",
    established: "2014",
    head: { name: "Dr. Karim", designation: "Professor", email: "karim@gstu.ac.bd", phone: "+880-1XXX" },
    about: {
      overview: "Physics department provides theoretical and experimental physics education.",
      vision: "Excellence in physics.",
      mission: "Quality education.",
      objectives: ["Quality education", "Research"]
    },
    programs: {
      undergraduate: [{ degree: "B.Sc. in Physics", duration: "4 Years", credits: "140", intake: "60" }],
      graduate: [{ degree: "M.Sc. in Physics", duration: "2 Years", credits: "30", intake: "20" }]
    },
    syllabus: { undergraduate: [{ semester: 1, courses: ["Mechanics", "Math"] }] },
    academicCommittee: [{ name: "Dr. Karim", role: "Chairman", designation: "Professor" }],
    courseDistribution: [{ teacher: "Dr. Karim", courses: ["Quantum"] }],
    facultyStaff: {
      activeFaculty: [{ name: "Dr. Karim", designation: "Professor", specialization: "Quantum", email: "karim@gstu.ac.bd" }],
      facultyOnLeave: [],
      formerFaculty: [],
      officeStaff: [{ name: "Assistant", designation: "Lab", phone: "+880-1XXX" }]
    },
    research: { areas: ["Quantum", "Nuclear"], publications: [] },
    admission: {
      undergraduate: { eligibility: "HSC Science", seats: "60", process: ["Apply"], fees: "BDT 8,000" },
      graduate: { eligibility: "B.Sc. Physics", seats: "20", process: ["Interview"], fees: "BDT 12,000" }
    },
    notices: [{ title: "Lab Schedule", date: "2024-12-01", category: "Academic", content: "New timings" }],
    alumni: [{ name: "Rahman", batch: "2018", position: "BAEC", achievement: "Research" }],
    contact: { email: "physics@gstu.ac.bd", phone: "+880-XXX", office: "Science Building", address: "Gopalganj-8100", officeHours: "Sun-Thu: 9AM-5PM" }
  }
};
