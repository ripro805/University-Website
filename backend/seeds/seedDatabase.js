const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Book = require('../models/Book');
const Hall = require('../models/Hall');
const Room = require('../models/Room');
const Department = require('../models/Department');
const Notice = require('../models/Notice');
const BookIssue = require('../models/BookIssue');

// Helper function to hash passwords
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Gstu_web";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// Generate 5000 Books
function generateBooks() {
  const books = [];
  const categories = ["Computer Science", "Mathematics", "Physics", "Chemistry", "Economics", "Business", "Literature", "History", "Biology", "Engineering", "Medicine", "Law", "Philosophy", "Psychology", "Sociology"];
  
  const bookTitles = [
    "Introduction to", "Advanced", "Fundamentals of", "Principles of", "Modern", "Classical", "Applied",
    "Theoretical", "Practical", "Comprehensive", "Essential", "Complete Guide to", "Handbook of",
    "Elements of", "Foundation of", "Introduction to Modern", "Contemporary", "Basic", "Professional"
  ];
  
  const subjects = [
    "Algorithms", "Data Structures", "Machine Learning", "Artificial Intelligence", "Networks", "Databases",
    "Calculus", "Linear Algebra", "Statistics", "Discrete Mathematics", "Differential Equations",
    "Quantum Mechanics", "Thermodynamics", "Electromagnetism", "Mechanics", "Optics",
    "Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Analytical Chemistry",
    "Microeconomics", "Macroeconomics", "Econometrics", "Development Economics",
    "Marketing", "Management", "Finance", "Accounting", "Business Strategy",
    "World Literature", "American Literature", "British Literature", "Poetry", "Drama",
    "Ancient History", "Medieval History", "Modern History", "World War", "Civilization",
    "Genetics", "Ecology", "Molecular Biology", "Cell Biology", "Microbiology",
    "Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "Software Engineering",
    "Anatomy", "Physiology", "Pharmacology", "Pathology", "Surgery",
    "Constitutional Law", "Criminal Law", "Corporate Law", "International Law",
    "Ethics", "Logic", "Metaphysics", "Epistemology", "Political Philosophy",
    "Cognitive Psychology", "Social Psychology", "Developmental Psychology", "Clinical Psychology",
    "Social Theory", "Research Methods", "Cultural Sociology", "Urban Sociology"
  ];
  
  const authors = [
    "Dr. Michael Anderson", "Prof. Sarah Johnson", "Dr. David Lee", "Prof. Emily Brown",
    "Dr. James Wilson", "Prof. Maria Garcia", "Dr. Robert Taylor", "Prof. Jennifer Martinez",
    "Dr. William Thomas", "Prof. Lisa Anderson", "Dr. Richard Moore", "Prof. Patricia Jackson",
    "Dr. Charles White", "Prof. Barbara Harris", "Dr. Joseph Martin", "Prof. Susan Thompson",
    "Dr. Thomas Robinson", "Prof. Jessica Clark", "Dr. Daniel Rodriguez", "Prof. Nancy Lewis",
    "Dr. Christopher Walker", "Prof. Karen Hall", "Dr. Matthew Allen", "Prof. Betty Young"
  ];
  
  for (let i = 1; i <= 5000; i++) {
    const title = bookTitles[Math.floor(Math.random() * bookTitles.length)];
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const author = authors[Math.floor(Math.random() * authors.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const quantity = Math.floor(Math.random() * 15) + 1;
    const issued = Math.floor(Math.random() * Math.min(quantity, 3));
    const available = quantity - issued;
    
    books.push({
      name: `${title} ${subject}`,
      author: author,
      isbn: `978-${String(Math.floor(Math.random() * 10))}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}-${Math.floor(Math.random() * 10)}`,
      category: category,
      quantity: quantity,
      available: available,
      publisher: `${author.split(' ')[1]} Publications`,
      publicationYear: 2010 + Math.floor(Math.random() * 15)
    });
  }
  
  return books;
}

// Generate 120 Users (Students)
function generateUsers() {
  const users = [];
  const firstNames = [
    "Ahmed", "Fatema", "Kamal", "Sharmin", "Mehedi", "Nusrat", "Rakib", "Sadia",
    "Tanvir", "Rafia", "Imran", "Sumaya", "Sabbir", "Taslima", "Rafiq", "Nasrin",
    "Kamrul", "Ayesha", "Shakil", "Farhana", "Ashik", "Ruma", "Masud", "Sultana"
  ];
  
  const lastNames = ["Rahman", "Islam", "Khan", "Ahmed", "Hossain", "Ali", "Begum", "Khatun"];
  const departments = ["Computer Science", "Mathematics", "Physics", "Economics", "English", "Civil Engineering"];
  
  for (let i = 1; i <= 120; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const dept = departments[Math.floor(Math.random() * departments.length)];
    // First 20 students will have 2020 IDs, next 30 will have 2021, etc.
    const year = 2020 + Math.floor((i - 1) / 30);
    
    users.push({
      userId: `${year}${String(i).padStart(3, '0')}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@gstu.ac.bd`,
      password: 'student123',
      role: 'student',
      department: dept,
      profile: {
        fullName: `${firstName} ${lastName}`,
        phone: `017${String(10000000 + i).substring(1)}`,
        dateOfBirth: new Date(1998 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        gender: i % 3 === 0 ? 'Female' : 'Male',
        bloodGroup: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'][Math.floor(Math.random() * 8)]
      },
      studentInfo: {
        studentId: `${year}${String(i).padStart(3, '0')}`,
        session: `${year}-${year + 1}`,
        semester: 'Fall',
        cgpa: (2.5 + Math.random() * 1.5).toFixed(2)
      },
      isActive: true,
      isVerified: true
    });
  }
  
  return users;
}

// Generate 5 Halls
function generateHalls() {
  return [
    {
      name: "Bijoy Dibosh Hall",
      slug: "bijoy-dibosh-hall",
      type: "male",
      capacity: 600,
      occupiedSeats: 560,
      location: "Main Campus",
      established: new Date('2015-01-01'),
      provost: {
        name: "Dr. Mohammad Rabiul Islam",
        phone: "01614-706939",
        email: "rabiul.islam@gstu.ac.bd"
      },
      facilities: ["WiFi", "Study Room", "Common Room", "Prayer Room", "Dining Hall", "Gym"],
      description: "Premier residential hall for male students"
    },
    {
      name: "Swadhinata Dibosh Hall",
      slug: "swadhinata-dibosh-hall",
      type: "male",
      capacity: 600,
      occupiedSeats: 560,
      location: "Main Campus",
      established: new Date('2016-01-01'),
      provost: {
        name: "Dr. Mohammad Ali",
        phone: "01711-111111",
        email: "ali@gstu.ac.bd"
      },
      facilities: ["WiFi", "Study Room", "Common Room", "Prayer Room", "Dining Hall", "Sports Ground"],
      description: "Modern residential facility with excellent amenities"
    },
    {
      name: "Bangamata Sheikh Fazilatunnesa Mujib Hall",
      slug: "bangamata-sheikh-fazilatunnesa-mujib-hall",
      type: "female",
      capacity: 600,
      occupiedSeats: 560,
      location: "Main Campus",
      established: new Date('2017-01-01'),
      provost: {
        name: "Dr. Shamima Akhter",
        phone: "01722-222222",
        email: "shamima@gstu.ac.bd"
      },
      facilities: ["WiFi", "Study Room", "Common Room", "Prayer Room", "Dining Hall", "Library Corner"],
      description: "Residential hall for female students"
    },
    {
      name: "Sheikh Russel Hall",
      slug: "sheikh-russel-hall",
      type: "male",
      capacity: 600,
      occupiedSeats: 560,
      location: "Main Campus",
      established: new Date('2018-01-01'),
      provost: {
        name: "Dr. Motiur Rahman",
        phone: "01733-333333",
        email: "motiur@gstu.ac.bd"
      },
      facilities: ["WiFi", "Study Room", "Common Room", "Prayer Room", "Dining Hall", "TV Room"],
      description: "Well-equipped hall with modern facilities"
    },
    {
      name: "Sheikh Rehana Hall",
      slug: "sheikh-rehana-hall",
      type: "female",
      capacity: 600,
      occupiedSeats: 560,
      location: "Main Campus",
      established: new Date('2019-01-01'),
      provost: {
        name: "Dr. Tahmina Rahman",
        phone: "01744-444444",
        email: "tahmina@gstu.ac.bd"
      },
      facilities: ["WiFi", "Study Room", "Common Room", "Prayer Room", "Dining Hall", "Laundry"],
      description: "Comfortable residential facility for female students"
    }
  ];
}

// Generate Departments
function generateDepartments() {
  return [
    {
      name: "Computer Science & Engineering",
      slug: "computer-science-engineering",
      code: "CSE",
      faculty: "Faculty of Engineering",
      established: new Date('2015-01-01'),
      head: {
        name: "Dr. Mrinal Kanti Baowaly",
        designation: "Associate Professor",
        email: "mrinal.baowaly@gstu.ac.bd",
        phone: "+880-1XXX-XXXXXX"
      },
      programs: [
        { name: "B.Sc. in CSE", degree: "BSc", duration: "4 Years" },
        { name: "M.Sc. in CSE", degree: "MSc", duration: "2 Years" }
      ],
      totalStudents: 450,
      totalTeachers: 25,
      description: "Leading department in computer science and software engineering"
    },
    {
      name: "Mathematics",
      slug: "mathematics",
      code: "MATH",
      faculty: "Faculty of Science",
      established: new Date('2015-01-01'),
      head: {
        name: "Dr. Kamal Hossain",
        designation: "Professor",
        email: "kamal@gstu.ac.bd",
        phone: "+880-1XXX-XXXXXX"
      },
      programs: [
        { name: "B.Sc. in Mathematics", degree: "BSc", duration: "4 Years" },
        { name: "M.Sc. in Mathematics", degree: "MSc", duration: "2 Years" }
      ],
      totalStudents: 320,
      totalTeachers: 18,
      description: "Excellence in pure and applied mathematics"
    },
    {
      name: "Physics",
      slug: "physics",
      code: "PHY",
      faculty: "Faculty of Science",
      established: new Date('2015-01-01'),
      head: {
        name: "Dr. Rahman Ahmed",
        designation: "Professor",
        email: "rahman@gstu.ac.bd",
        phone: "+880-1XXX-XXXXXX"
      },
      programs: [
        { name: "B.Sc. in Physics", degree: "BSc", duration: "4 Years" },
        { name: "M.Sc. in Physics", degree: "MSc", duration: "2 Years" }
      ],
      totalStudents: 280,
      totalTeachers: 16,
      description: "Research-focused physics education"
    },
    {
      name: "Economics",
      slug: "economics",
      code: "ECO",
      faculty: "Faculty of Social Science",
      established: new Date('2016-01-01'),
      head: {
        name: "Dr. Farida Begum",
        designation: "Professor",
        email: "farida@gstu.ac.bd",
        phone: "+880-1XXX-XXXXXX"
      },
      programs: [
        { name: "B.Sc. in Economics", degree: "BSc", duration: "4 Years" },
        { name: "M.Sc. in Economics", degree: "MSc", duration: "2 Years" }
      ],
      totalStudents: 360,
      totalTeachers: 20,
      description: "Comprehensive economics education"
    },
    {
      name: "English",
      slug: "english",
      code: "ENG",
      faculty: "Faculty of Arts",
      established: new Date('2015-01-01'),
      head: {
        name: "Dr. Sarah Islam",
        designation: "Associate Professor",
        email: "sarah@gstu.ac.bd",
        phone: "+880-1XXX-XXXXXX"
      },
      programs: [
        { name: "BA in English", degree: "BSc", duration: "4 Years" },
        { name: "MA in English", degree: "MSc", duration: "2 Years" }
      ],
      totalStudents: 300,
      totalTeachers: 15,
      description: "Language and literature excellence"
    }
  ];
}

// Generate Notices
function generateNotices() {
  const notices = [];
  const types = ['academic', 'exam', 'admission', 'event', 'holiday', 'library', 'hall'];
  const categories = ['urgent', 'general', 'academic', 'administrative', 'event', 'library'];
  
  const noticeData = [
    { title: "New Books Added - January 2025", content: "150+ new books added across various departments. Visit the 'New Arrivals' section.", type: "announcement", category: "library", important: true },
    { title: "Library Closed - Victory Day", content: "Library will remain closed on December 16, 2024 (Victory Day).", type: "holiday", category: "library", important: false },
    { title: "Extended Hours During Exams", content: "Library will remain open until 10:00 PM during final examination period (Dec 20 - Jan 10).", type: "announcement", category: "library", important: true },
    { title: "Semester Registration Open", content: "Spring 2025 semester registration is now open. Deadline: January 15, 2025.", type: "academic", category: "general", important: true },
    { title: "Hall Meeting Notice", content: "All hall residents must attend the monthly meeting on December 20, 2024 at 6:00 PM.", type: "announcement", category: "hall", important: true },
    { title: "Cultural Program", content: "Annual cultural program will be held on January 5, 2025 at university auditorium.", type: "event", category: "general", important: false },
    { title: "Midterm Exam Schedule", content: "Midterm examinations for Fall 2024 semester will start from January 8, 2025.", type: "exam", category: "general", important: true },
    { title: "Admission Notice 2025", content: "Admission applications for 2025-2026 session will be accepted from February 1, 2025.", type: "announcement", category: "general", important: true },
    { title: "Internet Maintenance", content: "Campus internet will be under maintenance on December 18, 2024 from 10:00 PM to 2:00 AM.", type: "announcement", category: "general", important: false },
    { title: "Sports Week Announcement", content: "GSTU Sports Week 2025 will be held from January 20-25, 2025. Register before January 15.", type: "event", category: "sports", important: false }
  ];
  
  noticeData.forEach((notice, i) => {
    notices.push({
      title: notice.title,
      content: notice.content,
      type: notice.type,
      category: notice.category,
      targetAudience: ['student', 'teacher'],
      important: notice.important,
      publishDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      expiryDate: new Date(Date.now() + (30 + Math.floor(Math.random() * 60)) * 24 * 60 * 60 * 1000),
      postedBy: "Admin"
    });
  });
  
  return notices;
}

// Generate Teachers
function generateTeachers() {
  const teachers = [];
  const firstNames = ["Mohammad", "Fatema", "Abdul", "Nasrin", "Rafiqul", "Shamima", "Kamal", "Ayesha"];
  const lastNames = ["Rahman", "Islam", "Khan", "Ahmed", "Hossain", "Ali", "Begum", "Akhter"];
  const departments = ["Computer Science", "Mathematics", "Physics", "Economics", "English"];
  const designations = ["Professor", "Associate Professor", "Assistant Professor", "Lecturer"];
  
  for (let i = 1; i <= 30; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const dept = departments[Math.floor(Math.random() * departments.length)];
    const designation = designations[Math.floor(Math.random() * designations.length)];
    
    teachers.push({
      userId: `T${String(i).padStart(4, '0')}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@gstu.ac.bd`,
      password: 'teacher123',
      role: 'teacher',
      department: dept,
      profile: {
        fullName: `Dr. ${firstName} ${lastName}`,
        phone: `018${String(10000000 + i).substring(1)}`,
        gender: i % 3 === 0 ? 'Female' : 'Male'
      },
      teacherInfo: {
        employeeId: `T${String(i).padStart(4, '0')}`,
        designation: designation,
        joiningDate: new Date(2015 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 12), 1),
        specialization: `${dept} Research`,
        officeRoom: `Room ${100 + i}`
      },
      isActive: true,
      isVerified: true
    });
  }
  
  return teachers;
}

// Generate Library Staff
function generateLibraryStaff() {
  return [
    {
      userId: "LIB001",
      email: "library.admin@gstu.ac.bd",
      password: "library123",
      role: "library",
      department: "Library",
      profile: {
        fullName: "Md. Habibur Rahman",
        phone: "01755-123456",
        gender: "Male"
      },
      employeeInfo: {
        employeeId: "LIB001",
        designation: "Chief Librarian",
        joiningDate: new Date('2015-06-01'),
        officeRoom: "Library Office"
      },
      isActive: true,
      isVerified: true
    },
    {
      userId: "LIB002",
      email: "library.asst@gstu.ac.bd",
      password: "library123",
      role: "library",
      department: "Library",
      profile: {
        fullName: "Fatema Khatun",
        phone: "01766-234567",
        gender: "Female"
      },
      employeeInfo: {
        employeeId: "LIB002",
        designation: "Assistant Librarian",
        joiningDate: new Date('2017-01-01'),
        officeRoom: "Library Office"
      },
      isActive: true,
      isVerified: true
    }
  ];
}

// Generate Office Employees
function generateEmployees() {
  const departments = ["Computer Science", "Mathematics", "Physics", "Economics", "English"];
  const employees = [];
  
  departments.forEach((dept, index) => {
    employees.push({
      userId: `EMP${String(index + 1).padStart(3, '0')}`,
      email: `office.${dept.toLowerCase().replace(/\s+/g, '')}@gstu.ac.bd`,
      password: "employee123",
      role: "employee",
      department: dept,
      profile: {
        fullName: `${dept} Office Admin`,
        phone: `0179${String(1000000 + index).substring(1)}`,
        gender: index % 2 === 0 ? "Male" : "Female"
      },
      employeeInfo: {
        employeeId: `EMP${String(index + 1).padStart(3, '0')}`,
        position: "Office Administrator",
        office: `${dept} Department Office`,
        joiningDate: new Date(2016 + index, 0, 1)
      },
      isActive: true,
      isVerified: true
    });
  });
  
  return employees;
}

// Generate Hall Admins
function generateHallAdmins() {
  return [
    {
      userId: "HALL001",
      email: "hall.admin@gstu.ac.bd",
      password: "hall123",
      role: "hall-admin",
      department: "Administration",
      profile: {
        fullName: "Md. Zakir Hossain",
        phone: "01777-345678",
        gender: "Male"
      },
      employeeInfo: {
        employeeId: "HALL001",
        designation: "Hall Superintendent",
        joiningDate: new Date('2016-03-01'),
        officeRoom: "Hall Admin Office"
      },
      isActive: true,
      isVerified: true
    }
  ];
}

// Seed Function
async function seedDatabase() {
  try {
    console.log('🗑️  Clearing existing data...');
    
    // Clear existing data
    await Book.deleteMany({});
    await User.deleteMany({});
    await Hall.deleteMany({});
    await Room.deleteMany({});
    await Department.deleteMany({});
    await Notice.deleteMany({});
    await BookIssue.deleteMany({});
    
    console.log('✅ Existing data cleared\n');
    
    // Seed Books
    console.log('📚 Seeding 5000 books...');
    const books = generateBooks();
    await Book.insertMany(books);
    console.log('✅ Books seeded\n');
    
    // Seed Departments
    console.log('🏛️  Seeding departments...');
    const departments = generateDepartments();
    await Department.insertMany(departments);
    console.log('✅ Departments seeded\n');
    
    // Seed Halls
    console.log('🏠 Seeding halls...');
    const halls = generateHalls();
    const insertedHalls = await Hall.insertMany(halls);
    console.log('✅ Halls seeded\n');
    
    // Seed Rooms (10 rooms per hall as sample)
    console.log('🚪 Seeding rooms...');
    const rooms = [];
    insertedHalls.forEach((hall, hallIndex) => {
      for (let i = 1; i <= 10; i++) {
        rooms.push({
          hallId: hall._id,
          roomNumber: `${hallIndex + 1}${String(i).padStart(2, '0')}`,
          floor: Math.ceil(i / 2),
          capacity: i <= 2 ? 1 : (i <= 7 ? 5 : 15),
          occupiedSeats: i <= 7 ? (i <= 2 ? 1 : 5) : 10,
          roomType: i <= 2 ? 'single' : (i <= 7 ? 'five-seat' : 'general')
        });
      }
    });
    await Room.insertMany(rooms);
    console.log('✅ Rooms seeded\n');
    
    // Seed Students
    console.log('👨‍🎓 Seeding 120 students...');
    const students = generateUsers();
    // Hash passwords for all students
    for (let student of students) {
      student.password = await hashPassword(student.password);
    }
    await User.insertMany(students);
    console.log('✅ Students seeded\n');
    
    // Seed Teachers
    console.log('👨‍🏫 Seeding 30 teachers...');
    const teachers = generateTeachers();
    // Hash passwords for all teachers
    for (let teacher of teachers) {
      teacher.password = await hashPassword(teacher.password);
    }
    await User.insertMany(teachers);
    console.log('✅ Teachers seeded\n');
    
    // Seed Library Staff
    console.log('📖 Seeding library staff...');
    const libraryStaff = generateLibraryStaff();
    // Hash passwords for all library staff
    for (let staff of libraryStaff) {
      staff.password = await hashPassword(staff.password);
    }
    await User.insertMany(libraryStaff);
    console.log('✅ Library staff seeded\n');
    
    // Seed Office Employees
    console.log('🏢 Seeding office employees...');
    const employees = generateEmployees();
    // Hash passwords for all employees
    for (let employee of employees) {
      employee.password = await hashPassword(employee.password);
    }
    await User.insertMany(employees);
    console.log('✅ Office employees seeded\n');
    
    // Seed Hall Admins
    console.log('🏠 Seeding hall admins...');
    const hallAdmins = generateHallAdmins();
    // Hash passwords for all hall admins
    for (let admin of hallAdmins) {
      admin.password = await hashPassword(admin.password);
    }
    await User.insertMany(hallAdmins);
    console.log('✅ Hall admins seeded\n');
    
    // Seed Notices
    console.log('📢 Seeding notices...');
    const notices = generateNotices();
    await Notice.insertMany(notices);
    console.log('✅ Notices seeded\n');
    
    // Print Summary
    console.log('\n📊 SEEDING SUMMARY:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📚 Books: ${await Book.countDocuments()}`);
    console.log(`👥 Users: ${await User.countDocuments()}`);
    console.log(`   - Students: ${await User.countDocuments({ role: 'student' })}`);
    console.log(`   - Teachers: ${await User.countDocuments({ role: 'teacher' })}`);
    console.log(`   - Library Staff: ${await User.countDocuments({ role: 'library' })}`);
    console.log(`   - Office Employees: ${await User.countDocuments({ role: 'employee' })}`);
    console.log(`   - Hall Admins: ${await User.countDocuments({ role: 'hall-admin' })}`);
    console.log(`🏛️  Departments: ${await Department.countDocuments()}`);
    console.log(`🏠 Halls: ${await Hall.countDocuments()}`);
    console.log(`🚪 Rooms: ${await Room.countDocuments()}`);
    console.log(`📢 Notices: ${await Notice.countDocuments()}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('🎉 Database seeding completed successfully!\n');
    
    console.log('🔐 TEST CREDENTIALS:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Student Login:');
    console.log('  UserId: 2020001');
    console.log('  Password: student123');
    console.log('  Role: student\n');
    console.log('Teacher Login:');
    console.log('  UserId: T0001');
    console.log('  Password: teacher123');
    console.log('  Role: teacher\n');
    console.log('Library Admin Login:');
    console.log('  UserId: LIB001');
    console.log('  Password: library123');
    console.log('  Role: library\n');
    console.log('Office Employee Login:');
    console.log('  UserId: EMP001');
    console.log('  Password: employee123');
    console.log('  Role: employee');
    console.log('  Department: Computer Science\n');
    console.log('Hall Admin Login:');
    console.log('  UserId: HALL001');
    console.log('  Password: hall123');
    console.log('  Role: hall-admin');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
}

// Run seeder
seedDatabase();
