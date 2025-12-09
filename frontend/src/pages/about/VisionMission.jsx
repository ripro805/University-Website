import { Link } from "react-router-dom";

// Left menu items
const menuItems = [
  "Overview",
  "University Facts & Acts",
  "Vision & Mission",
  "Health Insurance",
  "Achievements",
  "Location, Maps and Direction",
  "News and Events",
  "Visit GSTU",
  "Contact Us"
];

// Helper to convert text to route slug
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/,/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default function VisionMission() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 px-6">

        {/* LEFT SIDE MENU */}
        <div className="col-span-12 md:col-span-3 bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">About Us</h2>

          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const route = `/about/${slugify(item)}`;

              return (
                <li key={index}>
                  <Link
                    to={route}
                    className={`block p-2 border-l-4 ${
                      item === "Vision & Mission"
                        ? "border-blue-600 bg-blue-50 text-blue-700 font-semibold"
                        : "border-transparent hover:border-blue-600 hover:bg-blue-50"
                    } cursor-pointer font-medium text-gray-700`}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="col-span-12 md:col-span-9">

          {/* Banner Image */}
          <img
            src="/src/assets/Gate.jpg"
            alt="Vision & Mission"
            className="w-full h-[320px] object-cover rounded shadow"
          />

          {/* CONTENT */}
          <div className="mt-8 bg-white shadow rounded p-6">
            <h1 className="text-3xl font-bold text-red-700 mb-4">
              Vision & Mission
            </h1>

            {/* VISION */}
            <h2 className="text-2xl font-semibold text-blue-700 mt-4">
              Our Vision
            </h2>
            <p className="text-gray-700 leading-7 mt-2">
              To become a center of excellence in higher education, research,
              innovation, and technological advancement—contributing to the
              sustainable development of Bangladesh and the global community.
            </p>

            {/* MISSION */}
            <h2 className="text-2xl font-semibold text-blue-700 mt-6">
              Our Mission
            </h2>

            <ul className="list-disc ml-6 text-gray-700 leading-7 mt-2 space-y-2">
              <li>
                Provide high-quality education in science, engineering, and emerging technologies.
              </li>
              <li>
                Promote research and innovation that addresses national and global challenges.
              </li>
              <li>
                Develop skilled, ethical, and socially responsible graduates.
              </li>
              <li>
                Build a modern academic environment enriched with digital learning tools.
              </li>
              <li>
                Encourage collaboration with industries, institutions, and researchers worldwide.
              </li>
              <li>
                Ensure an inclusive, student-friendly campus that supports personal and professional growth.
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
