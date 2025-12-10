import { Link } from "react-router-dom";
import { libraryInfo } from "./libraryData";
import { BookOpen, Database, FileText, Bell } from "lucide-react";

export default function LibraryOverview() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 mb-6 shadow-lg">
          <h1 className="text-4xl font-bold mb-2">{libraryInfo.name}</h1>
          <p className="text-blue-100">{libraryInfo.location}</p>
        </div>

        {/* Description */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">About the Library</h2>
          <p className="text-gray-700 leading-relaxed">{libraryInfo.description}</p>
        </div>

        {/* Working Hours & Contact */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-blue-800">Working Hours</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-200">
                <span className="font-semibold text-gray-700">Monday - Friday</span>
                <span className="text-blue-700 font-medium">{libraryInfo.workingHours.weekdays}</span>
              </div>
              <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-200">
                <span className="font-semibold text-gray-700">Saturday</span>
                <span className="text-blue-700 font-medium">{libraryInfo.workingHours.saturday}</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                <span className="font-semibold text-gray-700">Sunday</span>
                <span className="text-gray-600 font-medium">{libraryInfo.workingHours.sunday}</span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-blue-800">Contact Information</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Phone</p>
                <p className="font-semibold text-gray-800">{libraryInfo.contact.phone}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-semibold text-gray-800">{libraryInfo.contact.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200">
          <h3 className="text-2xl font-bold mb-4 text-blue-900">Library Facilities</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {libraryInfo.facilities.map((facility, index) => (
              <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                <p className="text-gray-800 font-medium">{facility}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
          <h3 className="text-2xl font-bold mb-6 text-blue-900">Explore Library Resources</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/library/catalog" className="bg-blue-50 p-6 rounded-lg border border-blue-200 hover:shadow-lg transition-shadow hover:bg-blue-100">
              <BookOpen className="text-blue-600 mb-3" size={32} />
              <h4 className="text-lg font-bold text-gray-800 mb-2">Book Catalog</h4>
              <p className="text-gray-600 text-sm">Browse our collection</p>
            </Link>
            
            <Link to="/library/digital-resources" className="bg-blue-50 p-6 rounded-lg border border-blue-200 hover:shadow-lg transition-shadow hover:bg-blue-100">
              <Database className="text-blue-600 mb-3" size={32} />
              <h4 className="text-lg font-bold text-gray-800 mb-2">Digital Resources</h4>
              <p className="text-gray-600 text-sm">Online databases</p>
            </Link>
            
            <Link to="/library/rules" className="bg-blue-50 p-6 rounded-lg border border-blue-200 hover:shadow-lg transition-shadow hover:bg-blue-100">
              <FileText className="text-blue-600 mb-3" size={32} />
              <h4 className="text-lg font-bold text-gray-800 mb-2">Rules</h4>
              <p className="text-gray-600 text-sm">Library policies</p>
            </Link>
            
            <Link to="/library/notices" className="bg-blue-50 p-6 rounded-lg border border-blue-200 hover:shadow-lg transition-shadow hover:bg-blue-100">
              <Bell className="text-blue-600 mb-3" size={32} />
              <h4 className="text-lg font-bold text-gray-800 mb-2">Notices</h4>
              <p className="text-gray-600 text-sm">Latest announcements</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
