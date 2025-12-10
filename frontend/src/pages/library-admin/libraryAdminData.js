// Library Admin Data Management

// Generate 5000 books
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
    "Dr. Christopher Walker", "Prof. Karen Hall", "Dr. Matthew Allen", "Prof. Betty Young",
    "Dr. Anthony King", "Prof. Helen Wright", "Dr. Mark Lopez", "Prof. Sandra Hill",
    "Dr. Donald Scott", "Prof. Donna Green", "Dr. Steven Adams", "Prof. Carol Baker",
    "Dr. Paul Nelson", "Prof. Michelle Carter", "Dr. Andrew Mitchell", "Prof. Laura Perez",
    "Dr. Kenneth Roberts", "Prof. Sharon Turner", "Dr. Joshua Phillips", "Prof. Deborah Campbell",
    "Dr. Kevin Parker", "Prof. Cynthia Evans", "Dr. Brian Edwards", "Prof. Angela Collins",
    "Dr. George Stewart", "Prof. Melissa Sanchez", "Dr. Edward Morris", "Prof. Brenda Rogers",
    "Dr. Ronald Reed", "Prof. Amy Cook", "Dr. Timothy Morgan", "Prof. Kathleen Bell"
  ];
  
  for (let i = 1; i <= 5000; i++) {
    const title = bookTitles[Math.floor(Math.random() * bookTitles.length)];
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const author = authors[Math.floor(Math.random() * authors.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const quantity = Math.floor(Math.random() * 15) + 1; // 1-15 copies
    const issued = Math.floor(Math.random() * quantity);
    const available = quantity - issued;
    
    books.push({
      id: i,
      name: `${title} ${subject}`,
      author: author,
      isbn: `978-${String(Math.floor(Math.random() * 10)).padStart(1, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}-${Math.floor(Math.random() * 10)}`,
      category: category,
      quantity: quantity,
      available: available
    });
  }
  
  return books;
}

// Generate 120 users
function generateUsers() {
  const users = [];
  const firstNames = [
    "Ahmed", "Fatema", "Kamal", "Sharmin", "Mehedi", "Nusrat", "Rakib", "Sadia",
    "Tanvir", "Rafia", "Imran", "Sumaya", "Sabbir", "Taslima", "Rafiq", "Nasrin",
    "Kamrul", "Ayesha", "Shakil", "Farhana", "Ashik", "Ruma", "Masud", "Sultana",
    "Farhan", "Jannatul", "Mamun", "Shirin", "Ripon", "Marziya", "Sakib", "Labiba",
    "Zahid", "Tasnim", "Rubel", "Sabrina", "Jamal", "Nafisa", "Sumon", "Maliha",
    "Rahim", "Samira", "Babul", "Roksana", "Liton", "Farjana", "Morshed", "Afroza",
    "Arif", "Rehana", "Helal", "Shahana", "Milon", "Dilruba", "Hanif", "Nasima",
    "Jewel", "Shamima", "Kabir", "Maksuda", "Shahin", "Monira", "Iqbal", "Amina"
  ];
  
  const lastNames = [
    "Rahman", "Khatun", "Uddin", "Akter", "Hasan", "Begum", "Islam", "Ahmed",
    "Ali", "Khan", "Chowdhury", "Hossain", "Mahmud", "Sultana", "Mia", "Sarkar",
    "Das", "Roy", "Mondal", "Saha", "Biswas", "Alam", "Karim", "Hussain"
  ];
  
  const statuses = ["active", "active", "active", "active", "active", "active", "blocked"]; // More active than blocked
  
  for (let i = 1; i <= 120; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const year = 2020 + Math.floor(Math.random() * 6); // 2020-2025
    const studentId = `${year}${String(i).padStart(3, '0')}`;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const fineAmount = status === "blocked" ? Math.floor(Math.random() * 500) + 100 : Math.floor(Math.random() * 200);
    
    users.push({
      id: i,
      studentId: studentId,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gstu.ac.bd`,
      phone: `017${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
      status: status,
      fineAmount: fineAmount
    });
  }
  
  return users;
}

// Books Database
export let booksDatabase = generateBooks();

// Users Database
export let usersDatabase = generateUsers();

// Issued Books Database
export let issuedBooksDatabase = [
  { id: 1, bookId: 1, bookName: "Introduction to Algorithms", studentId: "2020001", studentName: "Ahmed Rahman", issueDate: "2024-12-01", dueDate: "2024-12-15", returnDate: null, fine: 0, status: "issued" },
  { id: 2, bookId: 2, bookName: "Advanced Data Structures", studentId: "2021002", studentName: "Fatema Khatun", issueDate: "2024-11-20", dueDate: "2024-12-04", returnDate: null, fine: 30, status: "overdue" },
  { id: 3, bookId: 3, bookName: "Fundamentals of Machine Learning", studentId: "2022003", studentName: "Kamal Uddin", issueDate: "2024-11-10", dueDate: "2024-11-24", returnDate: null, fine: 80, status: "overdue" },
  { id: 4, bookId: 5, bookName: "Principles of Microeconomics", studentId: "2023004", studentName: "Sharmin Akter", issueDate: "2024-12-05", dueDate: "2024-12-19", returnDate: null, fine: 0, status: "issued" },
  { id: 5, bookId: 6, bookName: "Modern Marketing", studentId: "2020001", studentName: "Ahmed Rahman", issueDate: "2024-11-25", dueDate: "2024-12-09", returnDate: "2024-12-08", fine: 0, status: "returned" }
];

// Notices Database
export let noticesDatabase = [
  { id: 1, title: "New Books Added - January 2025", date: "2025-01-15", type: "announcement", content: "150+ new books added across various departments.", important: true },
  { id: 2, title: "Library Closed - Victory Day", date: "2024-12-16", type: "holiday", content: "Library will remain closed on December 16, 2024.", important: false },
  { id: 3, title: "Extended Hours During Exams", date: "2024-12-01", type: "announcement", content: "Library open until 10:00 PM during examination period.", important: true }
];

// Fine calculation (5 Taka per day)
export const FINE_PER_DAY = 5;

export function calculateFine(dueDate, returnDate = new Date()) {
  const due = new Date(dueDate);
  const returned = new Date(returnDate);
  const diffTime = returned - due;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays * FINE_PER_DAY : 0;
}

// Book Management Functions
export function addBook(book) {
  const newBook = {
    id: booksDatabase.length > 0 ? Math.max(...booksDatabase.map(b => b.id)) + 1 : 1,
    ...book,
    available: book.quantity
  };
  booksDatabase.push(newBook);
  return newBook;
}

export function updateBook(id, updates) {
  const index = booksDatabase.findIndex(b => b.id === id);
  if (index !== -1) {
    booksDatabase[index] = { ...booksDatabase[index], ...updates };
    return booksDatabase[index];
  }
  return null;
}

export function deleteBook(id) {
  const index = booksDatabase.findIndex(b => b.id === id);
  if (index !== -1) {
    booksDatabase.splice(index, 1);
    return true;
  }
  return false;
}

// User Management Functions
export function blockUser(userId) {
  const user = usersDatabase.find(u => u.studentId === userId);
  if (user) {
    user.status = "blocked";
    return user;
  }
  return null;
}

export function unblockUser(userId) {
  const user = usersDatabase.find(u => u.studentId === userId);
  if (user) {
    user.status = "active";
    return user;
  }
  return null;
}

export function updateUserFine(userId, amount) {
  const user = usersDatabase.find(u => u.studentId === userId);
  if (user) {
    user.fineAmount = amount;
    return user;
  }
  return null;
}

// Issue/Return Functions
export function issueBook(bookId, studentId, studentName) {
  const book = booksDatabase.find(b => b.id === bookId);
  const user = usersDatabase.find(u => u.studentId === studentId);
  
  if (!book || book.available <= 0) {
    return { success: false, message: "Book not available" };
  }
  
  if (!user) {
    return { success: false, message: "User not found" };
  }
  
  if (user.status === "blocked") {
    return { success: false, message: "User is blocked" };
  }
  
  const issueDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14); // 14 days borrowing period
  
  const newIssue = {
    id: issuedBooksDatabase.length > 0 ? Math.max(...issuedBooksDatabase.map(i => i.id)) + 1 : 1,
    bookId: book.id,
    bookName: book.name,
    studentId,
    studentName: user.name,
    issueDate: issueDate.toISOString().split('T')[0],
    dueDate: dueDate.toISOString().split('T')[0],
    returnDate: null,
    fine: 0,
    status: "issued"
  };
  
  issuedBooksDatabase.push(newIssue);
  book.available -= 1;
  
  return { success: true, data: newIssue };
}

export function returnBook(issueId, returnDate = new Date()) {
  const issue = issuedBooksDatabase.find(i => i.id === issueId);
  if (!issue) {
    return { success: false, message: "Issue record not found" };
  }
  
  const book = booksDatabase.find(b => b.id === issue.bookId);
  const fine = calculateFine(issue.dueDate, returnDate);
  
  issue.returnDate = returnDate.toISOString().split('T')[0];
  issue.fine = fine;
  issue.status = "returned";
  
  if (book) {
    book.available += 1;
  }
  
  // Update user fine
  const user = usersDatabase.find(u => u.studentId === issue.studentId);
  if (user && fine > 0) {
    user.fineAmount += fine;
  }
  
  return { success: true, data: issue, fine };
}

// Notice Management Functions
export function addNotice(notice) {
  const newNotice = {
    id: noticesDatabase.length > 0 ? Math.max(...noticesDatabase.map(n => n.id)) + 1 : 1,
    ...notice,
    date: new Date().toISOString().split('T')[0]
  };
  noticesDatabase.push(newNotice);
  return newNotice;
}

export function updateNotice(id, updates) {
  const index = noticesDatabase.findIndex(n => n.id === id);
  if (index !== -1) {
    noticesDatabase[index] = { ...noticesDatabase[index], ...updates };
    return noticesDatabase[index];
  }
  return null;
}

export function deleteNotice(id) {
  const index = noticesDatabase.findIndex(n => n.id === id);
  if (index !== -1) {
    noticesDatabase.splice(index, 1);
    return true;
  }
  return false;
}

// Dashboard Statistics
export function getDashboardStats() {
  const totalBooks = booksDatabase.reduce((sum, book) => sum + book.quantity, 0);
  const issuedBooks = issuedBooksDatabase.filter(i => i.status === "issued" || i.status === "overdue").length;
  const overdueBooks = issuedBooksDatabase.filter(i => i.status === "overdue").length;
  const totalFines = usersDatabase.reduce((sum, user) => sum + user.fineAmount, 0);
  
  return {
    totalBooks,
    availableBooks: booksDatabase.reduce((sum, book) => sum + book.available, 0),
    issuedBooks,
    overdueBooks,
    totalFines,
    totalUsers: usersDatabase.length,
    blockedUsers: usersDatabase.filter(u => u.status === "blocked").length
  };
}
