import Appointment from "../model/appointment.js";
import User from "../model/user.js";

async function createAppointment(req, res){
    try{
        const {doctor, patient, date, remarks} = req.body;
        const doctorid = await User.findOne({username: doctor}); 
        const patientid = await User.findOne({username: patient}); 
        const appointment = await Appointment.create({
            doctor: doctorid._id,
            patient: patientid._id,
            date,
            remarks
        });
        return res.status(200).json({success: true, message: "Appointment Created Successfully", appointment});
    } catch(err){
        console.log(err);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

async function getAppointments(req, res) {
    try {
        const appointments = await Appointment.find({}).populate('doctor').populate('patient');
        return res.status(200).json({ success: true, appointments });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

async function getUserAppointments(req, res) {
    try {
        const { id } = req.user;
        const appointments = await Appointment.find({ patient: id }).populate('doctor').populate('patient');
        return res.status(200).json({ success: true, appointments });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

async function cancelAppointment(req, res) {
    try {
        const { appointmentId } = req.body;
        await Appointment.findByIdAndDelete(appointmentId);
        return res.status(200).json({ success: true, message: "Appointment Cancelled Successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export {createAppointment, getAppointments, getUserAppointments, cancelAppointment};