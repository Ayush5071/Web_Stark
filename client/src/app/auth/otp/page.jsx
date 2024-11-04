"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { verifyOTP } from "@/lib/authApi/api"; 

function Otp() {
  const router = useRouter();
  const { auth, setVerified, setAuth } = useAuthContext(); // Destructure auth from context
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  // Check if the user ID is available in the auth context
  const userId = auth?._id; 
  console.log(userId, "This is the auth context data");

  useEffect(() => {
    setLoading(false); // Set loading to false after mounting
  }, []);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    console.log(auth, "This is the auth data at OTP submission");

    if (!userId) {
      console.error("User ID not found in the auth context.");
      return; 
    }

    try {
      const response = await verifyOTP({ otp, userId });

      if (response) {
        setVerified(true);
        setAuth(response);
        router.push("/"); // Redirect to homepage after verification
      } else {
        console.log("OTP verification error:", response);
      }
    } catch (err) {
      console.error("Error during OTP verification:", err);
    }
  };

  // Render loading state or OTP form based on the loading state
  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loader component if needed
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg- bg-center"
    style={{
      backgroundImage: `url('/auth/back.png')`, 
   }}>
      <div className="p-10 bg-white/50 backdrop-blur-md rounded-xl shadow-lg w-80">
        <h2 className="text-2xl font-semibold text-center mb-4">Enter OTP</h2>
        <form onSubmit={handleOtpSubmit}>
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 rounded-lg mb-6 bg-white/30 placeholder-black text-black"
            required
          />
          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-pink-600 text-white font-semibold"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default Otp;
