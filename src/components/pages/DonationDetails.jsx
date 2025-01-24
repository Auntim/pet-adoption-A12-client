import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import toast from "react-hot-toast";

const DonationDetails = () => {
    const { id } = useParams(); // Fetch the donation campaign ID from the URL
    const [campaign, setCampaign] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [donationAmount, setDonationAmount] = useState("");

    // Fetch donation campaign details
    useEffect(() => {
        const fetchCampaignDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/donationCampaigns/${id}`);
                const data = await response.json();
                setCampaign(data);
            } catch (err) {
                console.error("Error fetching campaign details:", err);
                toast.error("Failed to load campaign details.");
            }
        };

        fetchCampaignDetails();
    }, [id]);

    // Open modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setDonationAmount(""); // Reset the donation amount when modal closes
    };

    // Handle form submission (for now, just display the data in the console)
    const handleDonate = (e) => {
        e.preventDefault();
        console.log("Donation Amount:", donationAmount);
        toast.success("This is where the donation process would start!");
        closeModal();
    };

    if (!campaign) {
        return <p>Loading campaign details...</p>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-6">{campaign.petName}</h1>
            <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded">
                <img
                    src={campaign.petImage}
                    alt={campaign.petName}
                    className="w-full h-64 object-cover rounded mb-4"
                />
                <p className="text-lg mb-4">
                    <strong>Short Description:</strong> {campaign.shortDescription}
                </p>
                <p className="text-lg mb-4">
                    <strong>Long Description:</strong> {campaign.longDescription}
                </p>
                <p className="text-lg mb-4">
                    <strong>Maximum Donation:</strong> ${campaign.maxDonation}
                </p>
                <p className="text-lg mb-4">
                    <strong>Donated Amount:</strong> ${campaign.donatedAmount || 0}
                </p>
                <p className="text-lg mb-4">
                    <strong>Last Date of Donation:</strong> {new Date(campaign.lastDate).toLocaleDateString()}
                </p>
                <button
                    onClick={openModal}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Donate Now
                </button>
            </div>

            {/* Modal for Donation */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="max-w-lg mx-auto bg-white p-6 rounded shadow-md"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <h2 className="text-xl font-bold mb-4">{`Donate to ${campaign.petName}`}</h2>
                <form onSubmit={handleDonate}>
                    <div className="mb-4">
                        <label htmlFor="donationAmount" className="block text-sm font-medium text-gray-700">
                            Donation Amount
                        </label>
                        <input
                            type="number"
                            id="donationAmount"
                            name="donationAmount"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                            min="1"
                            required
                            className="mt-1 block w-full text-sm border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Credit Card Details</label>
                        <div className="border border-gray-300 rounded-md p-4 mt-2 text-gray-500">
                            Stripe Credit Card element will be here (not implemented).
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 rounded border border-gray-300 text-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                        >
                            Donate
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default DonationDetails;
