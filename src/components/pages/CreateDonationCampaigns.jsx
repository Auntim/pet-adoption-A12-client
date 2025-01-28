import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateDonationCampaigns = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to upload image to imgbb API
    const uploadImageToImgbb = async (image) => {
        const formData = new FormData();
        formData.append("image", image);

        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbbApiKey}`;

        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            return data.data.url; // Returns the URL of the uploaded image
        } catch (error) {
            console.error("Image upload failed:", error);
            return null;
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const petImage = form.petImage.files[0];
        const maxDonation = parseFloat(form.maxDonation.value);
        const lastDate = form.lastDate.value;
        const shortDescription = form.shortDescription.value;
        const longDescription = form.longDescription.value;

        // Upload pet image
        const petImageUrl = await uploadImageToImgbb(petImage);

        if (!petImageUrl) {
            toast.error("Failed to upload image. Please try again.");
            setLoading(false);
            return;
        }

        // Create donation campaign object
        const donationCampaign = {
            petImage: petImageUrl,
            maxDonation,
            lastDate,
            shortDescription,
            longDescription,
        };

        try {
            const response = await fetch("https://pet-adoption-server-side-teal.vercel.app/donationCampaigns", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(donationCampaign),
            });

            if (response.ok) {
                toast.success("Donation campaign created successfully!");
                navigate("/dashboard/myDonationCampaigns");
            } else {
                toast.error("Failed to create donation campaign.");
            }
        } catch (error) {
            console.error("Error creating donation campaign:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-4xl text-center font-bold text-orange-600 mb-6 ">---Create Donation Campaign---</h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 shadow-md rounded">
                <div className="mb-4">
                    <label htmlFor="petImage" className="block text-sm font-medium text-gray-700">
                        Pet Picture
                    </label>
                    <input
                        type="file"
                        id="petImage"
                        name="petImage"
                        accept="image/*"
                        required
                        className="mt-1 block w-full text-sm border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="maxDonation" className="block text-sm font-medium text-gray-700">
                        Maximum Donation Amount
                    </label>
                    <input
                        type="number"
                        id="maxDonation"
                        name="maxDonation"
                        min="1"
                        step="0.01"
                        required
                        className="mt-3 block w-full text-sm border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastDate" className="block text-sm font-medium text-gray-700">
                        Last Date of Donation
                    </label>
                    <input
                        type="date"
                        id="lastDate"
                        name="lastDate"
                        required
                        className="mt-1 block w-full text-sm border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="shortDescription"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Short Description
                    </label>
                    <input
                        type="text"
                        id="shortDescription"
                        name="shortDescription"
                        // maxLength="150"
                        rows="3"
                        required
                        className="mt-1 block w-full text-sm border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="longDescription"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Long Description
                    </label>
                    <textarea
                        id="longDescription"
                        name="longDescription"
                        rows="5"
                        required
                        className="mt-1 block w-full text-sm border-gray-300 rounded-md shadow-sm"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 rounded bg-blue-500 text-white font-medium ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                        }`}
                >
                    {loading ? "Creating..." : "Create Campaign"}
                </button>
            </form>
        </div>
    );
};

export default CreateDonationCampaigns;
