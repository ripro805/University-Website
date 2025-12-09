
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { facultiesData } from "../departments/departmentsData";

export default function Departments() {
    const [openFaculty, setOpenFaculty] = useState(null);

    return (
        <div className="min-h-screen bg-gray-100 p-8 font-sans">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-blue-900">GSTU Academic Faculties & Departments</h1>
                <div className="grid gap-4">
                    {Object.keys(facultiesData).map((facultyKey) => {
                        const faculty = facultiesData[facultyKey];
                        return (
                            <div
                                key={facultyKey}
                                className="bg-white shadow-md p-6 rounded-2xl border border-gray-200"
                            >
                                <button
                                    onClick={() => setOpenFaculty(openFaculty === facultyKey ? null : facultyKey)}
                                    className="w-full flex justify-between items-center text-left"
                                >
                                    <span className="text-2xl font-semibold text-blue-800">{faculty.name}</span>
                                    <ChevronDown
                                        className={`transition-transform duration-300 ${
                                            openFaculty === facultyKey ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                {openFaculty === facultyKey && (
                                    <div className="mt-6 pl-4 border-l-4 border-blue-500">
                                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Departments:</h3>
                                        <ul className="grid md:grid-cols-2 gap-3">
                                            {faculty.departments.map((dept) => (
                                                <li key={dept.slug} className="bg-blue-50 p-3 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                                                    <Link 
                                                        to={`/departments/${dept.slug}`} 
                                                        className="flex items-center justify-between group"
                                                    >
                                                        <span className="text-gray-800 font-medium group-hover:text-blue-700">
                                                            {dept.name}
                                                        </span>
                                                        <span className="text-xs bg-blue-200 px-2 py-1 rounded text-blue-800 font-semibold">
                                                            {dept.shortName}
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}





