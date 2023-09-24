import { Users } from "../Models/userModel.js";
import mongoose from "mongoose";

export const userCtrl = {
  searchUser: async (req, res) => {
    try {
      const { username } = req?.query;
      const users = await Users.find({ username: { $regex: username } })
        .limit(10)
        .select("fullname username avatar");
      if (users.length > 0) {
        return res.status(200).json(users);
      } else {
        return res
          .status(404)
          .json({ error: "UsersNotFound", msg: "No users found." });
      }
    } catch (err) {
      return res.status(500).json({ error: "ServerError", msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id)
        .select("-password")
        .populate("followers following", "-password");
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      res.status(200).json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const data = req.body;
      console.log(data)
      const user = await Users.findOneAndUpdate({ _id: req.user._id }, data).select("-password");
      res.status(200).json({ msg: "Update Success!", user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  followUser: async (req, res) => {
    const user_id = req.user._id;
    const paramsid = req.params.id;
    const id = paramsid.toString();
    const user = await Users.findById(user_id);
    if (user?.following?.includes(id)) {
      const response = await unfollowUser(user_id, id);
      return res.status(200).json({ msg: response.msg });
    } else {
      const response = await followUser(user_id, id);
      return res.status(200).json({ msg: response.msg });
    }
  },
  suggestionsUser: async (req, res) => {
    try {
      const newArr = [...req.user?.following, req.user?._id];
      const users = await Users.aggregate([
        { $match: { _id: { $nin: newArr } } },
        { $sample: { size: 5 } },
        {
          $lookup: {
            from: "users",
            localField: "followers",
            foreignField: "_id",
            as: "followers",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "following",
            foreignField: "_id",
            as: "following",
          },
        },
      ]).project("-password");

      return res.status(200).json({ users });
    } catch (err) {
      console.log(err.msg);
      return res.status(500).json({ msg: err.message });
    }
  },
};

const followUser = async (user_id, id) => {
  try {
    await Users.findByIdAndUpdate(user_id, {
      $push: {
        following: id,
      },
    });
    await Users.findByIdAndUpdate(id, {
      $push: {
        followers: user_id,
      },
    });
    return { msg: "You followed this user" };
  } catch (error) {
    return error;
  }
};

const unfollowUser = async (user_id, id) => {
  try {
    await Users.findByIdAndUpdate(user_id, {
      $pull: {
        following: id,
      },
    });
    await Users.findByIdAndUpdate(id, {
      $pull: {
        followers: user_id,
      },
    });
    return { msg: "You Unfollowed this user" };
  } catch (error) {
    return error;
  }
};
