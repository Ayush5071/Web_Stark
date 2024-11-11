export const loginUser = async (credentials) => {
    const response = await fetch('http://localhost:4000/api/auth/login', {
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
    return data;
};

export const registerUser = async (userDetails) => {
    const response = await fetch('http://localhost:4000/api/auth/register', {
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

export const verifyOTP = async ({ otp, userId }) => {
    if (!userId) {
        throw new Error('User ID not found.');
    }

    const response = await fetch(`http://localhost:4000/api/auth/verify-otp/${userId}`, {
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
    return data;
};
