import jwt from "jsonwebtoken";

export const setToken = (res, { userId }) => {
    console.log("scrap col hai -- ", role);
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 1000
    });
};
