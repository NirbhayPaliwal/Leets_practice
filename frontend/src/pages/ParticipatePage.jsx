import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../lib/axios";
import Navbar from "../components/Navbar.jsx";
const ParticipatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("Contest ID:", id);  
  useEffect(() =>{
      const fetchContestData = async () => {
        const { data } = await axiosInstance.get(`/contest/getcontestdetails/${id}`);
        console.log("Contest Data:", data);
        if(data.ok){
          setEasy(data.contest.easy);
          setMedium(data.contest.medium);
          setHard(data.contest.hard);
          setDuration(data.contest.duration);
        }
        else {
          toast.error("Contest not found or has ended.", {
            position: "top-center",
            autoClose: 2000,
          });
          // navigate("/");
        }
        
      }
      fetchContestData();
  },[])


  const [easy, setEasy] = useState(0);
  const [medium, setMedium] = useState(0);
  const [hard, setHard] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleStartContest = async() => {
      const {data} = await axiosInstance.get(`/contest/participate/${id}`)
      console.log("Start Contest Response:", data);
      if(data.ok){
        navigate(`/contest/${id}`);
      }
      else {
        if(data.create == false) 
          toast.error("Contest does not exist.", {
            position: "top-center",
            autoClose: 2000,
          });
        else{
            toast.error("Failed to start contest. Please try again.", {
            position: "top-center",
            autoClose: 2000,
          });
        }

        
      }
  };

  return (
    <div>
      <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-darker text-white px-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Prepare Contest</h1>

      <div className="w-full max-w-md bg-darkest p-6 rounded-xl shadow-lg space-y-4">


        {/* Number of Questions */}
        <div>
          <label className="block mb-1 text-sm">Easy Questions:</label>
          <input
            type="number"
            value={easy}
            readOnly
            // onChange={(e) => setEasy(Number(e.target.value))}
            className="w-full p-2 rounded bg-dark text-white border border-gray-600 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Medium Questions:</label>
          <input
            type="number"
            value={medium}
            readOnly
            // onChange={(e) => setMedium(Number(e.target.value))}
            className="w-full p-2 rounded bg-dark text-white border border-gray-600 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Hard Questions:</label>
          <input
            type="number"
            value={hard}
            readOnly
            // onChange={(e) => setHard(Number(e.target.value))}
            className="w-full p-2 rounded bg-dark text-white border border-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Duration - read-only */}
        <div>
          <label className="block mb-1 text-sm">Duration (minutes):</label>
          <input
            type="number"
            value={duration}
            readOnly
            className="w-full p-2 rounded bg-dark text-gray-400 border border-gray-600 cursor-not-allowed"
          />
        </div>

        <div className="text-center mt-4">
          <div className="flex space-x-4 justify-center">
            {/* Start Button */}
            <button
              onClick={handleStartContest}
              className="py-2 px-4 bg-dark hover:bg-darker rounded-lg text-white font-semibold transition"
            >
              Start Contest
            </button>

            {/* This is for shring the link of participate page */}
            {/* Share Button */}
            {/* <button
              onClick={() => {
                const shareUrl = `${window.location.origin}/participate/${contestId}`;
                navigator.clipboard.writeText(shareUrl);
                toast.success("Link copied to clipboard!", { theme: "dark" });
              }}
              className="btn btn-outline btn-accent border-white text-white hover:bg-accent hover:text-black"
            >
              Share Contest
            </button> */}

            {/* Share Button */}


            <button
              onClick={() => {
                const shareUrl = window.location.href; // ✅ Current page URL
                navigator.clipboard.writeText(shareUrl);
                toast.success("Link copied to clipboard!", { theme: "dark" });
              }}
              className="btn btn-outline btn-accent border-white text-white hover:bg-accent hover:text-black"
            >
              Share Contest
            </button>

          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ParticipatePage;
