import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/djkop1xi1/image/upload/v1687939997/avatar_dm5x48.webp",
    },
    coverPicture: {
      type: String,
      default:
        "https://res.cloudinary.com/djkop1xi1/image/upload/v1689684393/cover_grfvjy.png",
    },
    role: { type: String, default: "public" },
    gender: { type: String },
    mobile: { type: String, default: "" },
    address: { type: String, default: "" },
    about: {
      type: String,
      default: "",
      maxlength: 20,
    },
    website: { type: String, default: "" },
    followers: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    following: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    posts: [{ type: mongoose.Types.ObjectId, ref: "post" }],
    saved: [{ type: mongoose.Types.ObjectId, ref: "post" }],
  },
  {
    timestamps: true,
  }
);

export const Users= mongoose.model("user", userSchema);
