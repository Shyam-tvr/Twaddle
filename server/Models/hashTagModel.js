import mongoose from "mongoose";

const hashtagSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    tag: String,
    posts: [{ type: mongoose.Types.ObjectId, ref: "post" }]
},{timestamps:true})

export const Hashtags = mongoose.model("hashtags", hashtagSchema)