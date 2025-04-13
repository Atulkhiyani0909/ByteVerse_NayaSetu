import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "./config";

export const userMiddleware = (req, res, next) => {
    const header = req.headers['authorization'];
    const decoded = jwt.verify(header, ACCESS_TOKEN_SECRET);
    if(decoded){
        req.userId = decoded.userId;
        next();
    } else{
        res.status(403).json({
            message : "you are not logged in"
        })
    }
}