import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const {Schema} = mongoose;

const adminSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    gov_id:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    location:{
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        }
    },
    refresh_token:{
        type:String
    }
},{
    timestamps:true
})


adminSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
})

adminSchema.methods.comparePassword=async function(InputPassword){
    return await bcrypt.compare(InputPassword,this.password);
}

adminSchema.methods.generateRefreshToken=async function(){
    return jwt.sign({
        _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:REFRESH_TOKEN_EXPIRY
    }
)
}

adminSchema.methods.generateAccessToken=async function(){
    return jwt.sign({
        _id:this._id,
        Name:this.Name,
        email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

const Admin=mongoose.model("Admin",adminSchema);
export default Admin