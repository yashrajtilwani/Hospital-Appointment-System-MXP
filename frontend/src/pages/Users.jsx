import React, { useEffect, useState } from 'react';
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';

function  Users() {
    const [users, setUsers] = useState([]);

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

    console.log(users);

  return (
    <div>
        
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 sm:gap-5 w-full sm:w-2/5">
                <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl mb-4">
                    <p className="prata-regular">Users</p>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    {users.map((user) => (
                        <div key={user._id} className="border p-2 flex items-center justify-around rounded shadow-md">
                            <span className="text-sm text-gray-700"><strong>User: </strong> {user.username}</span>
                            <span className="text-sm text-gray-700"><strong>Prof: </strong> {user.type}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Users