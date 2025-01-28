import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllPets = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all pets
    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch("https://pet-adoption-server-side-teal.vercel.app/allpets");
                const data = await response.json();
                setPets(data);
            } catch (err) {
                console.error("Error fetching pets:", err);
                toast.error("Failed to load pets. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchPets();
    }, []);

    // Handle delete pet


    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`https://pet-adoption-server-side-teal.vercel.app/pets/${id}`, {
                        method: "DELETE",
                    });
                    if (response.ok) {
                        setPets((prevPets) => prevPets.filter((pet) => pet._id !== id));
                        Swal.fire("Deleted!", "The pet has been deleted.", "success");
                    } else {
                        Swal.fire("Error!", "Failed to delete the pet.", "error");
                    }
                } catch (err) {
                    console.error("Error deleting pet:", err);
                    Swal.fire("Error!", "Failed to delete the pet. Please try again.", "error");
                }
            }
        });
    };


    // Handle toggle adoption status
    const toggleAdoptionStatus = async (id, currentStatus) => {
        try {
            const response = await fetch(`https://pet-adoption-server-side-teal.vercel.app/pets/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adopted: !currentStatus }),
            });
            if (response.ok) {
                setPets(
                    pets.map((pet) =>
                        pet._id === id ? { ...pet, adopted: !currentStatus } : pet
                    )
                );
                toast.success(`Pet status updated to ${!currentStatus ? "Adopted" : "Not Adopted"}`);
            } else {
                toast.error("Failed to update pet status.");
            }
        } catch (err) {
            console.error("Error updating adoption status:", err);
            toast.error("Failed to update pet status. Please try again.");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-4xl text-center font-bold text-orange-600 mb-6 ">--- All Added Pets are here---</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 dark:text-black">
                                <th className="border border-gray-300 px-4 py-2">Image</th>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Age</th>
                                <th className="border border-gray-300 px-4 py-2">Category</th>
                                <th className="border border-gray-300 px-4 py-2">Location</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pets.map((pet) => (
                                <tr key={pet._id}>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <img
                                            src={pet.image}
                                            alt={pet.name}
                                            className="h-16 w-16 object-cover rounded-full"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{pet.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{pet.age}</td>
                                    <td className="border border-gray-300 px-4 py-2">{pet.category}</td>
                                    <td className="border border-gray-300 px-4 py-2">{pet.location}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {pet.adopted ? "Adopted" : "Not Adopted"}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            onClick={() => toggleAdoptionStatus(pet._id, pet.adopted)}
                                            className={`px-3 py-1 rounded ${pet.adopted ? "bg-green-500" : "bg-red-500"
                                                } text-white mr-2`}
                                        >
                                            {pet.adopted ? "Mark Not Adopted" : "Mark Adopted"}
                                        </button>
                                        <Link to={`/dashboard/update-pet/${pet._id}`}>
                                            <button

                                                className="px-3 py-2 mr-2 bg-slate-700 text-white rounded"
                                            >
                                                <FaPen></FaPen>
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(pet._id)}
                                            className="px-3 py-2 bg-red-500 text-white rounded"
                                        >
                                            <FaTrashAlt></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllPets;
