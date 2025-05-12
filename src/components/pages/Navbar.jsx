import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai"; // Import close icon
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import logo from "../../assets/images/logo.png";
import avatarImg from "../../assets/images/logo.png";
import ToggleDark from "../provider/ToggleDark";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            // If click is outside this component, close dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // Attach listener globally
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            Swal.fire({
                icon: "success",
                title: "Logged Out!",
                text: "You have been successfully logged out.",
                timer: 1000,
                showConfirmButton: false,
            });
            navigate("/login");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message,
            });
        }
    };

    return (
        <nav className="fixed w-full z-50 top-0 bg-gradient-to-r dark:bg-gray-900 dark:text-white from-violet-500 to-fuchsia-500 text-white rounded-b-md">
            <div className="mx-auto flex dark:bg-gray-900 dark:border-b-2 dark:text-white justify-between items-center py-4 px-6">
                {/* Logo */}
                <Link to="/" className="flex items-center text-5xl font-bold text-red-400 uppercase">
                    <img className="h-12 w-12 rounded-full" src={logo} alt="Logo" />
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "px-2 py-2 rounded-lg hover:bg-blue-300 transition font-semibold" : "px-2 py-2 hover:bg-blue-300 transition font-semibold rounded-lg"
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/allpets"
                            className={({ isActive }) =>
                                isActive ? "px-2 py-2 rounded-lg hover:bg-blue-300 transition font-semibold" : "px-2 py-2 hover:bg-blue-300 transition font-semibold rounded-lg"
                            }
                        >
                            Pet-Listing
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/alldonationCampaigns"
                            className={({ isActive }) =>
                                isActive ? "px-2 py-2 rounded-lg hover:bg-blue-300 transition font-semibold" : "px-2 py-2 hover:bg-blue-300 transition font-semibold rounded-lg"
                            }
                        >
                            Donation
                        </NavLink>
                    </li>
                </ul>


                <div className="flex items-center ">
                    {/* User Actions */}
                    <div className="flex items-center">
                        {user ? (
                            <div className="relative" ref={dropdownRef} >
                                {/* User Photo */}
                                <img
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="rounded-full h-10 w-10 border-2 border-yellow-500 cursor-pointer"
                                    referrerPolicy="no-referrer"
                                    src={user?.photoURL || avatarImg}
                                    alt="profile"
                                />

                                {/* Dropdown */}
                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-lg rounded-xl p-3 z-50">
                                        <p className="text-center font-semibold text-sm mb-2 text-gray-800 dark:text-white">
                                            {user?.displayName || "User"}
                                        </p>
                                        <Link
                                            to="/dashboard"
                                            className="block px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 text-red-500 dark:text-red-400"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="px-3 py-2 hover:bg-blue-300 rounded-md transition font-semibold border-2 "
                            >
                                Login
                            </Link>
                        )}
                    </div>
                    <div className="rounded ml-3 mr-2 hidden md:block">
                        <ToggleDark />
                    </div>
                </div>

                {/* Hamburger Menu (Mobile) */}
                <div className="md:hidden flex items-center">
                    {isMenuOpen ? (
                        <AiOutlineClose
                            className="text-3xl cursor-pointer"
                            onClick={() => setIsMenuOpen(false)}
                        />
                    ) : (
                        <GiHamburgerMenu
                            className="text-3xl cursor-pointer"
                            onClick={() => setIsMenuOpen(true)}
                        />
                    )}
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <ul className="md:hidden   absolute top-20 right-4 w-40 backdrop-blur-lg bg-black/70 text-white rounded-xl shadow-2xl p-1 space-y-3 z-50 border border-gray-800">
                    <li>
                        <NavLink
                            to="/"
                            className="block text-xl font-semibold hover:bg-blue-300 p-2 rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/allpets"
                            className="block text-xl font-semibold hover:bg-blue-300 p-2 rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Pet-Listing
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/alldonationCampaigns"
                            className="block text-xl font-semibold hover:bg-blue-300 p-2 rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Donation
                        </NavLink>
                    </li>
                    <li>
                        <div className="rounded gap-1 ml-3 flex items-center md:hidden">
                            <p>Theme :</p>
                            <ToggleDark />
                        </div>
                    </li>

                </ul>
            )}
        </nav>
    );
};

export default Navbar;
