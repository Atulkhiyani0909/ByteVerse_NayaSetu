import mongoose, { Schema, model } from 'mongoose';

mongoose.connect("mongodb+srv://aiinnoeng:zMj4WiAFKcIoSTZ4@learningmongodb.emg7z.mongodb.net/stories-app")
    .then(() => {
        console.log("Connected to MongoDB");
    }) .catch((error) => {
        console.error(`Error while connecting to database ${error}`);
    });

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