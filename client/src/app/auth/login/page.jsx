"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { loginUser } from '@/lib/authApi/api';

function Login() {
    const { setAuth, setIsVerified, auth } = useAuthContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        console.log("Login attempt with email:", email);

        try {
            const response = await loginUser({ email, password });
            console.log("Login response:", response);

            if (response) {
                setAuth(response); 
                setIsVerified(response.isVerified); 
                if (response.isVerified) {
                    router.push("/"); 
                } else {
                    router.push("/auth/otp"); 
                }
            } else {
                setError(response.message || "An unknown error occurred.");
                console.log("Login error:", response.message);
            }
        } catch (err) {
            setError("An error occurred while logging in.");
            console.error("Login error:", err);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
             style={{
                backgroundImage: `url('/auth/back.png')`,
             }}>
            <div className="relative z-10 p-10 bg-white/50 backdrop-blur-md rounded-xl shadow-lg w-96 max-w-lg">
                <h2 className="text-2xl font-semibold text-black text-center mb-4">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 rounded-lg mb-4 bg-white/30 placeholder-black text-black"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded-lg mb-6 bg-white/30 placeholder-black text-black"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full p-3 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700 transition"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-black">
                    Don't have an account?{" "}
                    <button
                        onClick={() => router.push('/auth/register')}
                        className="text-pink-600 hover:underline"
                    >
                        Create New Account
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;
