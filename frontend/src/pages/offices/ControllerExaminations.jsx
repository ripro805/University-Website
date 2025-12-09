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

export default function ControllerExaminations() {
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
                      item === "Controller of Examinations"
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
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Controller of Examinations</h1>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                The Controller of Examinations office is responsible for conducting all examinations at 
                GSTU, ensuring fair and transparent evaluation processes.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-3">Key Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Planning and scheduling examinations</li>
                <li>Preparation of examination materials</li>
                <li>Supervision of examination centers</li>
                <li>Result compilation and publication</li>
                <li>Maintenance of examination records</li>
                <li>Handling examination-related grievances</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-3">Services Provided</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Examination form processing</li>
                <li>Admit card issuance</li>
                <li>Result publication</li>
                <li>Grade sheet distribution</li>
                <li>Re-evaluation and re-scrutiny services</li>
                <li>Examination schedule updates</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-3">Contact Information</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Office:</strong> Controller of Examinations, GSTU<br />
                  <strong>Email:</strong> controller@gstu.ac.bd<br />
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





