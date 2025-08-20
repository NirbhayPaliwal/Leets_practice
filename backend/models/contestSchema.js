import mongoose, { Types } from "mongoose";
const contestSchema = new mongoose.Schema({
  problems: [
    {
      type: Number,
    },
  ],
  duration : {
    type : Number
  },
  name: {
    type: String
  }

});
const contest =  mongoose.model("contest",contestSchema);
export default contest;