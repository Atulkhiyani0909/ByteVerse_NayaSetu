import Admin from '../models/admin.model.js'
import Worker from '../models/worker.model.js' 
import jwt, { decode } from "jsonwebtoken"
import mongoose from 'mongoose';

const allWorker = async (req, res) => {
   const id=req.query._id;
    try {
      const admin = await Admin.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id)
          }
        },
        {
          $lookup: {
            from: 'workers',
            localField: 'department',
            foreignField: 'department',
            as: 'workerInfo'
          }
        },
        {
          $unwind: {
            path: '$workerInfo',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            name: 1,
            email: 1,
            department: 1,
            location: 1,
            workerInfo: 1,
            timestamps:1
          }
        }
      ]);

     res.status(200).json({
        admin
     });
    } catch (error) {
      console.log("Error in Data", error);
    }
};
  


  
export {allWorker}