import React, { useContext } from 'react'
import { AuthContext } from '../../components/provider/AuthProvider'
import { Helmet } from 'react-helmet-async';
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";


function UserHome() {
    const { user } = useContext(AuthContext);

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

    return (
        <div>
            <Helmet>
                <title>Pet | UserHome</title>
            </Helmet>
            <h2 className='text-3xl text-center text-orange-600 font-semibold'>
                <span>Hi, Welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>
            <p className="text-gray-600 text-xl text-center my-6 dark:text-white">Find your next furry friend and make a difference today.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold">60+</h2>
                    <p className="text-gray-200">Pets Adopted</p>
                </div>
                <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold">50+</h2>
                    <p className="text-gray-200">Happy Families</p>
                </div>
                <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold">10+</h2>
                    <p className="text-gray-200">Shelters Partnered</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <a
                    href="#adopt"
                    className="bg-gray-500 p-4 rounded-lg shadow-sm text-center hover:bg-gray-100"
                >
                    <h3 className="text-lg font-semibold text-white">Adopt a Pet</h3>
                    <p className="text-white">Find your new best friend</p>
                </a>
                <a
                    href="#donate"
                    className="bg-gray-500 p-4 rounded-lg shadow-sm text-center hover:bg-gray-100"
                >
                    <h3 className="text-lg font-semibold text-white">Donate</h3>
                    <p className="text-white">Support our cause</p>
                </a>
                <a
                    href="#volunteer"
                    className="bg-gray-500 p-4 rounded-lg shadow-sm text-center hover:bg-gray-100"
                >
                    <h3 className="text-lg font-semibold text-white">Volunteer</h3>
                    <p className="text-white">Join our team</p>
                </a>
                <a
                    href="#faqs"
                    className="bg-gray-500 p-4 rounded-lg shadow-sm text-center hover:bg-gray-100"
                >
                    <h3 className="text-lg font-semibold text-white">FAQs</h3>
                    <p className="text-white">Get answers</p>
                </a>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center p-6 bg-gray-100 dark:bg-medium pt-6">
                <div className="bg-white shadow-lg rounded-2xl p-4">
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

                <div className="bg-white shadow-lg rounded-2xl p-4">
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


    )
}

export default UserHome
