"use client";
import React, { useEffect } from 'react';
import useAd from '@/hooks/useAd';

const MyAdsPage = () => {
    const { myAds, loading, error, fetchMyAds, deleteAd } = useAd();

    useEffect(() => {
        fetchMyAds();
    }, []);

    const handleDelete = (adId) => {
        deleteAd(adId)
            .then(() => {
                alert('Ad deleted successfully');
                fetchMyAds(); // Refetch the user's ads
            })
            .catch(() => {
                alert('Error deleting ad');
            });
    };

    console.log(myAds,"on the page");
    console.log("error",error);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>My Ads</h1>
            {myAds.length ? (
                <ul>
                    {myAds.map((ad) => (
                        <li key={ad._id}>
                            <h2>{ad.title}</h2>
                            <p>{ad.description}</p>
                            <p>Price: {ad.price}</p>
                            <p>Location: {ad.location}</p>
                            {/* Add button to delete or mark as sold */}
                            <button onClick={() => handleDelete(ad._id)}>Delete Ad</button>
                            <button>Mark as Sold</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No ads found.</p>
            )}
        </div>
    );
};

export default MyAdsPage;
