import React, { useContext, useEffect, useState } from "react";
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
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu

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
        <nav className="bg-gradient-to-r dark:bg-medium dark:text-white from-violet-500 to-fuchsia-500 text-white">
            <div className="mx-auto flex dark:bg-medium dark:text-white justify-between items-center py-4 px-6">
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
                            Pet-Listening
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

                {/* User Actions */}
                <div className="flex justify-center items-center space-x-4">
                    {user ? (
                        <>
                            <Link
                                to="dashboard"
                                className="px-2 py-2 hover:bg-blue-300 transition font-semibold rounded-lg"
                            >
                                Dashboard
                            </Link>
                            <div
                                onClick={handleLogout}
                                className="px-2 py-2 hover:bg-blue-300 transition font-semibold rounded-lg cursor-pointer"
                            >
                                Logout
                            </div>
                            <div className="relative group">
                                <img
                                    className="rounded-full h-10 w-10 border-2 border-yellow-500 cursor-pointer"
                                    referrerPolicy="no-referrer"
                                    src={user && user.photoURL ? user.photoURL : avatarImg}
                                    alt="profile"
                                />
                                {user && user.displayName && (
                                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm text-white bg-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                        {user.displayName}
                                    </span>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-3  hover:bg-blue-300 rounded-md transition font-semibold"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-3 hover:bg-blue-300 rounded-md transition font-semibold"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Dark Mode Toggle */}
                <div className="rounded ml-3 bg-gray-200 dark:bg-gray-800">
                    <ToggleDark />
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
                <ul className="md:hidden bg-violet-600 space-y-4 p-4">
                    <li>
                        <NavLink
                            to="/"
                            className="block text-lg font-semibold hover:bg-blue-300 p-2 rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/allpets"
                            className="block text-lg font-semibold hover:bg-blue-300 p-2 rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Pet-Listening
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/alldonationCampaigns"
                            className="block text-lg font-semibold hover:bg-blue-300 p-2 rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Donation
                        </NavLink>
                    </li>

                </ul>
            )}
        </nav>
    );
};

export default Navbar;
