import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const PetsListing = ({ limit }) => {
    const [pets, setPets] = useState([]);
    const [filteredPets, setFilteredPets] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const itemsPerPage = 200;

    // Fetch all non-adopted pets
    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch("https://pet-adoption-server-side-teal.vercel.app/allpets");
                const data = await response.json();

                // Filter only non-adopted pets and sort by date (descending)
                const nonAdoptedPets = data
                    .slice(0, limit)
                    .filter((pet) => !pet.adopted)
                    .sort((a, b) => new Date(b.date) - new Date(a.date));

                setPets(nonAdoptedPets);
                setFilteredPets(nonAdoptedPets.slice(0, itemsPerPage));
                setPage(1);
                setHasMore(nonAdoptedPets.length > itemsPerPage);
            } catch (err) {
                console.error("Error fetching pets:", err);
            }
        };
        fetchPets();
    }, []);

    // Handle search and filter
    useEffect(() => {
        const filtered = pets
            .filter(
                (pet) =>
                    pet.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                    (category === "" || pet.category === category)
            )
            .slice(0, page * itemsPerPage);

        setFilteredPets(filtered);
        setHasMore(filtered.length > page * itemsPerPage);
    }, [searchQuery, category, page, pets]);

    // Handle infinite scrolling
    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 200
        ) {
            if (hasMore) {
                setPage((prevPage) => prevPage + 1);
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore]);

    return (
        <div className="p-6 dark:bg-medium dark:text-white bg-w pt-12">
            <Helmet>
                <title>Pet | Pet-Linting</title>
            </Helmet>
            <h2 className="text-2xl md:text-5xl dark:text-white text-center font-bold text-orange-600 mb-6 ">---Available Pets for Adoption---</h2>

            {/* Search and Filter */}
            <div className="flex container mx-auto justify-between items-center mb-6">
                <div className="flex gap-1">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border border-gray-500 rounded px-4 py-2 w-3/4"
                    />
                    <button className="btn px-3 py-2 bg-blue-400">Search</button>
                </div>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 dark:text-black"
                >
                    <option value="">All Categories</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Rabbit">Rabbit</option>
                    {/* Add more categories as needed */}
                </select>
            </div>

            {/* Pets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredPets.map((pet) => (
                    <div
                        key={pet._id}
                        className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition"
                    >
                        <img
                            src={pet.image}
                            alt={pet.name}
                            className="h-40 w-full object-cover rounded-t-lg mb-4"
                        />
                        <h3 className="text-xl font-bold mb-2">{pet.name}</h3>
                        <p className="font-semibold">Age: {pet.age} years</p>
                        <p className="font-semibold">Location: {pet.location}</p>
                        <p className="font-semibold">Short-Dascription: {pet.shortDescription}</p>
                        <Link to={`/pets/${pet._id}`}>
                            <button
                                className="mt-4 px-4 py-2 btn btn-outline text-black dark:text-white rounded "
                            >
                                View Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>

            {/* No Pets Found */}
            {filteredPets.length === 0 && (
                <p className="text-center mt-6 text-gray-500">No pets found.</p>
            )}
        </div>
    );
};

export default PetsListing;


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import LoadingSpinner from "../../Shared/LoadingSpinner";

// const PetsListing = () => {
//     const [pets, setPets] = useState([]);
//     const [hasMore, setHasMore] = useState(true);
//     const [loading, setLoading] = useState(false);
//     const [page, setPage] = useState(1);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [category, setCategory] = useState("");

//     const fetchPets = async (currentPage, currentCategory) => {
//         if (loading || !hasMore) return;

//         setLoading(true);
//         try {
//             const response = await fetch(
//                 `https://pet-adoption-server-side-teal.vercel.app/allpets?page=${currentPage}&limit=150&category=${currentCategory}`
//             );
//             const data = await response.json();

//             if (currentPage === 1) {
//                 // If it's the first page, replace the pets
//                 setPets(data.pets);
//             } else {
//                 // Otherwise, append new pets to the existing list
//                 setPets((prevPets) => [...prevPets, ...data.pets]);
//             }

//             setHasMore(data.hasMore);
//         } catch (error) {
//             console.error("Error fetching pets:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPets(page, category);
//     }, [page, category]);

//     const handleScroll = () => {
//         if (
//             window.innerHeight + document.documentElement.scrollTop >=
//             document.documentElement.offsetHeight - 200 &&
//             hasMore
//         ) {
//             setPage((prevPage) => prevPage + 1);
//         }
//     };

//     useEffect(() => {
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, [hasMore]);

//     // Handle search input locally
//     const filteredPets = pets.filter((pet) =>
//         pet.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <div className="p-6">
//             <h2 className="text-4xl text-center font-bold text-orange-600 mb-6">
//                 ---Available Pets for Adoption---
//             </h2>

//             {/* Search and Filter */}
//             <div className="flex justify-between items-center mb-6">
//                 <input
//                     type="text"
//                     placeholder="Search by name"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="border border-gray-300 rounded px-4 py-2 w-1/2"
//                 />
//                 <select
//                     value={category}
//                     onChange={(e) => {
//                         setCategory(e.target.value);
//                         setPage(1);
//                     }}
//                     className="border border-gray-300 rounded px-4 py-2"
//                 >
//                     <option value="">All Categories</option>
//                     <option value="Dog">Dog</option>
//                     <option value="Cat">Cat</option>
//                     <option value="Bird">Bird</option>
//                     <option value="Rabbit">Rabbit</option>
//                 </select>
//             </div>

//             {/* Pets Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {filteredPets.map((pet) => (
//                     <div
//                         key={pet._id}
//                         className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition"
//                     >
//                         <img
//                             src={pet.image}
//                             alt={pet.name}
//                             className="h-40 w-full object-cover rounded-t-lg mb-4"
//                         />
//                         <h3 className="text-xl font-bold mb-2">{pet.name}</h3>
//                         <p className="font-semibold">Age: {pet.age} years</p>
//                         <p className="font-semibold">Location: {pet.location}</p>
//                         <Link to={`/pets/${pet._id}`}>
//                             <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//                                 View Details
//                             </button>
//                         </Link>
//                     </div>
//                 ))}
//             </div>

//             {/* Loading Indicator */}
//             {loading && <LoadingSpinner></LoadingSpinner>}

//             {/* No Pets Found */}
//             {!loading && filteredPets.length === 0 && (
//                 <p className="text-center mt-6 text-gray-500">No pets found.</p>
//             )}
//         </div>
//     );
// };

// export default PetsListing;
