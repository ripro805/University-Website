import { useState } from "react";
import { Camera, Save, Edit2, X } from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Dr. Mrinal Kanti Baowaly",
    email: "mrinal.baowaly@gstu.ac.bd",
    phone: "+880-1XXX-XXXXXX",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    employeeId: "T-2015-001",
    officeRoom: "Building 3, Room 201",
    specialization: "Machine Learning, Data Mining, Bioinformatics",
    education: "PhD in Computer Science",
    joiningDate: "January 2015",
    profileImage: "/src/pages/departments/teacherImages/MrinalKantiBaowaly.jpg"
  });

  const [editedProfile, setEditedProfile] = useState({ ...profile });

  const handleSave = () => {
    setProfile({ ...editedProfile });
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditedProfile({ ...profile });
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile({ ...editedProfile, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            <Edit2 size={18} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              <Save size={18} />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Picture */}
        <div className="md:col-span-1">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg text-center">
            <div className="relative inline-block">
              <img
                src={editedProfile.profileImage}
                alt={editedProfile.name}
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-40 h-40 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg mx-auto" style={{display: 'none'}}>
                {profile.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
              
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <Camera size={20} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mt-4">{profile.name}</h3>
            <p className="text-blue-600 font-semibold">{profile.designation}</p>
            <p className="text-gray-600 text-sm mt-2">{profile.department}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="md:col-span-2">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="p-3 bg-gray-50 rounded text-gray-800">{profile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Employee ID</label>
              <p className="p-3 bg-gray-50 rounded text-gray-800">{profile.employeeId}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="p-3 bg-gray-50 rounded text-gray-800">{profile.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedProfile.phone}
                  onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="p-3 bg-gray-50 rounded text-gray-800">{profile.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Designation</label>
              <p className="p-3 bg-gray-50 rounded text-gray-800">{profile.designation}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
              <p className="p-3 bg-gray-50 rounded text-gray-800">{profile.department}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Office Room</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.officeRoom}
                  onChange={(e) => setEditedProfile({ ...editedProfile, officeRoom: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="p-3 bg-gray-50 rounded text-gray-800">{profile.officeRoom}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Joining Date</label>
              <p className="p-3 bg-gray-50 rounded text-gray-800">{profile.joiningDate}</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Specialization</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.specialization}
                  onChange={(e) => setEditedProfile({ ...editedProfile, specialization: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="p-3 bg-gray-50 rounded text-gray-800">{profile.specialization}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Education</label>
              <p className="p-3 bg-gray-50 rounded text-gray-800">{profile.education}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
