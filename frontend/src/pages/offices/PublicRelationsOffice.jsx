import { Link } from "react-router-dom";

const menuItems = [
  "All Other Offices",
  "Registrar Office",
  "Controller of Examinations",
  "Treasurer Office",
  "Proctor Office",
  "Public Relations Office",
  "Estate Office",
  "Planning & Development Office"
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/,/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default function PublicRelationsOffice() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 px-6">

        {/* LEFT SIDE MENU */}
        <div className="col-span-12 md:col-span-3 bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Offices</h2>

          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const route = `/offices/${slugify(item)}`;

              return (
                <li key={index}>
                  <Link
                    to={route}
                    className={`block p-2 border-l-4 ${
                      item === "Public Relations Office"
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
          <div className="bg-white shadow rounded p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Public Relations Office</h1>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                The Public Relations Office serves as the communication hub of GSTU, 
                managing media relations, public outreach, and institutional communication.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-3">Key Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Media relations and press releases</li>
                <li>University branding and promotion</li>
                <li>Event coordination and publicity</li>
                <li>Website and social media management</li>
                <li>Publication of university materials</li>
                <li>Alumni relations</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-3">Services Provided</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Press release distribution</li>
                <li>Media coordination for events</li>
                <li>University newsletter and publications</li>
                <li>Photography and videography services</li>
                <li>Social media content management</li>
                <li>Crisis communication support</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-3">Contact Information</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Office:</strong> Public Relations Office, GSTU<br />
                  <strong>Email:</strong> pr@gstu.ac.bd<br />
                  <strong>Phone:</strong> +880-XXX-XXXXXX
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}





