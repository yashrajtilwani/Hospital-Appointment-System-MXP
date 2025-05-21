import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function CancelAppointment() {
    const [appointments, setAppointments] = useState([]);

    const URL = "http://localhost:8080";

    async function getAppointments() {
        try{
            const response = await axios.get(`${URL}/api/appointment/user`, {withCredentials: true});
            if(response.data.success){
                setAppointments(response.data.appointments);
            } else {
                toast.error("Some Internal Issue Occured");
            }
        } catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getAppointments();
    }, []);

    async function handleCancelation(appointmentId) {
        try{
            const response = await axios.post(`${URL}/api/appointment/cancel`, {
                appointmentId
            }, {withCredentials: true});
            if(response.data.success){
                toast.success("Appointment Cancelled Successfully");
                getAppointments();
            } else {
                toast.error("Some Internal Issue Occured");
            }
        } catch(err){
            console.log(err);
        }
    }

  return (
    <div>
        <div className="flex items-center justify-center h-[70vh]">
            <div className="flex flex-col items-center gap-4 sm:gap-5 w-full sm:w-4/5">
                <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl mb-4">
                    <p className="prata-regular">Appointments</p>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    {appointments.map((appointment) => (
                        <div key={appointment._id} className="border p-2 flex items-center justify-around rounded shadow-md">
                            <span className="text-sm text-gray-700"><strong>Patient: </strong> {appointment.patient.username}</span>
                            <span className="text-sm text-gray-700"><strong>Doctor: </strong> {appointment.doctor.username}</span>
                            <span className="text-sm text-gray-700"><strong>Date: </strong> {appointment.date}</span>
                            <span className="text-sm text-gray-700"><strong>Remarks: </strong> {appointment.remarks}</span>
                            <button className='bg-blue-400 text-white p-1 px-5 cursor-pointer rounded' onClick={() => handleCancelation(appointment._id)}>Cancel</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CancelAppointment