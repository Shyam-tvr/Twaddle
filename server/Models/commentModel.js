import mongoose, { Types } from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    tag: { type: Object },
    replies: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    post: { type: mongoose.Types.ObjectId, ref: "post" },
    author: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

export const Comments = mongoose.model("comment", commentSchema);
