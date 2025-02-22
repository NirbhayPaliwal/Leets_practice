import contest from "../models/contestSchema.js";
import { getproblemsfunc } from "./problems.controller.js";
import data from "../data.js";
import participation from "../models/participationSchema.js";
const buildcontest = async(req,res)=>{
    try{
        const { easy, medium, hard, duration } = req.body;
        const username = req.user;
        const p = await getproblemsfunc(easy, medium, hard, username);
        const curr = new contest({duration});
        for (let a of p) {
          curr.problems.push(a.questionFrontendId)
        }
        curr.save();
        return res.send({ id: curr._id });
    }
    catch(err){
        console.log("Problem in contest controller" , err);
        return res.send({ok :0});
    }
}
// "id": "67b9add24fcdf6c867dcb36e"
const getcontest = async(req,res)=>{
    try{
        const pb = [];
        const contestId = req.params.id
        const user = req.user;
        const pt = await participation.findOne({
            user , contestId
        })
        if (pt) {
          const currcontest = await contest.findById(contestId);
          if (currcontest) {
            for (let a of currcontest.problems) {
              const problem = data[a];
              const p = {
                titleSlug: problem.titleSlug,
                difficulty: problem.difficulty,
              };
              pb.push(p);
            }
            return res.send({ problems: pb, startTime: pt.startTime, duration:currcontest.duration });
          }
        } 
        return res.send({ partcipate: 0, message: "No such contest" });
    }
    catch(err){
        console.log("Error in Get Contest",err);
        res.send({ok : 0});
    }
}
const participate = async(req,res)=>{
    try{
        const user = req.user;
        const contestId = req.params.id;
        const currcontest = await contest.findById(req.params.id);
        if(currcontest){
            const p = new participation({user , startTime : new Date(),contestId});
            await p.save();       
            return res.send({ok:1});   
        }
        return res.send({create : 0})
    }
    catch(err){
        console.log("Error in participate",err);
        return res.send({ok : 0});
    }
}
export {buildcontest,getcontest,participate}
