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

// Additional offices not in navbar
const additionalOffices = [
  "Office of the Vice Chancellor",
  "Office of the Pro Vice Chancellor",
  "Office of the Dean Engineering Faculty",
  "Office of the Dean Life Science Faculty",
  "Office of the Dean BBA Faculty",
  "Office of the Dean Arts Faculty",
  "Admission Office",
  "Student Welfare Office",
  "IT Support Office",
  "Medical Center"
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/,/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default function AllOffices() {
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
                      item === "All Other Offices"
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
            <h1 className="text-3xl font-bold text-gray-800 mb-4">All Other Offices</h1>
            
            <div className="prose max-w-none">
              {/* Officers Section */}
              <section className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {additionalOffices.map((office, index) => (
                    <Link
                      key={index}
                      to={`/offices/${slugify(office)}`}
                      className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-blue-600"
                    >
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{office}</h3>
                      <p className="text-gray-600 text-sm">Click to view details →</p>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
