import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
// import { nav } from "motion/react-client";
import logo from '../../assets/images/logo.png'
import avatarImg from '../../assets/images/logo.png'


const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const handleLogout = async () => {
        try {
            await logout();
            Swal.fire({
                icon: "success",
                title: "Logged Out!",
                text: "You have been successfully logged out.",
                timer: 2000,
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

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <nav className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <Link to="/" className="flex items-center text-5xl font-bold text-red-400 uppercase">
                    <img className="h-12 w-12 rounded-full" src={logo} alt="" />

                </Link>

                <ul className="hidden md:flex space-x-6">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "text-yellow-500 text-[22px]" : "hover:text-yellow-500 text-[22px]"
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/services"
                            className={({ isActive }) =>
                                isActive ? "text-yellow-500 text-[22px]" : "hover:text-yellow-500 text-[22px]"
                            }
                        >
                            Pet-Listening
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/services"
                            className={({ isActive }) =>
                                isActive ? "text-yellow-500 text-[22px]" : "hover:text-yellow-500 text-[22px]"
                            }
                        >
                            Donation
                        </NavLink>
                    </li>


                </ul>

                <div className="flex justify-center items-center space-x-4">
                    {/* {!user ? (
                        <>
                            <Link to="/login" className="hover:text-yellow-500">
                                Login
                            </Link>
                            <Link to="/register" className="hover:text-yellow-500">
                                Register
                            </Link>
                        </>
                    ) : (
                        <div className="relative group">
                            <img
                                src={user.photoURL || <FaUserCircle className="text-3xl" />}
                                alt="User"
                                className="w-10 h-10 rounded-full border-2 border-yellow-500 cursor-pointer"
                            />
                            <div className="absolute hidden group-hover:block bg-black text-white rounded shadow-lg p-4 top-12 right-0">
                                <p className="font-semibold">{user.displayName || "User"}</p>
                                <button
                                    onClick={handleLogout}
                                    className="hover:text-yellow-500 hover:underline mt-2 text-xl"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )} */}

                    {user ? (
                        <>
                            <Link
                                to='/dashboard'
                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                            >
                                Dashboard
                            </Link>
                            <div
                                onClick={handleLogout}
                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                            >
                                Logout
                            </div>
                            <div>
                                <img
                                    className='rounded-full'
                                    referrerPolicy='no-referrer'
                                    src={user && user.photoURL ? user.photoURL : avatarImg}
                                    alt='profile'
                                    height='30'
                                    width='30'
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                to='/login'
                                className='px-4 py-3 hover:bg-slate-700 rounded-md transition font-semibold'
                            >
                                Login
                            </Link>
                            <Link
                                to='/register'
                                className='px-4 py-3 hover:bg-slate-700 rounded-md transition font-semibold'
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
                <div className="rounded bg-gray-200 dark:bg-gray-800">
                    <button
                        onClick={toggleTheme}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700"
                    >
                        {theme === "light" ? "Dark" : "Light"} Mode
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex justify-between px-6 py-4">
                <GiHamburgerMenu className="text-3xl" />
            </div>
        </nav>
    );
};

export default Navbar;