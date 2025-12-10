import { Link } from "react-router-dom";
import { libraryNotices } from "./libraryData";
import { Calendar, AlertCircle, ArrowLeft } from "lucide-react";

export default function LibraryNotices() {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'announcement': return '📢';
      case 'holiday': return '🗓️';
      case 'event': return '🎯';
      default: return '📌';
    }
  };

  const getTypeBadge = (type) => {
    const badges = {
      announcement: 'bg-blue-100 text-blue-700',
      holiday: 'bg-red-100 text-red-700',
      event: 'bg-purple-100 text-purple-700'
    };
    return badges[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <Link to="/library" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 font-medium">
          <ArrowLeft size={20} className="mr-2" />
          Back to Library Home
        </Link>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 mb-6 shadow-lg">
          <h1 className="text-4xl font-bold mb-2">Library Notices</h1>
          <p className="text-blue-100">Stay updated with the latest announcements and events</p>
        </div>

        {/* Important Notice Banner */}
        {libraryNotices.some(notice => notice.important) && (
          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mb-6 rounded-2xl shadow-md">
            <div className="flex items-start">
              <AlertCircle className="text-yellow-600 mr-3 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-yellow-800 mb-2">Important Announcements</h3>
                <p className="text-yellow-700">
                  {libraryNotices.filter(n => n.important).length} important notice(s) require your attention. 
                  Please review them carefully.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Notices List */}
        <div className="space-y-6">
          {libraryNotices.map((notice) => (
            <div
              key={notice.id}
              className={`bg-white shadow-md rounded-2xl overflow-hidden border ${
                notice.important ? 'border-l-4 border-yellow-600' : 'border-l-4 border-blue-500'
              } border-gray-200`}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div className="flex items-start flex-1">
                    <span className="text-3xl mr-3">{getTypeIcon(notice.type)}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {notice.title}
                        {notice.important && (
                          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-semibold">
                            IMPORTANT
                          </span>
                        )}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar size={16} className="mr-1" />
                          {formatDate(notice.date)}
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${getTypeBadge(notice.type)}`}>
                          {notice.type.charAt(0).toUpperCase() + notice.type.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{notice.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Information Footer */}
        <div className="mt-6 bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-xl font-bold text-blue-900 mb-3">Stay Connected</h3>
          <p className="text-gray-700 leading-relaxed">
            For the latest updates and announcements, regularly check this page or visit the library notice board. 
            You can also subscribe to email notifications by contacting the library administration at{" "}
            <span className="text-blue-600 font-semibold">library@gstu.ac.bd</span>
          </p>
        </div>
      </div>
    </div>
  );
}
