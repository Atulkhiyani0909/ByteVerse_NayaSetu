import mongoose from "mongoose";

const {Schema} =mongoose;

const callsSchema=new Schema({
    userID:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    LawyerID:{
        type:Schema.Types.ObjectId,
        ref:"Lawyer",
        required:true
    },
    callTime:{
         type:Number,
         default:0
    },
    callCost:{
        type:Number,
        default:0,
        min:0
    },
    callProof:{
        type:String
    }
},{
    timestamps:true
})

const Call=mongoose.model("Call",callsSchema);
export default Call