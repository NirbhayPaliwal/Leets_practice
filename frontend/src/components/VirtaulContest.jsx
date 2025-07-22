import React, { useState } from 'react';
import Category from './Category';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VirtualContest = () => {
  const navigate = useNavigate();
  const [easy, seteasy] = useState(0);
  const [medium, setmedium] = useState(0);
  const [hard, sethard] = useState(0);
  const [duration, setDuration] = useState(0); 
  const [contestName, setContestName] = useState("");


  const handleBuildContest = () => {
    
    if (easy + medium + hard === 0 || duration <= 0 || contestName=="") {
      toast.error("Please select questions and a valid duration");
      return;
    }

    const contestConfig = {
      contestName,
      easy,
      medium,
      hard,
      duration,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + duration * 60000).toISOString()
    };
    localStorage.setItem("currentContest", JSON.stringify(contestConfig));

    toast.success("Contest has been prepared!");
    

  //   setTimeout(() => {
  //     navigate("/contest/67d1a60d90638e3d54240356");
  //   }, 1500);
  // };

  setTimeout(() => {
      const contestId = "67d1a60d90638e3d54240356"; // you can later generate dynamic IDs
navigate(`/participatepage`);
    }, 1500);
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
    <label className="text-md font-medium whitespace-nowrap">Contest Name:</label>
    <input
      type="text"
      placeholder="Enter contest name"
      className="input input-bordered w-40"
      value={contestName}
      onChange={(e) => setContestName(e.target.value)}
    />
  </div>
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

