import mongoose from 'mongoose';

// Define the user schema for the Admins collection
export const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    encryptedPassword: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

export const User = mongoose.model('User', userSchema);

