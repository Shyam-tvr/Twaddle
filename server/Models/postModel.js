import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, ref: "user" },
    caption: {
      type: String,
    },
    files: {
      type: Array,
      required: true,
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
    tags: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    hashtags: {type:Array},
    collabs: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Posts = mongoose.model("post", postSchema);
