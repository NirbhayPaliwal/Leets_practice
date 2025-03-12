import contest from "../models/contestSchema.js";
import { getproblemsfunc } from "./problems.controller.js";
import data from "../data.js";
import LeetCode from "leetcode-query"
import User from "../models/userSchema.js";
import participation from "../models/participationSchema.js";
const buildcontest = async(req,res)=>{
    try{
        const { easy, medium, hard, duration } = req.body;
        const username = req.user;
        const p = await getproblemsfunc(easy, medium, hard, username);
        const curr = new contest({duration});
        for (let a of p) {
          curr.problems.push(Number(a.questionFrontendId))
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
        if (!contestId.match(/^[0-9a-fA-F]{24}$/)) {
          return res.status(400).send({ok:0});
        }
        const user = req.user;
        const pt = await participation.findOne({
            user , contestId
        })
        if (pt) {
          const currcontest = await contest.findById(contestId);
          if (currcontest) {
            for (let a of currcontest.problems) {
              const problem = data[a-1];
              const p = {
                titleSlug: problem.titleSlug,
                difficulty: problem.difficulty,
                title : problem.title
              };
              pb.push(p);
            }
            return res.send({ok : 1, problems: pb, startTime: pt.startTime, duration:currcontest.duration });
          }
        } 
        return res.send({ ok : 0,partcipate: 0, message: "No such contest" });
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
        if (!contestId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({ create : 0 });
        }
        const currcontest = await contest.findById(req.params.id);
        if(currcontest){
            const p = new participation({user , startTime : new Date(),contestId});            
            await p.save();       
            checksolved(p._id);
            return res.send({ok:1});   
        }
        return res.send({create : 0})
    }
    catch(err){
        console.log("Error in participate",err);
        return res.send({ok : 0});
    }
}
const checksolved = async (participationId) => {
    try{
         const leetcode = new LeetCode();
         const pt = await participation.findById(participationId);
         const currcontest = await contest.findById(pt.contestId);
         const lc = (await User.findOne({ username: pt.user })).leetcodeusername;  
         const titles = new Set();
         for(let a of  currcontest.problems){
            titles.add(data[a-1].titleSlug);
         }
         console.log(titles)
         let intervalID = setInterval(async() => {
           const u = await leetcode.recent_submissions(lc);
           const rev = u.reverse();
           for(let a of rev){
              console.log(a.titleSlug)
                if(titles.has(a.titleSlug)){
                    if(a.statusDisplay == "Accepted"){
                        console.log("acctep")
                        pt.solved_problems.set(a.titleSlug , new Date());
                        titles.delete(a.titleSlug);
                    }else{
                        if (!pt.wrong_submissions.has(a.titleSlug)) {
                          console.log("wrong");
                          pt.wrong_submissions.set(a.titleSlug, []);
                        }
                        if(!pt.wrong_submissions.get(a.titleSlug).includes(a.timestamp)){
                          console.log("wrong");
                            pt.wrong_submissions
                              .get(a.titleSlug)
                              .push(a.timestamp);
                            console.log(pt.wrong_submissions)
                        }
                    }
                }
           }
           pt.markModified("solved_problems");
           pt.markModified("wrong_submissions");
           await pt.save();
         }, 1000 * 10);
         setTimeout(() => {
           clearInterval(intervalID);
           console.log("Interval stopped");
         }, 1000 * 60 * currcontest.duration);
    }   
    catch(err){
        console.log("Error in check solved" ,err);
    }
};
const getparticipation = async(req,res)=>{
  try{
      const user = req.user;
      const contestId = req.params.id;
      const pt = await participation.findOne({user,contestId}).lean();
      return res.send(pt)
  }
  catch(err){
    console.log("Error in getparticipation ",err);
  }
}
export {buildcontest,getcontest,participate,checksolved,getparticipation}
