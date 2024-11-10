import React from "react";

export default function LostFoundItem({ item, onClaim, onUnclaim }) {
    return (
      <div className="p-4  rounded-lg mb-4">
        <h3 className="text-lg font-bold">{item.itemName}</h3>
        <p>{item.description}</p>
        <p>Location: {item.location}</p>
        {item.isClaimed ? (
          <button
            className="mt-2 p-2 bg-red-500 text-white rounded"
            onClick={() => onUnclaim(item._id)}
          >
            Unclaim
          </button>
        ) : (
          <button
            className="mt-2 p-2 bg-green-500 text-white rounded"
            onClick={() => onClaim(item._id)}
          >
            Claim
          </button>
        )}
      </div>
    );
  }
  