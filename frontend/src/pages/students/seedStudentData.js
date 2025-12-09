export function seedStudentData(studentId, dept, { force = false } = {}) {
  if (!studentId || !dept) return { ok: false, message: 'Student ID and department required' };

  // Check if data exists and force not set
  if (!force) {
    const profileKey = `student_${studentId}_profile`;
    const existing = localStorage.getItem(profileKey);
    if (existing && existing !== 'null') return { ok: false, message: 'Data exists. Use force to overwrite.' };
  }

  const now = new Date();

  // Seed profile
  const profileKey = `student_${studentId}_profile`;
  const profile = {
    photo: 'https://via.placeholder.com/150',
    name: `Student ${studentId}`,
    email: `${studentId.toLowerCase()}@university.edu`,
    address: '123 Main St, City',
    linkedin: 'https://linkedin.com',
    session: '2024-2025',
    phone: '01700000000',
    currentSession: '2024-2025',
    year: '2'
  };
  localStorage.setItem(profileKey, JSON.stringify(profile));

  // Seed documents (empty list)
  const docsKey = `student_${studentId}_docs`;
  localStorage.setItem(docsKey, JSON.stringify([]));

  // Seed courses
  const coursesData = {
    'CSE': [
      { code: 'CSE101', name: 'Intro to Programming', program: 'CSE', year: 1, semester: 'Fall', faculty: 'Dr. Alice Rahman' },
      { code: 'CSE102', name: 'Data Structures', program: 'CSE', year: 1, semester: 'Spring', faculty: 'Dr. Bob Karim' },
      { code: 'CSE201', name: 'Web Development', program: 'CSE', year: 2, semester: 'Fall', faculty: 'Dr. Carol Hossain' },
      { code: 'CSE202', name: 'Database Systems', program: 'CSE', year: 2, semester: 'Spring', faculty: 'Dr. David Khan' }
    ],
    'EEE': [
      { code: 'EEE101', name: 'Circuit Analysis', program: 'EEE', year: 1, semester: 'Fall', faculty: 'Dr. Emma Akhter' },
      { code: 'EEE102', name: 'Electromagnetic Theory', program: 'EEE', year: 1, semester: 'Spring', faculty: 'Dr. Frank Roy' },
      { code: 'EEE201', name: 'Power Systems', program: 'EEE', year: 2, semester: 'Fall', faculty: 'Dr. Gina Smith' }
    ],
    'BBA': [
      { code: 'BBA101', name: 'Business Management', program: 'BBA', year: 1, semester: 'Fall', faculty: 'Prof. Hannah Lee' },
      { code: 'BBA102', name: 'Economics', program: 'BBA', year: 1, semester: 'Spring', faculty: 'Prof. Isaac Ahmed' },
      { code: 'BBA201', name: 'Financial Accounting', program: 'BBA', year: 2, semester: 'Fall', faculty: 'Prof. Julia Chen' }
    ]
  };
  const courseList = coursesData[dept] || coursesData['CSE'];
  localStorage.setItem('courses', JSON.stringify(courseList));

  // Seed routine
  const routineKey = `routine_${dept}`;
  const routine = [
    { id: 'R1', day: 'Monday', time: '09:00-10:30', course: courseList[0]?.code || 'CSE101', room: 'A101' },
    { id: 'R2', day: 'Tuesday', time: '10:45-12:15', course: courseList[1]?.code || 'CSE102', room: 'B202' },
    { id: 'R3', day: 'Wednesday', time: '14:00-15:30', course: courseList[2]?.code || 'CSE201', room: 'C303' },
    { id: 'R4', day: 'Thursday', time: '09:00-10:30', course: courseList[3]?.code || 'CSE202', room: 'D404' }
  ];
  localStorage.setItem(routineKey, JSON.stringify(routine));

  // Seed CGPA/semesters
  const semestersKey = `student_${studentId}_semesters`;
  const semesters = [
    { id: 1, session: '2023-2024', semesterName: 'Fall 2023', credits: 15, gp: 3.8 },
    { id: 2, session: '2023-2024', semesterName: 'Spring 2024', credits: 14, gp: 3.75 },
    { id: 3, session: '2024-2025', semesterName: 'Fall 2024', credits: 15, gp: 3.9 }
  ];
  localStorage.setItem(semestersKey, JSON.stringify(semesters));

  // Seed payments (global with dept-specific ones)
  const paymentsKey = 'payments_all';
  const payments = [
    { id: `P-${dept}-1`, dept, title: 'Tuition Fee - Semester', amount: 500, due: true },
    { id: `P-${dept}-2`, dept, title: 'Lab Fee', amount: 150, due: true },
    { id: `P-${dept}-3`, dept, title: 'Library Fee', amount: 50, due: false, paidBy: studentId, paidAt: now.toISOString() },
    { id: 'P-OTHER-1', dept: 'OTHER', title: 'Other Dept Fee', amount: 100, due: true }
  ];
  localStorage.setItem(paymentsKey, JSON.stringify(payments));

  return { ok: true, message: `Seeded data for student ${studentId} (${dept})` };
}

export default seedStudentData;
