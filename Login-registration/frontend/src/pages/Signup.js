import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [firstname,setFirstName]=useState("");
    const [lastname,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [address,setAddress]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    const HandleSubmit = async(e) => {
        e.preventDefault();
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ firstname, lastname, email, address, password }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
        result=await result.json();
        if (result) {
            localStorage.setItem("user",JSON.stringify(result.user))
            localStorage.setItem("token",JSON.stringify(result.token))
            console.log("signup successful");
            navigate("/");
        }else {
            console.log("signup failed");
        }

    }
    return (
        <div>
            <form onSubmit={HandleSubmit}>
                <input type="text" placeholder='Enter first name' value={firstname} onChange={(e)=>setFirstName(e.target.value)}/>
                <input type="text" placeholder='Enter last name' value={lastname} onChange={(e)=>setLastName(e.target.value)}/>
                <input type="email" placeholder='Enter email address' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="text" placeholder='Enter your address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
                <input type="password" placeholder='please Enter password' value={password}  onChange={(e)=>setPassword(e.target.value)}/>
                <button type='submit'>Signup</button>
            </form>
        </div>
    )
}

export default Signup
