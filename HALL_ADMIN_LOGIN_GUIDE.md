# Hall Admin Login নির্দেশনা

## কিভাবে Hall Admin হিসেবে Login করবেন:

### ১. Login পেজে যান
- ব্রাউজারে যান: `http://localhost:5174/login`
- অথবা navbar থেকে Login বাটনে ক্লিক করুন

### ২. Hall Admin Role সিলেক্ট করুন
- "Select Role" dropdown থেকে **"Hall Admin"** সিলেক্ট করুন

### ৩. Login তথ্য দিন
- **User ID**: যেকোনো ID লিখুন (যেমন: `admin001`)
- **Password**: যেকোনো password লিখুন (যেমন: `123456`)

### ৪. Login করুন
- "Login" বাটনে ক্লিক করুন
- সফলভাবে login হলে আপনি **Hall Admin Dashboard** এ redirect হবেন

## Dashboard Features:

Login করার পর আপনি এই features গুলো ব্যবহার করতে পারবেন:

### 📋 Manage Halls (`/admin/halls`)
- সব hall দেখুন
- নতুন hall যোগ করুন (Add New Hall)
- Hall edit করুন (Edit বাটন)
- Hall delete করুন (Delete বাটন)
- Hall search করুন

### 🚪 Room Management (`/admin/rooms`)
- সব room দেখুন
- নতুন room যোগ করুন
- Room edit/delete করুন
- Hall অনুযায়ী filter করুন

### 👥 Seat Allocation (`/admin/seat-allocation`)
- Students দের room allocate করুন
- Allocated students দেখুন
- Deallocate করুন

### 📝 Applications (`/admin/applications`)
- Student applications দেখুন
- Application approve করুন
- Application reject করুন

### 📢 Notices (`/admin/notices`)
- নতুন notice তৈরি করুন
- Notice edit/delete করুন
- Specific hall এর জন্য notice পাঠান

### ⚠️ Complaints (`/admin/complaints`)
- Student complaints দেখুন
- Complaint status update করুন

### 📊 Reports (`/admin/reports`)
- Hall statistics দেখুন
- Room occupancy reports দেখুন
- Download reports

## Navigation:

### Left Sidebar Menu:
- 🏢 Manage Halls
- 🚪 Room Management
- ✅ Seat Allocation
- 📄 Applications
- 📢 Notices
- ⚠️ Complaints
- 📊 Reports

### Top Menu:
- 🏠 **Home**: Main website এ ফিরে যান
- 🚪 **Logout**: Dashboard থেকে logout করুন

## Important Notes:

1. **Protected Route**: শুধুমাত্র Hall Admin role এ login করলেই dashboard access পাবেন
2. **Data Storage**: বর্তমানে data localStorage এ থাকে (browser refresh করলে login state থাকবে)
3. **Logout**: কাজ শেষে Logout করতে ভুলবেন না

## Example Login Credentials:

```
Role: Hall Admin
User ID: admin001
Password: 123456
```

অথবা যেকোনো ID/Password ব্যবহার করতে পারবেন।

## Troubleshooting:

**সমস্যা**: Login করার পর redirect হচ্ছে না
**সমাধান**: 
- Browser cache clear করুন
- Role অবশ্যই "Hall Admin" select করুন
- ID এবং Password field পূরণ করুন

**সমস্যা**: Dashboard access করতে পারছি না
**সমাধান**:
- নিশ্চিত করুন Hall Admin role এ login করেছেন
- URL check করুন: `/admin/halls`
- আবার login করে দেখুন

---

## Quick Start:

1. `/login` এ যান
2. Role = "Hall Admin" select করুন
3. ID ও Password দিন
4. Login ক্লিক করুন
5. Dashboard এ কাজ শুরু করুন! 🎉
