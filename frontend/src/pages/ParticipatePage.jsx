import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ParticipatePage = () => {
  const navigate = useNavigate();
  const [contestName, setContestName] = useState("weekly-65");
  const [tempContestName, setTempContestName] = useState(contestName); // Store temporary name
  const [isEditing, setIsEditing] = useState(false);
  const [duration, setDuration] = useState("");

  // Handle contest start with updated contest name
  const handleStartContest = () => {
    if (!duration || duration <= 0) {
      toast.error("Please enter a valid contest duration!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    console.log(`Starting contest: ${contestName} for ${duration} minutes`);

    // Navigate to updated contest URL
    const updatedId = contestName.replace(/\s+/g, "-").toLowerCase();
    navigate(`/contest/${updatedId}`);
  };

  // Handle saving edited contest name
  const handleSaveContestName = () => {
    setContestName(tempContestName);
    setIsEditing(false);

    toast.success("Contest name updated successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  // Handle canceling contest name edit
  const handleCancelEdit = () => {
    setTempContestName(contestName);
    setIsEditing(false);
  };

  return (
    <div className="bg-dark min-h-screen">
      <Navbar />
      <ToastContainer />
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <div className="bg-darkest p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Participate in Contest
          </h2>

          {/* Editable Contest Name */}
          <div className="mb-4">
            <label className="block text-gray-400">Contest Name:</label>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={tempContestName}
                  onChange={(e) => setTempContestName(e.target.value)}
                  className="border border-gray-700 p-2 rounded w-full bg-darker text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
                <div className="flex justify-end mt-2 space-x-2">
                  <button
                    onClick={handleSaveContestName}
                    className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded transition-all"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center border border-gray-700 p-2 rounded bg-darker text-white">
                {contestName}
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Time Duration Input */}
          <div className="mb-4">
            <label className="block text-gray-400">Time Duration (minutes):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter duration in minutes"
              className="border border-gray-700 p-2 rounded w-full bg-darker text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
              min="1"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handleStartContest}
              className="bg-darker hover:bg-green-500 text-white px-4 py-2 rounded-full transition-all"
            >
              Start Contest
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-darker hover:bg-red-500 text-white px-4 py-2 rounded-full transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipatePage;
