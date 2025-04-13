import Admin from '../models/admin.model.js'
import Worker from '../models/worker.model.js' 
import Ticket from '../models/tickets.model.js';
import jwt, { decode } from "jsonwebtoken"
import mongoose from 'mongoose';


const AccessAndRefreshToken =async (adminID)=>{
  try {
    const admin = await Admin.findById(adminID);
     const refreshToken = await admin.generateRefreshToken();
     const AccessToken=await admin.generateAccessToken();
     admin.refreshToken=refreshToken;
     await admin.save({validateBeforeSave:false})

     return {AccessToken,refreshToken};
  } catch (error) {
    return error
  }
}

const registerAdmin=async(req,res)=>{
  const {email,name,city,state,gov_id,department,password}=req.body;
   
  
  if(!req.body) return 'Error in getting Data'

  const newAdmin=await Admin.create({
    email:email,
    name:name,
    location:{
      city:city,
      state:state
    },
    gov_id:gov_id,
    department:department,
    password:password
  })

  if(!newAdmin) return "Error in Saving Data To DB";

  const admin=await Admin.findById(newAdmin._id).select('-password')
  
  
  let {AccessToken,refreshToken}=await AccessAndRefreshToken(admin._id);
 
  

  return res.status(201).cookie('refreshToken',refreshToken).cookie('accessToken',AccessToken).json({
    admin
  })
}

const loginAdmin=async(req,res)=>{
  let {email,password}=req.body;
  console.log(req.body);
  

  const admin=await Admin.findOne({
    email:email
  })
 
  
  const check=await admin.comparePassword(password);
  
  if(!check){
    return "Invalid Login Credentials"
  }

  const admins=await Admin.findOne({
    email:email
  }).select('-password -refreshToken')


  let {AccessToken,refreshToken}=await AccessAndRefreshToken(admin._id);
  
  return res.status(200).cookie('refreshToken',refreshToken).cookie('accessToken',AccessToken).json({
      admins
  })
}

const allWorker = async (req, res) => {
   const {id}=req.query;
    try {
      const admin =await Admin.findById(id);

      if(!admin) return "Admin Doesn't Exists"
       
      let city =admin.location.city;

      const workers = await Worker.find({
        department: admin.department,
        'location.city': city , // to check for the city and department 
      }).sort({ratings:-1}).select('-password -refreshToken');
      
      if(!workers) return "No Worker Found"

     return res.status(200).json({
        workers
     });
    } catch (error) {
      console.log("Error in Data", error);
    }
};

const pendingComplaints=async(req,res)=>{

  const {id}=req.query;

  const admin =await Admin.findById(id).select('-password -refreshToken');

  if(!admin) return "No Admin Found"
   
  let city=admin.location.city;  
    const tickets=await Ticket.find({
      status:'Pending',
      'location.city':city,
      department:admin.department
    })

    return res.status(200).json({
      tickets
    })
}




export {allWorker,registerAdmin,loginAdmin,pendingComplaints}