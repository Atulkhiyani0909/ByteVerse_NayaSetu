import mongoose from "mongoose";

const connectDB=async ()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_CONNECTION_URL}`)
        console.log(connectionInstance.connection.host);
        
    }catch(error){
       console.log("Mongoose Error" ,error);
       throw error
    }
}

export default connectDB