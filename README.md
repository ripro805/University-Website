# GSTU University Web App

Modern university web application with React + Vite frontend and Node.js + Express + MongoDB backend. Includes JWT authentication with role-based access and a seeded database for realistic demo data.

## Overview
- Full-stack app integrating multiple university modules: Students, Teachers, Library (Public + Admin), Halls (Public + Admin), Offices, Transport, Sports, and Campus Gallery.
- Backend provides REST APIs with role-based authorization; frontend consumes APIs and serves static assets from `public/`.

## Tech Stack
- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express.js, Mongoose
- Auth: JWT, bcrypt
- Database: MongoDB (local)
- Dev tools: Nodemon

## Repository Structure
```
README.md
backend/
	package.json
	server.js
	controllers/
	models/
	routes/
	seeds/
frontend/
	package.json
	vite.config.js
	public/
		images/
	src/
		components/
		pages/
		App.jsx
```

## Key Features
- JWT authentication with roles: `student`, `teacher`, `library`, `employee`, `hall-admin`
- Seeded data: 5000 books, 158 users, 5 departments, 5 halls, 50 rooms, 10 notices
- Library catalog integrated with backend API
- Campus Gallery served from `frontend/public/images/Gallery`

## Prerequisites
- Node.js 18+
- MongoDB (local instance running)
- Windows PowerShell 5.1

## Environment Variables
Create `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/Gstu_web
JWT_SECRET=your_strong_secret_here
JWT_EXPIRE=7d
NODE_ENV=development
```

## Setup
Install dependencies:
```powershell
cd "D:\KnowledgeVault\Project\GSTU WEB\backend"; npm install
cd "D:\KnowledgeVault\Project\GSTU WEB\frontend"; npm install
```

## Seed Database
Populate users, books, departments, halls, rooms, notices:
```powershell
cd "D:\KnowledgeVault\Project\GSTU WEB\backend"
node .\seeds\seedDatabase.js
```

## Run
Start backend:
```powershell
cd "D:\KnowledgeVault\Project\GSTU WEB\backend"; npm run dev
```
Start frontend:
```powershell
cd "D:\KnowledgeVault\Project\GSTU WEB\frontend"; npm run dev
```
Access:
- API: `http://localhost:5000/api`
- App: `http://localhost:5173`

## Test Credentials
- Student: `2020001 / student123`
- Teacher: `T0001 / teacher123`
- Library Manager: `LIB001 / library123`
- Office Employee: `EMP001 / employee123`
- Hall Admin: `HALL001 / hall123`

## API Highlights
- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- Library: `GET /api/library/books` (plus CRUD, issue/return)
- Halls: `GET /api/halls` and rooms management (protected)
- Departments: `GET /api/departments`
- Other modules: `/api/students`, `/api/teachers`, `/api/offices`, `/api/transport`, `/api/sports`

## Frontend Navigation
- Auth: `/login`, `/register`
- Library (public): `/library`, `/library/catalog`
- Hall (public): `/hall`, `/hall/:slug`
- Campus Gallery: `/campus/gallery` (images from `public/images/Gallery`)
- Teacher: `/teacher/profile` (after login)
- Student: `/student/dashboard` (after login)
- Library Admin: `/library-admin` (protected)
- Hall Admin: `/admin/halls` (protected)
- Offices: `/offices/*`

## Static Assets
- Place images under `frontend/public/images/`
- Gallery reads from `frontend/public/images/Gallery`
- If assets don’t show, hard refresh the browser (Ctrl+F5)

## Troubleshooting
- Port in use (EADDRINUSE):
```powershell
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force
```
Then restart servers.
- "Failed to fetch": Ensure backend is running on `:5000`, CORS is enabled (enabled in `server.js`), and API base URLs are correct.
- Images black but zoom works: Hard refresh; ensure gallery item has explicit height and images are in `public/images/Gallery`.

## Security Notes
- Passwords hashed with bcrypt (salt rounds: 10)
- JWT expiry: 7 days; stored in localStorage (demo only)

## Development Tips
- Edit `frontend/src/pages/campus/Gallery.jsx` to tweak layout
- Use `/images/...` paths for assets (Vite serves `public/` at root)
- Role-based redirects handled in `frontend/src/pages/auth/Login.jsx`

## License
Proprietary/Private for university demo purposes. Update as needed.

##Live demo
https://gstudev.onrender.com/

# University-Website
A full-stack university website built to manage academic and administrative activities, including admissions, hall management, course information, and student services. Built with React, Node.js, and MongoDB.
