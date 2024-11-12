import React, { useState } from 'react';

const RatingForm = ({ onRatingSubmitted }) => {
  const [ratingValue, setRatingValue] = useState(0); // State to store rating value
  const [ratingError, setRatingError] = useState(''); // State to store error message

  const handleRatingChange = (event) => {
    setRatingValue(Number(event.target.value)); // Set rating value when star is clicked
  };

  const handleSubmit = () => {
    if (ratingValue < 1 || ratingValue > 5) {
      setRatingError('Please provide a rating between 1 and 5');
      return;
    }

    // Call the onRatingSubmitted function passed from parent component
    onRatingSubmitted(ratingValue);
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-bold">Rate this Ad</h3>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <label key={star}>
            <input
              type="radio"
              value={star}
              checked={ratingValue === star}
              onChange={handleRatingChange}
              className="hidden"
            />
            <span
              className={`text-2xl cursor-pointer ${ratingValue >= star ? 'text-yellow-500' : 'text-gray-300'}`}
            >
              ★
            </span>
          </label>
        ))}
      </div>
      {ratingError && <p className="text-red-500 text-sm">{ratingError}</p>}
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 text-white bg-blue-500 rounded-lg"
      >
        Submit Rating
      </button>
    </div>
  );
};

export default RatingForm;
