import { useLnf } from '@/context/LnfContext';
import LostFoundItem from '@/components/lnf/LostFoundItem/page';
import React, { useEffect } from 'react';

export default function MyClaimedPage() {
  const { myClaimedItems, unclaimItem, fetchMyClaimedItems } = useLnf();

  useEffect(() => {
    fetchMyClaimedItems; 
  }, [fetchMyClaimedItems]);

//   if (!Array.isArray(myClaimedItems)) {
//     return <div>Loading...</div>; 
//   }
    const items = Array.isArray(myClaimedItems) ? myClaimedItems : [];
    return (
        <div className="p-6">
          <h2 className="text-xl text-gray-900 font-bold mb-4">My Claimed Items</h2>
          {items.length === 0 ? (
            <p className="text-red-500">No items claimed yet.</p> 
          ) : (
            items.map((item) => (
              <LostFoundItem key={item._id} item={item} onUnclaim={(id) => unclaimItem(id)} onClaim={undefined} />
            ))
          )}
        </div>
      );
}
