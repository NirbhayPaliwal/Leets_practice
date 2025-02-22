import mongoose from "mongoose";

const problemsSchema = new mongoose.Schema({
  easy: [
    {
      type: Number,
    },
  ],
  hard: [
    {
      type: Number,
    },
  ],
  medium: [
    {
      type: Number,
    },
  ],
});
const problems = mongoose.model("problems",problemsSchema);
export default problems;