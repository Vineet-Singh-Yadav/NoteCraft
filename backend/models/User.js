import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);
export default User;  // ✅ ES Module export


// module.exports = mongoose.model('user', UserSchema);//(name of collection  which we given the db, it will be prurel and in lowercase, schema which we have created)