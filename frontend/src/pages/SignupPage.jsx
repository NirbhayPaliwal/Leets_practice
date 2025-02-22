import React, { useState } from 'react'
import LeetCodelogo from "../assets/LeetCodelogogray.png"
import { axiosInstance } from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx";
const SignupPage = () => {
  const navigate = useNavigate();
  const [loading,setloading] = useState(false);
  const [formData,setFormData] = useState({
    username : "",
    email : "",
    password : "",
    leetcodeusername : ""
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear the error as the user types    
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true)
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        validationErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    });
    if(formData["password"].length < 6){
      validationErrors["password"] = "Password should be of at least 6 length"
    }
    if (Object.keys(validationErrors).length > 0) {      
      setErrors(validationErrors);
    } else {
      const {data} = await axiosInstance.post("/auth/signup",formData);
      if(data.message){
        alert(data.message);
        return ;
      }
      if (!data.ok) {
        for (e in data.errors) {
          validationErrors[e] = data.errors[e];
        }
        setErrors(validationErrors);
      } else {
        const t = await axiosInstance.get(`/friend/add/${formData["leetcodeusername"]}`);
        console.log(t);
        alert("Signup Succesful");
        navigate('/');
      }
    }
    setloading(false);
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-start h-[700px]">
        <form onSubmit={handleSubmit}>
          <div className=" w-[450px] flex flex-col items-center justify-center bg-darkest rounded-md transition-all duration-300 mt-5 h-auto min-h-[500px]">
            <h1 className="text-3xl mb-7 mt-10 "> Create Account </h1>
            {/* Email Input */}

            <div className="min-h-[220px] w-[350px] flex flex-col gap-2 m h-auto">
              <div>
                <label className="flex-shrink-0 input flex items-center gap-4 focus:outline-100 border-0 bg-dark">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="email"
                    name="email"
                    className="grow"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Username Input */}
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
                    name="username"
                    className="grow"
                    placeholder="Username"
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
                <label className="flex-shrink-0 input  flex items-center gap-2  bg-dark  border-0">
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
                    name="password"
                    className="grow"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </label>

                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              {/* LeetCode username Input */}
              <div>
                <label className="flex-shrink-0 input  flex items-center gap-2  bg-dark  border-0">
                  <img src={LeetCodelogo} alt="icon" className="h-[19px]" />
                  <input
                    type="text"
                    name="leetcodeusername"
                    className="grow"
                    placeholder="LeetCode Username"
                    value={formData.leetcodeusername}
                    onChange={handleChange}
                  />
                </label>
                {errors.leetcodeusername && (
                  <p className="text-red-500 text-sm">
                    {errors.leetcodeusername}
                  </p>
                )}
              </div>
              <div className="flex justify-center">
                <button className="btn bg-darker min-h-0 h-[43px] hover:bg-darker w-[200px] border-0 m-1 flex justify-center items-center ">
                  {!loading && <>Signup</>}
                  {loading && (
                    <>
                      <div className="h-[22px] w-[22px] border-black border-2 border-t-white rounded-full animate-spin"></div>
                    </>
                  )}
                </button>
              </div>
              <div className="h-[40px]">
                <a
                  className="flex justify-end text-sm text-blue-400 "
                  href="/login">
                  Already have an account?
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupPage