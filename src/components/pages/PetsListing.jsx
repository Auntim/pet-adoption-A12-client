import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PetsListing = ({ limit }) => {
    const [pets, setPets] = useState([]);
    const [filteredPets, setFilteredPets] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const itemsPerPage = 9;

    // Fetch all non-adopted pets
    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch("http://localhost:5000/allpets");
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
        <div className="p-6">
            <h2 className="text-4xl text-center font-bold text-orange-600 mb-6 ">---Available Pets for Adoption---</h2>

            {/* Search and Filter */}
            <div className="flex justify-between items-center mb-6">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 w-1/2"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2"
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
                        <Link to={`/pets/${pet._id}`}>
                            <button
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
