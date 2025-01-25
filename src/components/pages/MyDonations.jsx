import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";

const MyDonations = () => {
    const { user } = useContext(AuthContext)
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const userEmail = user?.email;

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/my-donations?email=${userEmail}`
                );
                const data = await response.json();
                setDonations(data);
            } catch (err) {
                console.error("Error fetching donations:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, []);

    const handleRefund = async (campaignId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/donations/${campaignId}/refund`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userEmail }),
                }
            );

            if (response.ok) {
                setDonations((prev) =>
                    prev.filter((donation) => donation._id !== campaignId)
                );
                toast.success("Refund processed successfully!");
            } else {
                toast.error("Failed to process refund.");
            }
        } catch (err) {
            console.error("Error processing refund:", err);
            toast.error("An error occurred. Please try again.");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4 text-center">My Donations</h2>
            {donations.length === 0 ? (
                <p className="text-center text-gray-500">No donations found.</p>
            ) : (
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-6 py-3 text-sm font-medium text-gray-700">
                                Pet Image
                            </th>
                            <th className="px-6 py-3 text-sm font-medium text-gray-700">
                                Pet Name
                            </th>
                            <th className="px-6 py-3 text-sm font-medium text-gray-700">
                                Donated Amount
                            </th>
                            <th className="px-6 py-3 text-sm font-medium text-gray-700">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation) => (
                            <tr key={donation._id} className="border-t">
                                <td className="px-6 py-3">
                                    <img
                                        src={donation.petImage}
                                        alt={donation.petName}
                                        className="h-12 w-12 object-cover rounded"
                                    />
                                </td>
                                <td className="px-6 py-3">{donation.petName}</td>
                                <td className="px-6 py-3">${donation.amount}</td>
                                <td className="px-6 py-3">
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        onClick={() => handleRefund(donation.campaignId)}
                                    >
                                        Ask for Refund
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyDonations;
