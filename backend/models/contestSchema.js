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
  },
  numericId: {
    type: Number,
    unique: true
  }

});
const contest =  mongoose.model("contest",contestSchema);
export default contest;