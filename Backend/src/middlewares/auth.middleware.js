
// import { ACCESS_TOKEN_SECRET } from "./config";

import jwt from "jsonwebtoken";

export const userMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        const token = authHeader.split(' ')[1]; 

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decoded || !decoded._id) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.userId = decoded._id; 
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};
