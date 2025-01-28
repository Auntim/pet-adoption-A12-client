import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../components/provider/AuthProvider";
import LoadingSpinner from "../Shared/LoadingSpinner";

const MyDonationCampaigns = () => {
    const { user } = useContext(AuthContext);
    const [donators, setDonators] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);


    // Fetch donation campaigns created by the logged-in user
    // const { data: donations = [], refetch } = useQuery(["myDonations"], async () => {
    //     const response = await fetch("https://pet-adoption-server-side-teal.vercel.app/my-donations", {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("access-token")}`, // Include token for authentication
    //         },
    //     });
    //     return response.json();
    // });

    const { data: donationCampaigns = [], isLoading, error } = useQuery({
        queryKey: ['myDonationCampaigns', user?.email],
        queryFn: async () => {
            const response = await fetch(`https://pet-adoption-server-side-teal.vercel.app/donationCampaigns?email=${user?.email}`);
            if (!response.ok) {
                throw new Error('Failed to fetch donation campaigns');
            }
            return response.json();
        },
        enabled: !!user?.email, // Ensure the query doesn't run until the user email is available
    });
    if (isLoading) return <LoadingSpinner></LoadingSpinner>;
    if (error) return <p className="text-center">Failed to load donation campaigns.</p>;


    // Handle pause/unpause
    const togglePauseDonation = async (id, paused) => {
        try {
            const response = await fetch(`https://pet-adoption-server-side-teal.vercel.app/donations/${id}/pause`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paused: !paused }),
            });
            if (response.ok) {
                toast.success(`Donation ${paused ? "unpaused" : "paused"} successfully!`);
                refetch();
            } else {
                toast.error("Failed to update donation status.");
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred.");
        }
    };

    // View donators
    const handleViewDonators = async (id) => {
        try {
            const response = await fetch(`https://pet-adoption-server-side-teal.vercel.app/donations/${id}/donators`);
            const data = await response.json();
            setDonators(data);
            setIsModalOpen(true);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load donators.");
        }
    };

    return (
        <div className="container mx-auto py-6">
            <h2 className="text-4xl text-center font-bold text-orange-600 mb-6 ">---My Donation Campaign---</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 dark:text-black">
                            <th className="p-4 border">Pet Name</th>
                            <th className="p-4 border">Max Donation</th>
                            <th className="p-4 border">Progress</th>
                            <th className="p-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donationCampaigns.map((donation) => (
                            <tr key={donation._id}>
                                <td className="p-4 border">{donation.petName}</td>
                                <td className="p-4 border">${donation.maxDonation}</td>
                                <td className="p-4 border">
                                    <div className="relative w-full h-4 bg-gray-300 rounded">
                                        <div
                                            className="absolute top-0 left-0 h-4 bg-green-500 rounded"
                                            style={{
                                                width: `${(donation.donatedAmount / donation.maxDonation) * 100
                                                    }%`,
                                            }}
                                        ></div>
                                    </div>
                                    <small>
                                        ${donation.donatedAmount} / ${donation.maxDonation}
                                    </small>
                                </td>
                                <td className="p-4 border flex gap-2">
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                        onClick={() => togglePauseDonation(donation._id, donation.paused)}
                                    >
                                        {donation.paused ? "Unpause" : "Pause"}
                                    </button>
                                    <Link
                                        to={`/edit-donation/${donation._id}`}
                                        className="px-4 py-2 bg-yellow-500 text-white rounded"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="px-4 py-2 bg-purple-500 text-white rounded"
                                        onClick={() => handleViewDonators(donation._id)}
                                    >
                                        View Donators
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Donators Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-3/4 max-w-lg">
                        <h3 className="text-lg font-bold mb-4">Donators</h3>
                        <ul className="list-disc list-inside">
                            {donators.length > 0 ? (
                                donators.map((donator, idx) => (
                                    <li key={idx}>
                                        <p>Name: {donator.userName}</p>
                                        <p>Amount: ${donator.amount}</p>
                                    </li>
                                ))
                            ) : (
                                <p>No donators yet.</p>
                            )}
                        </ul>
                        <button
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyDonationCampaigns;
