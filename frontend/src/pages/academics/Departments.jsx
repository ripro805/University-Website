
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
            name: "Engineering Faculty",
            dean: "Dean, Engineering Faculty",
            dean_image: "https://via.placeholder.com/150",
            dean_email: "dean.engineering@gstu.edu",
            departments: [
                "Computer Science and Engineering",
                "Electrical and Electronic Engineering",
                "Electronics and Telecommunication Engineering",
                "Applied Chemistry and Chemical Engineering",
                "Civil Engineering",
                "Food Engineering",
                "Architecture"
            ]
        },
        {
            id: 2,
            name: "Science Faculty",
            dean: "Dean, Science Faculty",
            dean_image: "https://via.placeholder.com/150",
            dean_email: "dean.science@gstu.edu",
            departments: [
                "Mathematics",
                "Statistics",
                "Chemistry",
                "Physics",
                "Environmental Science & Disaster Management"
            ]
        },
        {
            id: 3,
            name: "Life Science Faculty",
            dean: "Dean, Life Science Faculty",
            dean_image: "https://via.placeholder.com/150",
            dean_email: "dean.lifescience@gstu.edu",
            departments: [
                "Pharmacy",
                "Biotechnology and Genetic Engineering",
                "Biochemistry and Molecular Biology",
                "Psychology",
                "Botany"
            ]
        },
        {
            id: 4,
            name: "Humanities Faculty",
            dean: "Dean, Humanities Faculty",
            dean_image: "https://via.placeholder.com/150",
            dean_email: "dean.humanities@gstu.edu",
            departments: [
                "English",
                "Bangla",
                "History"
            ]
        },
        {
            id: 5,
            name: "Social Science Faculty",
            dean: "Dean, Social Science Faculty",
            dean_image: "https://via.placeholder.com/150",
            dean_email: "dean.socialscience@gstu.edu",
            departments: [
                "Sociology",
                "Public Administration",
                "International Relations",
                "Economics",
                "Political Science"
            ]
        },
        {
            id: 6,
            name: "Business Studies Faculty",
            dean: "Dean, Business Studies Faculty",
            dean_image: "https://via.placeholder.com/150",
            dean_email: "dean.business@gstu.edu",
            departments: [
                "Management Studies",
                "Accounting and Information Systems",
                "Marketing",
                "Finance and Banking",
                "Tourism and Hospitality Management"
            ]
        },
        {
            id: 7,
            name: "Law Faculty",
            dean: "Dean, Law Faculty",
            dean_image: "https://via.placeholder.com/150",
            dean_email: "dean.law@gstu.edu",
            departments: [
                "Law"
            ]
        },
        {
            id: 8,
            name: "Agriculture Faculty",
            dean: "Dean, Agriculture Faculty",
            dean_image: "https://via.placeholder.com/150",
            dean_email: "dean.agriculture@gstu.edu",
            departments: [
                "Agriculture",
                "Fisheries and Marine Bioscience"
            ]
        },
        {
            id: 9,
            name: "ASVM Faculty",
            dean: "Dean, ASVM Faculty",
            dean_image: "https://via.placeholder.com/150",
            dean_email: "dean.asvm@gstu.edu",
            departments: [
                "Animal Science and Veterinary Medicine"
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





