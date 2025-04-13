import User from '../models/user.model.js'
import  {uploadToCloudinary} from '../utils/cloudinary.js'
import Call from '../models/calls.model.js'
import mongoose from 'mongoose';
import Lawyer from '../models/lawyer.model.js'

const AccessAndRefreshToken =async (lawyerID)=>{
    try {
      const user = await User.findById(lawyerID);
       const refreshToken = await user.generateRefreshToken();
       const AccessToken=await user.generateAccessToken();
       user.refreshToken=refreshToken;
       await user.save({validateBeforeSave:false})
  
       return {AccessToken,refreshToken};
    } catch (error) {
      return error
    }
}
  
  
const registerUser=async(req,res)=>{
    try {
      let {Name,email,password,city,state}=req.body;
  
      const newUser=await User.create({
          Name:Name,
          email:email,
          location:{
              city:city,
              state:state
          },
          password:password
      })
  
      if(!newUser) return 'Error in Saving Data'
  
      const user=await User.findById(newUser._id).select('-password');
  
      if(!user) return "Error Occured"
  
      let {AccessToken,refreshToken}=await AccessAndRefreshToken(user._id);
  
      return res.status(200).cookie('refreshToken',refreshToken).cookie('accessToken',AccessToken).json({
          user
      })
    } catch (error) {
      return res.status(401).json({
        error
      })
    }
}

const loginUser=async(req,res)=>{
  try {
    let {email,password}=req.body;
  
    const user=await User.findOne({
      email:email
    })
   
    if (!user) {
      return 'No Data Found'
    }
  
    
    const check=await user.comparePassword(password);
    
    if(!check){
      return res.status(400).json({
        msg:"Invalid Credentials"
      })
    }
  
    const users=await User.findOne({
      email:email
    }).select('-password -refreshToken')
  
  
    let {AccessToken,refreshToken}=await AccessAndRefreshToken(lawyer._id);
    
    return res.status(200).cookie('refreshToken',refreshToken).cookie('accessToken',AccessToken).json({
          users
    })
  } catch (error) {
      return res.status(401).json({
        error
      })
  }
}

const updateProfileImages = async (req, res) => {
  try {
    const userId = req.user._id; //  from auth middleware (JWT/session)
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Cloudinary uploads
    if (req.files?.profilePhoto?.[0]) {
      const uploadedProfile = await uploadToCloudinary(req.files.profilePhoto[0].path);
      if (!uploadedProfile) return res.status(500).json({ error: "Profile photo upload failed" });
      user.profilePhoto = uploadedProfile.secure_url;
    }

    if (req.files?.idProof?.[0]) {
      const uploadedProof = await uploadToCloudinary(req.files.idProof[0].path);
      if (!uploadedProof) return res.status(500).json({ error: "ID Proof upload failed" });
      user.idProof = uploadedProof.secure_url;
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      message: "Profile photo and ID proof updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


const makeCall = async (req, res) => {
    try {
      const { lawyerId } = req.body;
      const userId = req.user._id; //  user is authenticated and ID is in req.user
  
      if (!lawyerId) {
        return res.status(400).json({ error: "Lawyer ID is required" });
      }
  
      const lawyer = await Lawyer.findById(lawyerId);
      if (!lawyer) {
        return res.status(404).json({ error: "Lawyer not found" });
      }
  
      // Initial call data (no time yet, cost will be calculated when call ends)
      const newCall = new Call({
        userID:userId,
        LawyerID:lawyerId
      });
  
      const savedCall = await newCall.save();
  
      return res.status(201).json({
        message: "Call initiated successfully",
        call: savedCall
      });
  
    } catch (error) {
      console.error("Error in makeCall:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  




const getCallHistory=async(req,res)=>{ //get the calls details -> update to get the nested lookup to get the userinfo through calls userID
 try {
   const {id}=req.params;
   
   const callsHistory=await User.aggregate([
     {
       $match:{
         _id:new mongoose.Types.ObjectId(id)
       }
     },
     {
       $lookup:{
         from:'calls',
         localField:'_id',
         foreignField:'userID',
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

export {registerUser,loginUser,getCallHistory,makeCall,updateProfileImages}