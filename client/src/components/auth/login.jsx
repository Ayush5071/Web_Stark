// components/Login.js
import Image from 'next/image';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import backgroundImg from '../../assets/auth/back.png';
import googleIcon from '../../assets/auth/google_icon.png';

function Login() {
    const { handleLogin } = useAuthContext();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const onSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(credentials);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center relative">
            <Image src={backgroundImg} alt="Background Image" layout="fill" objectFit="cover" className="absolute top-0 left-0 z-0" placeholder="blur" />
            <div className="relative z-10 p-10 bg-white/50 backdrop-blur-md rounded-xl shadow-lg w-96 max-w-lg">
                <h2 className="text-2xl font-semibold text-black text-center mb-4">Login</h2>
                <form onSubmit={onSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        className="w-full p-3 rounded-lg mb-4 bg-white/30 placeholder-black text-black"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        className="w-full p-3 rounded-lg mb-6 bg-white/30 placeholder-black text-black"
                    />
                    <button type="submit" className="w-full p-3 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700 transition">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
