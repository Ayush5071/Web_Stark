export const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Not authenticated, token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            userId: decoded.userId,
        };
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};
