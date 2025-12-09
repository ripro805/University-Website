// Simple seeder for office data per department stored in localStorage
export function seedOfficeData(dept, { force = false } = {}) {
  if (!dept) return { ok: false, message: 'No department provided' };

  const keys = {
    staffs: `office_${dept}_staffs`,
    events: `office_${dept}_events`,
    classes: `office_${dept}_classes`,
    exams: `office_${dept}_exams`,
    results: `office_${dept}_results`,
  };

  // If not forcing and any key exists with data, skip
  if (!force) {
    for (const k of Object.values(keys)) {
      const v = localStorage.getItem(k);
      if (v && v !== '[]') return { ok: false, message: 'Data already exists. Use force to overwrite.' };
    }
  }

  const now = Date.now();

  const sampleStaffs = [
    { id: `${dept}-S-${now}-1`, name: 'Dr. Alice Rahman', destination: 'Head of Department', contact: '01710000001', email: 'alice.' + dept.toLowerCase() + '@uni.edu', photo: '' },
    { id: `${dept}-S-${now}-2`, name: 'Mr. Bob Karim', destination: 'Senior Officer', contact: '01710000002', email: 'bob.' + dept.toLowerCase() + '@uni.edu', photo: '' },
    { id: `${dept}-S-${now}-3`, name: 'Ms. Carol Hossain', destination: 'Clerk', contact: '01710000003', email: 'carol.' + dept.toLowerCase() + '@uni.edu', photo: '' }
  ];

  const sampleEvents = [
    { id: `${dept}-E-1`, name: `${dept} Orientation`, room: 'Auditorium', chief: 'Vice Chancellor', start: '2025-01-10 10:00', end: '2025-01-10 12:00' },
    { id: `${dept}-E-2`, name: `${dept} Workshop on Research`, room: 'Room 101', chief: 'Prof. X', start: '2025-02-15 09:00', end: '2025-02-15 15:00' }
  ];

  const sampleClasses = [
    { id: `${dept}-C-1`, session: '2024-2025', semester: 'Fall', routine: 'Mon: CSE101 9:00-10:30\nTue: CSE102 10:45-12:15' },
    { id: `${dept}-C-2`, session: '2024-2025', semester: 'Spring', routine: 'Wed: CSE201 9:00-10:30\nThu: CSE202 10:45-12:15' }
  ];

  const sampleExams = [
    { id: `${dept}-EX-1`, name: 'Midterm Exam', session: '2024-2025', semester: 'Fall', start: '2025-03-01', end: '2025-03-05', routine: 'See department noticeboard' },
    { id: `${dept}-EX-2`, name: 'Final Exam', session: '2024-2025', semester: 'Spring', start: '2025-06-01', end: '2025-06-10', routine: 'See department noticeboard' }
  ];

  const sampleResults = [
    { id: `${dept}-R-1`, name: 'Midterm Results', session: '2024-2025', semester: 'Fall', publish: '2025-03-20', data: 'Sample result data (list of student marks) ...' },
    { id: `${dept}-R-2`, name: 'Final Results', session: '2024-2025', semester: 'Spring', publish: '2025-06-20', data: 'Sample final result data ...' }
  ];

  localStorage.setItem(keys.staffs, JSON.stringify(sampleStaffs));
  localStorage.setItem(keys.events, JSON.stringify(sampleEvents));
  localStorage.setItem(keys.classes, JSON.stringify(sampleClasses));
  localStorage.setItem(keys.exams, JSON.stringify(sampleExams));
  localStorage.setItem(keys.results, JSON.stringify(sampleResults));

  return { ok: true, message: `Seeded data for ${dept}` };
}

export default seedOfficeData;
