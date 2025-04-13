import Worker from "../models/worker.model.js";
import jwt, { decode } from "jsonwebtoken"
import Tickets from '../models/tickets.model.js'
import mongoose from "mongoose";



const AccessAndRefreshToken =async (workerID)=>{
    try {
      const worker = await Worker.findById(workerID);
       const refreshToken = await Worker.generateRefreshToken();
       const AccessToken=await Worker.generateAccessToken();
       worker.refreshToken=refreshToken;
       await Worker.save({validateBeforeSave:false})
  
       return {AccessToken,refreshToken};
    } catch (error) {
      return error
    }
  }
  
  const registerWorker=async(req,res)=>{
   try {
     const {email,name,city,state,gov_id,department,password}=req.body;
      
     
     if(!req.body) return 'Error in getting Data'
   
     const newWorker=await Worker.create({
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
   
     if(!newWorker) return "Error in Saving Data To DB";
   
     const worker=await Worker.findById(newWorker._id).select('-password')
     
     let {AccessToken,refreshToken}=await AccessAndRefreshToken(worker._id);
    
     
   
     return res.status(201).cookie('refreshToken',refreshToken).cookie('accessToken',AccessToken).json({
       worker
     })
   } catch (error) {
    return res.status(400).json({
      error
    })
   }
  }
  
  const loginWorker=async(req,res)=>{
    try {
      let {email,password}=req.body;
      
    
      const worker=await Worker.findOne({
        email:email
      })
     
      
      const check=await worker.comparePassword(password);
      
      if(!check){
        return "Invalid Login Credentials"
      }
    
      const workers=await Worker.findOne({
        email:email
      }).select('-password -refreshToken')
    
    
      let {AccessToken,refreshToken}=await AccessAndRefreshToken(admin._id);
      
      return res.status(200).cookie('refreshToken',refreshToken).cookie('accessToken',AccessToken).json({
          workers
      })
    } catch (error) {
      return res.status(400).json({
        error
      })
    }
  }


const getTickets=async(req,res)=>{
    const id=req.userId;

    try {
        const worker=await Worker.findById(id).select('-password -refreshToken');
    
        if(!worker) return "No Worker Found"
     
        let city=worker.location.city;
    
        const tickets=await Tickets.find({
            department:worker.department,
            'location.city':city
        })
    
        return res.status(200).json({
            tickets
        })
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
}


const toggleTicket=async(req,res)=>{
    try {
      const {id,Status}=req.params;
      
      const ticket=await Tickets.findById(id);
      
      ticket.Status=Status;
      await ticket.save({validateBeforeSave:false});
  
       return res.status(200).json({
          ticket
       })
    } catch (error) {
      return res.status(400).json({
        error
      })
    }
}


export {getTickets ,loginWorker , registerWorker ,toggleTicket}