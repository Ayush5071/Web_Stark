import jwt from "jsonwebtoken";

export const setToken = (res, { userId }) => {
    
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
        expiresIn: '3h'
    });

    console.log("secret hai --",token);


    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 1000,
        sameSite: 'None',
    });

};
