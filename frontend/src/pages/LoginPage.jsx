import React from 'react'
import { useState } from 'react';
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
const LoginPage = () => {
  const navigate = useNavigate()
  const [loading,setloading] = useState(false);
  const [formData,setFormData] = useState({
    username : "",
    password : "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: "" }); // Clear the error as the user types    
  }
  const handleSubmit = async (e) => {
      setloading(true);
      e.preventDefault();
      const validationErrors = {};
      Object.keys(formData).forEach((key) => {
        if (!formData[key]) {
          validationErrors[key] = `${
            key.charAt(0).toUpperCase() + key.slice(1)
          } is required`;
        }
      });
      if (Object.keys(validationErrors).length > 0) {      
        setErrors(validationErrors);
      } else {
        const {data} = await axiosInstance.post('/auth/login',formData);
        if(data.ok){
          navigate("/");
        }
        else{
          if(data.message || !(data.errors)){
            alert(data.message);
          }
          else{
            for(e in data.errors){
              console.log(e);
              console.log(data.errors[e]);
              validationErrors[e] = data.errors[e];
            }
            setErrors(validationErrors);
          }
        }
      }
            setloading(false);
  };
  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center h-[600px] transition-all">
          <div className="h-auto min-h-[400px] w-[450px] flex flex-col items-center justify-center bg-darkest rounded-md pt-10">
            <h1 className="text-3xl mb-7"> Welcome back!</h1>
            {/* Username input */}
            <div className="h-[220px] w-[350px] flex flex-col gap-2 m">
              <div>
                <label className="flex-shrink-0 input  flex items-center gap-2 bg-dark  border-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow"
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </label>
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username}</p>
                )}
              </div>
              {/* Password Input */}
              <div>
                <label className=" flex-shrink-0 input  flex items-center gap-2  bg-dark  border-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="password"
                    className="grow"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </label>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div className="flex justify-center">
                <button className="btn bg-darker min-h-0 h-[43px] hover:bg-darker w-[200px] border-0 m-1">
                  {!loading && <>Login</>}
                  {loading && (
                    <>
                      <div className="h-[19px] w-[19px] border-black border-2 border-t-white rounded-full animate-spin"></div>
                    </>
                  )}
                </button>
              </div>
              <a
                className="content-end flex justify-end text-sm w-[350px] text-blue-400"
                href="./signup">
                Don't Have an Account?
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage