import mongoose from 'mongoose';
import User from './user.js';

const appointmentSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    remarks: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;