// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// const AllPets = () => {
//     const [pets, setPets] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Fetch all pets
//     useEffect(() => {
//         const fetchPets = async () => {
//             try {
//                 const response = await fetch("http://localhost:5000/allpets");
//                 const data = await response.json();
//                 setPets(data);
//             } catch (err) {
//                 console.error("Error fetching pets:", err);
//                 toast.error("Failed to load pets. Please try again.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPets();
//     }, []);

//     // Handle delete pet
//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this pet?")) {
//             try {
//                 const response = await fetch(`http://localhost:5000/pets/${id}`, {
//                     method: "DELETE",
//                 });
//                 if (response.ok) {
//                     setPets(pets.filter((pet) => pet._id !== id));
//                     toast.success("Pet deleted successfully!");
//                 } else {
//                     toast.error("Failed to delete pet.");
//                 }
//             } catch (err) {
//                 console.error("Error deleting pet:", err);
//                 toast.error("Failed to delete pet. Please try again.");
//             }
//         }
//     };

//     // Handle toggle adoption status
//     const toggleAdoptionStatus = async (id, currentStatus) => {
//         try {
//             const response = await fetch(`http://localhost:5000/pets/${id}`, {
//                 method: "PATCH",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ adopted: !currentStatus }),
//             });
//             if (response.ok) {
//                 setPets(
//                     pets.map((pet) =>
//                         pet._id === id ? { ...pet, adopted: !currentStatus } : pet
//                     )
//                 );
//                 toast.success(`Pet status updated to ${!currentStatus ? "Adopted" : "Not Adopted"}`);
//             } else {
//                 toast.error("Failed to update pet status.");
//             }
//         } catch (err) {
//             console.error("Error updating adoption status:", err);
//             toast.error("Failed to update pet status. Please try again.");
//         }
//     };

//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-bold mb-4">All Pets</h2>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full table-auto border-collapse border border-gray-300">
//                         <thead>
//                             <tr className="bg-gray-100">
//                                 <th className="border border-gray-300 px-4 py-2">Image</th>
//                                 <th className="border border-gray-300 px-4 py-2">Name</th>
//                                 <th className="border border-gray-300 px-4 py-2">Age</th>
//                                 <th className="border border-gray-300 px-4 py-2">Category</th>
//                                 <th className="border border-gray-300 px-4 py-2">Location</th>
//                                 <th className="border border-gray-300 px-4 py-2">Status</th>
//                                 <th className="border border-gray-300 px-4 py-2">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {pets.map((pet) => (
//                                 <tr key={pet._id}>
//                                     <td className="border border-gray-300 px-4 py-2">
//                                         <img
//                                             src={pet.image}
//                                             alt={pet.name}
//                                             className="h-16 w-16 object-cover rounded-full"
//                                         />
//                                     </td>
//                                     <td className="border border-gray-300 px-4 py-2">{pet.name}</td>
//                                     <td className="border border-gray-300 px-4 py-2">{pet.age}</td>
//                                     <td className="border border-gray-300 px-4 py-2">{pet.category}</td>
//                                     <td className="border border-gray-300 px-4 py-2">{pet.location}</td>
//                                     <td className="border border-gray-300 px-4 py-2">
//                                         {pet.adopted ? "Adopted" : "Not Adopted"}
//                                     </td>
//                                     <td className="border border-gray-300 px-4 py-2">
//                                         <button
//                                             onClick={() => toggleAdoptionStatus(pet._id, pet.adopted)}
//                                             className={`px-3 py-1 rounded ${pet.adopted ? "bg-green-500" : "bg-red-500"
//                                                 } text-white mr-2`}
//                                         >
//                                             {pet.adopted ? "Mark Not Adopted" : "Mark Adopted"}
//                                         </button>
//                                         <button
//                                             onClick={() => handleDelete(pet._id)}
//                                             className="px-3 py-1 bg-gray-500 text-white rounded"
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AllPets;
