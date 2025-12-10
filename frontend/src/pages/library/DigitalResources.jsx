import { Link } from "react-router-dom";
import { digitalResources } from "./libraryData";
import { ExternalLink, ArrowLeft } from "lucide-react";

export default function DigitalResources() {
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
          <h1 className="text-4xl font-bold mb-2">Digital Resources</h1>
          <p className="text-blue-100">Access online databases, journals, and e-learning platforms</p>
        </div>

        {/* Description */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-3 text-blue-900">About Digital Resources</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            GSTU Central Library provides access to a wide range of digital resources including scholarly databases, 
            e-journals, e-books, and research repositories. These resources are available 24/7 from anywhere on campus 
            or through VPN for remote access.
          </p>
          <p className="text-gray-700 leading-relaxed">
            For login credentials and access instructions, please contact the library administration at{" "}
            <span className="text-blue-600 font-semibold">library@gstu.ac.bd</span>
          </p>
        </div>

        {/* Resource Categories */}
        <div className="grid md:grid-cols-2 gap-6">
          {digitalResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start mb-4">
                <span className="text-4xl mr-4">{resource.icon}</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{resource.title}</h3>
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                    {resource.type}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">{resource.description}</p>
              
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Visit Resource
                <ExternalLink size={16} />
              </a>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-6 bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-xl font-bold text-blue-900 mb-3">Need Help?</h3>
          <p className="text-gray-700 mb-2">
            If you need assistance accessing any digital resource or require training on how to use specific databases, 
            please visit the Digital Resource Center on the Ground Floor or schedule a training session with our librarians.
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Training Sessions:</span> Available every Monday and Wednesday at 3:00 PM
          </p>
        </div>
      </div>
    </div>
  );
}
