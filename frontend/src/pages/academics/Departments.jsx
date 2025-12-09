
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";



export default function Departments() {
    const [schools, setSchools] = useState([]);
    const [openSchool, setOpenSchool] = useState(null);

    // Fetch data from DB API
    // Example API output:
    // [
    //   {
    //     id: 1,
    //     name: "Applied Sciences & Technology",
    //     dean: "Dr. John Doe",
    //     dean_image: "https://...",
    //     dean_email: "john@sust.edu",
    //     departments: ["CSE", "EEE", "IPE", ...]
    //   }
    // ]

    // Temporary dummy data (remove when backend ready)
    const dummySchools = [
        {
            id: 1,
            name: "Applied Sciences & Technology",
            dean: "Dr. Alice Rahman",
            dean_image: "https://via.placeholder.com/150",
            dean_email: "alice@gstu.edu",
            departments: [
                "Computer Science & Engineering",
                "Electrical & Electronic Engineering",
                "Industrial & Production Engineering"
            ]
        },
        {
            id: 2,
            name: "Physical Sciences",
            dean: "Dr. Kamal Hossain",
            dean_image: "https://via.placeholder.com/150",
            dean_email: "kamal@gstu.edu",
            departments: [
                "Physics",
                "Chemistry",
                "Mathematics"
            ]
        }
    ];

    //   const fetchSchools = async () => {
    //     try {
    //       const response = await fetch("/api/schools"); // replace with your backend URL
    //       const data = await response.json();
    //       setSchools(dummySchools); // using dummy data for now
    //     } catch (error) {
    //       console.error("Error fetching schools:", error);
    //     }
    //   };

    // Load from DB on mount
    useEffect(() => {
        setSchools(dummySchools);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-center">GSTU Academic Structure</h1>
                <div className="grid gap-4">
                    {schools.map((school) => (
                        <div
                            key={school.id}
                            className="bg-white shadow-md p-4 rounded-2xl border border-gray-200"
                        >
                            <button
                                onClick={() => setOpenSchool(openSchool === school.id ? null : school.id)}
                                className="w-full flex justify-between items-center text-left"
                            >
                                <span className="text-xl font-semibold">{school.name}</span>
                                <ChevronDown
                                    className={`transition-transform duration-300 ${openSchool === school.id ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {openSchool === school.id && (
                                <div className="mt-4 pl-4 border-l-2 border-gray-300 space-y-4">

                                    {/* Dean Section */}
                                    <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                                        <img
                                            src={school.dean_image}
                                            alt="Dean"
                                            className="w-20 h-20 rounded-full object-cover border"
                                        />
                                        <div>
                                            <h2 className="text-lg font-semibold">Dean: {school.dean}</h2>
                                            <p className="text-sm text-gray-600">Email: {school.dean_email}</p>
                                        </div>
                                    </div>

                                    {/* Departments */}
                                    <ul className="mt-2">
                                        {school.departments.map((dept) => (
                                            <li key={dept} className="py-1 text-gray-700">
                                                <Link to={`/departments/${dept.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`} className="text-blue-600 hover:underline">• {dept}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
