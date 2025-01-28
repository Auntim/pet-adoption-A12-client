
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { AuthContext } from "../provider/AuthProvider";

// Load Stripe (replace with your Stripe publishable key)
const stripePromise = loadStripe(import.meta.env.VITE_PaymentKey);

const DonationDetails = () => {
    const { id } = useParams(); // Fetch the donation campaign ID from the URL
    const [campaign, setCampaign] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [donationAmount, setDonationAmount] = useState("");

    // Fetch donation campaign details
    useEffect(() => {
        const fetchCampaignDetails = async () => {
            try {
                const response = await fetch(`https://pet-adoption-server-side-teal.vercel.app/donationCampaigns/${id}`);
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

    if (!campaign) {
        return <p>Loading campaign details...</p>;
    }

    return (
        <Elements stripe={stripePromise}>
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
                    <DonationForm
                        donationAmount={donationAmount}
                        setDonationAmount={setDonationAmount}
                        closeModal={closeModal}
                        campaignId={id}
                    />
                </Modal>
            </div>
        </Elements>
    );
};

const DonationForm = ({ donationAmount, setDonationAmount, closeModal, campaignId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);

    const handleDonate = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            toast.error("Stripe has not loaded yet. Please try again later.");
            return;
        }

        setLoading(true);

        try {
            // Create payment intent on the backend
            const response = await fetch("https://pet-adoption-server-side-teal.vercel.app/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: parseFloat(donationAmount) * 100,
                    campaignId,
                    donorEmail: user?.email,
                }),

            });
            // console.log('amount is', amount);

            const { clientSecret } = await response.json();

            // Confirm card payment on the client
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email,
                    },
                },
            });

            if (error) {
                console.error("Payment error:", error.message);
                toast.error(error.message);
            } else {
                toast.success(
                    `Thank you for your donation! 
                    Transaction ID: ${paymentIntent.id}`
                );
                closeModal();
            }
        } catch (err) {
            console.error("Error during donation:", err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
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
                    <CardElement className="p-2 border rounded-md" />
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
                    disabled={loading}
                    className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                    {loading ? "Processing..." : "Donate"}
                </button>
            </div>
        </form>
    );
};

export default DonationDetails;
