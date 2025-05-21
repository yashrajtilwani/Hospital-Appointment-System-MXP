import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

function Appointment() {

    const [users, setUsers] = useState([]);
    const [patient, setPatient] = useState("");
    const [doctor, setDoctor] = useState("");
    const [date, setDate] = useState("");
    const [remarks, setRemarks] = useState("");

    const URL = "http://localhost:8080";

    async function getUsers() {
        try{
            const response = await axios.get(`${URL}/api/user`, {withCredentials: true});
            if(response.data.success){
                setUsers(response.data.users);
            } else {
                toast.error("Some Internal Issue Occured");
            }
        } catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        try{
            const response = await axios.post(`${URL}/api/appointment/create`, {
                doctor,
                patient,
                date,
                remarks
            }, {withCredentials: true});
            if(response.data.success){
                toast.success("Appointment Booked Successfully");
                setPatient("");
                setDoctor("");
                setRemarks("");
            } else {
                toast.error("Some Internal Issue Occured");
            }
        } catch(err){
            console.log(err);
        }
    }


  return (
    <div className='flex flex-col items-center justify-center h-[80vh]'>
        <div className='flex flex-col gap-5 md:w-[50vw] w-full'>
        <h1 className='text-3xl bold'>Book Appointment</h1>
        <div className='flex flex-col gap-5'>
            <select
                className='border-2 border-gray-300 rounded-md p-2'
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
            >
                <option default>Select Patient</option>

                {
                    users.map((user) => (
                        user.type === "Patient" ? <option key={user._id} value={user.username}>{user.username}</option> : null
                    ))
                }
            </select>

            <select
                className='border-2 border-gray-300 rounded-md p-2'
                onChange={(e) => setDoctor(e.target.value)}
                value={doctor}
            >
                <option default>Select Doctor</option>

                {
                    users.map((user) => (
                        user.type === "Doctor" ? <option key={user._id} value={user.username}>{user.username}</option> : null
                    ))
                }
            </select>

            <input onChange={(e) => setDate(e.target.value)} type="date" placeholder="Date" className='border-2 border-gray-300 rounded-md p-2'/>
            <input value={remarks} onChange={(e) => setRemarks(e.target.value)} type="text" placeholder="Remarks" className='border-2 border-gray-300 rounded-md p-2'/>
        </div>
        <button className='bg-blue-400 text-white p-2 px-10 cursor-pointer' onClick={handleSubmit}>Submit</button>
    </div>
    </div>
    
  )
}

export default Appointment