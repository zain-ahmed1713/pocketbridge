import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "You must provide a username"],
        unique: true
    },
    
    email: {
        type: String,
        required: [true, "You must provide an email"],
        unique: true
    },
    password: {
        type: String, 
        required: [true, "You must provide a password"]
    }, 
    serviceStatus: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verficationCode: String,
    verificationTokenExpiry: Date,
    pocketToken: String,
    notionToken: String,
});

const userModel = mongoose.models.users || mongoose.model("users", userSchema);

export default userModel;