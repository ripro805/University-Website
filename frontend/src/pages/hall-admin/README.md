# Hall Admin Dashboard Documentation

## Overview
The Hall Admin Dashboard is a comprehensive management system for university residential halls. It provides tools for managing halls, rooms, student allocations, applications, notices, complaints, and generating reports.

## Features

### 1. **Manage Halls** (`/admin/halls`)
- View all residential halls in a card-based grid layout
- Search halls by name or type
- Create new halls with detailed information
- Edit existing hall details
- Delete halls
- Visual occupancy indicators and statistics

**Features:**
- Hall name, type (Male/Female), capacity
- Occupancy progress bars
- Established year tracking
- Hall images

### 2. **Hall Create** (`/admin/halls/create`)
- Form to add new halls
- Required fields: Name, Type, Capacity, Established Year, Description
- Optional: Image URL
- Validation and error handling

### 3. **Hall Edit** (`/admin/halls/edit/:id`)
- Pre-populated form with existing hall data
- Update all hall information
- Cancel or save changes

### 4. **Room Management** (`/admin/rooms`)
- Complete room inventory management
- Add, edit, and delete rooms
- Filter rooms by hall
- Search by room number or type
- View room status (Available, Occupied, Partially Occupied)

**Room Details:**
- Room number, floor, type (Single/Double/Triple)
- Capacity and current occupancy
- Status indicators with color coding
- Modal-based add/edit interface

### 5. **Seat Allocation** (`/admin/seat-allocation`)
- Manage student room assignments
- Two-section view:
  - **Unallocated Students**: Students without room assignments
  - **Allocated Students**: Students with current room assignments
- Allocate students to available rooms
- Deallocate students from rooms
- Real-time room availability checking
- Filter by hall

**Features:**
- Select hall and room for allocation
- View available seats per room
- Automatic room status updates
- Student information display

### 6. **Applications** (`/admin/applications`)
- View all hall admission applications
- Statistics dashboard (Total, Pending, Approved, Rejected)
- Filter by status
- Search by name or student ID
- View detailed application information
- Approve or reject applications
- Application details modal

**Application Information:**
- Student ID, Name, Department
- Hall preference
- Contact information (email, phone)
- Applied date
- Current status

### 7. **Notices** (`/admin/notices`)
- Create and manage hall notices
- Target specific halls or all halls
- Priority levels (High, Medium, Low)
- Edit and delete notices
- Color-coded priority indicators

**Notice Features:**
- Title and detailed content
- Date stamping
- Hall-specific or broadcast notices
- Priority management

### 8. **Complaints** (`/admin/complaints`)
- View and manage student complaints
- Statistics overview (Total, Pending, In Progress, Resolved)
- Filter by status and priority
- Search complaints
- Update complaint status
- Priority indicators

**Complaint Details:**
- Student information
- Hall and room number
- Complaint description
- Date submitted
- Priority level
- Status management

### 9. **Reports** (`/admin/reports`)
- Comprehensive analytics dashboard
- Overall statistics:
  - Total halls, rooms, students
  - Occupancy rate
- Capacity overview
- Room status breakdown
- Room type distribution
- Student allocation status
- Hall-wise detailed breakdown

**Report Metrics:**
- Visual progress bars
- Occupancy percentages
- Color-coded status indicators
- Downloadable reports (ready for backend integration)

## Navigation

The admin dashboard features:
- **Sidebar Navigation**: Quick access to all modules
- **Active State Highlighting**: Current page indicator
- **Responsive Design**: Works on mobile and desktop
- **Toggle Sidebar**: Collapsible sidebar for more workspace
- **Home Link**: Quick return to public website

## Routes

```
/admin/halls                 - Hall list
/admin/halls/create         - Create new hall
/admin/halls/edit/:id       - Edit existing hall
/admin/rooms                - Room management
/admin/seat-allocation      - Student seat allocation
/admin/applications         - View/manage applications
/admin/notices              - Create/manage notices
/admin/complaints           - Handle complaints
/admin/reports              - View analytics and reports
```

## Data Structure

The dashboard uses dummy data from `adminData.js`:
- `hallsData`: Hall information
- `roomsData`: Room inventory
- `studentsData`: Student records
- `applicationsData`: Application submissions
- `noticesData`: Hall notices
- `complaintsData`: Student complaints

## Styling

- **Framework**: Tailwind CSS
- **Icons**: React Icons (Font Awesome)
- **Color Scheme**: Green primary (#16a34a), consistent with university branding
- **Responsive**: Mobile-first design
- **Components**: Cards, tables, modals, forms

## Usage Instructions

1. **Access the Dashboard**: Navigate to `/admin/halls` to start
2. **Navigate**: Use the sidebar to switch between different modules
3. **Search & Filter**: Use search bars and dropdowns to find specific items
4. **Add New Items**: Click "Add" or "Create" buttons to open forms
5. **Edit Items**: Click edit icons in tables or cards
6. **Delete Items**: Click delete icons (with confirmation prompts)
7. **View Details**: Click on items or view buttons for more information

## Future Enhancements (Backend Integration)

- Connect to REST API for data persistence
- Authentication and role-based access control
- Real-time updates using WebSockets
- File upload for hall/room images
- Email notifications for applications and complaints
- PDF report generation
- Dashboard analytics with charts
- Student portal integration

## Components Created

1. `AdminLayout.jsx` - Main layout with sidebar
2. `HallList.jsx` - Hall management grid
3. `HallCreate.jsx` - Create new hall form
4. `HallEdit.jsx` - Edit hall form
5. `RoomManagement.jsx` - Room CRUD operations
6. `SeatAllocation.jsx` - Student-room allocation
7. `Applications.jsx` - Application management
8. `Notices.jsx` - Notice creation and management
9. `Complaints.jsx` - Complaint tracking
10. `Reports.jsx` - Analytics dashboard
11. `adminData.js` - Dummy data source

## Technologies Used

- **React 19.2**: Modern React with hooks
- **React Router Dom v7**: Client-side routing
- **Tailwind CSS 4.1**: Utility-first styling
- **React Icons 5.x**: Icon components
- **Vite**: Fast build tool

## Notes

- All data is currently client-side (in-memory)
- Changes will reset on page refresh
- Ready for backend API integration
- Fully responsive and accessible
- Follows existing site design patterns
