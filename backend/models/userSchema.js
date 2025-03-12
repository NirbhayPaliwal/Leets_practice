import mongoose from "mongoose";
import friendslist from "./friendlistSchema.js";
import problems from "./problemsSchema.js";
import data from "../data.js"
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  leetcodeusername: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  friends: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "friendslist",
  },
  problems: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "problems",
  },
});
userSchema.pre("save",async function(next){
   try{
      const obj = new friendslist();
      await obj.save();
      const p = new problems();
      for(let a of data){
        if(a.isPaidOnly) continue;
        if(a.difficulty == 'Hard') p.hard.push(a.questionFrontendId);
        if (a.difficulty == "Easy") p.easy.push(a.questionFrontendId);
        if (a.difficulty == "Medium") p.medium.push(a.questionFrontendId);
      }
      await p.save();
      this.friends = obj._id;
      this.problems = p._id;
      next();
   }
   catch(err){
    next(err);
   }
})
const User = mongoose.model("User", userSchema);
export default User;
