import Lawyer from '../models/lawyer.model.js'
import  {uploadToCloudinary} from '../utils/cloudinary.js'
import Call from '../models/calls.model.js'
import mongoose from 'mongoose';

const AccessAndRefreshToken =async (lawyerID)=>{
    try {
      const lawyer = await Lawyer.findById(lawyerID);
       const refreshToken = await lawyer.generateRefreshToken();
       const AccessToken=await lawyer.generateAccessToken();
       admin.refreshToken=refreshToken;
       await lawyer.save({validateBeforeSave:false})
  
       return {AccessToken,refreshToken};
    } catch (error) {
      return error
    }
}
  
  
const registerLawyer=async(req,res)=>{
    try {
      let {Name,email,phoneNumber,password,city,state}=req.body;
      const image=await uploadToCloudinary(req.files.image[0].path);
  
      if(!image) return "Error in uploading Image to Cloud"
  
      const gov_id=await uploadToCloudinary(req.files.gov_id[0].path);
  
      if(!gov_id) return "Error in uploading ID to Cloud"
  
      const newLawyer=await Lawyer.create({
          Name:Name,
          email:email,
          location:{
              city:city,
              state:state
          },
          password:password,
          image:image.secure_url,
          ID_proof:gov_id.secure_url,
          phoneNumber:phoneNumber
      })
  
      if(!newLawyer) return 'Error in Saving Data'
  
      const lawyer=await Lawyer.findById(newLawyer._id).select('-password');
  
      if(!lawyer) return "Error Occured"
  
      let {AccessToken,refreshToken}=await AccessAndRefreshToken(lawyer._id);
  
      return res.status(200).cookie('refreshToken',refreshToken).cookie('accessToken',AccessToken).json({
          lawyer
      })
    } catch (error) {
      return res.status(401).json({
        error
      })
    }
}

const loginLawyer=async(req,res)=>{
  try {
    let {email,password}=req.body;
  
    const lawyer=await Lawyer.findOne({
      email:email
    })
   
    if (!lawyer) {
      return 'No Data Found'
    }
  
    
    const check=await lawyer.comparePassword(password);
    
    if(!check){
      return "Invalid Login Credentials"
    }
  
    const lawyers=await Lawyer.findOne({
      email:email
    }).select('-password -refreshToken')
  
  
    let {AccessToken,refreshToken}=await AccessAndRefreshToken(lawyer._id);
    
    return res.status(200).cookie('refreshToken',refreshToken).cookie('accessToken',AccessToken).json({
        lawyers
    })
  } catch (error) {
      return res.status(401).json({
        error
      })
  }
}

const updateFees=async(req,res)=>{
try {
    const {id}=req.params
    let {cost}=req.body;
  
    
    
    const lawyer=await Lawyer.findById(id).select('-password -refreshToken');
  
    if(!lawyer) return 'No lawyer Found'
  
    lawyer.call_fees=cost;
    await lawyer.save({validateBeforeSave:false})
  
    return res.status(200).json({
      lawyer
    })
} catch (error) {
  return res.status(405).json({
    error
  })
}
}


const updateCall = async (req, res) => {
  
    try {
      const { Call_id } = req.params;
  
      if (!req.body) {
        return res.status(400).json({ error: "Request body is missing" });
      }
      
  
      let { callTime } = req.body;
      
      
  
      if (!callTime) {
        return res.status(400).json({ error: "callTime is required" });
      }
  
      let proofUrl;
      
      if (req.file) {
        const proof = await uploadToCloudinary(req.file?.path);
        if (!proof) {
          return res.status(500).json({ error: "Cloud Error" });
        }
        proofUrl = proof.secure_url;
      }
  
      const call = await Call.findById(Call_id);
      if (!call) {
        return res.status(404).json({ error: "No call history found" });
      }
  
      const lawyer = await Lawyer.findById("67fb46cd1a426b324611acc4");
      if (!lawyer) {
        return res.status(404).json({ error: "Lawyer not found" });
      }
  
      const costPerMin = lawyer.call_fees;
      const callCost = costPerMin * callTime;
  
      call.callCost = callCost;
      call.callTime = callTime;
      call.callProof = proofUrl;
  
      const updatedCall = await call.save();
  
      return res.status(200).json({ updatedCall });
    } catch (error) {
      return res.status(401).json({
        error
      })
    }
};


const getCallHistory=async(req,res)=>{ //get the calls details -> update to get the nested lookup to get the userinfo through calls userID
 try {
   const {id}=req.params;
   
   const callsHistory=await Lawyer.aggregate([
     {
       $match:{
         _id:new mongoose.Types.ObjectId(id)
       }
     },
     {
       $lookup:{
         from:'calls',
         localField:'_id',
         foreignField:'LawyerID',
         as:'allCalls'
       }
     },
     {
       $addFields:{
         totalCalls:{
           $size: '$allCalls'
         }
       }
     },
     {
       $unwind:{
         path:'$allCalls'
       }
     },
     {
       $project:{
         allCalls:1,
         totalCalls:1
       }
     }
   ])
 
   return res.status(200).json({
     callsHistory
   })
 } catch (error) {
    return res.status(405).json({
      error
    })
 }
  
}

export {registerLawyer,updateFees,loginLawyer,getCallHistory ,updateCall}