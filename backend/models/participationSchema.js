import mongoose from "mongoose";
const participationSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  startTime: {
    type: Date,
  },
  contestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "contest",
  },
  timing: {
    type: Map,
  },
  solved_problems: {
    type: Map,
    of: Date,
    default: {},
  },

  wrong_submissions: {
    type: Map,
    of: [Number],
    default: () => new Map(),
  },
});
const participation = mongoose.model('participation',participationSchema);
export default participation;
