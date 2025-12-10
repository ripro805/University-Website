import { Link } from "react-router-dom";
import { libraryRules } from "./libraryData";
import { ArrowLeft } from "lucide-react";

export default function LibraryRules() {
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
          <h1 className="text-4xl font-bold mb-2">Library Rules & Regulations</h1>
          <p className="text-blue-100">Guidelines for using library services</p>
        </div>

        {/* Introduction */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200">
          <p className="text-gray-700 leading-relaxed">
            To ensure a conducive learning environment and fair access to resources for all users, the GSTU Central Library 
            has established the following rules and regulations. All library members are expected to comply with these guidelines.
          </p>
        </div>

        {/* Borrowing Rules */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-900 border-l-4 border-blue-500 pl-4">
            Borrowing Rules
          </h2>
          <div className="mt-4 space-y-3 pl-4">
            {libraryRules.borrowing.map((rule, index) => (
              <div key={index} className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1 font-bold">✓</span>
                <p className="text-gray-700 leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fine Policy */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-900 border-l-4 border-red-500 pl-4">
            Fines & Penalties
          </h2>
          <div className="mt-4 space-y-3 pl-4">
            {libraryRules.fines.map((rule, index) => (
              <div key={index} className="flex items-start bg-red-50 p-3 rounded-lg border border-red-200">
                <span className="text-red-600 mr-3 mt-1 font-bold">!</span>
                <p className="text-gray-700 leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Conduct Rules */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-900 border-l-4 border-blue-500 pl-4">
            Code of Conduct
          </h2>
          <div className="mt-4 space-y-3 pl-4">
            {libraryRules.conduct.map((rule, index) => (
              <div key={index} className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1 font-bold">•</span>
                <p className="text-gray-700 leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Rules */}
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-900 border-l-4 border-blue-500 pl-4">
            Membership & Access
          </h2>
          <div className="mt-4 space-y-3 pl-4">
            {libraryRules.membership.map((rule, index) => (
              <div key={index} className="flex items-start bg-blue-50 p-3 rounded-lg border border-blue-200">
                <span className="text-blue-600 mr-3 mt-1 font-bold">→</span>
                <p className="text-gray-700 leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-6 bg-yellow-50 rounded-2xl p-6 border border-yellow-400">
          <h3 className="text-xl font-bold text-gray-800 mb-3">⚠️ Important Notice</h3>
          <p className="text-gray-700 leading-relaxed">
            Violation of library rules may result in suspension of library privileges or other disciplinary actions. 
            The library administration reserves the right to modify these rules as necessary. For any clarifications, 
            please contact the librarian.
          </p>
        </div>
      </div>
    </div>
  );
}
