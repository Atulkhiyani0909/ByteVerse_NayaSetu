import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const {Schema} =mongoose;


const workerSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
       type:String,
       required:true
    },
    gov_id:{
        type:String,
        required:true
    },
    department:{
        type:String,
    },
    ticket_solved:{
        type:Number,
        default:0
    },
    ratings:{
        type:Number,
        default:0
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
    refreshToken:{
        type:String
    }
},{
    timestamps:true
})

workerSchema.plugin(mongooseAggregatePaginate);

workerSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();//return true first time new user 
    this.password=await bcrypt.hash(this.password,10);
    next();
})

workerSchema.methods.comparePassword=async function(InputPassword){
    return await bcrypt.compare(InputPassword,this.password);
}

workerSchema.methods.generateRefreshToken=async function(){
    return jwt.sign({
        _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:REFRESH_TOKEN_EXPIRY
    }
)
}

workerSchema.methods.generateAccessToken=async function(){
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

const Worker =mongoose.model("Worker",workerSchema)
export default Worker