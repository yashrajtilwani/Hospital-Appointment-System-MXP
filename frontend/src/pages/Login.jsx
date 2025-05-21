import React, { useState } from 'react';
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';

function Login() {
    const [signup, setSignup] = useState(true);
    const [type, setType] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const URL = "http://localhost:8080";
  
    async function handleLogin(e) {
      e.preventDefault();
      try{
        const response = await axios.post(`${URL}/api/user/login`, { username, password }, {withCredentials: true});
        if(response.data.success){
          setUsername("");
          setPassword("");
          toast.success(response.data.message)
        }else {
          toast.error(response.data.message)
        }
      } catch(err){
        console.log(err);
      }
    }
  
    async function handleSignup(e) {
      e.preventDefault();
      try{
        const response = await axios.post(`${URL}/api/user/signup`, { type, password, username }, {withCredentials: true});
        console.log(type);
        if(response.data.success){
          setPassword("");
          setUsername("");
          toast.success(response.data.message)
        }else {
          toast.error("Fail to logout!")
        }
      } catch(err){
        console.log(err);
      }
    }
  
    return (
      <div className="flex items-center justify-center h-[70vh]">
        
        <div className="flex flex-col items-center gap-4 sm:gap-5 w-full sm:w-2/5">
          <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl mb-4">
            <p className="prata-regular">{signup ? "Login" : "Sign Up"}</p>
          </div>
  
          <div className="flex flex-col gap-3 w-full">
          <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="border p-2"
                type="text"
                placeholder="Username"
              />
            {!signup && (
                <select
                onChange={(e) => setType(e.target.value)}
                value={type}
                className="border p-2">
                    <option default>Patient/Doctor</option>
                    <option value="Patient">Patient</option>
                    <option value="Doctor">Doctor</option>
                </select>
              
            )}
  
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border p-2"
              type="password"
              placeholder="Password"
            />
  
            {signup ? (
              <div className="flex items-center justify-end">
                <p onClick={() => setSignup(false)} className="cursor-pointer">
                  Create Account
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-end">
                <p onClick={() => setSignup(true)} className="cursor-pointer">
                  Login instead?
                </p>
              </div>
            )}
          </div>
  
          {signup ? (
            <button onClick={handleLogin} className="bg-blue-400 text-white p-2 px-10 cursor-pointer">Log In</button>
          ) : (
            <button onClick={handleSignup} className="bg-blue-400 text-white p-2 px-10 cursor-pointer">Sign Up</button>
          )}
        </div>
      </div>
    );
}

export default Login