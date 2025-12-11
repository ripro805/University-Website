# GSTU University Backend API

Complete backend API for GSTU University Website with role-based authentication and comprehensive endpoints.

## 🚀 Features

- **Role-Based Authentication** - JWT-based auth for students, teachers, library managers, hall admins, and employees
- **Library Management** - Complete book catalog, issue/return system, fine calculation
- **Hall Management** - Residential hall and room management
- **Department Management** - Academic department information
- **User Management** - Profile management for all user types
- **Notice System** - Categorized notices for different modules
- **Transport & Sports** - Schedule and notice management

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v6 or higher)
- npm or yarn

## ⚙️ Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env` file and update if needed
   - Default MongoDB: `mongodb://127.0.0.1:27017/Gstu_web`

3. **Start MongoDB:**
   ```bash
   mongod
   ```

4. **Run the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev

   # Production mode
   npm start
   ```

Server will run on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "userId": "2024001",
  "email": "student@gstu.ac.bd",
  "password": "password123",
  "role": "student",
  "department": "Computer Science",
  "profile": {
    "fullName": "John Doe",
    "phone": "01712345678"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "userId": "2024001",
  "password": "password123",
  "role": "student"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ...userObject },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Library Endpoints

#### Get All Books
```http
GET /api/library/books?search=algorithm&category=Computer Science&page=1&limit=50
```

#### Add Book (Library Admin Only)
```http
POST /api/library/books
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Introduction to Algorithms",
  "author": "Thomas H. Cormen",
  "isbn": "978-0262033848",
  "category": "Computer Science",
  "quantity": 5,
  "available": 5
}
```

#### Issue Book
```http
POST /api/library/issue
Authorization: Bearer <token>
Content-Type: application/json

{
  "bookId": "65f7b3c4e1234567890abcde",
  "studentId": "2024001",
  "studentName": "John Doe"
}
```

#### Return Book
```http
POST /api/library/return/:issueId
Authorization: Bearer <token>
```

#### Get Library Statistics
```http
GET /api/library/stats
Authorization: Bearer <token>
```

### Hall Endpoints

#### Get All Halls
```http
GET /api/halls
```

#### Get Hall by Slug
```http
GET /api/halls/:slug
```

#### Create Hall (Hall Admin Only)
```http
POST /api/halls
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Bangabandhu Hall",
  "slug": "bangabandhu-hall",
  "type": "male",
  "capacity": 200,
  "location": "Main Campus"
}
```

### Department Endpoints

#### Get All Departments
```http
GET /api/departments
```

#### Get Department by Slug
```http
GET /api/departments/:slug
```

### Student Endpoints

#### Get Student Dashboard
```http
GET /api/students/dashboard
Authorization: Bearer <token>
```

#### Get Enrolled Courses
```http
GET /api/students/courses
Authorization: Bearer <token>
```

### Teacher Endpoints

#### Get Teacher Profile
```http
GET /api/teachers/profile
Authorization: Bearer <token>
```

#### Get Teacher's Courses
```http
GET /api/teachers/courses
Authorization: Bearer <token>
```

#### Get Students
```http
GET /api/teachers/students
Authorization: Bearer <token>
```

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

Get the token from the login response and include it in subsequent requests.

## 👥 User Roles

- **student** - Access to personal dashboard, courses, library
- **teacher** - Access to courses, students, assignments
- **library** - Full library management access
- **hall-admin** - Hall and room management
- **employee** - Office staff management

## 📊 Database Models

### User
- Unified model for all user types
- Role-specific fields (studentInfo, teacherInfo, employeeInfo)
- Password hashing with bcrypt
- Profile information

### Book
- Library book catalog
- ISBN, category, quantity tracking
- Availability management

### BookIssue
- Book borrowing records
- Issue and due dates
- Fine calculation (5 Taka/day)
- Return status

### Hall
- Residential hall information
- Capacity and occupancy tracking
- Provost details

### Room
- Hall room management
- Floor and room number
- Capacity tracking

### Department
- Academic departments
- Programs and courses
- Head information

### Notice
- System-wide notices
- Category-based (library, hall, department, transport, sports)
- Target audience filtering

### Course
- Academic courses
- Department and semester
- Teacher assignment
- Schedule management

## 🛠️ Project Structure

```
backend/
├── controllers/        # Request handlers
│   ├── authController.js
│   ├── libraryController.js
│   └── hallController.js
├── models/            # MongoDB schemas
│   ├── User.js
│   ├── Book.js
│   ├── BookIssue.js
│   ├── Hall.js
│   ├── Room.js
│   ├── Department.js
│   ├── Notice.js
│   └── Course.js
├── routes/            # API routes
│   ├── authRoutes.js
│   ├── libraryRoutes.js
│   ├── hallRoutes.js
│   ├── studentRoutes.js
│   ├── teacherRoutes.js
│   ├── departmentRoutes.js
│   ├── officeRoutes.js
│   ├── transportRoutes.js
│   └── sportsRoutes.js
├── middlewares/       # Custom middleware
│   └── authMiddleware.js
├── .env              # Environment variables
├── server.js         # Entry point
└── package.json      # Dependencies
```

## 🔧 Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/Gstu_web
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
```

## 🚨 Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 📝 Notes

- All passwords are hashed using bcrypt before storing
- JWT tokens expire in 7 days by default
- Fine calculation: 5 Taka per day for overdue books
- Book borrowing period: 14 days
- CORS is enabled for all origins (configure in production)

## 🤝 Frontend Integration

To connect your frontend:

1. Update frontend API base URL to `http://localhost:5000/api`
2. Store JWT token in localStorage after login
3. Include token in Authorization header for protected routes
4. Handle token expiration and refresh

Example fetch call:
```javascript
const response = await fetch('http://localhost:5000/api/library/books', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});
```

## 📞 Support

For issues or questions, please create an issue in the repository.
