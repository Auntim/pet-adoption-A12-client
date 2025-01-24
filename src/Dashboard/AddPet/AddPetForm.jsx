import React from "react";
import Select from "react-select"; // For category dropdown
import ClipLoader from "react-spinners/ClipLoader"; // Loader during submission

const AddPetForm = ({ handleSubmit, uploadImage, setUploadImage, loading }) => {
    const petCategories = [
        { value: "dog", label: "Dog" },
        { value: "cat", label: "Cat" },
        { value: "rabbit", label: "Rabbit" },
        { value: "bird", label: "Bird" },
        { value: "other", label: "Other" },
    ];

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-4xl text-center font-bold text-orange-600 mb-6 ">---Add Pet---</h2>

            {/* Pet Name */}
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                    Pet Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter pet name"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Pet Age */}
            <div className="mb-4">
                <label htmlFor="age" className="block text-gray-700 font-medium mb-1">
                    Pet Age (in years)
                </label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Enter pet age"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Pet Category */}
            <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 font-medium mb-1">
                    Pet Category
                </label>
                <Select
                    options={petCategories}
                    name="category"
                    id="category"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    required
                    placeholder="Select a category"
                    isSearchable
                />
            </div>

            {/* Pet Location */}
            <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700 font-medium mb-1">
                    Location
                </label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Enter pickup location"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Short Description */}
            <div className="mb-4">
                <label htmlFor="shortDescription" className="block text-gray-700 font-medium mb-1">
                    Short Description
                </label>
                <textarea
                    id="shortDescription"
                    name="shortDescription"
                    placeholder="Enter a short description about the pet"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Long Description */}
            <div className="mb-4">
                <label htmlFor="longDescription" className="block text-gray-700 font-medium mb-1">
                    Long Description
                </label>
                <textarea
                    id="longDescription"
                    name="longDescription"
                    placeholder="Provide detailed information about the pet"
                    rows="5"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Image Upload */}
            <div className="mb-6">
                <label htmlFor="image" className="block text-gray-700 font-medium mb-1">
                    Pet Image
                </label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    required
                    onChange={(e) =>
                        setUploadImage({ image: e.target.files[0] || { name: "Upload Button" } })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {uploadImage.image && (
                    <p className="text-sm text-gray-500 mt-2">Selected: {uploadImage.image.name}</p>
                )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-500 text-white font-medium py-2 px-4 rounded ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-600"
                        }`}
                >
                    {loading ? <ClipLoader color="#fff" size={20} /> : "Add Pet"}
                </button>
            </div>
        </form>
    );
};

export default AddPetForm;
