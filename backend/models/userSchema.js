import mongoose from "mongoose";
import friendslist from "./friendlistSchema.js";
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
  friends:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "friendslist",
    },
});
userSchema.pre("save",async function(next){
   try{
      const t = this.leetcodeusername;
      const obj = new friendslist();
      const w = await obj.save();
      this.friends = obj._id;
      next();
   }
   catch(err){
    next(err);
   }
})
const User = mongoose.model("User", userSchema);
export default User;