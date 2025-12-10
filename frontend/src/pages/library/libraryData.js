// Library Basic Information
export const libraryInfo = {
  name: "GSTU Central Library",
  location: "Ground Floor, Academic Building",
  workingHours: {
    weekdays: "8:00 AM - 8:00 PM",
    saturday: "9:00 AM - 5:00 PM",
    sunday: "Closed"
  },
  description: "The GSTU Central Library is a modern learning resource center equipped with extensive collections of books, journals, digital resources, and comfortable reading spaces. Our library serves as the intellectual hub of the university, supporting academic excellence and research endeavors.",
  contact: {
    phone: "+880-XXX-XXXXXX",
    email: "library@gstu.ac.bd"
  },
  facilities: [
    "Reading Hall with 200+ seats",
    "Digital Resource Center",
    "Reference Section",
    "Thesis & Dissertation Archive",
    "Group Study Rooms",
    "Photocopying & Printing Services",
    "Air-conditioned Environment",
    "Wi-Fi Access"
  ]
};

// Book Catalog - Import from admin data for consistency
import { booksDatabase } from '../library-admin/libraryAdminData';

// Convert admin books to public catalog format (showing first 100 books for performance)
export const bookCatalog = booksDatabase.slice(0, 100).map(book => ({
  id: book.id,
  title: book.name,
  author: book.author,
  category: book.category,
  availability: book.available > 0 ? "Available" : "Not Available",
  copies: book.available
}));

// Categories
export const categories = ["All", "Computer Science", "Economics", "Business", "Physics", "Mathematics", "Chemistry", "Biology", "Engineering", "Sociology", "History"];

// Digital Resources
export const digitalResources = [
  { id: 1, title: "IEEE Xplore Digital Library", type: "Database", description: "Access to IEEE journals, conferences, and standards", link: "https://ieeexplore.ieee.org", icon: "📚" },
  { id: 2, title: "JSTOR Academic Collections", type: "Database", description: "Scholarly journals across humanities and sciences", link: "https://www.jstor.org", icon: "📖" },
  { id: 3, title: "SpringerLink", type: "Database", description: "Scientific journals, books, and reference works", link: "https://link.springer.com", icon: "🔬" },
  { id: 4, title: "MIT OpenCourseWare", type: "E-Learning", description: "Free lecture notes, exams, and videos from MIT", link: "https://ocw.mit.edu", icon: "🎓" },
  { id: 5, title: "Google Scholar", type: "Search Engine", description: "Search scholarly literature from various disciplines", link: "https://scholar.google.com", icon: "🔍" },
  { id: 6, title: "arXiv", type: "Repository", description: "Open-access archive for research papers", link: "https://arxiv.org", icon: "📄" },
  { id: 7, title: "Project Gutenberg", type: "E-Books", description: "Over 70,000 free eBooks", link: "https://www.gutenberg.org", icon: "📚" },
  { id: 8, title: "ResearchGate", type: "Network", description: "Social networking for scientists and researchers", link: "https://www.researchgate.net", icon: "🌐" }
];

// Library Rules
export const libraryRules = {
  borrowing: [
    "Students can borrow up to 3 books at a time",
    "Faculty members can borrow up to 10 books at a time",
    "Borrowing period for students: 14 days",
    "Borrowing period for faculty: 30 days",
    "Books can be renewed once if not reserved by others",
    "Reference books cannot be borrowed"
  ],
  fines: [
    "Late return fine: 5 Taka per day per book",
    "Lost book: Full replacement cost + 200 Taka processing fee",
    "Damaged book: Repair cost or replacement cost",
    "Maximum fine accumulation: 500 Taka"
  ],
  conduct: [
    "Maintain complete silence in reading halls",
    "Mobile phones must be on silent mode",
    "No food or drinks allowed",
    "Smoking is strictly prohibited",
    "Personal belongings should be kept in lockers",
    "Treat library materials with care",
    "Report any damaged or missing books",
    "Photography requires prior permission"
  ],
  membership: [
    "Valid university ID card required for entry",
    "Visitors need special permission",
    "Library card must be presented when borrowing",
    "Inform library immediately if ID card is lost"
  ]
};

// Library Notices
export const libraryNotices = [
  { id: 1, title: "New Books Added - January 2025", date: "2025-01-15", type: "announcement", content: "150+ new books added across various departments. Visit the 'New Arrivals' section.", important: true },
  { id: 2, title: "Library Closed - Victory Day", date: "2024-12-16", type: "holiday", content: "Library will remain closed on December 16, 2024 (Victory Day).", important: false },
  { id: 3, title: "Extended Hours During Exams", date: "2024-12-01", type: "announcement", content: "Library will remain open until 10:00 PM during final examination period (Dec 20 - Jan 10).", important: true },
  { id: 4, title: "Digital Resource Training", date: "2024-11-20", type: "event", content: "Free training on IEEE Xplore and JSTOR databases on November 25, 2024 at 3:00 PM.", important: false },
  { id: 5, title: "Overdue Book Amnesty", date: "2024-11-10", type: "announcement", content: "Return all overdue books without fines from November 15-30, 2024.", important: true },
  { id: 6, title: "Library Survey 2024", date: "2024-11-01", type: "announcement", content: "Help us improve! Participate in our annual library survey. Forms available at circulation desk.", important: false }
];
