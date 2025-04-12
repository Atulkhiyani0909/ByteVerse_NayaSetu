import Worker from "../models/worker.model.js";
import jwt, { decode } from "jsonwebtoken"
import Tickets from '../models/tickets.model.js'
import mongoose from "mongoose";

const getTickets=async(req,res)=>{
   let {location , department , id}=req.query

    const tickets=await Worker.aggregate([
           {
               $match:{
                   _id:new mongoose.Types.ObjectId(id)
               }
           },
           {
               $lookup:{
                   from:'tickets',
                   localField:'department',
                   foreignField:'department',
                   as:'allTickets'
               }
           },
           {
            $addFields:{
                totalTickets:{
                   $size: '$allTickets'
                }
            }
           },
           {
            $unwind:{
                path:'$allTickets'
            }
           },
     
    ])

    console.log(tickets);
    
}

export {getTickets}