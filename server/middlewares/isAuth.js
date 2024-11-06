import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer "," "); 
    console.log("token nin isAuth -->",token);

    if (!token) {
        return res.status(401).json({ error: 'Not authenticated, token missing' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            userId: decoded.userId,
        };

        const user = await User.findById(req.user.userId); 

        if (!user || !user.isVerified) {
            return res.status(401).json({ error: 'Email has not been verified' });
        }
        
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};
