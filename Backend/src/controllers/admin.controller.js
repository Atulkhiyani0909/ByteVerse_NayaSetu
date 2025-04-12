import Admin from '../models/admin.model.js'
import Worker from '../models/worker.model.js' 
import jwt, { decode } from "jsonwebtoken"
import mongoose from 'mongoose';


const allWorker=async (req,res)=>{
    
     try {
        const admin=Admin.aggregate([
            {
                $match:{
                    _id:new mongoose.Types.ObjectId(id)
                }
            },
            {
              $lookup:{
                from:'worker',
                let:{dep:'$department' , city:'$location.city'},
                pipeline:[
                    {
                        $match:{
                            $expr:{
                                $and:[
                                    {$eq:['$department','$$dep']},
                                    {$eq:['$location.city','$$city']}
                                ]
                            }
                        }
                    }
                ],
                as:'WorkerInfo'
              }
            },
            {
                $addFields: {
                    allWorkers:{
                      $size: "$WorkerInfo"
                    }
                }
             },
            {
                $project: {
                  name: 1,
                  email: 1,
                  department: 1,
                  city: 1,
                  workerInfo: 1
                }
              }            
        ])

        console.log(admin);
     } catch (error) {
        console.log("Error in Data ",error);
        
     }
}

export {allWorker}