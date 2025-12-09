import { useState } from "react";
import { Link } from "react-router-dom";
import { HomeIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { halls } from "./hallData";

/**
 * HallList Component
 * Displays a searchable list of residential halls at GSTU
 * Features:
 * - Real-time search filtering
 * - Clean, modern UI with rounded cards
 * - Clickable cards (routing-ready)
 * - Responsive centered layout
 */
export default function HallList() {
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Filter halls based on search query
   * Case-insensitive search
   */
  const filteredHalls = halls.filter((hall) =>
    hall.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * Generate slug from hall name for routing
   * Example: "Bijoy Dibosh Hall" → "bijoy-dibosh-hall"
   */
  const generateSlug = (hallName) => {
    return hallName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Residential Halls
        </h1>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search halls..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Hall Cards Container */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredHalls.length > 0 ? (
            filteredHalls.map((hall, index) => (
              <Link
                key={index}
                to={`/hall/${generateSlug(hall)}`}
                className="block"
              >
                {/* Individual Hall Card */}
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 flex items-center gap-4 cursor-pointer group">
                  {/* Left Icon */}
                  <div className="flex-shrink-0">
                    <HomeIcon className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
                  </div>

                  {/* Hall Name */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                      {hall}
                    </h3>
                  </div>

                  {/* Right Arrow Icon */}
                  <div className="flex-shrink-0">
                    <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            /* No Results Message */
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">
                No halls found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>

        {/* Total Count */}
        {filteredHalls.length > 0 && (
          <div className="mt-8 text-center text-gray-600">
            Showing {filteredHalls.length} of {halls.length} halls
          </div>
        )}
      </div>
    </div>
  );
}





