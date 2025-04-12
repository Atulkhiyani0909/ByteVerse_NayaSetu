import mongoose, { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    username : {type : String,
        required : true, 
        unique : true, 
        minlength: 3, 
        maxlength: 10
    },
    password : {type : String, 
        required : true,
        minlength: 8
    },
});

export const UserModel = mongoose.model("User", UserSchema);