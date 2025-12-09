import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { hallDetailsData } from "./hallDetailsData";

/**
 * HallDetails Component
 * Displays hall information with sidebar navigation (Overview, Officers, Contact Us)
 */
export default function HallDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");

  // Get hall details based on slug
  const hallDetails = hallDetailsData[slug];

  // Handle case when hall is not found
  if (!hallDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hall not found</h2>
          <button
            onClick={() => navigate("/hall")}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Back to Halls
          </button>
        </div>
      </div>
    );
  }

  // Sidebar menu items
  const menuItems = [
    { id: "overview", label: "Overview" },
    { id: "officers", label: "Officers" },
    { id: "contact", label: "Contact Us" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate("/hall")}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Halls
        </button>

        {/* Hall Name Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {hallDetails.name}
          </h1>
          <div className="w-20 h-1 bg-red-600 mx-auto"></div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <nav>
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg ${
                          activeSection === item.id
                            ? "bg-blue-600 text-white font-semibold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-8">
              
              {/* Overview Section */}
              {activeSection === "overview" && (
                <div>
                  <h2 className="text-2xl font-bold text-red-600 mb-6">Overview</h2>
                  <div className="space-y-4 text-gray-700">
                    <p className="leading-relaxed">
                      {hallDetails.name} is one of the premier residential halls at Gopalganj Science and Technology University, providing comfortable and secure accommodation for students. 
                      The hall offers a conducive environment for academic excellence and personal growth.
                    </p>
                    <p className="leading-relaxed">
                      With modern amenities and facilities, the hall ensures students have a pleasant 
                      stay during their academic journey at GSTU. The hall administration is committed 
                      to maintaining a disciplined and supportive living environment.
                    </p>
                    
                    <div className="mt-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Facilities</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          "24/7 Security",
                          "WiFi Internet",
                          "Common Room",
                          "Study Room",
                          "Dining Facility",
                          "Prayer Room",
                          "Medical Facility",
                          "Laundry Service"
                        ].map((facility, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <svg
                              className="w-5 h-5 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span>{facility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Officers Section */}
              {activeSection === "officers" && (
                <div>
                  <h2 className="text-2xl font-bold text-red-600 mb-8">Officers</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {hallDetails.officers.map((officer, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center text-center"
                      >
                        {/* Circular Profile Image */}
                        <div className="w-40 h-40 rounded-full overflow-hidden mb-4 shadow-lg bg-gray-200">
                          <img
                            src={officer.image}
                            alt={officer.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback when image doesn't exist
                              e.target.style.display = "none";
                              e.target.parentElement.innerHTML = `
                                <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
                                  <svg class="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                </div>
                              `;
                            }}
                          />
                        </div>

                        {/* Officer Name */}
                        <h3 className="font-bold text-gray-800 mb-1 text-base">
                          {officer.name}
                        </h3>

                        {/* Designation */}
                        <p className="text-sm text-gray-600 mb-2">
                          {officer.designation}
                        </p>

                        {/* Phone */}
                        {officer.phone && (
                          <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {officer.phone}
                          </p>
                        )}

                        {/* Email */}
                        {officer.email && (
                          <p className="text-sm text-gray-600 flex items-center justify-center gap-1 break-all">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {officer.email}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Us Section */}
              {activeSection === "contact" && (
                <div>
                  <h2 className="text-2xl font-bold text-red-600 mb-6">Contact Us</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Provost Office */}
                      <div className="border-l-4 border-red-600 pl-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          Provost Office
                        </h3>
                        <div className="space-y-2 text-gray-700">
                          <p className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +880-XXX-XXXXXX
                          </p>
                          <p className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            provost.{slug}@gstu.ac.bd
                          </p>
                        </div>
                      </div>

                      {/* Hall Office */}
                      <div className="border-l-4 border-blue-600 pl-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          Hall Office
                        </h3>
                        <div className="space-y-2 text-gray-700">
                          <p className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +880-XXX-XXXXXX
                          </p>
                          <p className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            office.{slug}@gstu.ac.bd
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="mt-6 border-l-4 border-blue-600 pl-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        Address
                      </h3>
                      <p className="text-gray-700">
                        {hallDetails.name}<br />
                        GSTU<br />
                        Gopalganj-8100<br />
                        Bangladesh
                      </p>
                    </div>

                    {/* Office Hours */}
                    <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        Office Hours
                      </h3>
                      <p className="text-gray-700">
                        Saturday - Thursday: 9:00 AM - 5:00 PM<br />
                        Friday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}





