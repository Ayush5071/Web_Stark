import { useLnf } from '@/context/LnfContext';
import LostFoundItem from '@/components/lnf/LostFoundItem/page';
import React from 'react';

export default function ClaimedPage() {
  const { claimedItems, unclaimItem } = useLnf();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Claimed Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {claimedItems.length === 0 ? (
          <p className="col-span-full text-center text-lg text-gray-600">No claimed items available at the moment.</p>
        ) : (
          claimedItems.map((item) => (
            <div key={item._id} className="flex flex-col bg-blue-900 rounded-lg shadow-lg overflow-hidden">
              <LostFoundItem
                      item={item}
                      onUnclaim={(id) => unclaimItem(id)} onClaim={undefined}              
                />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
