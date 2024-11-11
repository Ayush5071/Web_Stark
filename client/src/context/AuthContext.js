"use client";

import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(null); 
    const [isVerified, setIsVerified] = useState(false); 

    const initializeAuth = async () => {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth) {
            const parsedAuth = JSON.parse(storedAuth);
            setAuth(parsedAuth);
            setIsVerified(parsedAuth?.isVerified || false);
        } else {
            try {
                const profileData = await getProfile();
                setAuth(profileData);
                setIsVerified(profileData.isVerified);
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        }
    };

    useEffect(() => {
        initializeAuth();
    }, []);

    const getTokenFromCookies = () => {
        if (typeof document !== "undefined") {
            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1];
            return token || null;
        }
        return null;
    };

    const registerUser = async (userDetails) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(userDetails),
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
        }

        const data = await response.json();
        return data;
    };

    const loginUser = async (credentials) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(credentials),
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        setAuthDetails(data);
        return data;
    };

    const verifyOTP = async ({ otp, userId }) => {
        if (!userId) {
            throw new Error('User ID not found.');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ otp }),
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'OTP verification failed');
        }

        const data = await response.json();
        setAuthDetails(data);
        return data;
    };

    const logoutUser = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
            method: 'GET',
            credentials: 'include', 
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        setAuth(null);
        setIsVerified(false);
        localStorage.removeItem("auth");
    };

    const getProfile = async () => {
        const token = getTokenFromCookies();

        if (!token) {
            throw new Error("No token found");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setAuthDetails(data); 
        return data;
    };

    const setAuthDetails = (userData) => {
        setAuth(userData);
        setIsVerified(userData.isVerified);
        localStorage.setItem("auth", JSON.stringify(userData));
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth: setAuthDetails,
                isVerified,
                setIsVerified,
                loginUser,
                registerUser,
                verifyOTP,
                logoutUser,
                getProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
