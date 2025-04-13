import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { UserModel } from "../models/auth.model.js";

const router = Router();
const JWTseceret = process.env.ACCESS_TOKEN_SECRET;


router.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {

        const existingUser = await UserModel.findOne({username});
        if (existingUser){
            res.status(409).json({
                message : "Username already exists"
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password,10);

        await UserModel.create({
            username : username,
            password : hashedPassword
        });

        res.json({
            message : "User Signed Up"
        });

    } catch(e){
        console.error(e);
        res.status(500).json({
            message : "Internal Server Error"
        });
        
    }
});

router.post("/signin", async (req ,res)=>{
    const { username, password } = req.body;
    try {
        const oldUser = await UserModel.findOne({ username });
        if(!oldUser){
            res.status(409).json({
                message : "Invalid Username or Password"
            });
            return;
        };

        const matchUser = await bcrypt.compare(password, oldUser.password);
        if (!matchUser){
            res.status(403).json({
                message : "Invalid Username or Password"
            });
            return;
        };

        const accesToken = jwt.sign({ userId : oldUser._id }, JWTseceret);
        res.status(200).json({ accesToken : accesToken });

    } catch(e) {
        console.error(e);
        res.status(500).json({ message : "Internal Server Error" });
    }
});

export default router;