import User from "../models/userSchema.js";
import friendslist from "../models/friendlistSchema.js";
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
const getfriend = async(req,res)=>{
    const user = req.user;
    const result = await ((await User.findOne({username : user})).populate("friends"));
    const list = result.friends.list;
    res.send({list});
}
const getsubmissions = async(req,res)=>{
    
}

export {addfriend,getfriend,getsubmissions}