import mongoose, { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    FullName : {type : String,
        minlength: 3, 
        maxlength: 10
    },
    Email : { type : String,
        required : true
    },
    PhoneNumber : {
        type : Number
    },
    Password : {type : String, 
        required : true,
        minlength: 8
    },
});

export const UserModel = mongoose.model("User", UserSchema);