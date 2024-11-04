import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

axios.defaults.withCredentials = true;

export const loginUser = async (credentials) => {
    const response = await axios.post('http://localhost:4000/api/auth/login', credentials, { withCredentials: true });
    return response.data;
};

export const registerUser = async (userDetails) => {
    const response = await axios.post('http://localhost:4000/api/auth/register', userDetails, { withCredentials: true });
    return response.data;
};

export const verifyOTP = async ({otp,userId}) => {
    // const authData = fetchAuthFromCookie(); 
    // const userId = authData ? authData.userId : null; 
    // console.log("user data ->", authData); 

    if (!userId) {
        throw new Error('User ID not found in the token.'); 
    }

    const response = await axios.post(`http://localhost:4000/api/auth/verify-otp/${userId}`, { otp }, { withCredentials: true });
    console.log("jo dekhna tha",response.data)
    return response.data;
};

export const fetchAuthFromCookie = () => {
    const token = Cookies.get('token');
    console.log("Fetched token from cookie:", token); // For debugging
    return token ? jwtDecode(token) : null;
};