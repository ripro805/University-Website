import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-blue-700">
                    GSTU
                </Link>

                <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
                    
                    <li>
                        <Link to="/" className="px-6 py-4 block  border-gray-200 hover:text-red-600 ">
                            Home
                        </Link>
                    </li>
                    <li className="relative group">
                        <span className="px-6 py-4 block text-gray-800 hover:text-red-600 border-l border-gray-200 cursor-pointer">
                            About Us
                        </span>

                        {/* Mega Menu */}
                        <div className="absolute left-0 top-full hidden group-hover:flex bg-white shadow-xl border-t-1  p-6 w-[400px] z-50 gap-12">

                            {/* Column 1 */}
                            <div className="flex flex-col space-y-3 min-w-[200px]">
                                <Link to="/about/overview" className="hover:text-red-600 text-gray-700">Overview</Link>
                                <Link to="about/vision-and-mission" className="hover:text-red-600 text-gray-700">Vision & Mission</Link>
                                <Link to="/achievements" className="hover:text-red-600 text-gray-700">Achievements</Link>
                                <Link to="/news" className="hover:text-red-600 text-gray-700">News and Events</Link>
                                <Link to="/contact" className="hover:text-red-600 text-gray-700">Contact Us</Link>
                            </div>

                        </div>
                    </li>
                    <li className="relative group">
                        <span className="px-6 py-4 block text-gray-800 hover:text-red-600 border-l border-gray-200 cursor-pointer">
                            Academics
                        </span>

                        {/* Mega Menu */}
                        <div className="absolute left-0 top-full hidden group-hover:flex bg-white shadow-xl border-t-1 p-6 w-[300px] z-50">

                            <div className="flex flex-col space-y-3 min-w-[200px]">
                                <Link to="/academics/departments" className="hover:text-red-600 text-gray-700">Departments</Link>
                                <Link to="/academics/centers-cells" className="hover:text-red-600 text-gray-700">Centers & Cells</Link>
                                <Link to="/academics/central-library" className="hover:text-red-600 text-gray-700">Central Library</Link>
                            </div>

                        </div>
                    </li>
                    <li className="relative group">
                        {/* <Link
                            to="/about"
                            className="px-6 py-4 block text-gray-800 hover:text-red-600 border-l border-gray-200"
                        > */}
                        <span className="px-6 py-4 block text-gray-800 hover:text-red-600 border-l border-gray-200">
                            Offices
                        </span>
                        {/* </Link> */}

                        {/* Mega Menu */}
                        <div className="absolute left-0 top-full hidden group-hover:flex bg-white shadow-xl border-t-1  p-6 w-[400px] z-50 gap-12">

                            {/* Column 1 */}
                            <div className="flex flex-col space-y-3 min-w-[200px]">
                                <Link to="/offices/all-other-offices" className="hover:text-red-600 text-gray-700">All Other Offices</Link>
                                <Link to="/offices/registrar-office" className="hover:text-red-600 text-gray-700">Registrar Office</Link>
                                <Link to="/offices/controller-of-examinations" className="hover:text-red-600 text-gray-700">Controller of Examinations</Link>
                                <Link to="/offices/treasurer-office" className="hover:text-red-600 text-gray-700">Treasurer Office</Link>
                                <Link to="/offices/proctor-office" className="hover:text-red-600 text-gray-700">Proctor Office</Link>
                                <Link to="/offices/public-relations-office" className="hover:text-red-600 text-gray-700">Public Relations Office</Link>
                                <Link to="/offices/estate-office" className="hover:text-red-600 text-gray-700">Estate Office</Link>
                                <Link to="/offices/planning-and-development-office" className="hover:text-red-600 text-gray-700">Planning & Development Office</Link>
                            </div>

                        </div>
                    </li>
                    <li className="relative group">
                        <span className="px-6 py-4 block text-gray-800 hover:text-red-600 border-l border-gray-200">
                            Campus
                        </span>

                        {/* Mega Menu */}
                        <div className="absolute left-0 top-full hidden group-hover:flex bg-white shadow-xl border-t-1  p-6 w-[400px] z-50 gap-12">

                            {/* Column 1 */}
                            <div className="flex flex-col space-y-3 min-w-[200px]">
                                <Link to="/overview" className="hover:text-red-600 text-gray-700">Campus Life</Link>
                                <Link to="/hall" className="hover:text-red-600 text-gray-700">Residential Halls</Link>
                                <Link to="/achievements" className="hover:text-red-600 text-gray-700">Gallery</Link>
                                <Link to="/achievements" className="hover:text-red-600 text-gray-700">Sports</Link>
                               
                            </div>

                        </div>
                    </li>
                    <li className="relative group">
                        <Link
                            to="/about"
                            className="px-6 py-4 block text-gray-800 hover:text-red-600 border-l border-gray-200"
                        >
                            Services
                        </Link>

                        {/* Mega Menu */}
                        <div className="absolute left-0 top-full hidden group-hover:flex bg-white shadow-xl border-t-1  p-6 w-[400px] z-50 gap-12">

                            {/* Column 1 */}
                            <div className="flex flex-col space-y-3 min-w-[200px]">
                                <Link to="/overview" className="hover:text-red-600 text-gray-700">Transport</Link>
                                <Link to="/overview" className="hover:text-red-600 text-gray-700">ePayment</Link>
                                <Link to="/vision" className="hover:text-red-600 text-gray-700">Downloadable Forms</Link>
                                <Link to="/achievements" className="hover:text-red-600 text-gray-700">Application From</Link>
                                <Link to="/overview" className="hover:text-red-600 text-gray-700">Job Circular</Link>                             
                            </div>

                        </div>
                    </li>
                    <li className="relative group">
                        <Link
                            to="/about"
                            className="px-6 py-4 block text-gray-800 hover:text-red-600 border-l border-gray-200"
                        >
                            Research
                        </Link>

                        {/* Mega Menu */}
                        <div className="absolute left-0 top-full hidden group-hover:flex bg-white shadow-xl border-t-1  p-6 w-[400px] z-50 gap-12">

                            {/* Column 1 */}
                            <div className="flex flex-col space-y-3 min-w-[200px]">
                                <Link to="/overview" className="hover:text-red-600 text-gray-700">Journal</Link>
                                <Link to="/vision" className="hover:text-red-600 text-gray-700">Research</Link>
                                <Link to="/achievements" className="hover:text-red-600 text-gray-700">Laboratory</Link>
                                <Link to="/overview" className="hover:text-red-600 text-gray-700">Publications</Link>                             
                                <Link to="/overview" className="hover:text-red-600 text-gray-700">Innovation</Link>                             
                            </div>

                        </div>
                    </li>
                    

                    <li><Link to="/login">LogIn/Register</Link></li>
                </ul>
            </div>
        </nav>
    );
}
