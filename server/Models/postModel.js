import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, ref: "user" },
    content:  {
      type: String,
    },
    images: {
      type: Array,
      required: true,
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
  },
  {
    timestamps: true,
  }
);

export const Posts = mongoose.model("post", postSchema);
