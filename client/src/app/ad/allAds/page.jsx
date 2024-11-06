"use client";
import useAd from '@/hooks/useAd';
import React, { useEffect } from 'react';

const AdTestComponent = () => {
    const { ads, loading, error, fetchAds } = useAd();

    // Call fetchAds only once when the component mounts
    useEffect(() => {
        fetchAds();
    }, []); // Empty dependency array to ensure fetchAds runs only once

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Ads</h1>
            {ads.length ? (
                <ul>
                    {ads.map(ad => (
                        <li key={ad._id}>
                            <h2>{ad.title}</h2>
                            <p>{ad.description}</p>
                            <p>{ad.price}</p>
                            <p>{ad.location}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No ads found.</p>
            )}
        </div>
    );
};

export default AdTestComponent;
