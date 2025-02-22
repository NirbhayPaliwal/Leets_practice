import mongoose, { Types } from "mongoose";
const contestSchema = new mongoose.Schema({
  problems: [
    {
      type: Number,
    },
  ],
  duration : {
    type : Number
  }

});
const contest =  mongoose.model("contest",contestSchema);
export default contest;