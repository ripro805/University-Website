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

export default function ProViceChancellorOffice() {
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
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Office of the Pro Vice Chancellor</h1>
            
            <div className="prose max-w-none">
              {/* Overview Section */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
                <p className="text-gray-700 mb-4">
                  The Office of the Pro Vice Chancellor serves as a vital support to the Vice Chancellor in managing 
                  the academic and administrative affairs of GSTU. The Pro Vice Chancellor 
                  assists in strategic planning, policy implementation, and day-to-day operations of the university.
                </p>
                <p className="text-gray-700 mb-4">
                  This office plays a crucial role in coordinating between various faculties, ensuring academic quality, 
                  and representing the Vice Chancellor in various administrative matters when required.
                </p>
                <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Key Responsibilities</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Assisting the Vice Chancellor in academic and administrative matters</li>
                  <li>Coordinating inter-faculty activities and programs</li>
                  <li>Supervising academic quality assurance initiatives</li>
                  <li>Representing the university in the Vice Chancellor's absence</li>
                  <li>Managing special projects and initiatives</li>
                  <li>Faculty development and training coordination</li>
                </ul>
              </section>

              {/* Officers Section */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Officers</h2>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-l-4 border-blue-600">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Pro Vice Chancellor</h3>
                    <p className="text-gray-700 mb-1"><strong>Name:</strong> Professor Dr. [Name]</p>
                    <p className="text-gray-700 mb-1"><strong>Qualification:</strong> PhD in [Field]</p>
                    <p className="text-gray-700"><strong>Email:</strong> pvc@gstu.ac.bd</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-400">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Personal Secretary to Pro VC</h3>
                    <p className="text-gray-700 mb-1"><strong>Name:</strong> [Name]</p>
                    <p className="text-gray-700"><strong>Email:</strong> ps.pvc@gstu.ac.bd</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-400">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Administrative Officer</h3>
                    <p className="text-gray-700 mb-1"><strong>Name:</strong> [Name]</p>
                    <p className="text-gray-700"><strong>Email:</strong> ao.pvc@gstu.ac.bd</p>
                  </div>
                </div>
              </section>

              {/* Contact Us Section */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">Office of the Pro Vice Chancellor</h3>
                      <p className="text-gray-700">
                        <strong>Address:</strong> GSTU<br />
                        Gopalganj-8100, Bangladesh
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700">
                        <strong>Phone:</strong> +880-XXX-XXXXXX<br />
                        <strong>Fax:</strong> +880-XXX-XXXXXX<br />
                        <strong>Email:</strong> pvc@gstu.ac.bd<br />
                        <strong>Website:</strong> www.gstu.ac.bd
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700">
                        <strong>Office Hours:</strong><br />
                        Saturday - Thursday: 9:00 AM - 5:00 PM<br />
                        Friday: Closed
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





