import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";

const UpdatePet = () => {
    const { id } = useParams(); // Get pet ID from URL params
    const navigate = useNavigate();
    const [petData, setPetData] = useState(null);
    const { register, handleSubmit, reset } = useForm();

    // Fetch pet details by ID
    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/pets/${id}`);
                const data = await response.json();
                setPetData(data);
                // Pre-fill form fields with fetched data
                reset(data);
            } catch (err) {
                console.error("Failed to fetch pet data:", err);
            }
        };
        fetchPetData();
    }, [id, reset]);

    // Submit the updated pet data
    const onSubmit = async (data) => {
        const { _id, ...updatedData } = data;
        try {
            const response = await fetch(`http://localhost:5000/pets/${_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                toast.success("Pet updated successfully!");
                navigate("/allpets");
            } else {
                toast.error("Failed to update pet.");
            }
        } catch (err) {
            console.error("Error updating pet:", err);
            toast.error("Failed to update pet. Please try again.");
        }
    };

    // Options for pet categories
    const petCategories = [
        { value: "dog", label: "Dog" },
        { value: "cat", label: "Cat" },
        { value: "rabbit", label: "Rabbit" },
        { value: "bird", label: "Bird" },
        { value: "others", label: "Others" },
    ];

    return (
        <div>
            <h2 className="text-4xl text-center font-bold text-orange-600 mb-6 mt-6 ">---Update Pet here---</h2>
            {petData ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl mx-auto mb-4">
                    {/* Pet Image */}
                    <div>
                        <label className="block text-sm font-medium">Pet Image</label>
                        <input
                            type="file"
                            {...register("image")}
                            className="block w-full border rounded p-2"
                        />
                    </div>

                    {/* Pet Name */}
                    <div>
                        <label className="block text-sm font-medium">Pet Name</label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            defaultValue={petData?.name}
                            className="block w-full border rounded p-2"
                        />
                    </div>

                    {/* Pet Age */}
                    <div>
                        <label className="block text-sm font-medium">Pet Age</label>
                        <input
                            type="number"
                            {...register("age", { required: true })}
                            defaultValue={petData?.age}
                            className="block w-full border rounded p-2"
                        />
                    </div>

                    {/* Pet Category */}
                    <div>
                        <label className="block text-sm font-medium">Pet Category</label>
                        <Select
                            options={petCategories}
                            defaultValue={petCategories.find(
                                (option) => option.value === petData?.category
                            )}
                            onChange={(selectedOption) =>
                                reset({ ...petData, category: selectedOption.value })
                            }
                            className="block w-full"
                        />
                    </div>

                    {/* Pet Location */}
                    <div>
                        <label className="block text-sm font-medium">Pet Location</label>
                        <input
                            type="text"
                            {...register("location", { required: true })}
                            defaultValue={petData?.location}
                            className="block w-full border rounded p-2"
                        />
                    </div>

                    {/* Short Description */}
                    <div>
                        <label className="block text-sm font-medium">
                            Short Description
                        </label>
                        <input
                            type="text"
                            {...register("shortDescription", { required: true })}
                            defaultValue={petData?.shortDescription}
                            className="block w-full border rounded p-2"
                        />
                    </div>

                    {/* Long Description */}
                    <div>
                        <label className="block text-sm font-medium">Long Description</label>
                        <textarea
                            {...register("longDescription", { required: true })}
                            defaultValue={petData?.longDescription}
                            className="block w-full border rounded p-2"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary block w-full py-2 text-white"
                        >
                            Update Pet
                        </button>
                    </div>
                </form>
            ) : (
                <p>Loading pet data...</p>
            )}
        </div>
    );
};

export default UpdatePet;
