"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { registerUser, setAuth } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await registerUser({ username, email, password });
      setAuth(response);
      router.push(`/auth/otp`);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const handleLoginRedirect = () => {
    router.push("/auth/login");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/auth/back.png')` }}
    >
      <div className="relative z-10 p-10 bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/30 w-96 md:w-104 lg:w-112 max-w-lg">
        <h2 className="text-2xl font-semibold text-black text-center mb-4">
          Register
        </h2>
        {error && <p className="text-blue-700 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg mb-4 bg-white/30 placeholder-black text-black focus:outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg mb-4 bg-white/30 placeholder-black text-black focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg mb-6 bg-white/30 placeholder-black text-black focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-900 transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-black">
          Already have an account?{" "}
          <button
            onClick={handleLoginRedirect}
            className="text-blue-900 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
