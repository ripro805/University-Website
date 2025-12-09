// Dummy data for hall admin dashboard

export const hallsData = [
  {
    id: 1,
    name: "Bijoy Dibosh Hall",
    slug: "bijoy-dibosh-hall",
    type: "Male",
    capacity: 300,
    occupied: 245,
    description: "Premier residential hall for male students",
    established: "2015",
    image: "/images/halls/bijoy-dibosh.jpg"
  },
  {
    id: 2,
    name: "Swadhinata Dibosh Hall",
    slug: "swadhinata-dibosh-hall",
    type: "Male",
    capacity: 350,
    occupied: 298,
    description: "Modern residential facility with excellent amenities",
    established: "2016",
    image: "/images/halls/swadhinata-dibosh.jpg"
  },
  {
    id: 3,
    name: "Bangamata Sheikh Fazilatunnesa Mujib Hall",
    slug: "bangamata-sheikh-fazilatunnesa-mujib-hall",
    type: "Female",
    capacity: 250,
    occupied: 210,
    description: "Residential hall for female students",
    established: "2017",
    image: "/images/halls/bangamata.jpg"
  },
  {
    id: 4,
    name: "Sheikh Russel Hall",
    slug: "sheikh-russel-hall",
    type: "Male",
    capacity: 280,
    occupied: 265,
    description: "Well-equipped hall with modern facilities",
    established: "2018",
    image: "/images/halls/sheikh-russel.jpg"
  },
  {
    id: 5,
    name: "Sheikh Rehana Hall",
    slug: "sheikh-rehana-hall",
    type: "Female",
    capacity: 220,
    occupied: 198,
    description: "Comfortable residential facility for female students",
    established: "2019",
    image: "/images/halls/sheikh-rehana.jpg"
  }
];

export const roomsData = [
  { id: 1, hallId: 1, roomNumber: "101", type: "Single", capacity: 1, occupied: 1, floor: 1, status: "Occupied" },
  { id: 2, hallId: 1, roomNumber: "102", type: "Double", capacity: 2, occupied: 2, floor: 1, status: "Occupied" },
  { id: 3, hallId: 1, roomNumber: "103", type: "Triple", capacity: 3, occupied: 2, floor: 1, status: "Partially Occupied" },
  { id: 4, hallId: 1, roomNumber: "104", type: "Double", capacity: 2, occupied: 0, floor: 1, status: "Available" },
  { id: 5, hallId: 2, roomNumber: "201", type: "Single", capacity: 1, occupied: 1, floor: 2, status: "Occupied" },
  { id: 6, hallId: 2, roomNumber: "202", type: "Triple", capacity: 3, occupied: 3, floor: 2, status: "Occupied" },
  { id: 7, hallId: 3, roomNumber: "301", type: "Double", capacity: 2, occupied: 1, floor: 3, status: "Partially Occupied" },
  { id: 8, hallId: 3, roomNumber: "302", type: "Single", capacity: 1, occupied: 0, floor: 3, status: "Available" }
];

export const studentsData = [
  { id: 1, name: "Rahim Ahmed", studentId: "CSE-2021-001", department: "CSE", hallId: 1, roomId: 1, email: "rahim@student.edu", phone: "01712345678" },
  { id: 2, name: "Karim Hossain", studentId: "EEE-2021-015", department: "EEE", hallId: 1, roomId: 2, email: "karim@student.edu", phone: "01812345678" },
  { id: 3, name: "Ayesha Begum", studentId: "BBA-2021-025", department: "BBA", hallId: 3, roomId: 7, email: "ayesha@student.edu", phone: "01912345678" },
  { id: 4, name: "Fatema Rahman", studentId: "ENG-2021-012", department: "English", hallId: 3, roomId: null, email: "fatema@student.edu", phone: "01612345678" },
  { id: 5, name: "Jamal Uddin", studentId: "CSE-2021-045", department: "CSE", hallId: 2, roomId: 5, email: "jamal@student.edu", phone: "01512345678" }
];

export const applicationsData = [
  { id: 1, studentId: "CSE-2022-078", name: "Shakib Al Hasan", department: "CSE", hallPreference: "Bijoy Dibosh Hall", status: "Pending", appliedDate: "2025-12-01", email: "shakib@student.edu", phone: "01712345679" },
  { id: 2, studentId: "EEE-2022-045", name: "Tamim Iqbal", department: "EEE", hallPreference: "Swadhinata Dibosh Hall", status: "Approved", appliedDate: "2025-11-28", email: "tamim@student.edu", phone: "01812345679" },
  { id: 3, studentId: "BBA-2022-089", name: "Mushfiqur Rahman", department: "BBA", hallPreference: "Sheikh Russel Hall", status: "Pending", appliedDate: "2025-12-03", email: "mushfiq@student.edu", phone: "01912345679" },
  { id: 4, studentId: "ENG-2022-034", name: "Rumana Akter", department: "English", hallPreference: "Bangamata Hall", status: "Rejected", appliedDate: "2025-11-25", email: "rumana@student.edu", phone: "01612345679" }
];

export const noticesData = [
  { id: 1, title: "Hall Opening Notice", content: "All residential halls will open on January 5, 2026", date: "2025-12-05", hallId: null, priority: "High" },
  { id: 2, title: "Room Cleaning Schedule", content: "Weekly room inspection every Friday", date: "2025-12-01", hallId: 1, priority: "Medium" },
  { id: 3, title: "Electricity Maintenance", content: "Power will be off from 2 PM to 4 PM on Saturday", date: "2025-12-08", hallId: 2, priority: "High" },
  { id: 4, title: "Dining Schedule Change", content: "New dinner timing: 7:30 PM to 9:00 PM", date: "2025-12-03", hallId: 3, priority: "Low" }
];

export const complaintsData = [
  { id: 1, studentName: "Rahim Ahmed", studentId: "CSE-2021-001", hallId: 1, roomNumber: "101", complaint: "AC not working properly", status: "Pending", date: "2025-12-07", priority: "High" },
  { id: 2, studentName: "Ayesha Begum", studentId: "BBA-2021-025", hallId: 3, roomNumber: "301", complaint: "Water supply issue", status: "In Progress", date: "2025-12-05", priority: "High" },
  { id: 3, studentName: "Karim Hossain", studentId: "EEE-2021-015", hallId: 1, roomNumber: "102", complaint: "Broken chair needs replacement", status: "Resolved", date: "2025-12-02", priority: "Low" },
  { id: 4, studentName: "Jamal Uddin", studentId: "CSE-2021-045", hallId: 2, roomNumber: "201", complaint: "Internet connectivity problem", status: "Pending", date: "2025-12-06", priority: "Medium" }
];
