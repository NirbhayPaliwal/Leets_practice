import User from "../models/userSchema.js";
import friendslist from "../models/friendlistSchema.js";
import { LeetCode } from "leetcode-query";
const addfriend = async (req,res)=>{
    try{
        const user = req.user;
        const tobe = req.params.id;
        const result = await User.findOne({ username: user });  
        const listid = result.friends
        const exists = await friendslist.findOne({
            _id : listid,
            list : {$in : [tobe] },
        });
        if(exists){
            res.send({ok : 1 , alertmessage: "User already there!"});
            return ;
        }
        const leetcode = new LeetCode();
        const lcuser = await leetcode.user(tobe);
        if(lcuser.matchedUser == null){
            res.send({ ok: 1, alertmessage: "No such User Found" });
            return ;
        }
        await friendslist.findOneAndUpdate(
            {_id : listid},
            {
                $push : {list : tobe}
            }
        )
        res.send({ok : 1 , alertmessage : "User Added!"})
    }
    catch(err){
        console.log(err);
        res.send({message : "Internal Server Error"});
    }

}
const getfriendfunc = async(user)=>{
    try{
            const result =await ((await User.findOne({username : user})).populate("friends"));
        const list = result.friends.list;
        return list;
    }
    catch(err){
        console.log(err);       
    }
}
const getfriend = async(req,res)=>{
    try{
        if(!req.user)return res.send({list : ""});
        const list = await getfriendfunc(req.user);
        res.send({list});
    }
    catch(err){
        console.log(err);
    }
    
}
const getsubmissionsfunc = async(user)=>{
    const LC = new LeetCode();
    const LCuser = await LC.user(user);
    return LCuser.recentSubmissionList;    
}
const getsubmissions = async(req,res)=>{
    const user = req.params.id;
    const rest = await getsubmissionsfunc(user);
    res.send(rest);
}


const getallfriendsubms = async(req,res)=>{
    // console.log(req);
    let list = await getfriendfunc(req.user);
    let result = [];
    for(const a of list){
        let s = await getsubmissionsfunc(a);
        for (let el of s) {
          el.username = a; 
            result.push(el);
        }
    }
    result.sort((a,b)=> b.timestamp-a.timestamp);
    result = result.map((el) => ({
      ...el,
      timestamp: new Date(el.timestamp * 1000).toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    }));
    res.send(result);
    return ;
}

export {addfriend,getfriend,getsubmissions ,getallfriendsubms}