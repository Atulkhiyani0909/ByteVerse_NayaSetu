import Lawyer from '../models/lawyer.model.js'


const AccessAndRefreshToken =async (lawyerID)=>{
    try {
      const lawyer = await Lawyer.findById(lawyerID);
       const refreshToken = await lawyer.generateRefreshToken();
       const AccessToken=await lawyer.generateAccessToken();
       admin.refreshToken=refreshToken;
       await lawyer.save({validateBeforeSave:false})
  
       return {AccessToken,refreshToken};
    } catch (error) {
      return error
    }
  }
  
  
const registerLawyer=async(req,res)=>{
    let {Name,email,phoneNumber,password,city,state}=req.body;


    if(!req.body) return "No Data found"

    if(!req.file) return 'No Image Found'

    console.log('This is file ',req.file);
    
    console.log(req.body);
    

    // const newLawyer=await Lawyer.create({
    //     Name:Name,
    //     email:email,
    //     location:{
    //         city:city,
    //         state:state
    //     },
    //     password:password,
    //     phoneNumber:phoneNumber
    // })

    // const lawyer=await Lawyer.findById(newLawyer._id).select('-password');

    // if(!lawyer) return "Error Occured"

    // let {AccessToken,refreshToken}=await AccessAndRefreshToken(lawyer._id);

    // return res.status(200).cookie('refreshToken',refreshToken).cookie('accessToken',AccessToken).json({
    //     lawyer
    // })
}

export {registerLawyer}