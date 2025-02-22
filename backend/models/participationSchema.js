import mongoose from "mongoose";
const participationSchema = new mongoose.Schema({
    user : {
        type : String
    },
    startTime : {
        type : Date
    },
    contestId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contest",
    }
})
const participation = mongoose.model('participation',participationSchema);
export default participation;
