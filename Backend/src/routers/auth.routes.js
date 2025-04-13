import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { UserModel } from "../models/auth.model.js";
import dotenv from 'dotenv';

dotenv.config()
const router = Router();
const JWTseceret = process.env.ACCESS_TOKEN_SECRET;

router.post("/signup", async (req, res) => {
    const {FullName, Email, PhoneNumber, Password} = req.body;
    
    try {

        const existingUser = await UserModel.findOne({Email});
        if (existingUser){
            res.status(409).json({
                message : "Account already exists"
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(Password,10);

        await UserModel.create({
            FullName : FullName,
            Email : Email,
            PhoneNumber : PhoneNumber,
            Password : hashedPassword
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
    const { Email, Password } = req.body;
    try {
        const oldUser = await UserModel.findOne({ Email });
        if(!oldUser){
            res.status(409).json({
                message : "Invalid Username or Password"
            });
            return;
        };

        const matchUser = await bcrypt.compare(Password, oldUser.Password);
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