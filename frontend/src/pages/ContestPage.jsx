import React from 'react'
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from '../lib/axios';
import Loading from '../components/Loading.jsx'
const link = "https://leetcode.com/problems/";
//67cd7afb3fd2fc0a1cf503ae
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
let contest = {};
const ContestPage = () => {  
  const navigate = useNavigate()
  const [loading,setloading] = useState(true); 
  const [Time, setTime] = useState(0);
  const [participation,setparticipation] = useState({});
  let called = 0;
  const { id } = useParams();
  const Problem = ({item})=>{
    let style = "border-t-2 hover:text-cyan-400 cursor-pointer";
    console.log(participation.solved_problems);
    console.log(
      item.titleSlug      
    ); // true

    if (
      participation &&
      participation.solved_problems.hasOwnProperty(
        String(item.titleSlug)
      )
    ) {
      console.log("HEY");
      style = "bg-green-500 border-t-2 hover:text-black cursor-pointer";
    }
    return (
      <>
        <tr
          key={item.titleSlug}
          className={style}
          onClick={() => window.open(link + item.titleSlug, "_blank")}>
          <td>{item.title}</td>
          <td>
            <Text colour={item.difficulty} txt={item.difficulty} />
          </td>
        </tr>
      </>
    );
  }
  const handletimer = ()=> {
      const curr = Math.floor(
      (new Date() - new Date(contest.startTime)) / 1000
    );
    setTime(contest.duration * 60 - curr);
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
      if(Time < 0) return ;
    }, 1000);

    return () => clearInterval(interval);
  }
  const handlesubmissions = ()=>{
      const interval = setInterval(async ()=>{
         const pt = await axiosInstance.get('/contest/getparticipate/'+id);
         console.log(pt);
          setparticipation(pt.data);
          if(Time<0)return ;
      },5000);
      return ()=>clearInterval(interval);
  }
  useEffect(() => {    
    if(called) return ;
    called = 1;
    setloading(true);
    const fetchcontest = async ()=>{
        const {data} = await axiosInstance.get('/contest/get/'+id);      
        if(data.ok){
          const res = await axiosInstance.get(
            "/contest/getparticipate/" + id
          );
          const data2 = res.data;
          if(data2){
                contest = data;
                setparticipation(data2);
                setloading(false);
                handletimer();
                handlesubmissions();
          }else{
            // navigate("../register/" + id);
          }
        }
        else{
          navigate('../register/' + id);
        }
    };
    fetchcontest();
  }, [id]);
  if(loading) return <Loading/>
  return (
    <>
      <Navbar />
      <div className="flex justify-center m-12">
        <div>
          <div className="flex justify-between mb-0">
            <div className="text-[1.5rem]">Contest Name</div>
            <div className="text-[1.3rem]  text-white self-end">
              {Time > 0 && (
                <>
                  Time - {String(Math.floor(Time / 3600)).padStart(
                    2,
                    "0"
                  )}:{String(Math.floor((Time % 3600) / 60)).padStart(2, "0")}
                  :{String(Time % 60).padStart(2, "0")}
                </>
              )}
              {Time <= 0 && <>Contest is Over</>}
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
                {contest.problems.map((item) => (
                  <Problem key = {item.titleSlug} item={item}/>                  
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