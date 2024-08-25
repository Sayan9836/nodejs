import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./Login.css";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    try {
      let user = await axios.post(`http://localhost:8000/api/v1/users/login`, {
        email: formData.get("email"),
        password: formData.get("password"),
        username: formData.get("username"),
      });

      console.log(user.data.data);

      if (user) {
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user.data.data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("LoggedIn Unsuccessfull");
    }
    setIsLoading(false);
  };

  return (
    <div className="login_wrapper">
      {isLoading && <h3>...loading</h3>}
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="enter your username" />
        <input type="email" name="email" placeholder="enter your email" />
        <input
          type="password"
          name="password"
          placeholder="enter your password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
