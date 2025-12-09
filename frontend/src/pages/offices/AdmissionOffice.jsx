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

export default function AdmissionOffice() {
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
                    className="block p-2 border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 cursor-pointer font-medium text-gray-700"
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
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Admission Office</h1>
            
            <div className="prose max-w-none">
              {/* Overview Section */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
                <p className="text-gray-700 mb-4">
                  The Admission Office at GSTU is responsible for managing the entire 
                  admission process for undergraduate and graduate programs. The office ensures a fair, transparent, 
                  and efficient admission process for all prospective students.
                </p>
                <p className="text-gray-700 mb-4">
                  From application processing to final enrollment, the Admission Office guides students through every 
                  step of joining the university, providing comprehensive support and information.
                </p>
                <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Key Responsibilities</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Managing undergraduate and graduate admission processes</li>
                  <li>Processing and reviewing applications</li>
                  <li>Conducting admission tests and interviews</li>
                  <li>Publishing admission notices and results</li>
                  <li>Student enrollment and orientation</li>
                  <li>Maintaining admission records and statistics</li>
                </ul>
              </section>

              {/* Officers Section */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Officers</h2>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-l-4 border-blue-600">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Director of Admission</h3>
                    <p className="text-gray-700 mb-1"><strong>Name:</strong> [Name]</p>
                    <p className="text-gray-700 mb-1"><strong>Qualification:</strong> [Degree]</p>
                    <p className="text-gray-700"><strong>Email:</strong> admission@gstu.ac.bd</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-400">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Assistant Director</h3>
                    <p className="text-gray-700 mb-1"><strong>Name:</strong> [Name]</p>
                    <p className="text-gray-700"><strong>Email:</strong> assistant.admission@gstu.ac.bd</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-400">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Administrative Staff</h3>
                    <p className="text-gray-700">Multiple staff members available to assist with admission queries</p>
                  </div>
                </div>
              </section>

              {/* Contact Us Section */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">Admission Office</h3>
                      <p className="text-gray-700">
                        <strong>Address:</strong> GSTU<br />
                        Gopalganj-8100, Bangladesh
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700">
                        <strong>Phone:</strong> +880-XXX-XXXXXX<br />
                        <strong>Hotline:</strong> +880-XXX-XXXXXX<br />
                        <strong>Email:</strong> admission@gstu.ac.bd<br />
                        <strong>Website:</strong> www.gstu.ac.bd/admission
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700">
                        <strong>Office Hours:</strong><br />
                        Saturday - Thursday: 9:00 AM - 5:00 PM<br />
                        Friday: Closed<br />
                        <span className="text-sm italic">(Extended hours during admission season)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
