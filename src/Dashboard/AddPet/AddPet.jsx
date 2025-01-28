import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
import { AuthContext } from "../../components/provider/AuthProvider";
import { imageUpload } from "../../components/hooks/utils";
import AddPetForm from "./AddPetForm";

const AddPet = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [uploadImage, setUploadImage] = useState({
        image: { name: "Upload Button" },
    });
    // console.log(uploadImage);
    const [loading, setLoading] = useState(false);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const name = form.name.value;
        const age = parseInt(form.age.value);
        const category = form.category.value;
        const location = form.location.value;
        const shortDescription = form.shortDescription.value;
        const longDescription = form.longDescription.value;
        const image = form.image.files[0];
        const imageUrl = await imageUpload(image); // Upload the image and get the URL

        // Owner information
        const owner = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
        };

        // Create pet data object
        const petData = {
            name,
            age,
            category,
            location,
            shortDescription,
            longDescription,
            image: imageUrl,
            owner,
            adopted: false,
            dateAdded: new Date().toISOString(),
        };

        // console.table(petData);

        // Save pet to database
        try {
            // POST request
            await axiosSecure.post("/addpets", petData);
            toast.success("Pet Added Successfully!");
        } catch (err) {
            console.error("Error adding pet:", err);
            toast.error("Failed to add pet. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Helmet>
                <title>Add Pet | Add-Pets</title>
            </Helmet>

            {/* Form */}
            <AddPetForm
                handleSubmit={handleSubmit}
                uploadImage={uploadImage}
                setUploadImage={setUploadImage}
                loading={loading}
            />
        </div>
    );
};

export default AddPet;
