import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import LoadingSpinner from "../../Shared/LoadingSpinner";


const DonationCampaign = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchCampaigns = async () => {
        if (loading) return <LoadingSpinner />;
        setLoading(true);

        try {
            const response = await fetch(
                `https://pet-adoption-server-side-teal.vercel.app/alldonationCampaigns?page=${page}&limit=6`
            );
            const data = await response.json();

            if (data.campaigns.length > 0) {
                setCampaigns((prev) => [...prev, ...data.campaigns]);
                setPage((prev) => prev + 1);
            }

            if (data.campaigns.length === 0 || campaigns.length >= data.totalCampaigns) {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Failed to fetch campaigns:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            fetchCampaigns();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="p-8 dark:bg-medium dark:text-white">
            <Helmet>
                <title>Pet | Donation</title>
            </Helmet>
            <h2 className="text-4xl text-center font-bold text-orange-600 mb-6 mt-16">--- Donation Campaign---</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                    <div
                        key={campaign?._id}
                        className="p-4 border rounded-lg shadow hover:shadow-md transition"
                    >
                        <img
                            src={campaign.petImage}
                            alt={campaign.petName}
                            className="w-full h-48 object-cover rounded"
                        />
                        <h2 className="text-lg font-semibold mt-3">{campaign.petName}</h2>
                        <p className="text-sm text-gray-600">
                            <span className="font-bold  dark:text-white ">Max Donation:</span> ${campaign.maxDonation}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-bold  dark:text-white">Donated:</span> ${campaign.donatedAmount}
                        </p>

                        <Link to={`/donationCampaigns/${campaign._id}`}>
                            <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                                View Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
            {loading && <p className="text-center mt-4"><LoadingSpinner /></p>}
            {!hasMore && (
                <p className="text-center mt-4 text-gray-500">
                    No more campaigns to load.
                </p>
            )}
        </div>
    );
};

export default DonationCampaign;
