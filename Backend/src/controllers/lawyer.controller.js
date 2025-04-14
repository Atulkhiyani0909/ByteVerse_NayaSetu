import Lawyer from '../models/lawyer.model.js'
import  {uploadToCloudinary} from '../utils/cloudinary.js'
import Call from '../models/calls.model.js'
import mongoose from 'mongoose';

const AccessAndRefreshToken =async (lawyerID)=>{
    try {
      const lawyer = await Lawyer.findById(lawyerID);
       const refreshToken = await lawyer.generateRefreshToken();
       const AccessToken=await lawyer.generateAccessToken();
       lawyer.refreshToken=refreshToken;
       console.log("Insert It");
       
       const data=await lawyer.save({validateBeforeSave:false})
       console.log(data);
       
  
       return {AccessToken,refreshToken};
    } catch (error) {
      return error
    }
}
  
  
const registerLawyer = async (req, res) => {
  try {
    const { Name, email, phoneNumber, password, city, state , speciality,experience} = req.body;

    if (!req.files || !req.files.image || !req.files.gov_id) {
      return res.status(400).json({ message: "Image and Gov ID are required" });
    }

    const imageUpload = await uploadToCloudinary(req.files.image[0].path);
    const govIdUpload = await uploadToCloudinary(req.files.gov_id[0].path);

    if (!imageUpload || !govIdUpload) {
      return res.status(500).json({ message: "Error uploading to Cloudinary" });
    }

    const newLawyer = await Lawyer.create({
      Name,
      email,
      location: { city, state },
      password,
      image: imageUpload.secure_url,
      ID_proof: govIdUpload.secure_url,
      phoneNumber,
      speciality,
      experience
    });

    const lawyer = await Lawyer.findById(newLawyer._id).select('-password');
    const { AccessToken, refreshToken } = await AccessAndRefreshToken(lawyer._id);

    return res.status(200)
      .cookie('refreshToken', refreshToken)
      .cookie('accessToken', AccessToken)
      .json({ lawyer , AccessToken  });

  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


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
    const id=req.userId
    console.log(req.userId);
    
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
      const id=req.userId;
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
  
      const lawyer = await Lawyer.findById(id);
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
   const id=req.userId;
   console.log(req.userId);
   
   
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

const lawyerProfile=async(req,res)=>{
  try {
    const {id}=req.params;

    const lawyer=await Lawyer.findById(id).select('-password -refreshToken');

    if(!lawyer){
      return res.status(400).json({message:'Laywer Not found'});
    }

    return res.status(200).json(lawyer)

  } catch (error) {
    return res.status(401).json({
      error , message:"Error in fetching Lawyer Profile"
    })
  }
}

const allLawyers=async(req,res)=>{
  try {
    const lawyers=await Lawyer.find({}).select('-password -refreshToken -ID_proof -totalConnects');
    
    return res.status(200).json(lawyers)
  } catch (error) {
    return res.status(400).json({
      error , message:"Error in fetching Lawyers"
    })
  }
}

export {registerLawyer,updateFees,loginLawyer,getCallHistory ,updateCall , lawyerProfile,allLawyers}