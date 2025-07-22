import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ParticipatePage = () => {
  const navigate = useNavigate();
  const { contestId } = useParams();

  const savedContest = JSON.parse(localStorage.getItem("currentContest"));
  const defaultDuration = savedContest
    ? Math.floor(
        (new Date(savedContest.endTime) - new Date(savedContest.startTime)) /
          60000
      )
    : 10;

  const [contestName, setContestName] = useState(
    savedContest?.contestName || "weekly-65"
  );
  const [easy, setEasy] = useState(savedContest?.easy);
  const [medium, setMedium] = useState(savedContest?.medium);
  const [hard, setHard] = useState(savedContest?.hard);
  const [duration, setDuration] = useState(defaultDuration);

  const handleStartContest = () => {
    const start = new Date();
    const end = new Date(start.getTime() + duration * 60000); // Convert minutes to ms

    const contestData = {
      id: contestId,
      contestName,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      easy,
      medium,
      hard,
    };

    localStorage.setItem("currentContest", JSON.stringify(contestData));

    toast.success("Contest Started!", {
      position: "top-center",
      autoClose: 500,
    });

    setTimeout(() => {
      navigate(`/participate/${contestId}`);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-darker text-white px-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Prepare Contest</h1>

      <div className="w-full max-w-md bg-darkest p-6 rounded-xl shadow-lg space-y-4">
        {/* Contest Name */}
        <div>
          <label className="block mb-1 text-sm">Contest Name:</label>
          <input
            type="text"
            value={contestName}
            readOnly
            // onChange={(e) => setContestName(e.target.value)}
            className="w-full p-2 rounded bg-dark text-white border border-gray-600 cursor-not-allowed"
          />
        </div>

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
  );
};

export default ParticipatePage;
