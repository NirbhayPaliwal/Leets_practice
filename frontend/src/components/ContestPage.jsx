import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect } from "react";

const link = "https://leetcode.com/problems/";
const Text = ({ colour, txt }) => {
  if (colour === "Easy") {
    return <span className="text-easy capitalize"> {txt} </span>;
  }
  if (colour === "Hard") {
    return <span className="text-hard capitalize"> {txt} </span>;
  }
  if (colour === "Medium") {
    return <span className="text-medium capitalize"> {txt} </span>;
  }
};
const sample_contest = {
  problems: [
    {
      titleSlug: "largest-1-bordered-square",
      difficulty: "Medium",
      title: "Largest 1-Bordered Square",
    },
    {
      titleSlug: "replace-elements-in-an-array",
      difficulty: "Medium",
      title: "Replace Elements in an Array",
    },
    {
      titleSlug:
        "lexicographically-smallest-string-after-operations-with-constraint",
      difficulty: "Medium",
      title:
        "Lexicographically Smallest String After Operations With Constraint",
    },
    {
      titleSlug: "user-purchase-platform",
      difficulty: "Hard",
      title: "User Purchase Platform",
    },
    {
      titleSlug: "course-schedule-ii",
      difficulty: "Medium",
      title: "Course Schedule II",
    },
    {
      titleSlug: "snapshot-array",
      difficulty: "Medium",
      title: "Snapshot Array",
    },
  ],
  startTime: "2025-03-10T14:37:32.195",
  duration: 100,
};
const ContestPage = () => {
  const [Time,setTime] = useState(0)
    useEffect(() => {
      console.log(new Date())
      console.log(new Date(sample_contest.startTime));
    const curr = Math.floor((new Date() - new Date(sample_contest.startTime))/1000);
    setTime(sample_contest.duration*60-curr);
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center m-12">
        <div>
          <div className="flex justify-between mb-1">
            <div className="text-[1.5rem]">Contest Name</div>
            <div className="text-[1.3rem]  text-white self-end">
              {" "}
              Time - {String(Math.floor(Time / 3600)).padStart(2, "0")} : {" "}
              {String(Math.floor((Time % 3600) / 60)).padStart(2, "0")} : {" "}
              {String(Time % 60).padStart(2, "0")}
            </div>
          </div>
          <div className="w-[80vw] bg-dark h-auto">
            <table className="table ">
              <thead className="bg-darkest text-[1rem]">
                <tr>
                  <td> Problem list</td>
                  <td> Difficulty</td>
                </tr>
              </thead>
              <tbody>
                {sample_contest.problems.map((item) => (
                  <tr
                    key={item.titleSlug}
                    className="border-t-2 hover:text-cyan-500 cursor-pointer"
                    onClick={() =>
                      window.open(link + item.titleSlug, "_blank")
                    }>
                    <td>{item.title}</td>
                    <td>
                      <Text colour={item.difficulty} txt={item.difficulty} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContestPage