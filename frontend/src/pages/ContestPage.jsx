
import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import Loading from "../components/Loading.jsx";



const link = "https://leetcode.com/problems/";

const Text = ({ colour, txt }) => {
  if (colour === "Easy") {
    return (
      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
        {txt}
      </span>
    );
  }
  if (colour === "Hard") {
    return (
      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
        {txt}
      </span>
    );
  }
  if (colour === "Medium") {
    return (
      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
        {txt}
      </span>
    );
  }
};

let contest = {};

const ContestPage = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [Time, setTime] = useState(0);
  const [participation, setparticipation] = useState({});
  const [contestName, setContestName] = useState("");
  let called = 0;
  const { id } = useParams();

  const Problem = ({ item, index }) => {
    let isSolved = participation?.solved_problems?.hasOwnProperty(
      String(item.titleSlug)
    );
    return (
      <li
        key={item.titleSlug}
        onClick={() => window.open(link + item.titleSlug, "_blank")}
        className={`flex w-full justify-between px-4 py-3 bg-dark rounded-lg shadow cursor-pointer  ${
          isSolved ? "bg-green-500 " : ""
        }`}
      >
        <span className="text-lg">
          {index + 1}. {item.title}
        </span>
        <Text colour={item.difficulty} txt={item.difficulty} />
      </li>
    );
  };

  // const handletimer = () => {
  //   const curr = Math.floor((new Date() - new Date(contest.startTime)) / 1000);
  //   setTime(contest.duration * 60 - curr);
  //   const interval = setInterval(() => {
  //     setTime((prevTime) => prevTime - 1);
  //     if (Time < 0) return;
  //   }, 1000);
  //   return () => clearInterval(interval);
  // };

    const handletimer = () => {
  const curr = Math.floor((new Date() - new Date(contest.startTime)) / 1000);
  const totalTime = contest.duration * 60;
  setTime(totalTime - curr);

  const interval = setInterval(() => {
    setTime((prevTime) => {
      if (prevTime <= 1) {
        clearInterval(interval);
        return 0;
      }
      return prevTime - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
};


  const handlesubmissions = () => {
    const interval = setInterval(async () => {
      const pt = await axiosInstance.get("/contest/getparticipate/" + id);
      setparticipation(pt.data);
      if (Time < 0) return;
    }, 5000);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (called) return;
    called = 1;
    setloading(true);
    const fetchcontest = async () => {
      const { data } = await axiosInstance.get("/contest/get/" + id);
      if (data.ok) {
        const res = await axiosInstance.get("/contest/getparticipate/" + id);
        const data2 = res.data;
        if (data2) {
          contest = data;
          setparticipation(data2);
          setContestName(data.name);
          setloading(false);
          handletimer();
          handlesubmissions();
        }
      } else {
        navigate("../register/" + id);
      }
    };
    fetchcontest();
  }, [id]);

  useEffect(() => {
  if (Time === 0) {
    const timeout = setTimeout(() => {
      navigate("/thankyou"); // Replace with your actual route
    },1000); // Optional: 2 second delay

    return () => clearTimeout(timeout);
  }
}, [Time, navigate]);


  if (loading) return <Loading />;

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  const getTimeColor = () => {
    return Time < 180 ? "text-red-500" : "text-green-400";
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-darker flex items-center justify-center px-4 py-10 text-white">
        <div className="w-full max-w-4xl bg-darkest rounded-xl shadow-lg p-10 flex flex-col justify-center">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 text-accent">
              {contestName}
            </h1>
          </div>

          {/* <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xl font-semibold">⏳ Time Remaining:</p>
              <p className={`text-3xl font-mono ${getTimeColor()}`}>
                {Time > 0 ? formatTime(Time) : "Contest is Over"}
              </p>
            </div>
          </div> */}

          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            {/* Left side: Time remaining label + countdown */}
            <div className="text-center sm:text-left">
              <p className="text-xl font-semibold">
                ⏳ Time Remaining:{" "}
                <span className={`text-xl font-semibold ${getTimeColor()}`}>
                  {Time > 0 ? formatTime(Time) : "00:00"}
                </span>
              </p>
            </div>

            {/* Right side: Show only after contest is over */}
            {Time <= 0 && (
              <div className="text-center sm:text-right">
                <p className="text-xl font-bold text-red-500">
                  🚫 Contest is Over
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold underline underline-offset-4 mb-4 text-center">
              📚 Problems
            </h2>
            <ul
              className={`space-y-3 w-full ${
                contest.problems.length <= 3 ? "flex flex-col items-center" : ""
              }`}
            >
              {contest.problems.length === 0 ? (
                <p className="text-center text-gray-400">
                  No problems available.
                </p>
              ) : (
                contest.problems.map((item, index) => (
                  <Problem key={item.titleSlug} item={item} index={index} />
                ))
              )}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContestPage;
