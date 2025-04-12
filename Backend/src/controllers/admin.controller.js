import Admin from '../models/admin.model.js'
import Worker from '../models/worker.model.js' 
import jwt, { decode } from "jsonwebtoken"
import mongoose from 'mongoose';

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

     res.status(200).json({
        workers
     });
    } catch (error) {
      console.log("Error in Data", error);
    }
};



export {allWorker}