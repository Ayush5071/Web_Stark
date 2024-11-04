// context/AuthContext.js
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, verifyOTP, fetchAuthFromCookie } from '@/lib/authApi/api';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const userFromCookie = fetchAuthFromCookie(); 
        const authFromStorage = localStorage.getItem("auth");
        const verifiedFromStorage = localStorage.getItem("verified");

        if (userFromCookie) {
            setAuth(userFromCookie);
            setVerified(userFromCookie.isVerified || false);
        } else if (authFromStorage) {
            setAuth(JSON.parse(authFromStorage));
            setVerified(JSON.parse(verifiedFromStorage) || false);
        }
    }, []);

    useEffect(() => {
        if (auth) {
            localStorage.setItem("auth", JSON.stringify(auth));
        } else {
            localStorage.removeItem("auth");
        }

        localStorage.setItem("verified", JSON.stringify(verified));
    }, [auth, verified]);

    const handleLogin = async (credentials) => {
        const data = await loginUser(credentials);
        setAuth(data.user);
        return data;
    };

    const handleOTPVerification = async (otp) => {
        const data = await verifyOTP(otp);
        setVerified(data.isVerified);
        setAuth((prev) => ({ ...prev, isVerified: data.isVerified }));
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, verified, setVerified, handleLogin, handleOTPVerification }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
