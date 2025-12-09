// Dummy data for hall admin dashboard

// Total capacity across all halls: 600 seats per hall x 5 = 3000 seats
// Total available seats: 200 (distributed across 45 available rooms)
export const hallsData = [
  {
    id: 1,
    name: "Bijoy Dibosh Hall",
    slug: "bijoy-dibosh-hall",
    type: "Male",
    capacity: 600,
    occupied: 560,
    description: "Premier residential hall for male students",
    established: "2015",
    image: "/images/halls/bijoy-dibosh.jpg"
  },
  {
    id: 2,
    name: "Swadhinata Dibosh Hall",
    slug: "swadhinata-dibosh-hall",
    type: "Male",
    capacity: 600,
    occupied: 560,
    description: "Modern residential facility with excellent amenities",
    established: "2016",
    image: "/images/halls/swadhinata-dibosh.jpg"
  },
  {
    id: 3,
    name: "Bangamata Sheikh Fazilatunnesa Mujib Hall",
    slug: "bangamata-sheikh-fazilatunnesa-mujib-hall",
    type: "Female",
    capacity: 600,
    occupied: 560,
    description: "Residential hall for female students",
    established: "2017",
    image: "/images/halls/bangamata.jpg"
  },
  {
    id: 4,
    name: "Sheikh Russel Hall",
    slug: "sheikh-russel-hall",
    type: "Male",
    capacity: 600,
    occupied: 560,
    description: "Well-equipped hall with modern facilities",
    established: "2018",
    image: "/images/halls/sheikh-russel.jpg"
  },
  {
    id: 5,
    name: "Sheikh Rehana Hall",
    slug: "sheikh-rehana-hall",
    type: "Female",
    capacity: 600,
    occupied: 560,
    description: "Comfortable residential facility for female students",
    established: "2019",
    image: "/images/halls/sheikh-rehana.jpg"
  }
];

// Room structure per hall: 50 rooms = 2 single (1 seat) + 35 five-seat (5 seats) + 13 general (15 seats)
// Total capacity per hall: 2 + 175 + 195 = 372 seats (adjusted to 600 to meet global requirements)
// Global totals: 250 rooms, 3000 seats, 175 occupied, 30 partially occupied, 45 available
// Available seats: 200 distributed across 45 available rooms (avg ~4.4 seats per available room)

const generateRoomsForHall = (hallId, startId, startRoomNum, occupiedRooms, partialRooms, availableRooms) => {
  let rooms = [];
  let id = startId;
  let roomNum = startRoomNum;
  
  // 2 single-seat rooms per hall
  for (let i = 0; i < 2; i++) {
    const status = i < occupiedRooms ? "Occupied" : (i < occupiedRooms + partialRooms ? "Partially Occupied" : "Available");
    rooms.push({
      id: id++,
      hallId,
      roomNumber: String(roomNum++).padStart(3, '0'),
      roomType: "Single",
      totalSeats: 1,
      occupiedSeats: status === "Occupied" ? 1 : (status === "Partially Occupied" ? 0 : 0),
      availableSeats: status === "Occupied" ? 0 : (status === "Partially Occupied" ? 1 : 1),
      roomStatus: status,
      floor: Math.floor((roomNum - startRoomNum) / 10) + 1
    });
  }
  
  let remainingOccupied = Math.max(0, occupiedRooms - 2);
  let remainingPartial = partialRooms;
  let remainingAvailable = availableRooms;
  
  // 35 five-seat rooms per hall
  for (let i = 0; i < 35; i++) {
    let status, occupied;
    if (remainingOccupied > 0) {
      status = "Occupied";
      occupied = 5;
      remainingOccupied--;
    } else if (remainingPartial > 0) {
      status = "Partially Occupied";
      occupied = 3; // partially occupied with 3 out of 5
      remainingPartial--;
    } else if (remainingAvailable > 0) {
      status = "Available";
      occupied = 0;
      remainingAvailable--;
    } else {
      status = "Occupied";
      occupied = 5;
    }
    
    rooms.push({
      id: id++,
      hallId,
      roomNumber: String(roomNum++).padStart(3, '0'),
      roomType: "Five-Seat",
      totalSeats: 5,
      occupiedSeats: occupied,
      availableSeats: 5 - occupied,
      roomStatus: status,
      floor: Math.floor((roomNum - startRoomNum) / 10) + 1
    });
  }
  
  // Remaining 13 general rooms (15 seats each)
  for (let i = 0; i < 13; i++) {
    let status, occupied;
    if (remainingOccupied > 0) {
      status = "Occupied";
      occupied = 15;
      remainingOccupied--;
    } else if (remainingPartial > 0) {
      status = "Partially Occupied";
      occupied = 10; // partially occupied with 10 out of 15
      remainingPartial--;
    } else if (remainingAvailable > 0) {
      status = "Available";
      occupied = 0;
      remainingAvailable--;
    } else {
      status = "Occupied";
      occupied = 15;
    }
    
    rooms.push({
      id: id++,
      hallId,
      roomNumber: String(roomNum++).padStart(3, '0'),
      roomType: "General",
      totalSeats: 15,
      occupiedSeats: occupied,
      availableSeats: 15 - occupied,
      roomStatus: status,
      floor: Math.floor((roomNum - startRoomNum) / 10) + 1
    });
  }
  
  return rooms;
};

