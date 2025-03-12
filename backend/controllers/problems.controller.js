import user from "../models/userSchema.js";
import data from "../data.js"
const getproblemsfunc = async (easy,hard,medium,username)=>{
    const {problems} = await (await user.findOne({username})).populate('problems');
    const result = [];
    for(let i = 0 ;i <easy;i++){
        const ind = Math.floor(Math.random() * (problems.easy.length+1));
        let a = problems.easy[ind];
        const p = data[a-1];
        result.push(p);
        problems.easy.splice(ind,1);  
    }
     for (let i = 0; i < hard; i++) {
       const ind = Math.floor(Math.random() * (problems.hard.length + 1));
       let a = problems.hard[ind];
       const p = data[a-1];
       result.push(p);
       problems.hard.splice(ind, 1);
     }
      for (let i = 0; i < medium; i++) {
        const ind = Math.floor(Math.random() * (problems.medium.length + 1));
        let a = problems.medium[ind];
        const p = data[a-1];
        result.push(p);
        problems.medium.splice(ind, 1);
      }
    await problems.save();
    console.log(result)
    return result;
}
const getproblems = async(req,res)=>{
    const easy = req.body.easy;
    const hard = req.body.hard;
    const medium = req.body.medium;
    const username= req.user;    
    res.send(await getproblemsfunc(easy, medium, hard, username));
}
export {getproblems,getproblemsfunc};