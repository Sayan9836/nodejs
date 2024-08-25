import React, { useEffect, useState } from "react";
import "./Register.css";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      navigate("/");
    }
  }, []);

  const handleRegistration = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    try {
      let user = await axios.post(
        `http://localhost:8000/api/v1/users/register`,
        formData,
      );

      if (user) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Registration Unsuccessfull");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      {isLoading && <h3>...loading</h3>}
      <h1>Registration</h1>
      <form onSubmit={handleRegistration} encType="multipart/form-data">
        <input type="text" name="fullname" placeholder="enter your fullname" />
        <input type="email" name="email" placeholder="enter your email" />
        <input
          type="password"
          name="password"
          placeholder="enter your password"
        />
        <input
          type="username"
          name="username"
          placeholder="enter your username"
        />
        <input type="file" name="avatar" placeholder="upload your avatar" />
        <input
          type="file"
          name="coverImage"
          placeholder="upload your coverImage"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