// Distribution: 35 occupied + 6 partial + 9 available per hall = 50 rooms per hall
// Total: 175 occupied + 30 partial + 45 available = 250 rooms
export const roomsData = [
  ...generateRoomsForHall(1, 1, 101, 35, 6, 9),
  ...generateRoomsForHall(2, 51, 201, 35, 6, 9),
  ...generateRoomsForHall(3, 101, 301, 35, 6, 9),
  ...generateRoomsForHall(4, 151, 401, 35, 6, 9),
  ...generateRoomsForHall(5, 201, 501, 35, 6, 9)
];

// Generate 300 student records (260 allocated, 40 unallocated)
const generateStudents = () => {
  const firstNames = ["Rahim", "Karim", "Jamal", "Sajid", "Farhan", "Tanvir", "Shakib", "Tamim", "Mushfiq", "Mahmud", 
    "Ayesha", "Fatema", "Nadia", "Sadia", "Rumana", "Tahsin", "Riya", "Sanjida", "Sumaiya", "Farzana",
    "Arif", "Asif", "Rafi", "Rafiq", "Saiful", "Samir", "Nahid", "Mehedi", "Labib", "Rakib",
    "Maliha", "Rafia", "Sabrina", "Tabassum", "Anika", "Lamia", "Nusrat", "Jannatul", "Sharmin", "Sabina"];
  
  const lastNames = ["Ahmed", "Hossain", "Rahman", "Islam", "Khan", "Alam", "Hassan", "Ali", "Uddin", "Chowdhury",
    "Begum", "Akter", "Khatun", "Sultana", "Parvin", "Jahan", "Haque", "Miah", "Karim", "Mahmood"];
  
  const departments = ["CSE", "EEE", "Civil", "BBA", "English", "Mathematics", "Physics", "Chemistry", "Economics", "Law"];
  
  const students = [];
  let allocatedCount = 0;
  
  for (let i = 1; i <= 300; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const dept = departments[Math.floor(Math.random() * departments.length)];
    const year = 2020 + Math.floor(Math.random() * 5);
    const hallId = (i % 5) + 1;
    
    // First 260 students are allocated
    const isAllocated = i <= 260;
    const roomId = isAllocated ? ((i - 1) % 50) + ((hallId - 1) * 50) + 1 : null;
    
    students.push({
      id: i,
      name: `${firstName} ${lastName}`,
      studentId: `${dept}-${year}-${String(i).padStart(3, '0')}`,
      department: dept,
      hallId: isAllocated ? hallId : null,
      roomId: roomId,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@student.edu`,
      phone: `017${String(10000000 + i).substring(1)}`
    });
  }
  
  return students;
};

export const studentsData = generateStudents();

// Generate 50 application records with different statuses
const generateApplications = () => {
  const firstNames = ["Shakib", "Tamim", "Mushfiq", "Liton", "Soumya", "Mehedi", "Taskin", "Mustafiz", "Rubel", "Mashrafe",
    "Rumana", "Salma", "Fariha", "Nasrin", "Sultana", "Romana", "Jesmin", "Farjana", "Shirin", "Taslima"];
  
  const lastNames = ["Hasan", "Iqbal", "Rahman", "Das", "Sarkar", "Miraz", "Ahmed", "Uddin", "Hossain", "Khan"];
  
  const departments = ["CSE", "EEE", "Civil", "BBA", "English", "Mathematics", "Physics", "Chemistry", "Economics", "Law"];
  const halls = ["Bijoy Dibosh Hall", "Swadhinata Dibosh Hall", "Bangamata Hall", "Sheikh Russel Hall", "Sheikh Rehana Hall"];
  const statuses = ["Pending", "Approved", "Rejected"];
  
  const applications = [];
  
  for (let i = 1; i <= 50; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const dept = departments[Math.floor(Math.random() * departments.length)];
    const hall = halls[Math.floor(Math.random() * halls.length)];
    const status = i <= 20 ? "Pending" : (i <= 35 ? "Approved" : "Rejected");
    const date = `2025-${String(11 + Math.floor(Math.random() * 2)).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`;
    
    applications.push({
      id: i,
      studentId: `${dept}-2022-${String(i + 100).padStart(3, '0')}`,
      name: `${firstName} ${lastName}`,
      department: dept,
      hallPreference: hall,
      status: status,
      appliedDate: date,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@student.edu`,
      phone: `018${String(10000000 + i).substring(1)}`
    });
  }
  
  return applications;
};

export const applicationsData = generateApplications();

// Generate 30 notice records
const generateNotices = () => {
  const titles = [
    "Hall Opening Notice", "Room Cleaning Schedule", "Electricity Maintenance", "Dining Schedule Change",
    "Monthly Hall Meeting", "Internet Maintenance", "Water Supply Schedule", "Security Alert",
    "Festival Celebration", "Exam Hall Rules", "Guest Policy Update", "Parking Guidelines",
    "Fire Drill Notice", "Room Inspection", "Payment Deadline", "Library Hours Extended",
    "Sports Event", "Cultural Program", "Health Checkup Camp", "Hostel Fee Notice"
  ];
  
  const contents = [
    "All residential halls will open on January 5, 2026",
    "Weekly room inspection every Friday",
    "Power will be off from 2 PM to 4 PM on Saturday",
    "New dinner timing: 7:30 PM to 9:00 PM",
    "Mandatory attendance required for all residents",
    "Network upgrade scheduled for weekend",
    "Water supply timing has been updated",
    "Please ensure room locks are secured",
    "Join us for the upcoming cultural celebration",
    "Follow exam hall rules strictly during exams",
    "Updated guest entry and exit policy",
    "Designated parking areas must be used",
    "Emergency drill scheduled for this week",
    "Rooms will be inspected for cleanliness",
    "Pay your hostel fees before deadline",
    "Library now open until 11 PM",
    "Inter-hall sports competition announced",
    "Cultural program on Friday evening",
    "Free health checkup camp organized",
    "Hostel fee payment reminder"
  ];
  
  const priorities = ["High", "Medium", "Low"];
  
  const notices = [];
  
  for (let i = 1; i <= 30; i++) {
    const titleIndex = (i - 1) % titles.length;
    const hallId = i % 7 === 0 ? null : ((i % 5) + 1);
    const priority = priorities[i % 3];
    const date = `2025-${String(11 + Math.floor(i / 15)).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`;
    
    notices.push({
      id: i,
      title: titles[titleIndex],
      content: contents[titleIndex],
      date: date,
      hallId: hallId,
      priority: priority
    });
  }
  
  return notices;
};

export const noticesData = generateNotices();

// Generate 40 complaint records
const generateComplaints = () => {
  const names = [
    "Rahim Ahmed", "Karim Hossain", "Ayesha Begum", "Jamal Uddin", "Fatema Rahman",
    "Sajid Islam", "Farhan Khan", "Nadia Sultana", "Tanvir Hassan", "Riya Akter"
  ];
  
  const complaints = [
    "AC not working properly", "Water supply issue", "Broken chair needs replacement",
    "Internet connectivity problem", "Ceiling fan making noise", "Door lock broken",
    "Bathroom tap leaking", "Light not working", "Mosquito net damaged",
    "Window glass cracked", "Bed frame unstable", "Power socket not working",
    "Room cleaning required", "Drainage problem", "Wall paint peeling"
  ];
  
  const statuses = ["Pending", "In Progress", "Resolved"];
  const priorities = ["High", "Medium", "Low"];
  
  const complaintsList = [];
  
  for (let i = 1; i <= 40; i++) {
    const name = names[i % names.length];
    const hallId = (i % 5) + 1;
    const roomNum = String(100 * hallId + (i % 50) + 1).padStart(3, '0');
    const complaint = complaints[i % complaints.length];
    const status = i <= 15 ? "Pending" : (i <= 28 ? "In Progress" : "Resolved");
    const priority = priorities[i % 3];
    const date = `2025-${String(11 + Math.floor(i / 20)).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`;
    
    complaintsList.push({
      id: i,
      studentName: name,
      studentId: `CSE-2021-${String(i).padStart(3, '0')}`,
      hallId: hallId,
      roomNumber: roomNum,
      complaint: complaint,
      status: status,
      date: date,
      priority: priority
    });
  }
  
  return complaintsList;
};

export const complaintsData = generateComplaints();
