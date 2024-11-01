"use client";
import { useRef } from "react";

function OTP() {
  // Create refs for each input
  const inputRefs = Array.from({ length: 6 }, () => useRef(null));

  // Function to handle input change and move to the next box
  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus(); // Move to the next input
    }
  };

  // Function to handle backspace and move to the previous box
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !e.target.value) {
      inputRefs[index - 1].current.focus(); // Move to the previous input
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/back.png')", // Background image in public folder
      }}
    >
      {/* OTP Box */}
      <div className="relative z-10 p-10 bg-white/50 backdrop-blur-md rounded-xl shadow-lg border border-white/30 w-80 md:w-96 lg:w-104 max-w-lg">
        <h2 className="text-2xl font-semibold text-black text-center mb-4">
          Enter OTP
        </h2>
        <p className="text-center text-black mb-6">
          Please enter the 6-digit code sent to your email.
        </p>
        <form>
          <div className="flex justify-center gap-2 mb-6">
            {/* OTP input fields */}
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength="1"
                className="w-10 h-12 text-center text-2xl rounded-lg bg-white/30 placeholder-black text-black focus:outline-none"
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default OTP;
