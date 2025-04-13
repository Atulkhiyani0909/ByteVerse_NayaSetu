import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const { Schema } = mongoose;

const userSchema=new Schema({
    Name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    image:{
        type:String
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:true
    },
    ID_proof:{
        type:String,
    },
    monthly_limits:{
        type:Number,
        default:30
    },
    anonymously_monthly_limits:{
        type:Number,
        default:15
    },
    refreshToken:{
        type:String
    },
    location:{
        city:{
            type:String
        },
        state:{
            type:String
        }
    }
},{
    timestamps:true
})


userSchema.pre("save",async function(next){
  if(!this.isModified("password")) return next();//return true first time new user 

  this.password=await bcrypt.hash(this.password,10);
  next();
})

userSchema.methods.comparePassword=async function(InputPassword){
    return await bcrypt.compare(InputPassword,this.password);
}

userSchema.methods.generateRefreshToken=async function(){
    return jwt.sign({
        _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:REFRESH_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateAccessToken=async function(){
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

const User=mongoose.model("User",userSchema);
export default User