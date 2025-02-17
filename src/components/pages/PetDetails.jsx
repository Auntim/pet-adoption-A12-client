import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../provider/AuthProvider";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const fetchPetDetails = async (id) => {
    const response = await fetch(`https://pet-adoption-server-side-teal.vercel.app/pets/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch pet details");
    }
    return response.json();
};

const PetDetails = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams(); // Get pet ID from URL
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adoptionData, setAdoptionData] = useState({
        phone: "",
        address: "",
    });

    const { data: pet, isLoading, isError, error } = useQuery({
        queryKey: ["petDetails", id],
        queryFn: () => fetchPetDetails(id),
    });

    const handleAdoptionSubmit = async (e) => {
        e.preventDefault();

        const adoptionRequest = {
            petId: pet._id,
            petName: pet.name,
            petImage: pet.image,
            userName: user.displayName,
            email: user.email,
            phone: adoptionData.phone,
            address: adoptionData.address,
        };

        try {
            const response = await fetch("https://pet-adoption-server-side-teal.vercel.app/adoptPet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(adoptionRequest),
            });

            if (response.ok) {
                toast.success("Adoption request submitted successfully!");
                setIsModalOpen(false);
                setAdoptionData({ phone: "", address: "" });
            } else {
                toast.error("Failed to submit adoption request. Try again.");
            }
        } catch (err) {
            console.error("Error submitting adoption request:", err);
        }
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="p-6 dark:bg-medium py-12">
            <Helmet>
                <title>Paw | Pet-Details</title>
            </Helmet>
            {/* Pet Details */}
            {pet && (
                <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 dark:bg-medium mt-12 border-2">
                    <img
                        src={pet.image}
                        alt={pet.name}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <h2 className="text-2xl font-bold mb-2 dark:text-white">{pet.name}</h2>
                    <p className="mb-2 dark:text-white">
                        <strong>Age:</strong> {pet.age} years
                    </p>
                    <p className="mb-2 dark:text-white">
                        <strong>Category:</strong> {pet.category}
                    </p>
                    <p className="mb-2 dark:text-white">
                        <strong>Location:</strong> {pet.location}
                    </p>
                    <p className="mb-4 dark:text-white">
                        <strong>Description:</strong> {pet.longDescription}
                    </p>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Adopt
                    </button>
                </div>
            )}

            {/* Adoption Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Adopt {pet?.name}</h2>
                        <form onSubmit={handleAdoptionSubmit}>
                            <div className="mb-4">
                                <label className="block font-semibold mb-1">Pet Name</label>
                                <input
                                    type="text"
                                    value={pet?.name}
                                    disabled
                                    className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-semibold mb-1">User Name</label>
                                <input
                                    type="text"
                                    value={user?.displayName || ""}
                                    disabled
                                    className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-semibold mb-1">Email</label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    disabled
                                    className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-semibold mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    value={adoptionData.phone}
                                    onChange={(e) =>
                                        setAdoptionData({ ...adoptionData, phone: e.target.value })
                                    }
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-semibold mb-1">Address</label>
                                <textarea
                                    value={adoptionData.address}
                                    onChange={(e) =>
                                        setAdoptionData({ ...adoptionData, address: e.target.value })
                                    }
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PetDetails;
