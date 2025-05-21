import mongoose from 'mongoose';

async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/hospital");
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

export default connectDB;