import { useLnf } from '@/context/LnfContext';
import LostFoundItem from '@/components/lnf/LostFoundItem/page';
import React from 'react';

export default function MyUploadedPage() {
  const { myUploadedItems = [] } = useLnf(); 

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900">My Uploaded Items</h2>
      {myUploadedItems.length === 0 ? (
        <p className="text-red-500">No items uploaded yet.</p>
      ) : (
        myUploadedItems.map((item) => (
          <LostFoundItem key={item._id} item={item} onClaim={undefined} onUnclaim={undefined} />
        ))
      )}
    </div>
  );
}
