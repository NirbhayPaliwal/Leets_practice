import mongoose from "mongoose";

const friendslistSchema = new mongoose.Schema({
    list : [{
        type : String
    }]
})
const friendslist = mongoose.model("friendslist",friendslistSchema);
export default friendslist;

