import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 sm:gap-3">
                    <img src="/images/GSTU_Logo.png" alt="GSTU Logo" className="h-10 w-10 sm:h-12 sm:w-12 object-contain" />
                    <span className="text-xl sm:text-2xl font-bold text-blue-700">GSTU</span>
                </Link>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-gray-700 hover:text-blue-700 focus:outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                <ul className="hidden md:flex gap-4 lg:gap-8 text-gray-700 font-medium text-sm lg:text-base">
                    
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
                                <Link to="/vision" className="hover:text-red-600 text-gray-700">Centers & Cells</Link>
                                <Link to="/library" className="hover:text-red-600 text-gray-700">Central Library</Link>
                               
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
                                <Link to="/campus/gallery" className="hover:text-red-600 text-gray-700">Gallery</Link>
                                <Link to="/sports" className="hover:text-red-600 text-gray-700">Sports</Link>
                               
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
                                <Link to="/transport" className="hover:text-red-600 text-gray-700">Transport</Link>
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
                    

                    <li><Link to="/login" className="hover:text-red-600">LogIn/Register</Link></li>
                </ul>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden max-h-[80vh] overflow-y-auto">
                        <ul className="flex flex-col p-4 space-y-2">
                            <li><Link to="/" className="block py-2 hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
                            <li className="border-t pt-2">
                                <span className="block py-2 font-semibold text-gray-800">About Us</span>
                                <div className="pl-4 space-y-2">
                                    <Link to="/about/overview" className="block py-1 text-sm hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>Overview</Link>
                                    <Link to="about/vision-and-mission" className="block py-1 text-sm hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>Vision & Mission</Link>
                                    <Link to="/achievements" className="block py-1 text-sm hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>Achievements</Link>
                                    <Link to="/news" className="block py-1 text-sm hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>News and Events</Link>
                                    <Link to="/contact" className="block py-1 text-sm hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
                                </div>
                            </li>
                            <li className="border-t pt-2">
                                <span className="block py-2 font-semibold text-gray-800">Academics</span>
                                <div className="pl-4 space-y-2">
                                    <Link to="/academics/departments" className="block py-1 text-sm hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>Departments</Link>
                                    <Link to="/vision" className="block py-1 text-sm hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>Centers & Cells</Link>
                                    <Link to="/library" className="block py-1 text-sm hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>Central Library</Link>
                                </div>
                            </li>
                            <li className="border-t pt-2">
                                <span className="block py-2 font-semibold text-gray-800">Campus</span>
                                <div className="pl-4 space-y-2">
                                    <Link to="/overview" className="block py-1 text-sm hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>Campus Life</Link>
                                    <Link to="/hall" className="block py-1 text-sm hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>Residential Halls</Link>
                                    <Link to="/campus/gallery" className="block py-1 text-sm hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
                                    <Link to="/sports" className="block py-1 text-sm hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>Sports</Link>
                                </div>
                            </li>
                            <li className="border-t pt-2"><Link to="/login" className="block py-2 text-blue-600 font-semibold" onClick={() => setMobileMenuOpen(false)}>LogIn/Register</Link></li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}




