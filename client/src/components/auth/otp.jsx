"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { verifyOTP } from "@/lib/authApi/api";

function Otp() {
  const router = useRouter();
  const { auth, setVerified, setAuth } = useAuthContext();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(true); 

  const userId = auth?._id; 
  console.log(userId, "This is the auth context data");

  useEffect(() => {
    setLoading(false); 
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
        router.push("/"); 
      } else {
        console.log("OTP verification error:", response);
      }
    } catch (err) {
      console.error("Error during OTP verification:", err);
    }
  };

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center relative">
      <div className="relative z-10 p-10 bg-white/50 backdrop-blur-md rounded-xl shadow-lg w-80 max-w-lg">
        <h2 className="text-2xl font-semibold text-black text-center mb-4">Enter OTP</h2>
        <form onSubmit={handleOtpSubmit}>
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 rounded-lg mb-6 bg-white/30 placeholder-black text-black text-center text-2xl"
            required
          />
          <button
            type="submit"
            className="w-full p-3 mt-6 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700 transition"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default Otp;
