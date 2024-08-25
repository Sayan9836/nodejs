import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const HandleSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(`http://localhost:5000/login`, {
            method: "post",
            body: JSON.stringify({ email, password }),
        })
        result = await result.json();
        if (result) {
            localStorage.setItem( "user", JSON.stringify(result.user) )
            localStorage.setItem( "token", JSON.stringify(result.token) )
            console.log("login succesfull");
            navigate("/");
        }

    }
    return (
        <div>
            <form onSubmit={HandleSubmit}>

                <input type="email" placeholder='Enter email address' onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='please Enter password' onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login
