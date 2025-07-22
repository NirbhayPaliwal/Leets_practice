import React, { useState } from 'react';
import Category from './Category';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance } from '../lib/axios';

const VirtualContest = () => {
  const navigate = useNavigate();
  const [easy, seteasy] = useState(0);
  const [medium, setmedium] = useState(0);
  const [hard, sethard] = useState(0);
  const [duration, setDuration] = useState(0); 


  const handleBuildContest = async() => {
    
    if (easy + medium + hard === 0 || duration <= 0) {
      toast.error("Please select questions and a valid duration");
      return;
    }

    const {data} = await axiosInstance.post('/contest/build',{easy,medium,hard,duration} );
    if (data.ok) {

      navigate(`/participate/${data.id}`);

    } else {
      toast.error("Failed to create contest. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <section>
      <ToastContainer />
      <div className="p-7 ml-16">
        <h1 className="text-3xl mb-6">Cook a Contest</h1>
        <div className="p-7 flex flex-col space-y-2">
          <Category type="easy" val={easy} setval={seteasy} />

          <div className="flex items-center justify-between">
            <Category type="medium" val={medium} setval={setmedium} />
            <div className="flex items-center space-x-2">
              <label className="text-md font-medium whitespace-nowrap">Duration (min):</label>
              <input
                type="number"
                min="1"
                className="input input-bordered w-24"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
            </div>
            
            <button
               className="btn input-bordered border-white text-white bg-dark hover:bg-darkest"
                onClick={handleBuildContest}>
              Build Contest
            </button>
            
            
          </div>

          <Category type="hard" val={hard} setval={sethard} />
        </div>
      </div>
    </section>
  );
};

export default VirtualContest;

