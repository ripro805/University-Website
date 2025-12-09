import { Link } from "react-router-dom";
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
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/,/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
export default function Overview() {
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

                    {/* Image */}
                    <div className="w-full">
                        <img
                            src="src/assets/Gate.jpg"
                            className="w-full h-[320px] object-cover rounded shadow"
                        />
                    </div>

                    {/* OVERVIEW TEXT */}
                    <div className="mt-8 bg-white shadow rounded p-6">
                        <h1 className="text-3xl font-bold text-red-700 mb-4">Overview</h1>

                        <p className="text-gray-700 leading-7">
                            Gopalganj Science and Technology University (GSTU) is committed to
                            delivering academic excellence, research opportunities, and a
                            dynamic learning environment. Our mission is to advance knowledge
                            through quality education and to serve the nation by producing
                            skilled graduates in various fields of science and technology.
                        </p>

                        <p className="text-gray-700 leading-7 mt-4">
                            The university campus is designed to support innovative learning,
                            advanced research facilities, and modern student amenities. GSTU
                            continues to grow with a vision to establish itself as a leading
                            institution in Bangladesh.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}





