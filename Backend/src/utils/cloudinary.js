import dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'

import { v2 as cloudinary } from 'cloudinary';

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET 
    });
    
  const uploadToCloudinary = async(localFilePath)=>{
        try {
            if(!localFilePath) return null;
            
            
            const file_Details=await cloudinary.uploader.upload(localFilePath,{
                resource_type:"auto",
                folder:'NyayaSetu' 
            });

            await fs.unlinkSync(localFilePath);  

            if(!file_Details) return null;
            return file_Details;
            
        } catch (error) {
            console.log("Error uploading to cloudinary: ", error);
            await fs.unlinkSync(localFilePath); 
            return null;
        }
  }


  export {uploadToCloudinary}