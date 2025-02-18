import { useContext } from "react";
import { FaUsers, FaPaw, FaDonate } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/provider/AuthProvider";
import avatarImg from "../../assets/images/logo.png";
import ToggleDark from "../../components/provider/ToggleDark";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";



const AdminHome = () => {
    const adoptionData = [
        { name: "Adopted", value: 50, color: "#4CAF50" },
        { name: "Available", value: 30, color: "#FFC107" },
        { name: "Pending Adoption", value: 20, color: "#FF5722" },
    ];

    // Data for Pet Type Distribution
    const petTypeData = [
        { name: "Dogs", value: 40, color: "#2196F3" },
        { name: "Cats", value: 35, color: "#9C27B0" },
        { name: "Birds", value: 15, color: "#FF9800" },
        { name: "Others", value: 10, color: "#607D8B" },
    ];
    const { user } = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            {/* Navbar */}
            <nav className=" bg-white dark:bg-gray-800 shadow-md fixed w-full top-0 left-0 z-10 px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                    <MdDashboard className="text-blue-500 text-3xl" />
                    <h1 className="text-xl font-bold text-gray-700 dark:text-white">Admin Dashboard</h1>
                </div>

                {/* Profile */}
                <div className="flex items-center space-x-4">
                    <span className="text-gray-600 dark:text-gray-300">{user.displayName}</span>
                    <img
                        className="rounded-full h-10 w-10 border-2 border-yellow-500 cursor-pointer"
                        referrerPolicy="no-referrer"
                        src={user && user.photoURL ? user.photoURL : avatarImg}
                        alt="profile"
                    />

                    <ToggleDark />
                </div>
            </nav>

            {/* Dashboard Content */}
            <div className="pt-20 p-6">
                <h2 className="text-2xl font-semibold">Welcome, {user.displayName}! 🎉</h2>
                <p className="text-gray-600 dark:text-gray-400">Manage the platform efficiently with real-time insights.</p>

                {/* Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {/* Adoption Requests */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
                        <FaPaw className="text-blue-500 text-4xl" />
                        <div>
                            <h3 className="text-lg font-semibold">Adoption Requests</h3>
                            <p className="text-gray-600 dark:text-gray-300">Total: 120</p>
                        </div>
                    </div>

                    {/* Donations Received */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
                        <FaDonate className="text-green-500 text-4xl" />
                        <div>
                            <h3 className="text-lg font-semibold">Total Donations</h3>
                            <p className="text-gray-600 dark:text-gray-300">$8,450</p>
                        </div>
                    </div>

                    {/* Total Users */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
                        <FaUsers className="text-purple-500 text-4xl" />
                        <div>
                            <h3 className="text-lg font-semibold">Total Users</h3>
                            <p className="text-gray-600 dark:text-gray-300">350</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold">Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        <Link to="/dashboard/users" className="bg-blue-500 text-white p-4 rounded-lg shadow-md text-center">
                            Manage Users
                        </Link>
                        <Link to="/dashboard/allpets" className="bg-green-500 text-white p-4 rounded-lg shadow-md text-center">
                            View All Pets
                        </Link>
                        <Link to="/dashboard/addpets" className="bg-orange-500 text-white p-4 rounded-lg shadow-md text-center">
                            Add New Pet
                        </Link>
                        <Link to="/dashboard/payment-history-all" className="bg-purple-500 text-white p-4 rounded-lg shadow-md text-center">
                            View Donations
                        </Link>
                        <Link to="/dashboard/myDonationCampaigns" className="bg-red-500 text-white p-4 rounded-lg shadow-md text-center">
                            My Campaigns
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center p-6 bg-gray-100 dark:bg-medium pt-6">
                    <div className="bg-white shadow-lg rounded-2xl p-4 dark:bg-medium dark:border-2 dark:border-violet-600">
                        <h2 className="text-xl font-semibold text-center mb-4 dark:text-white">Adoption Status Distribution</h2>
                        <PieChart width={300} height={300}>
                            <Pie data={adoptionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                                {adoptionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>

                    <div className="bg-white shadow-lg rounded-2xl p-4 dark:bg-medium dark:border-2 dark:border-violet-600">
                        <h2 className="text-xl font-semibold text-center mb-4 dark:text-white">Pet Type Distribution</h2>
                        <PieChart width={300} height={300}>
                            <Pie data={petTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                                {petTypeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
